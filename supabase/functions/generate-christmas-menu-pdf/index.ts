import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { PDFDocument } from "https://esm.sh/pdf-lib@1.17.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting: Store request counts per IP (in-memory, resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // Max 10 requests per minute per IP
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB max per image
const MAX_BASE64_SIZE = 15 * 1024 * 1024; // ~15MB base64 (accounts for encoding overhead)
const MAX_RATE_LIMIT_ENTRIES = 10000; // Prevent memory exhaustion

// Zod validation schema
const base64ImageSchema = z.string()
  .refine((val) => {
    if (!val || typeof val !== 'string') return false;
    // Check base64 format (should start with data:image/...;base64,)
    const base64ImageRegex = /^data:image\/(jpeg|jpg|png|webp);base64,/i;
    return base64ImageRegex.test(val);
  }, { message: 'Invalid base64 image format. Must be JPEG, PNG, or WebP.' })
  .refine((val) => {
    // Check size (base64 is ~33% larger than binary)
    return val.length <= MAX_BASE64_SIZE;
  }, { message: `Image too large. Maximum size is ${MAX_BASE64_SIZE / 1024 / 1024}MB (base64 encoded).` })
  .refine((val) => {
    try {
      const base64Data = val.split(',')[1];
      if (!base64Data) return false;
      
      // Validate base64 characters
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      if (!base64Regex.test(base64Data)) return false;
      
      // Check decoded size
      const decodedSize = (base64Data.length * 3) / 4;
      return decodedSize <= MAX_IMAGE_SIZE;
    } catch {
      return false;
    }
  }, { message: `Decoded image size exceeds ${MAX_IMAGE_SIZE / 1024 / 1024}MB.` });

const pdfRequestSchema = z.object({
  image1Base64: base64ImageSchema,
  image2Base64: base64ImageSchema,
});

const getClientIP = (req: Request): string => {
  // Try to get IP from various headers (for proxies/load balancers)
  // x-forwarded-for can contain multiple IPs (client, proxy1, proxy2...)
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    // Get the first IP (the original client)
    const ip = forwarded.split(',')[0].trim();
    // Validate IP format (basic check)
    if (ip && /^[\d\.a-f:]+$/.test(ip)) {
      return ip;
    }
  }
  
  // Try x-real-ip header
  const realIP = req.headers.get('x-real-ip');
  if (realIP && /^[\d\.a-f:]+$/.test(realIP)) {
    return realIP;
  }
  
  // Try cf-connecting-ip (Cloudflare)
  const cfIP = req.headers.get('cf-connecting-ip');
  if (cfIP && /^[\d\.a-f:]+$/.test(cfIP)) {
    return cfIP;
  }
  
  // Fallback to unknown (will still be rate limited as a group)
  return 'unknown';
};

const cleanupExpiredEntries = () => {
  const now = Date.now();
  const expiredKeys: string[] = [];
  
  // Find expired entries
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      expiredKeys.push(ip);
    }
  }
  
  // Delete expired entries
  expiredKeys.forEach(key => rateLimitMap.delete(key));
  
  // If map is still too large, remove oldest entries
  if (rateLimitMap.size > MAX_RATE_LIMIT_ENTRIES) {
    const entries = Array.from(rateLimitMap.entries());
    entries.sort((a, b) => a[1].resetTime - b[1].resetTime);
    const toRemove = entries.slice(0, rateLimitMap.size - MAX_RATE_LIMIT_ENTRIES);
    toRemove.forEach(([key]) => rateLimitMap.delete(key));
    console.warn(`Rate limit map size exceeded. Removed ${toRemove.length} oldest entries.`);
  }
};

const checkRateLimit = (ip: string): { allowed: boolean; retryAfter?: number } => {
  const now = Date.now();
  
  // Cleanup expired entries on each check (edge functions are stateless anyway)
  cleanupExpiredEntries();
  
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Calculate retry after in seconds
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    console.warn(`Rate limit exceeded for IP: ${ip}. Requests: ${record.count}/${RATE_LIMIT_MAX_REQUESTS}`);
    return { allowed: false, retryAfter };
  }
  
  record.count++;
  return { allowed: true };
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}. Total map size: ${rateLimitMap.size}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.retryAfter 
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimitResult.retryAfter || 60),
          },
        }
      );
    }

    console.log('Starting PDF generation for Christmas menu...');

    // Get the base64 images from the request body and validate with Zod
    const body = await req.json();
    
    const validationResult = pdfRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error("Invalid PDF request data:", validationResult.error.issues);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid image data',
          details: validationResult.error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message
          }))
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { image1Base64, image2Base64 } = validationResult.data;

    console.log('Processing base64 images...');

    // Convert base64 to bytes (remove data:image/jpeg;base64, prefix)
    const base64ToBytes = (base64: string): Uint8Array => {
      try {
        const base64Data = base64.split(',')[1];
        if (!base64Data) throw new Error('Invalid base64 format');
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
      } catch (error) {
        throw new Error('Failed to decode base64 image');
      }
    };

    const image1Bytes = base64ToBytes(image1Base64);
    const image2Bytes = base64ToBytes(image2Base64);

    console.log('Embedding images in PDF...');

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Embed the images
    const image1 = await pdfDoc.embedJpg(image1Bytes);
    const image2 = await pdfDoc.embedJpg(image2Bytes);

    // Get image dimensions
    const image1Dims = image1.scale(1);
    const image2Dims = image2.scale(1);

    // Calculate scale to fit A4 page (595 x 842 points)
    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 20;
    const availableWidth = pageWidth - (margin * 2);
    const availableHeight = pageHeight - (margin * 2);

    // Scale images to fit page width
    const scale1 = availableWidth / image1Dims.width;
    const scaledHeight1 = image1Dims.height * scale1;
    
    const scale2 = availableWidth / image2Dims.width;
    const scaledHeight2 = image2Dims.height * scale2;

    // Add first page with first image
    const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
    page1.drawImage(image1, {
      x: margin,
      y: pageHeight - margin - scaledHeight1,
      width: availableWidth,
      height: scaledHeight1,
    });

    // Add second page with second image
    const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
    page2.drawImage(image2, {
      x: margin,
      y: pageHeight - margin - scaledHeight2,
      width: availableWidth,
      height: scaledHeight2,
    });

    console.log('Saving PDF...');

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    
    // Convert to standard Uint8Array
    const uint8Array = new Uint8Array(pdfBytes);

    console.log('PDF generated successfully');

    // Return the PDF
    return new Response(new Blob([uint8Array], { type: 'application/pdf' }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Menu-Kerst-Nieuwjaar-Slagerij-John.pdf"',
      },
    });

  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Failed to generate PDF' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

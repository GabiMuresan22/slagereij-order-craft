import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { PDFDocument } from "https://esm.sh/pdf-lib@1.17.1";

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

// Validation functions
const isValidBase64Image = (base64: string): boolean => {
  // Check if it's a valid base64 string
  if (!base64 || typeof base64 !== 'string') return false;
  
  // Check base64 format (should start with data:image/...;base64,)
  const base64ImageRegex = /^data:image\/(jpeg|jpg|png|webp);base64,/i;
  if (!base64ImageRegex.test(base64)) return false;
  
  // Check size (base64 is ~33% larger than binary)
  if (base64.length > MAX_BASE64_SIZE) return false;
  
  // Try to decode base64
  try {
    const base64Data = base64.split(',')[1];
    if (!base64Data) return false;
    
    // Validate base64 characters
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(base64Data)) return false;
    
    // Check decoded size
    const decodedSize = (base64Data.length * 3) / 4;
    if (decodedSize > MAX_IMAGE_SIZE) return false;
    
    return true;
  } catch {
    return false;
  }
};

const getClientIP = (req: Request): string => {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIP = req.headers.get('x-real-ip');
  if (realIP) return realIP;
  return 'unknown';
};

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false; // Rate limit exceeded
  }
  
  record.count++;
  return true;
};

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': '60',
          },
        }
      );
    }

    console.log('Starting PDF generation for Christmas menu...');

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Get the base64 images from the request body
    const body = await req.json();
    const { image1Base64, image2Base64 } = body;

    if (!image1Base64 || !image2Base64) {
      return new Response(
        JSON.stringify({ error: 'Image data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate base64 image format and size
    if (!isValidBase64Image(image1Base64)) {
      return new Response(
        JSON.stringify({ error: 'Invalid image1 format or size. Images must be JPEG/PNG/WebP and under 10MB.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidBase64Image(image2Base64)) {
      return new Response(
        JSON.stringify({ error: 'Invalid image2 format or size. Images must be JPEG/PNG/WebP and under 10MB.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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

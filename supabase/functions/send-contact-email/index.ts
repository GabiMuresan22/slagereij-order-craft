import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent_given?: boolean;
  consent_timestamp?: string;
}

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3; // 3 requests per minute per IP

// In-memory rate limit store
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Get client IP from request headers
const getClientIP = (req: Request): string => {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  return "unknown";
};

// Clean up expired rate limit entries
const cleanupExpiredEntries = (): void => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
};

// Check rate limit for IP
const checkRateLimit = (ip: string): { allowed: boolean; retryAfter?: number } => {
  cleanupExpiredEntries();
  
  const now = Date.now();
  const existing = rateLimitMap.get(ip);
  
  if (!existing || now > existing.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  
  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfter = Math.ceil((existing.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  existing.count++;
  return { allowed: true };
};

// Validation functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const validateContactData = (data: unknown): data is ContactEmailRequest => {
  if (!data || typeof data !== 'object') return false;
  
  const record = data as Record<string, unknown>;
  
  // Validate required fields
  if (!record.name || typeof record.name !== 'string' || record.name.length < 2 || record.name.length > 100) return false;
  if (!record.email || typeof record.email !== 'string' || !isValidEmail(record.email)) return false;
  if (!record.phone || typeof record.phone !== 'string' || record.phone.length < 10 || record.phone.length > 20) return false;
  if (!record.message || typeof record.message !== 'string' || record.message.length < 10 || record.message.length > 1000) return false;
  
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(rateLimitResult.retryAfter),
            ...corsHeaders,
          },
        }
      );
    }

    // Validate API key is present
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const requestData = await req.json();
    
    console.log(`Contact form submission from IP: ${clientIP}`);

    // Validate input data
    if (!validateContactData(requestData)) {
      console.error("Invalid contact form data");
      return new Response(
        JSON.stringify({ error: "Invalid contact form data" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, phone, message, consent_given, consent_timestamp } = requestData;

    // Send email to business using direct fetch to Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Slagerij John <noreply@slagerij-john.be>",
        to: ["contact@slagerij-john.be"],
        reply_to: email,
        subject: `Nieuw contactbericht van ${name}`,
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nieuw contactbericht</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); padding: 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                          Nieuw Contactbericht
                        </h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="font-size: 16px; color: #333333; margin: 0 0 20px 0;">
                          Je hebt een nieuw contactbericht ontvangen via de website:
                        </p>
                        
                        <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #f9f9f9; border-radius: 4px; margin: 20px 0;">
                          <tr>
                            <td style="font-weight: bold; color: #8B4513; padding: 10px;">Naam:</td>
                            <td style="color: #333333; padding: 10px;">${name}</td>
                          </tr>
                          <tr>
                            <td style="font-weight: bold; color: #8B4513; padding: 10px;">Email:</td>
                            <td style="color: #333333; padding: 10px;">
                              <a href="mailto:${email}" style="color: #8B4513; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="font-weight: bold; color: #8B4513; padding: 10px;">Telefoon:</td>
                            <td style="color: #333333; padding: 10px;">
                              <a href="tel:${phone}" style="color: #8B4513; text-decoration: none;">${phone}</a>
                            </td>
                          </tr>
                        </table>
                        
                        <div style="background-color: #f9f9f9; border-left: 4px solid #8B4513; padding: 15px; margin: 20px 0; border-radius: 4px;">
                          <p style="font-weight: bold; color: #8B4513; margin: 0 0 10px 0;">Bericht:</p>
                          <p style="color: #333333; margin: 0; white-space: pre-wrap;">${message}</p>
                        </div>
                        
                        ${consent_given && consent_timestamp ? `
                        <div style="background-color: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; border-radius: 4px;">
                          <p style="font-weight: bold; color: #2e7d32; margin: 0 0 10px 0;">✓ Privacy Toestemming:</p>
                          <p style="color: #333333; margin: 0; font-size: 14px;">
                            <strong>Toestemming gegeven:</strong> Ja<br>
                            <strong>Datum/Tijd:</strong> ${new Date(consent_timestamp).toLocaleString('nl-BE', { dateStyle: 'long', timeStyle: 'short' })}
                          </p>
                        </div>
                        ` : ''}
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                        <p style="font-size: 14px; color: #666666; margin: 0;">
                          Dit bericht werd verzonden via het contactformulier op slagerij-john.be
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const emailData = await emailResponse.json();
    console.log("Contact email sent successfully:", emailData);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: (error instanceof Error ? error.message : String(error)) || "Failed to send contact email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

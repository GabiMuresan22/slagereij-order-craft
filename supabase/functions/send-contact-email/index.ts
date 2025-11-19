import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
}

// Validation functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const validateContactData = (data: any): data is ContactEmailRequest => {
  if (!data || typeof data !== 'object') return false;
  
  // Validate required fields
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2 || data.name.length > 100) return false;
  if (!data.email || !isValidEmail(data.email)) return false;
  if (!data.phone || typeof data.phone !== 'string' || data.phone.length < 10 || data.phone.length > 20) return false;
  if (!data.message || typeof data.message !== 'string' || data.message.length < 10 || data.message.length > 1000) return false;
  
  return true;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    
    console.log("Received contact form submission");

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

    const { name, email, phone, message } = requestData;

    // Send email to business
    const emailResponse = await resend.emails.send({
      from: "Slagerij John Website <onboarding@resend.dev>",
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
    });

    console.log("Contact email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send contact email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

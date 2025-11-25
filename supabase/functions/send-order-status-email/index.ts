import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Type definitions
type SupportedLanguage = 'nl' | 'ro';
type OrderStatus = 'pending' | 'confirmed' | 'ready' | 'completed';

const DEFAULT_LANGUAGE: SupportedLanguage = 'nl';
const VALID_STATUSES: OrderStatus[] = ['pending', 'confirmed', 'ready', 'completed'];

interface OrderStatusEmailRequest {
  customerName: string;
  customerEmail: string;
  orderId: string;
  status: string;
  orderItems: Array<{ product: string; quantity: number | string; weight?: string; unit?: string }>;
  pickupDate: string;
  pickupTime: string;
  language?: SupportedLanguage;
}

// Validation functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const validateOrderData = (data: any): data is OrderStatusEmailRequest => {
  if (!data || typeof data !== 'object') return false;
  
  // Validate required fields
  if (!data.customerName || typeof data.customerName !== 'string' || data.customerName.length > 100) return false;
  if (!data.customerEmail || !isValidEmail(data.customerEmail)) return false;
  if (!data.orderId || typeof data.orderId !== 'string' || data.orderId.length > 100) return false;
  if (!data.status || typeof data.status !== 'string' || !VALID_STATUSES.includes(data.status as OrderStatus)) return false;
  if (!data.pickupDate || typeof data.pickupDate !== 'string') return false;
  if (!data.pickupTime || typeof data.pickupTime !== 'string' || data.pickupTime.length > 50) return false;
  
  // Validate optional language field
  if (data.language !== undefined && data.language !== 'nl' && data.language !== 'ro') return false;
  
  // Validate orderItems array
  if (!Array.isArray(data.orderItems) || data.orderItems.length === 0 || data.orderItems.length > 50) return false;
  for (const item of data.orderItems) {
    if (!item.product || typeof item.product !== 'string' || item.product.length > 200) return false;
    if (typeof item.quantity !== 'number' && typeof item.quantity !== 'string') return false;
    // Weight/unit is optional for flexibility
  }
  
  return true;
};

const getEmailContent = (data: OrderStatusEmailRequest) => {
  const { customerName, orderId, status, orderItems, pickupDate, pickupTime, language = DEFAULT_LANGUAGE } = data;
  
  // Calculate order total and create items list with prices
  const orderTotal = orderItems.reduce((sum: number, item: any) => {
    const price = item.price || 0;
    const quantity = parseFloat(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0).toFixed(2);

  const itemsList = orderItems
    .map((item: any) => {
      const price = item.price || 0;
      const quantity = parseFloat(item.quantity) || 0;
      const itemTotal = (price * quantity).toFixed(2);
      
      return `
        <tr>
          <td style="padding: 8px 0; color: #666666;">
            ${item.quantity} ${item.unit || item.weight || ''} ${item.product}
          </td>
          <td style="padding: 8px 0; color: #666666; text-align: right;">
            €${price.toFixed(2)} × ${item.quantity}
          </td>
          <td style="padding: 8px 0; color: #333333; font-weight: 600; text-align: right;">
            €${itemTotal}
          </td>
        </tr>
      `;
    })
    .join('');

  // Translation dictionaries for email content
  const translations = {
    nl: {
      pending: {
        subject: "Bestelling Ontvangen - Slagerij John",
        title: "Bedankt voor uw bestelling!",
        message: "We hebben uw bestelling goed ontvangen. We gaan er zo snel mogelijk mee aan de slag.",
      },
      confirmed: {
        subject: "Bestelling Bevestigd - Slagerij John",
        title: "Uw bestelling is bevestigd",
        message: "Goed nieuws! We hebben uw bestelling bevestigd en zijn begonnen met de voorbereiding. U ontvangt een nieuwe melding wanneer uw bestelling klaar is voor afhaling.",
      },
      ready: {
        subject: "Bestelling Klaar voor Afhaling - Slagerij John",
        title: "Uw bestelling is klaar",
        message: `Uw bestelling is klaar voor afhaling! Kom gerust langs op ${pickupDate} om ${pickupTime} om uw verse producten op te halen.`,
      },
      completed: {
        subject: "Bestelling Voltooid - Bedankt! - Slagerij John",
        title: "Bestelling Voltooid",
        message: "Bedankt voor uw bestelling! We hopen dat u geniet van uw verse vleesproducten.",
      },
      greeting: "Hallo",
      orderDetails: "Bestelgegevens",
      orderId: "Bestelling ID",
      status: "Status",
      pickup: "Afhalen",
      at: "om",
      items: "Artikelen",
      total: "Totaal",
      questions: "Als u vragen heeft, aarzel dan niet om contact met ons op te nemen.",
      footer: "Bedankt dat u voor onze slagerij kiest!",
      statusLabels: {
        pending: "In Behandeling",
        confirmed: "Bevestigd",
        ready: "Klaar",
        completed: "Voltooid",
      },
    },
    ro: {
      pending: {
        subject: "Comandă Primită - Măcelăria John",
        title: "Vă mulțumim pentru comandă!",
        message: "Am primit comanda dumneavoastră. O vom pregăti cât mai curând posibil.",
      },
      confirmed: {
        subject: "Comandă Confirmată - Măcelăria John",
        title: "Comanda dumneavoastră a fost confirmată",
        message: "Vești bune! Am confirmat comanda și am început pregătirea. Veți primi o notificare când comanda este gata de ridicare.",
      },
      ready: {
        subject: "Comandă Gata de Ridicare - Măcelăria John",
        title: "Comanda dumneavoastră este gata",
        message: `Comanda dumneavoastră este gata de ridicare! Vă rugăm să veniți pe ${pickupDate} la ora ${pickupTime} pentru a vă ridica produsele proaspete.`,
      },
      completed: {
        subject: "Comandă Finalizată - Mulțumim! - Măcelăria John",
        title: "Comandă Finalizată",
        message: "Vă mulțumim pentru comandă! Sperăm să vă bucurați de produsele proaspete.",
      },
      greeting: "Salut",
      orderDetails: "Detalii comandă",
      orderId: "ID comandă",
      status: "Stare",
      pickup: "Ridicare",
      at: "ora",
      items: "Articole",
      total: "Total",
      questions: "Dacă aveți întrebări, nu ezitați să ne contactați.",
      footer: "Vă mulțumim că ați ales măcelăria noastră!",
      statusLabels: {
        pending: "În Așteptare",
        confirmed: "Confirmat",
        ready: "Gata",
        completed: "Finalizat",
      },
    },
  };

  // Type-safe language lookup with fallback to default
  const t = language in translations ? translations[language] : translations[DEFAULT_LANGUAGE];
  
  // Type-safe status lookup with fallback
  const isValidStatus = (s: string): s is OrderStatus => VALID_STATUSES.includes(s as OrderStatus);
  const orderStatus: OrderStatus = isValidStatus(status) ? status : 'confirmed';
  
  const content = t[orderStatus];
  const statusLabel = t.statusLabels[orderStatus];

  return {
    subject: content.subject,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${content.subject}</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #8B0000 0%, #DC143C 100%); padding: 40px 20px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px;">${content.title}</h1>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin-top: 0;">
                        ${t.greeting} ${customerName},
                      </p>
                      
                      <p style="color: #333333; font-size: 16px; line-height: 1.6;">
                        ${content.message}
                      </p>
                      
                      <!-- Order Details -->
                      <div style="background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin: 30px 0;">
                        <h2 style="color: #8B0000; font-size: 18px; margin-top: 0;">${t.orderDetails}</h2>
                        <p style="color: #666666; margin: 5px 0;">
                          <strong>${t.orderId}:</strong> ${orderId.slice(0, 8)}
                        </p>
                        <p style="color: #666666; margin: 5px 0;">
                          <strong>${t.status}:</strong> <span style="color: #8B0000; text-transform: capitalize;">${statusLabel}</span>
                        </p>
                        <p style="color: #666666; margin: 5px 0;">
                          <strong>${t.pickup}:</strong> ${pickupDate}, ${t.at} ${pickupTime}
                        </p>
                        
                        <h3 style="color: #333333; font-size: 16px; margin-top: 20px; margin-bottom: 10px;">${t.items}:</h3>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                          <tbody>
                            ${itemsList}
                          </tbody>
                        </table>
                        
                        <div style="border-top: 2px solid #8B0000; padding-top: 15px; margin-top: 15px;">
                          <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #333333; font-size: 18px; font-weight: bold;">${t.total}:</span>
                            <span style="color: #8B0000; font-size: 24px; font-weight: bold;">€${orderTotal}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p style="color: #666666; font-size: 14px; line-height: 1.6; margin-bottom: 0;">
                        ${t.questions}
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-top: 1px solid #eeeeee;">
                      <p style="color: #999999; font-size: 12px; margin: 0;">
                        ${t.footer}
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
  };
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Read the request data
    const requestData = await req.json();
    
    // Validate input data
    if (!validateOrderData(requestData)) {
      console.error("Invalid order data received:", requestData);
      return new Response(
        JSON.stringify({ error: "Invalid request data. Please check all fields are valid." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Sending order status email:", requestData);

    const { customerEmail } = requestData;
    const emailContent = getEmailContent(requestData);

    // Use direct fetch to Resend API instead of SDK
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Slagerij John <noreply@slagerij-john.be>",
        to: [customerEmail],
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("Resend API error:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify(emailData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-status-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

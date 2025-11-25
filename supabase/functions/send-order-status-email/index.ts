import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

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

// Zod validation schemas
const orderItemSchema = z.object({
  product: z.string().min(1).max(200),
  quantity: z.union([z.number(), z.string()]).refine(
    (val) => {
      const num = typeof val === 'string' ? parseFloat(val) : val;
      return !isNaN(num) && num > 0 && num <= 1000;
    },
    { message: 'Quantity must be between 0 and 1000' }
  ),
  weight: z.string().optional(),
  unit: z.string().optional(),
});

const orderStatusEmailSchema = z.object({
  customerName: z.string().min(1).max(100),
  customerEmail: z.string().email().max(255),
  orderId: z.string().min(1).max(100),
  status: z.enum(['pending', 'confirmed', 'ready', 'completed']),
  orderItems: z.array(orderItemSchema).min(1).max(50),
  pickupDate: z.string().min(1),
  pickupTime: z.string().min(1).max(50),
  language: z.enum(['nl', 'ro']).optional(),
});

type OrderStatusEmailRequest = z.infer<typeof orderStatusEmailSchema>;

const getEmailContent = async (data: OrderStatusEmailRequest) => {
  const { customerName, orderId, status, orderItems, pickupDate, pickupTime, language = DEFAULT_LANGUAGE } = data;
  
  // Create Supabase client to fetch official prices
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Fetch all products from database to get official prices
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('key, price');
  
  if (productsError) {
    console.error('Error fetching products:', productsError);
    throw new Error('Failed to fetch product prices from database');
  }
  
  // Create a map of product keys to prices for quick lookup
  const priceMap = new Map<string, number>();
  products?.forEach(product => {
    priceMap.set(product.key, Number(product.price));
  });
  
  // Calculate order total using official database prices
  const orderTotal = orderItems.reduce((sum: number, item: any) => {
    const officialPrice = priceMap.get(item.product) || 0;
    const quantity = parseFloat(item.quantity) || 0;
    return sum + (officialPrice * quantity);
  }, 0).toFixed(2);

  const itemsList = orderItems
    .map((item: any) => {
      const officialPrice = priceMap.get(item.product) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      const itemTotal = (officialPrice * quantity).toFixed(2);
      
      return `
        <tr>
          <td style="padding: 8px 0; color: #666666;">
            ${item.quantity} ${item.unit || item.weight || ''} ${item.product}
          </td>
          <td style="padding: 8px 0; color: #666666; text-align: right;">
            €${officialPrice.toFixed(2)} × ${item.quantity}
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
  const orderStatus: OrderStatus = status as OrderStatus;
  
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
    
    // Validate input data with Zod
    const validationResult = orderStatusEmailSchema.safeParse(requestData);
    
    if (!validationResult.success) {
      console.error("Invalid order data received:", validationResult.error.issues);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request data. Please check all fields are valid.",
          details: validationResult.error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message
          }))
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = validationResult.data;
    console.log("Sending order status email:", data);

    const { customerEmail } = data;
    const emailContent = await getEmailContent(data);

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

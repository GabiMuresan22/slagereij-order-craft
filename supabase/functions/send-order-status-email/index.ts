import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderStatusEmailRequest {
  customerName: string;
  customerEmail: string;
  orderId: string;
  status: string;
  orderItems: Array<{ product: string; quantity: number | string; weight?: string; unit?: string }>;
  pickupDate: string;
  pickupTime: string;
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
  if (!data.status || typeof data.status !== 'string' || !['pending', 'confirmed', 'ready', 'completed'].includes(data.status)) return false;
  if (!data.pickupDate || typeof data.pickupDate !== 'string') return false;
  if (!data.pickupTime || typeof data.pickupTime !== 'string' || data.pickupTime.length > 50) return false;
  
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
  const { customerName, orderId, status, orderItems, pickupDate, pickupTime } = data;
  
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

  const statusMessages = {
    pending: {
      subject: "Bestelling Ontvangen - Slagerij John",
      title: "Bedankt voor uw bestelling!",
      message: "We hebben uw bestelling goed ontvangen. We gaan er zo snel mogelijk mee aan de slag.",
    },
    confirmed: {
      subject: "Order Confirmed - We're preparing your order!",
      title: "Your Order Has Been Confirmed",
      message: "Great news! We've confirmed your order and started preparing it. You'll receive another notification when it's ready for pickup.",
    },
    ready: {
      subject: "Order Ready for Pickup!",
      title: "Your Order Is Ready",
      message: `Your order is ready for pickup! Please come by on ${pickupDate} at ${pickupTime} to collect your fresh products.`,
    },
    completed: {
      subject: "Order Completed - Thank you!",
      title: "Order Completed",
      message: "Thank you for your order! We hope you enjoy your fresh meat products.",
    },
  };

  const content = statusMessages[status as keyof typeof statusMessages] || statusMessages.confirmed;

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
                        Hello ${customerName},
                      </p>
                      
                      <p style="color: #333333; font-size: 16px; line-height: 1.6;">
                        ${content.message}
                      </p>
                      
                      <!-- Order Details -->
                      <div style="background-color: #f9f9f9; border-radius: 6px; padding: 20px; margin: 30px 0;">
                        <h2 style="color: #8B0000; font-size: 18px; margin-top: 0;">Order Details</h2>
                        <p style="color: #666666; margin: 5px 0;">
                          <strong>Order ID:</strong> ${orderId.slice(0, 8)}
                        </p>
                        <p style="color: #666666; margin: 5px 0;">
                          <strong>Status:</strong> <span style="color: #8B0000; text-transform: capitalize;">${status}</span>
                        </p>
                        <p style="color: #666666; margin: 5px 0;">
                          <strong>Pickup:</strong> ${pickupDate} at ${pickupTime}
                        </p>
                        
                        <h3 style="color: #333333; font-size: 16px; margin-top: 20px; margin-bottom: 10px;">Items:</h3>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
                          <tbody>
                            ${itemsList}
                          </tbody>
                        </table>
                        
                        <div style="border-top: 2px solid #8B0000; padding-top: 15px; margin-top: 15px;">
                          <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #333333; font-size: 18px; font-weight: bold;">Total:</span>
                            <span style="color: #8B0000; font-size: 24px; font-weight: bold;">€${orderTotal}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p style="color: #666666; font-size: 14px; line-height: 1.6; margin-bottom: 0;">
                        If you have any questions, please don't hesitate to contact us.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; border-top: 1px solid #eeeeee;">
                      <p style="color: #999999; font-size: 12px; margin: 0;">
                        Thank you for choosing our butcher shop!
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
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("Missing authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Read the body first to check status
    const requestData = await req.json();

    // Only perform strict Admin Role check if status is NOT pending
    // This allows customers to trigger the "Order Received" email themselves
    if (requestData.status !== 'pending') {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_ANON_KEY") ?? "",
        { global: { headers: { Authorization: authHeader } } }
      );

      // Get the authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("Error getting user:", userError);
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check if user has admin role
      const { data: hasAdminRole, error: roleError } = await supabase
        .rpc("has_role", { _user_id: user.id, _role: "admin" });

      if (roleError || !hasAdminRole) {
        console.error("User is not an admin:", roleError);
        return new Response(
          JSON.stringify({ error: "Forbidden: Admin access required" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }
    
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
        from: "Slagerij John <gabimuresan2289@gmail.com>",
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

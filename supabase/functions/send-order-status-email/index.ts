import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
  orderItems: Array<{ product: string; quantity: number; weight: string }>;
  pickupDate: string;
  pickupTime: string;
}

const getEmailContent = (data: OrderStatusEmailRequest) => {
  const { customerName, orderId, status, orderItems, pickupDate, pickupTime } = data;
  
  const itemsList = orderItems
    .map(item => `<li>${item.quantity}x ${item.product} (${item.weight})</li>`)
    .join("");

  const statusMessages = {
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
                        <ul style="color: #666666; margin: 0; padding-left: 20px;">
                          ${itemsList}
                        </ul>
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
    // Verify admin role
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("Missing authorization header");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

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

    const requestData: OrderStatusEmailRequest = await req.json();
    console.log("Sending order status email:", requestData);

    const { customerEmail } = requestData;
    const emailContent = getEmailContent(requestData);

    const emailResponse = await resend.emails.send({
      from: "Butcher Shop <onboarding@resend.dev>",
      to: [customerEmail],
      subject: emailContent.subject,
      html: emailContent.html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
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

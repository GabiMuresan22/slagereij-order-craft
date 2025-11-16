import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon, ShoppingCart, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { trackOrderSubmit } from "@/components/Analytics";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  product: string;
  quantity: string;
  unit: string;
}

// Create schemas dynamically with translations
const createOrderSchemas = (t: (key: string) => string) => {
  // Phone number validation regex (supports international formats)
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  
  const orderItemSchema = z.object({
    product: z.string().min(1, t('order.validation.selectProduct')),
    quantity: z.string()
      .min(1, t('order.validation.enterQuantity'))
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0 && num <= 1000; // Max 1000 kg/units
      }, { message: t('order.validation.quantityInvalid') || 'Quantity must be between 0.1 and 1000' }),
    unit: z.string().min(1, t('order.validation.selectUnit')),
  });

  const orderFormSchema = z.object({
    orderItems: z.array(orderItemSchema).min(1, t('order.validation.addProduct')).max(50), // Max 50 items
    pickupDate: z.date({ required_error: t('order.validation.selectDate') }),
    pickupTime: z.string().min(1, t('order.validation.selectTime')),
    customerName: z.string()
      .min(2, t('order.validation.nameMin'))
      .max(100, t('order.validation.nameMax') || 'Name must be less than 100 characters'),
    customerPhone: z.string()
      .min(10, t('order.validation.phoneMin'))
      .max(20, t('order.validation.phoneMax') || 'Phone number must be less than 20 characters')
      .regex(phoneRegex, t('order.validation.phoneFormat') || 'Invalid phone number format'),
    customerEmail: z.string()
      .email(t('order.validation.emailInvalid'))
      .max(255, t('order.validation.emailMax') || 'Email must be less than 255 characters'),
    notes: z.string()
      .max(1000, t('order.validation.notesMax') || 'Notes must be less than 1000 characters')
      .optional(),
  });

  return { orderItemSchema, orderFormSchema };
};

const Order = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get translated schemas
  const { orderFormSchema } = createOrderSchemas(t);
  
  type OrderFormValues = z.infer<typeof orderFormSchema>;

  const productOptions = [
    { key: 'steak', label: t('order.products.steak') },
    { key: 'roast', label: t('order.products.roast') },
    { key: 'beefMince', label: t('order.products.beefMince') },
    { key: 'stew', label: t('order.products.stew') },
    { key: 'porkTenderloin', label: t('order.products.porkTenderloin') },
    { key: 'chops', label: t('order.products.chops') },
    { key: 'porkMince', label: t('order.products.porkMince') },
    { key: 'sausage', label: t('order.products.sausage') },
    { key: 'wholeChicken', label: t('order.products.wholeChicken') },
    { key: 'chickenBreast', label: t('order.products.chickenBreast') },
    { key: 'chickenThighs', label: t('order.products.chickenThighs') },
    { key: 'homemadeSausage', label: t('order.products.homemadeSausage') },
    { key: 'meatballs', label: t('order.products.meatballs') },
    { key: 'bbqPackage', label: t('order.products.bbqPackage') },
  ];

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      orderItems: [{ product: "", quantity: "", unit: "kg" }],
      pickupTime: "",
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      notes: "",
    },
  });

  const orderItems = form.watch("orderItems");

  const addOrderItem = () => {
    const currentItems = form.getValues("orderItems");
    form.setValue("orderItems", [...currentItems, { product: "", quantity: "", unit: "kg" }]);
  };

  const removeOrderItem = (index: number) => {
    const currentItems = form.getValues("orderItems");
    form.setValue("orderItems", currentItems.filter((_, i) => i !== index));
  };

  const nextStep = async () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = await form.trigger("orderItems");
    } else if (step === 2) {
      isValid = await form.trigger(["pickupDate", "pickupTime"]);
    }
    
    if (isValid) {
      setStep(step + 1);
    }
  };

  const sendWhatsAppConfirmation = (data: OrderFormValues) => {
    // Shop's WhatsApp number (format: country code + number without + or spaces)
    const shopWhatsAppNumber = "32466186457"; // Belgium number
    
    // Build order details message
    const orderDetails = data.orderItems
      .map((item, index) => `${index + 1}. ${item.product} - ${item.quantity} ${item.unit}`)
      .join('\n');
    
    const message = `🥩 *Nieuwe Bestelling - Slagerij John*\n\n` +
      `*Klantgegevens:*\n` +
      `Naam: ${data.customerName}\n` +
      `Telefoon: ${data.customerPhone}\n` +
      `Email: ${data.customerEmail}\n\n` +
      `*Bestelde producten:*\n${orderDetails}\n\n` +
      `*Afhaalgegevens:*\n` +
      `Datum: ${format(data.pickupDate, "dd-MM-yyyy")}\n` +
      `Tijd: ${data.pickupTime}\n` +
      (data.notes ? `\n*Opmerkingen:*\n${data.notes}` : '');
    
    // Create WhatsApp link with encoded message
    const whatsappUrl = `https://wa.me/${shopWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab (use location.href for better compatibility)
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      // Fallback if popup blocked
      window.location.href = whatsappUrl;
    }
  };

  const handleSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("orders").insert({
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        customer_email: data.customerEmail,
        order_items: data.orderItems,
        pickup_date: format(data.pickupDate, "yyyy-MM-dd"),
        pickup_time: data.pickupTime,
        notes: data.notes || null,
        status: "pending",
      });

      if (error) throw error;

      // Track order submission
      trackOrderSubmit({
        items: data.orderItems.length,
        pickupDate: format(data.pickupDate, "yyyy-MM-dd"),
      });

      toast({
        title: t('order.success.title'),
        description: "Uw bestelling is succesvol geplaatst! We nemen spoedig contact met u op.",
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: t('order.error.title'),
        description: "Er is iets misgegaan. Probeer het opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbData = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Bestel Online', url: '/order' }
  ]);

  return (
    <div className="min-h-screen py-12">
      <SEO 
        title="Bestel Online"
        description="Bestel gemakkelijk online bij Slagerij John. Kies uw producten, selecteer een afhaaltijd en haal uw bestelling af in onze winkel in Zwevezele."
        keywords="online bestellen, vlees bestellen, afhalen, bestelformulier, Zwevezele"
        structuredData={breadcrumbData}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-primary">
            {t('order.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('order.subtitle')}
          </p>
        </div>

        {/* Delivery Information */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-primary">
              {t('order.delivery.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground font-medium">
              {t('order.delivery.intro')}
            </p>
            
            <div className="space-y-3">
              <div className="border-l-4 border-primary pl-4">
                <p className="font-semibold text-lg">{t('order.delivery.minimum')}</p>
                <p className="text-muted-foreground">{t('order.delivery.tier1.free')}</p>
                <p className="text-muted-foreground">{t('order.delivery.tier1.paid')}</p>
              </div>
              
              <div className="border-l-4 border-accent pl-4">
                <p className="font-semibold text-lg">{t('order.delivery.minimum100')}</p>
                <p className="text-muted-foreground">{t('order.delivery.tier2.free')}</p>
                <p className="text-muted-foreground">{t('order.delivery.tier2.paid')}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <p className="font-medium">{t('order.delivery.schedule')}</p>
              <p className="font-medium">
                {t('order.delivery.phone')} <a href="tel:+32466186457" className="text-primary hover:underline">+32 466 18 64 57</a>
              </p>
              <p className="text-sm text-muted-foreground">{t('order.delivery.address')}</p>
              <p className="text-sm italic text-primary font-medium">{t('order.delivery.tagline')}</p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > s ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* Step 1: Select Products */}
            {step === 1 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif flex items-center">
                    <ShoppingCart className="w-6 h-6 mr-2 text-primary" />
                    {t('order.step1.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {orderItems.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-border rounded-lg">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`orderItems.${index}.product`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('order.product.label')}</FormLabel>
                              <FormControl>
                                <select
                                  className="w-full p-2 border border-input rounded-md bg-background"
                                  {...field}
                                >
                                  <option value="">{t('order.product.placeholder')}</option>
                                  {productOptions.map((product) => (
                                    <option key={product.key} value={product.label}>{product.label}</option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name={`orderItems.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('order.quantity.label')}</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.1" min="0" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`orderItems.${index}.unit`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <select
                                    className="w-full p-2 border border-input rounded-md bg-background"
                                    {...field}
                                  >
                                    <option value="kg">{t('order.unit.kg')}</option>
                                    <option value="stuks">{t('order.unit.pieces')}</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {orderItems.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeOrderItem(index)}
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addOrderItem} className="w-full">
                    {t('order.addProduct')}
                  </Button>
                  <Button type="button" onClick={nextStep} className="w-full" size="lg">
                    {t('order.nextStep')}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Select Pickup Time */}
            {step === 2 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif flex items-center">
                    <CalendarIcon className="w-6 h-6 mr-2 text-primary" />
                    {t('order.step2.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="pickupDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{t('order.pickupDate.label')}</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP", { locale: nl }) : t('order.pickupDate.placeholder')}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pickupTime"
                    render={({ field }) => {
                      const selectedDate = form.watch("pickupDate");
                      const isSunday = selectedDate && selectedDate.getDay() === 0;
                      
                      return (
                        <FormItem>
                          <FormLabel>{t('order.pickupTime.label')}</FormLabel>
                          <FormControl>
                            <select
                              className="w-full p-2 border border-input rounded-md bg-background"
                              {...field}
                            >
                              <option value="">{t('order.pickupTime.placeholder')}</option>
                              {isSunday ? (
                                <>
                                  <option value="08:00">08:00</option>
                                  <option value="09:00">09:00</option>
                                  <option value="10:00">10:00</option>
                                  <option value="11:00">11:00</option>
                                  <option value="12:00">12:00</option>
                                  <option value="13:00">13:00</option>
                                </>
                              ) : (
                                <>
                                  <option value="09:00">09:00</option>
                                  <option value="10:00">10:00</option>
                                  <option value="11:00">11:00</option>
                                  <option value="12:00">12:00</option>
                                  <option value="14:00">14:00</option>
                                  <option value="15:00">15:00</option>
                                  <option value="16:00">16:00</option>
                                  <option value="17:00">17:00</option>
                                </>
                              )}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      {t('order.back')}
                    </Button>
                    <Button type="button" onClick={nextStep} className="flex-1">
                      {t('order.nextStep')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Customer Information */}
            {step === 3 && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">{t('order.step3.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('order.name.label')}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('order.phone.label')}</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('order.email.label')}</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('order.notes.label')}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder={t('order.notes.placeholder')}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                      {t('order.back')}
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Bezig met verzenden...
                        </>
                      ) : (
                        t('order.placeOrder')
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Order;

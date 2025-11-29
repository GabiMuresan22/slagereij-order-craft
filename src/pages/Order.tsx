import { useState, useEffect } from "react";
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
import { CalendarIcon, ShoppingCart, Loader2, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { trackOrderSubmit } from "@/components/Analytics";
import SEO from "@/components/SEO";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { businessHours } from "@/hooks/useBusinessHours";

interface OrderItem {
  product: string;
  quantity: string;
  unit: string;
  price?: number;
}

interface Product {
  key: string;
  name_nl: string;
  name_ro: string;
  price: number;
  unit: string;
}

// Helper function to generate time slots based on opening hours
const generateTimeSlots = (startHour: number, startMin: number, endHour: number, endMin: number): string[] => {
  const slots: string[] = [];
  let currentHour = startHour;
  let currentMin = startMin;
  
  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    slots.push(`${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`);
    currentMin += 30;
    if (currentMin >= 60) {
      currentMin = 0;
      currentHour += 1;
    }
  }
  
  return slots;
};

// Generate time slots for a specific day based on business hours
const getTimeSlotsForDay = (dayOfWeek: number): string[] => {
  const hours = businessHours[dayOfWeek];
  if (!hours) return [];
  
  const [startHour, startMin] = hours.open.split(':').map(Number);
  const [endHour, endMin] = hours.close.split(':').map(Number);
  
  return generateTimeSlots(startHour, startMin, endHour, endMin);
};

// Create schemas dynamically with translations
const createOrderSchemas = (t: (key: string) => string) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  
  const orderItemSchema = z.object({
    product: z.string().min(1, t('order.validation.selectProduct')),
    quantity: z.string()
      .min(1, t('order.validation.enterQuantity'))
      .refine((val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num > 0 && num <= 1000;
      }, { message: t('order.validation.quantityInvalid') || 'Quantity must be between 0.1 and 1000' }),
    unit: z.string().min(1, t('order.validation.selectUnit')),
    price: z.number().optional(),
  });

  const orderFormSchema = z.object({
    deliveryMethod: z.enum(['pickup', 'delivery']),
    orderItems: z.array(orderItemSchema).min(1, t('order.validation.addProduct')).max(50),
    pickupDate: z.date({ message: t('order.validation.selectDate') }),
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
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [customItems, setCustomItems] = useState<Set<number>>(new Set());

  // Fetch products with prices from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('available', true)
          .order('key');
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const { orderFormSchema } = createOrderSchemas(t);
  type OrderFormValues = z.infer<typeof orderFormSchema>;

  // Get product options with prices
  const productOptions = products.map(p => ({
    key: p.key,
    label: language === 'nl' ? p.name_nl : p.name_ro,
    price: p.price,
    unit: p.unit
  }));

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      deliveryMethod: "pickup",
      orderItems: [{ product: "", quantity: "", unit: "kg" }],
      pickupTime: "",
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      notes: "",
    },
  });

  const orderItems = form.watch("orderItems");

  // Calculate order total for all products
  const calculateTotal = () => {
    const items = form.getValues("orderItems");
    return items.reduce((total, item) => {
      if (!item.product || !item.quantity) return total;
      const product = products.find(p => p.key === item.product);
      if (!product) return total;
      const quantity = parseFloat(item.quantity) || 0;
      return total + (product.price * quantity);
    }, 0);
  };

  const orderTotal = calculateTotal();

  const addOrderItem = () => {
    const currentItems = form.getValues("orderItems");
    form.setValue("orderItems", [...currentItems, { product: "", quantity: "", unit: "kg" }]);
  };

  const removeOrderItem = (index: number) => {
    const currentItems = form.getValues("orderItems");
    form.setValue("orderItems", currentItems.filter((_, i) => i !== index));
    
    // Remove from custom items set and adjust indices
    setCustomItems(prev => {
      const newSet = new Set<number>();
      prev.forEach(itemIndex => {
        if (itemIndex < index) {
          newSet.add(itemIndex);
        } else if (itemIndex > index) {
          newSet.add(itemIndex - 1);
        }
        // Skip the removed index
      });
      return newSet;
    });
  };

  const nextStep = async () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = await form.trigger(["deliveryMethod", "orderItems"]);
    } else if (step === 2) {
      isValid = await form.trigger(["pickupDate", "pickupTime"]);
    }
    
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Add prices to order items before saving
      const orderItemsWithPrices = data.orderItems.map(item => {
        const product = products.find(p => p.key === item.product);
        return {
          ...item,
          price: product?.price || 0
        };
      });

      // Generate a UUID for the order on the client side
      // This ensures we have an order ID even if the RLS policy prevents returning the inserted row
      // Using crypto.randomUUID() which is supported in all modern browsers (Chrome 92+, Firefox 95+, Safari 15.4+)
      const orderId = crypto.randomUUID();
      
      // Get the latest user state directly from Supabase to ensure it matches the database session
      // This prevents race conditions where React state might be stale
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      // Use this fresh ID - if user is logged in, use their ID; otherwise null for guest orders
      const userIdToSave = currentUser?.id || null;
      
      const { error } = await supabase.from("orders").insert({
        id: orderId,
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        customer_email: data.customerEmail,
        order_items: orderItemsWithPrices,
        pickup_date: format(data.pickupDate, "yyyy-MM-dd"),
        pickup_time: data.pickupTime,
        notes: data.notes || null,
        status: "pending",
        user_id: userIdToSave,
        language: language,
      });

      if (error) throw error;

      // Send confirmation email via Edge Function
      let emailFailed = false;
      try {
        await supabase.functions.invoke('send-order-status-email', {
          body: {
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            orderId: orderId,
            status: "pending",
            orderItems: orderItemsWithPrices,
            pickupDate: format(data.pickupDate, "dd-MM-yyyy"),
            pickupTime: data.pickupTime,
            language: language,
          }
        });
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
        emailFailed = true;
      }

      trackOrderSubmit({
        items: data.orderItems.length,
        pickupDate: format(data.pickupDate, "yyyy-MM-dd"),
      });

      // Show appropriate toast based on email status
      if (emailFailed) {
        toast({
          title: t('order.success.title'),
          description: t('order.success.emailFailed'),
        });
      } else {
        toast({
          title: t('order.success.title'),
          description: t('order.success.description'),
        });
      }

      setStep(4);
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: t('order.error.title'),
        description: t('order.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingProducts) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={t('order.seo.title')}
        description={t('order.seo.description')}
        keywords="online bestellen, vlees bestellen, bestelformulier, Zwevezele"
        structuredData={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Bestellen", url: "/order" }
        ])}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">{t('order.title')}</h1>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s === 4 && step === 4 ? <CheckCircle2 className="h-6 w-6" /> : s}
                </div>
                <span className="text-sm mt-2">
                  {s === 1 && t('order.steps.products')}
                  {s === 2 && t('order.steps.pickup')}
                  {s === 3 && t('order.steps.contact')}
                  {s === 4 && t('order.steps.confirm')}
                </span>
              </div>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Step 1: Product Selection */}
              {step === 1 && (
                <>
                  {/* Delivery Information Card */}
                  <Card className="bg-card/80 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-center flex items-center justify-center gap-2">
                        📍 {t('order.deliveryInfo.title')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-w-md mx-auto">
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-semibold">•</span>
                            <span>{t('order.deliveryInfo.minimum')}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-semibold">•</span>
                            <span>{t('order.deliveryInfo.freeUnder10')}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-semibold">•</span>
                            <span>{t('order.deliveryInfo.over10')}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-semibold">•</span>
                            <span>{t('order.deliveryInfo.freeOver100')}</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary font-semibold">•</span>
                            <span>{t('order.deliveryInfo.schedule')}</span>
                          </li>
                          <li className="flex items-start gap-2 pt-2">
                            <span className="text-primary">📞</span>
                            <a href="tel:+32466186457" className="hover:text-primary transition-colors">+32 466 18 64 57</a>
                          </li>
                        </ul>
                      </div>
                      
                      {/* Address */}
                      <div className="mt-6 pt-4 border-t border-border text-center text-sm">
                        <p className="flex items-center justify-center gap-2">
                          <span>📍</span>
                          <span>{t('order.deliveryInfo.address')}</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Products Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        {t('order.steps.products')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Delivery Method Toggle */}
                      <FormField
                        control={form.control}
                        name="deliveryMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-bold">
                              {t('order.method.label')}
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
                                <div>
                                  <RadioGroupItem
                                    value="pickup"
                                    id="pickup"
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor="pickup"
                                    className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground cursor-pointer transition-all"
                                  >
                                    <div className="text-2xl mb-2">🏪</div>
                                    <div className="font-bold text-base">{t('order.method.pickup.title')}</div>
                                    <div className="text-sm opacity-80">{t('order.method.pickup.location')}</div>
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem
                                    value="delivery"
                                    id="delivery"
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor="delivery"
                                    className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground cursor-pointer transition-all"
                                  >
                                    <div className="text-2xl mb-2">🚗</div>
                                    <div className="font-bold text-base">{t('order.method.delivery.title')}</div>
                                    <div className="text-sm opacity-80">{t('order.method.delivery.location')}</div>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Product Selection */}
                    {orderItems.map((item, index) => {
                      const isCustomItem = customItems.has(index);
                      
                      return (
                        <div key={index} className="flex gap-3 items-end pb-4 border-b last:border-0">
                          <FormField
                            control={form.control}
                            name={`orderItems.${index}.product`}
                            render={({ field }) => {
                              const selectedProduct = productOptions.find(p => p.key === field.value);
                              
                              const handleToggleCustom = (e: React.MouseEvent) => {
                                e.preventDefault();
                                if (isCustomItem) {
                                  // Switch back to dropdown mode and clear textarea
                                  setCustomItems(prev => {
                                    const newSet = new Set(prev);
                                    newSet.delete(index);
                                    return newSet;
                                  });
                                  field.onChange('');
                                } else {
                                  // Switch to custom textarea mode
                                  setCustomItems(prev => new Set(prev).add(index));
                                  field.onChange('');
                                }
                              };
                              
                              const handleProductChange = (value: string) => {
                                field.onChange(value);
                              };
                              
                              return (
                                <FormItem className="flex-1">
                                  <div className="flex justify-between items-center mb-2">
                                    <FormLabel className="font-bold">{t('order.form.product')}</FormLabel>
                                    <button
                                      type="button"
                                      onClick={handleToggleCustom}
                                      className="text-[#FFC107] hover:underline transition-all cursor-pointer font-normal"
                                      style={{ fontSize: '0.85rem', textDecoration: 'none' }}
                                    >
                                      {isCustomItem ? t('order.form.backToMenu') : t('order.form.customProductToggle')}
                                    </button>
                                  </div>
                                  <div className="relative min-h-[40px]">
                                    {isCustomItem ? (
                                      <FormControl>
                                        <Textarea
                                          placeholder={t('order.form.customProductPlaceholder')}
                                          value={field.value}
                                          onChange={(e) => field.onChange(e.target.value)}
                                          rows={3}
                                          className="border-[#FFC107] focus-visible:ring-[#FFC107] focus-visible:border-[#FFC107] transition-all duration-200 fade-in"
                                          style={{
                                            borderColor: '#FFC107',
                                          }}
                                        />
                                      </FormControl>
                                    ) : (
                                      <div className="space-y-1 fade-in">
                                        <Select onValueChange={handleProductChange} value={field.value}>
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder={t('order.form.selectProduct')} />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            {productOptions.map((option) => (
                                              <SelectItem key={option.key} value={option.key}>
                                                <div className="flex justify-between items-center gap-4 w-full">
                                                  <span className="font-medium">{option.label}</span>
                                                  {option.price && (
                                                    <span className="text-sm font-semibold text-primary whitespace-nowrap">
                                                      €{option.price.toFixed(2)}/{option.unit}
                                                    </span>
                                                  )}
                                                </div>
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                        {selectedProduct && selectedProduct.price && (
                                          <p className="text-xs text-muted-foreground mt-1">
                                            {t('order.form.price')}: €{selectedProduct.price.toFixed(2)} per {selectedProduct.unit}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />

                        <FormField
                          control={form.control}
                          name={`orderItems.${index}.quantity`}
                          render={({ field }) => {
                            const item = orderItems[index];
                            const product = products.find(p => p.key === item?.product);
                            const itemTotal = product && item?.quantity 
                              ? (product.price * parseFloat(item.quantity || '0')).toFixed(2)
                              : '0.00';
                            
                            return (
                              <FormItem className="w-32">
                                <FormLabel>{t('order.form.quantity')}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.1"
                                    min="0.1"
                                    max="1000"
                                    placeholder="1.0"
                                    {...field}
                                  />
                                </FormControl>
                                {product && item?.quantity && parseFloat(item.quantity) > 0 && (
                                  <p className="text-xs font-semibold text-primary">
                                    €{itemTotal}
                                  </p>
                                )}
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />

                        <FormField
                          control={form.control}
                          name={`orderItems.${index}.unit`}
                          render={({ field }) => (
                            <FormItem className="w-24">
                              <FormLabel>{t('order.form.unit')}</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="kg">kg</SelectItem>
                                  <SelectItem value="stuks">stuks</SelectItem>
                                  <SelectItem value="stuk">stuk</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {orderItems.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeOrderItem(index)}
                            className="mb-2"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    );
                  })}

                    <div className="space-y-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addOrderItem}
                        className="w-full"
                      >
                        {t('order.form.addItem')}
                      </Button>

                      {orderTotal > 0 && (
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">{t('order.total') || 'Totaal'}:</span>
                            <span className="text-2xl font-bold text-primary">
                              €{orderTotal.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button type="button" onClick={nextStep} className="w-full" size="lg">
                      {t('order.form.continue')}
                    </Button>
                  </CardContent>
                </Card>
                </>
              )}

              {/* Step 2: Pickup Date & Time */}
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      {t('order.steps.pickup')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="pickupDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>{t('order.form.pickupDate')}</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={`w-full pl-3 text-left font-normal ${
                                    !field.value && "text-muted-foreground"
                                  }`}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: nl })
                                  ) : (
                                    <span>{t('order.form.selectDate')}</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
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
                        const timeSlots = selectedDate ? getTimeSlotsForDay(selectedDate.getDay()) : [];

                        return (
                          <FormItem>
                            <FormLabel>{t('order.form.pickupTime')}</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t('order.form.selectTime')} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                        {t('order.form.back')}
                      </Button>
                      <Button type="button" onClick={nextStep} className="flex-1">
                        {t('order.form.continue')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Customer Information */}
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('order.steps.contact')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('order.form.name')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('order.form.namePlaceholder')} {...field} />
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
                          <FormLabel>{t('order.form.phone')}</FormLabel>
                          <FormControl>
                            <Input placeholder="+32 XXX XX XX XX" {...field} />
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
                          <FormLabel>{t('order.form.email')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="naam@voorbeeld.be" {...field} />
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
                          <FormLabel>{t('order.form.notes')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t('order.form.notesPlaceholder')}
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                        {t('order.form.back')}
                      </Button>
                      <Button type="submit" className="flex-1" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t('order.form.submitting')}
                          </>
                        ) : (
                          t('order.form.submit')
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <Card>
                  <CardHeader>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="rounded-full bg-green-100 p-6">
                        <CheckCircle2 className="h-16 w-16 text-green-600" />
                      </div>
                      <CardTitle className="text-2xl">{t('order.success.title')}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 text-center">
                    <p className="text-muted-foreground">
                      {t('order.success.description')}
                    </p>
                    
                    {orderTotal > 0 && (
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm font-semibold mb-2">{t('order.success.orderTotal')}:</p>
                        <p className="text-3xl font-bold text-primary">€{orderTotal.toFixed(2)}</p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Button
                        type="button"
                        onClick={() => navigate('/')}
                        className="w-full"
                      >
                        {t('order.success.backToHome')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Order;

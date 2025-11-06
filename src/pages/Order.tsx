import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ShoppingCart } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useLanguage } from "@/contexts/LanguageContext";

interface OrderItem {
  product: string;
  quantity: string;
  unit: string;
}

const Order = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { product: "", quantity: "", unit: "kg" }
  ]);
  const [pickupDate, setPickupDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  const productOptions = [
    "Biefstuk",
    "Rosbief", 
    "Gehakt (rund)",
    "Stoofvlees",
    "Varkenshaas",
    "Koteletten",
    "Gehakt (varken)",
    "Braadworst",
    "Hele kip",
    "Kipfilet",
    "Kippendijen",
    "Huisgemaakte worst",
    "Gehaktballen",
    "BBQ pakket"
  ];

  const addOrderItem = () => {
    setOrderItems([...orderItems, { product: "", quantity: "", unit: "kg" }]);
  };

  const removeOrderItem = (index: number) => {
    const newItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(newItems);
  };

  const updateOrderItem = (index: number, field: keyof OrderItem, value: string) => {
    const newItems = [...orderItems];
    newItems[index][field] = value;
    setOrderItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (step === 1) {
      const hasValidItems = orderItems.some(item => item.product && item.quantity);
      if (!hasValidItems) {
        toast({
          title: "Fout",
          description: "Voeg minimaal één product toe aan uw bestelling",
          variant: "destructive"
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!pickupDate || !pickupTime) {
        toast({
          title: "Fout",
          description: "Selecteer een afhaaldatum en tijd",
          variant: "destructive"
        });
        return;
      }
      setStep(3);
    } else {
      if (!customerInfo.name || !customerInfo.phone || !customerInfo.email) {
        toast({
          title: "Fout",
          description: "Vul alle verplichte velden in",
          variant: "destructive"
        });
        return;
      }
      
      // Here you would normally send the order to a backend
      toast({
        title: "Bestelling Ontvangen!",
        description: "We nemen zo snel mogelijk contact met u op ter bevestiging.",
      });
      
      // Reset form
      setOrderItems([{ product: "", quantity: "", unit: "kg" }]);
      setPickupDate(undefined);
      setPickupTime("");
      setCustomerInfo({ name: "", phone: "", email: "", notes: "" });
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen py-12">
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

        <form onSubmit={handleSubmit}>
          {/* Step 1: Select Products */}
          {step === 1 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-serif flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2 text-primary" />
                  Selecteer Producten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {orderItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-border rounded-lg">
                    <div className="md:col-span-2">
                      <Label>Product</Label>
                      <select
                        className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                        value={item.product}
                        onChange={(e) => updateOrderItem(index, "product", e.target.value)}
                      >
                        <option value="">Selecteer een product</option>
                        {productOptions.map((product) => (
                          <option key={product} value={product}>{product}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Aantal</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => updateOrderItem(index, "quantity", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-end">
                      <select
                        className="w-full p-2 border border-input rounded-md bg-background"
                        value={item.unit}
                        onChange={(e) => updateOrderItem(index, "unit", e.target.value)}
                      >
                        <option value="kg">kg</option>
                        <option value="stuks">stuks</option>
                      </select>
                      {orderItems.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeOrderItem(index)}
                          className="ml-2"
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addOrderItem} className="w-full">
                  + Voeg Product Toe
                </Button>
                <Button type="submit" className="w-full" size="lg">
                  Volgende Stap
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
                  Kies Afhaaltijd
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Afhaaldatum</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal mt-1"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickupDate ? format(pickupDate, "PPP", { locale: nl }) : "Selecteer datum"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={pickupDate}
                        onSelect={setPickupDate}
                        disabled={(date) => 
                          date < new Date() || date.getDay() === 0
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Afhaaltijd</Label>
                  <select
                    className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  >
                    <option value="">Selecteer tijd</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Terug
                  </Button>
                  <Button type="submit" className="flex-1">
                    Volgende Stap
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Customer Information */}
          {step === 3 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Contactgegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Naam *</Label>
                  <Input
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label>Telefoonnummer *</Label>
                  <Input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label>Opmerkingen (optioneel)</Label>
                  <Textarea
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                    className="mt-1"
                    rows={4}
                    placeholder="Speciale wensen of opmerkingen..."
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Terug
                  </Button>
                  <Button type="submit" className="flex-1">
                    Bestelling Plaatsen
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
};

export default Order;

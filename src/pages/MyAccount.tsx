import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Package, Settings } from "lucide-react";
import { toast } from "sonner";
import { Navigate, Link } from "react-router-dom";
import SEO from "@/components/SEO";

interface Profile {
  id: string;
  full_name: string | null;
  created_at: string;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  order_items: any;
  pickup_date: string;
  pickup_time: string;
  status: string;
  created_at: string;
  notes: string | null;
}

const MyAccount = () => {
  const { user, loading } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [fullName, setFullName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchOrders();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = (await supabase.from("profiles").select("*").eq("id", user.id).single()) as any;

    if (error) {
      if (import.meta.env.DEV) console.error("Error fetching profile:", error);
      return;
    }

    setProfile(data);
    setFullName(data?.full_name || "");
  };

  const fetchOrders = async () => {
    if (!user) return;

    setLoadingOrders(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      if (import.meta.env.DEV) console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } else {
      setOrders(data || []);
    }
    setLoadingOrders(false);
  };

  const updateProfile = async () => {
    if (!user) return;

    setIsUpdating(true);
    const { error } = (await supabase
      .from("profiles")
      .update({ full_name: fullName } as any)
      .eq("id", user.id)) as any;

    if (error) {
      toast.error("Failed to update profile");
      if (import.meta.env.DEV) console.error("Error updating profile:", error);
    } else {
      toast.success(t('auth.success.profileUpdated'));
      fetchProfile();
    }
    setIsUpdating(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      pending: "secondary",
      processing: "default",
      ready: "outline",
      completed: "outline",
      cancelled: "destructive",
    };

    return <Badge variant={variants[status] || "default"}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>{t("account.loading")}</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <SEO title={t("account.title") + " - Slager John"} description={t("account.profile.description")} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 md:mb-8">{t("account.title")}</h1>

          <Tabs defaultValue="profile" className="space-y-6 md:space-y-8">
            <TabsList className="grid w-full grid-cols-3 gap-2 mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{t("account.tabs.profile")}</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">{t("account.tabs.orders")}</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">{t("account.tabs.settings")}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>{t("account.profile.title")}</CardTitle>
                  <CardDescription>{t("account.profile.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6 p-6 md:p-8">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="mb-1">{t("account.profile.email")}</Label>
                    <Input id="email" type="email" value={user.email || ""} disabled className="bg-muted" />
                    <p className="text-sm text-muted-foreground mt-1">{t("account.profile.emailNote")}</p>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="fullName" className="mb-1">{t("account.profile.fullName")}</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t("account.profile.fullNamePlaceholder")}
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>{t("account.profile.memberSince")}</Label>
                    <Input
                      type="text"
                      value={profile ? new Date(profile.created_at).toLocaleDateString() : ""}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <Separator className="my-6 md:my-8" />

                  <Button onClick={updateProfile} disabled={isUpdating} className="mt-6 md:mt-8">
                    {isUpdating ? t("account.profile.updating") : t("account.profile.update")}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>{t("account.orders.title")}</CardTitle>
                  <CardDescription>{t("account.orders.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingOrders ? (
                    <p className="text-center py-8">{t("account.orders.loading")}</p>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-2">{t("account.orders.noOrders")}</p>
                      <p className="text-muted-foreground mb-4">{t("account.orders.noOrdersText")}</p>
                      <Button asChild>
                        <Link to="/order">{t("account.orders.placeFirst")}</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t("account.orders.orderDate")}</TableHead>
                            <TableHead>{t("account.orders.pickupDate")}</TableHead>
                            <TableHead>{t("account.orders.pickupTime")}</TableHead>
                            <TableHead>{t("account.orders.status")}</TableHead>
                            <TableHead className="text-right">{t("account.orders.items")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>{new Date(order.pickup_date).toLocaleDateString()}</TableCell>
                              <TableCell>{order.pickup_time}</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell className="text-right">
                                {Array.isArray(order.order_items) ? order.order_items.length : 0}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>{t("account.settings.title")}</CardTitle>
                  <CardDescription>{t("account.settings.description")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">{t("account.settings.security")}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{t("account.settings.securityText")}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">{t("account.settings.notifications")}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{t("account.settings.notificationsText")}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2 text-destructive">{t("account.settings.danger")}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {t("account.settings.dangerText")}{" "}
                        <a href="mailto:info@slagerij-john.nl" className="underline">
                          contact@slagerij-john.be
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default MyAccount;

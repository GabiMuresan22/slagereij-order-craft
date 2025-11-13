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

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    setProfile(data);
    setFullName(data.full_name || "");
  };

  const fetchOrders = async () => {
    if (!user) return;

    setLoadingOrders(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', user.email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } else {
      setOrders(data || []);
    }
    setLoadingOrders(false);
  };

  const updateProfile = async () => {
    if (!user) return;

    setIsUpdating(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', user.id);

    if (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } else {
      toast.success('Profile updated successfully');
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

    return (
      <Badge variant={variants[status] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <SEO 
        title="My Account - Slager John"
        description="Manage your account and view order history"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">My Account</h1>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    View and update your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={user.email || ""} 
                      disabled 
                      className="bg-muted"
                    />
                    <p className="text-sm text-muted-foreground">
                      Email address cannot be changed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Member Since</Label>
                    <Input 
                      type="text" 
                      value={profile ? new Date(profile.created_at).toLocaleDateString() : ""} 
                      disabled 
                      className="bg-muted"
                    />
                  </div>

                  <Separator />

                  <Button 
                    onClick={updateProfile} 
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    View all your past and current orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingOrders ? (
                    <p className="text-center py-8">Loading orders...</p>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-2">No orders yet</p>
                      <p className="text-muted-foreground mb-4">
                        You haven't placed any orders yet
                      </p>
                      <Button asChild>
                        <Link to="/order">Place Your First Order</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Pickup Date</TableHead>
                            <TableHead>Pickup Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Items</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>
                                {new Date(order.created_at).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {new Date(order.pickup_date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{order.pickup_time}</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell className="text-right">
                                {Array.isArray(order.order_items) 
                                  ? order.order_items.length 
                                  : 0}
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
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Account Security</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        To change your password or update security settings, please contact support.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2">Notifications</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        You will receive email notifications about your order status updates.
                      </p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-2 text-destructive">
                        Danger Zone
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        To delete your account, please contact us at{" "}
                        <a href="mailto:info@slagerij-john.nl" className="underline">
                          info@slagerij-john.nl
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

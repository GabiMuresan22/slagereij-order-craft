import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, PackageCheck, Clock, CheckCircle2, XCircle, Phone, Mail, Calendar, StickyNote, MessageCircle, Settings, Printer } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface OrderItem {
  product: string;
  quantity: string;
  unit: string;
  price?: number;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  order_items: OrderItem[];
  pickup_date: string;
  pickup_time: string;
  notes?: string | null;
  status: string;
  created_at: string;
}

const statusColors = {
  pending: 'bg-yellow-500',
  confirmed: 'bg-blue-500',
  ready: 'bg-green-500',
  completed: 'bg-gray-500',
  cancelled: 'bg-red-500',
};

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle2,
  ready: PackageCheck,
  completed: CheckCircle2,
  cancelled: XCircle,
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [templates, setTemplates] = useState<Record<string, string>>({});
  const [whatsappDialog, setWhatsappDialog] = useState<{ open: boolean; order: Order | null; message: string }>({
    open: false,
    order: null,
    message: ''
  });

  // Fetch templates
  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('whatsapp_templates')
        .select('*');

      if (error) throw error;

      const templatesMap: Record<string, string> = {};
      data?.forEach((template: any) => {
        templatesMap[template.status] = template.message_template;
      });
      setTemplates(templatesMap);
    } catch (error: any) {
      console.error('Error fetching templates:', error);
    }
  };

  // Fetch orders
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load orders');
        console.error('Error fetching orders:', error);
      } else {
        // Cast order_items from Json to our OrderItem[] type
        const typedOrders = (data || []).map(order => ({
          ...order,
          order_items: order.order_items as unknown as OrderItem[]
        }));
        setOrders(typedOrders);
      }
      setLoading(false);
    };

    fetchOrders();
    fetchTemplates();
  }, [user]);

  // Set up real-time updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newOrder = {
              ...(payload.new as any),
              order_items: (payload.new as any).order_items as OrderItem[]
            };
            setOrders((prev) => [newOrder, ...prev]);
            toast.success('New order received!');
          } else if (payload.eventType === 'UPDATE') {
            const updatedOrder = {
              ...(payload.new as any),
              order_items: (payload.new as any).order_items as OrderItem[]
            };
            setOrders((prev) =>
              prev.map((order) =>
                order.id === updatedOrder.id ? updatedOrder : order
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setOrders((prev) => prev.filter((order) => order.id !== (payload.old as any).id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) throw new Error('Order not found');

      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Send email notification
      try {
        await supabase.functions.invoke('send-order-status-email', {
          body: {
            customerName: order.customer_name,
            customerEmail: order.customer_email,
            orderId: order.id,
            status: newStatus,
            orderItems: order.order_items,
            pickupDate: new Date(order.pickup_date).toLocaleDateString(),
            pickupTime: order.pickup_time,
          },
        });
        console.log('Status update email sent');
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Don't fail the status update if email fails
      }

      toast.success('Order status updated successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update order status');
      console.error('Error updating order:', error);
    }
  };

  // Open WhatsApp dialog with pre-filled message
  const openWhatsAppDialog = (order: Order) => {
    // Get template or use fallback
    const template = templates[order.status] || templates['default'] || 'Hallo {customer_name}, een update over uw bestelling bij Slagerij John.';
    
    // Replace placeholders
    const message = template
      .replace(/{customer_name}/g, order.customer_name)
      .replace(/{pickup_date}/g, format(new Date(order.pickup_date), 'dd/MM/yyyy'))
      .replace(/{pickup_time}/g, order.pickup_time);
    
    setWhatsappDialog({
      open: true,
      order,
      message
    });
  };

  // Send WhatsApp message with custom text
  const sendWhatsAppMessage = () => {
    if (!whatsappDialog.order) return;
    
    // Strip non-numeric characters
    let cleanPhone = whatsappDialog.order.customer_phone.replace(/[^0-9]/g, '');
    
    // Handle Belgian phone number formatting
    if (cleanPhone.startsWith('00')) {
      cleanPhone = cleanPhone.substring(2);
    } else if (cleanPhone.startsWith('0')) {
      cleanPhone = '32' + cleanPhone.substring(1);
    } else if (!cleanPhone.startsWith('32')) {
      cleanPhone = '32' + cleanPhone;
    }
    
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappDialog.message)}`;
    window.open(url, '_blank');
    
    // Close dialog
    setWhatsappDialog({ open: false, order: null, message: '' });
  };

  const updateTemplate = async (status: string, messageTemplate: string) => {
    try {
      const { error } = await supabase
        .from('whatsapp_templates')
        .update({ message_template: messageTemplate })
        .eq('status', status);

      if (error) throw error;

      toast.success('Template updated successfully');
      setTemplates(prev => ({ ...prev, [status]: messageTemplate }));
    } catch (error: any) {
      toast.error(error.message || 'Failed to update template');
      console.error('Error updating template:', error);
    }
  };

  const printOrder = (order: Order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to print orders');
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order #${order.id.slice(0, 8)}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              color: #000;
            }
            h1 {
              text-align: center;
              color: #8B4513;
              margin-bottom: 30px;
            }
            .section {
              margin-bottom: 30px;
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 8px;
            }
            .section h2 {
              margin-top: 0;
              color: #8B4513;
              font-size: 18px;
              border-bottom: 2px solid #8B4513;
              padding-bottom: 10px;
            }
            .info-row {
              display: flex;
              margin-bottom: 10px;
            }
            .info-label {
              font-weight: bold;
              width: 150px;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            .items-table th,
            .items-table td {
              padding: 10px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            .items-table th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            .status-badge {
              display: inline-block;
              padding: 5px 15px;
              border-radius: 20px;
              font-weight: bold;
              text-transform: uppercase;
            }
            .status-pending { background-color: #fef3c7; color: #92400e; }
            .status-confirmed { background-color: #dbeafe; color: #1e40af; }
            .status-ready { background-color: #d1fae5; color: #065f46; }
            .status-completed { background-color: #e5e7eb; color: #374151; }
            .status-cancelled { background-color: #fee2e2; color: #991b1b; }
            @media print {
              body { margin: 0; padding: 20px; }
            }
          </style>
        </head>
        <body>
          <h1>Slagerij John - Order Details</h1>
          
          <div class="section">
            <h2>Order Information</h2>
            <div class="info-row">
              <span class="info-label">Order ID:</span>
              <span>#${order.id.slice(0, 8)}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Order Date:</span>
              <span>${format(new Date(order.created_at), 'dd/MM/yyyy HH:mm')}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Status:</span>
              <span class="status-badge status-${order.status}">${order.status}</span>
            </div>
          </div>

          <div class="section">
            <h2>Customer Information</h2>
            <div class="info-row">
              <span class="info-label">Name:</span>
              <span>${order.customer_name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone:</span>
              <span>${order.customer_phone}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span>${order.customer_email}</span>
            </div>
          </div>

          <div class="section">
            <h2>Order Items</h2>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                ${order.order_items.map(item => `
                  <tr>
                    <td>${item.product}</td>
                    <td>${item.quantity} ${item.unit}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <h2>Pickup Details</h2>
            <div class="info-row">
              <span class="info-label">Pickup Date:</span>
              <span>${format(new Date(order.pickup_date), 'EEEE, dd MMMM yyyy')}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Pickup Time:</span>
              <span>${order.pickup_time}</span>
            </div>
          </div>

          ${order.notes ? `
            <div class="section">
              <h2>Notes</h2>
              <p>${order.notes}</p>
            </div>
          ` : ''}

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    ready: orders.filter(o => o.status === 'ready').length,
    completed: orders.filter(o => o.status === 'completed').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Slagerij John</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage orders and customer requests</p>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-5 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderStats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{orderStats.confirmed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Ready</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{orderStats.ready}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{orderStats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Orders</CardTitle>
                <CardDescription>View and manage customer orders</CardDescription>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Pickup</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => {
                      const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
                      const orderTotal = order.order_items.reduce((sum, item) => {
                        const price = item.price || 0;
                        const quantity = parseFloat(item.quantity) || 0;
                        return sum + (price * quantity);
                      }, 0);
                      
                      return (
                        <TableRow key={order.id}>
                          <TableCell>
                            <div className="font-medium">{order.customer_name}</div>
                            <div className="text-sm text-muted-foreground">{order.customer_phone}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {order.order_items.slice(0, 2).map((item, idx) => (
                                <div key={idx}>
                                  {item.quantity} {item.unit} {item.product}
                                  {item.price && (
                                    <span className="text-muted-foreground ml-1">
                                      (€{(parseFloat(item.quantity) * item.price).toFixed(2)})
                                    </span>
                                  )}
                                </div>
                              ))}
                              {order.order_items.length > 2 && (
                                <div className="text-muted-foreground">
                                  +{order.order_items.length - 2} more
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold text-primary">
                              €{orderTotal.toFixed(2)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {format(new Date(order.pickup_date), 'dd/MM/yyyy')}
                            </div>
                            <div className="text-xs text-muted-foreground">{order.pickup_time}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {format(new Date(order.created_at), 'dd/MM/yyyy HH:mm')}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2 items-center">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                View
                              </Button>
                              
                              {/* WhatsApp Button */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                title="Stuur WhatsApp update"
                                onClick={() => openWhatsAppDialog(order)}
                              >
                                <MessageCircle className="h-4 w-4" />
                              </Button>

                              <Select
                                value={order.status}
                                onValueChange={(value) => updateOrderStatus(order.id, value)}
                              >
                                <SelectTrigger className="w-[120px] h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="ready">Ready</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Order #{selectedOrder?.id.slice(0, 8)}
              </DialogDescription>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold mb-3">Customer Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Name:</span>
                      <span>{selectedOrder.customer_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{selectedOrder.customer_phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{selectedOrder.customer_email}</span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.order_items.map((item, idx) => (
                      <div key={idx} className="flex justify-between p-3 bg-muted rounded-lg">
                        <span className="font-medium">{item.product}</span>
                        <span>{item.quantity} {item.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pickup Details */}
                <div>
                  <h3 className="font-semibold mb-3">Pickup Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(selectedOrder.pickup_date), 'EEEE, dd MMMM yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{selectedOrder.pickup_time}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <StickyNote className="h-4 w-4" />
                      Notes
                    </h3>
                    <p className="p-3 bg-muted rounded-lg">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Status */}
                <div>
                  <h3 className="font-semibold mb-3">Order Status</h3>
                  <Select
                    value={selectedOrder.status}
                    onValueChange={(value) => {
                      updateOrderStatus(selectedOrder.id, value);
                      setSelectedOrder({ ...selectedOrder, status: value });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="ready">Ready for Pickup</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t space-y-2">
                  <Button
                    onClick={() => {
                      openWhatsAppDialog(selectedOrder);
                      setSelectedOrder(null);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send WhatsApp Update
                  </Button>
                  
                  <Button
                    onClick={() => printOrder(selectedOrder)}
                    variant="outline"
                    className="w-full"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Order
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Message Templates</CardTitle>
                <CardDescription>
                  Customize the WhatsApp messages sent to customers for different order statuses.
                  Use placeholders: {'{customer_name}'}, {'{pickup_date}'}, {'{pickup_time}'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {['ready', 'confirmed', 'cancelled', 'default'].map((status) => (
                  <div key={status} className="space-y-2">
                    <Label className="text-base capitalize">{status} Status</Label>
                    <Textarea
                      value={templates[status] || ''}
                      onChange={(e) => setTemplates(prev => ({ ...prev, [status]: e.target.value }))}
                      rows={3}
                      className="font-mono text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() => updateTemplate(status, templates[status])}
                    >
                      Save Template
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* WhatsApp Message Customization Dialog */}
      <AlertDialog open={whatsappDialog.open} onOpenChange={(open) => setWhatsappDialog({ ...whatsappDialog, open })}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>Send WhatsApp Message</AlertDialogTitle>
            <AlertDialogDescription>
              Customize your message to {whatsappDialog.order?.customer_name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            value={whatsappDialog.message}
            onChange={(e) => setWhatsappDialog({ ...whatsappDialog, message: e.target.value })}
            rows={6}
            className="my-4"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={sendWhatsAppMessage} className="bg-green-600 hover:bg-green-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              Send WhatsApp
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

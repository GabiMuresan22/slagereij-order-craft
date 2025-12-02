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
import { Loader2, PackageCheck, Clock, CheckCircle2, XCircle, Phone, Mail, Calendar, StickyNote, MessageCircle, Settings, Printer, ChevronDown, Filter } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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

// Default language for email notifications
const DEFAULT_EMAIL_LANGUAGE = 'nl' as const;

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
  language?: string;
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

// Translation keys for order statuses
const statusTranslationKeys = {
  pending: 'admin.orders.pending',
  confirmed: 'admin.orders.confirmed',
  ready: 'admin.orders.ready',
  completed: 'admin.orders.completed',
  cancelled: 'admin.orders.cancelled',
} as const;

// Helper function to get translated status
const getStatusTranslationKey = (status: string): string => {
  return statusTranslationKeys[status as keyof typeof statusTranslationKeys] || status;
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
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [showFilter, setShowFilter] = useState(false);

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
        toast.error(t('admin.toast.loadFailed'));
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
            toast.success(t('admin.toast.newOrder'));
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
            language: order.language || DEFAULT_EMAIL_LANGUAGE,
          },
        });
        console.log('Status update email sent');
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Don't fail the status update if email fails
      }

      toast.success(t('admin.toast.statusUpdated'));
    } catch (error: any) {
      toast.error(error.message || t('admin.toast.statusUpdateFailed'));
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

      toast.success(t('admin.toast.templateUpdated'));
      setTemplates(prev => ({ ...prev, [status]: messageTemplate }));
    } catch (error: any) {
      toast.error(error.message || t('admin.toast.templateFailed'));
      console.error('Error updating template:', error);
    }
  };

  const printOrder = (order: Order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error(t('admin.toast.popupBlocked'));
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${t('admin.orderDetails.orderId')} #${order.id.slice(0, 8)}</title>
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
          <h1>Slagerij John - ${t('admin.print.orderDetails')}</h1>
          
          <div class="section">
            <h2>${t('admin.print.orderInfo')}</h2>
            <div class="info-row">
              <span class="info-label">${t('admin.print.orderId')}</span>
              <span>#${order.id.slice(0, 8)}</span>
            </div>
            <div class="info-row">
              <span class="info-label">${t('admin.print.orderDate')}</span>
              <span>${format(new Date(order.created_at), 'dd/MM/yyyy HH:mm')}</span>
            </div>
            <div class="info-row">
              <span class="info-label">${t('admin.print.status')}</span>
              <span class="status-badge status-${order.status}">${t(getStatusTranslationKey(order.status))}</span>
            </div>
          </div>

          <div class="section">
            <h2>${t('admin.print.customerInfo')}</h2>
            <div class="info-row">
              <span class="info-label">${t('admin.print.name')}</span>
              <span>${order.customer_name}</span>
            </div>
            <div class="info-row">
              <span class="info-label">${t('admin.print.phone')}</span>
              <span>${order.customer_phone}</span>
            </div>
            <div class="info-row">
              <span class="info-label">${t('admin.print.email')}</span>
              <span>${order.customer_email}</span>
            </div>
          </div>

          <div class="section">
            <h2>${t('admin.print.orderItems')}</h2>
            <table class="items-table">
              <thead>
                <tr>
                  <th>${t('admin.print.product')}</th>
                  <th>${t('admin.print.quantity')}</th>
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
            <h2>${t('admin.print.pickupDetails')}</h2>
            <div class="info-row">
              <span class="info-label">${t('admin.print.pickupDate')}</span>
              <span>${format(new Date(order.pickup_date), 'EEEE, dd MMMM yyyy')}</span>
            </div>
            <div class="info-row">
              <span class="info-label">${t('admin.print.pickupTime')}</span>
              <span>${order.pickup_time}</span>
            </div>
          </div>

          ${order.notes ? `
            <div class="section">
              <h2>${t('admin.print.notes')}</h2>
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

  // Toggle order expansion
  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  // Format items for display (badges)
  const formatOrderItems = (items: OrderItem[], maxDisplay: number = 2) => {
    if (items.length <= maxDisplay) {
      return items;
    }
    return items.slice(0, maxDisplay);
  };

  // Swipe handler for mobile
  const handleSwipe = (order: Order, direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Swipe right to call
      window.location.href = `tel:${order.customer_phone}`;
    } else if (direction === 'left') {
      // Swipe left to open details
      setSelectedOrder(order);
    }
  };

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
          <h1 className="text-3xl font-bold mb-2">{t('admin.title')}</h1>
          <p className="text-muted-foreground">{t('admin.subtitle')}</p>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">{t('admin.tabs.orders')}</TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              {t('admin.tabs.settings')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-5 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('admin.stats.totalOrders')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderStats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('admin.stats.pending')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{orderStats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('admin.stats.confirmed')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{orderStats.confirmed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('admin.stats.ready')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{orderStats.ready}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('admin.stats.completed')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">{orderStats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders - Mobile Cards / Desktop Table */}
        <Card>
          <CardHeader>
            {/* Mobile Header - Compact */}
            <div className="flex items-center justify-between md:block">
              <div className="flex items-center justify-between w-full md:w-auto">
                <div>
                  <CardTitle className="text-xl md:text-2xl">{t('admin.orders.title')}</CardTitle>
                  <CardDescription className="hidden md:block">{t('admin.orders.description')}</CardDescription>
                </div>
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              {/* Desktop Filter */}
              <div className="hidden md:block mt-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('admin.orders.filterPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('admin.orders.all')}</SelectItem>
                    <SelectItem value="pending">{t('admin.orders.pending')}</SelectItem>
                    <SelectItem value="confirmed">{t('admin.orders.confirmed')}</SelectItem>
                    <SelectItem value="ready">{t('admin.orders.ready')}</SelectItem>
                    <SelectItem value="completed">{t('admin.orders.completed')}</SelectItem>
                    <SelectItem value="cancelled">{t('admin.orders.cancelled')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Mobile Filter Dropdown */}
            {showFilter && (
              <div className="md:hidden mt-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t('admin.orders.filterPlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('admin.orders.all')}</SelectItem>
                    <SelectItem value="pending">{t('admin.orders.pending')}</SelectItem>
                    <SelectItem value="confirmed">{t('admin.orders.confirmed')}</SelectItem>
                    <SelectItem value="ready">{t('admin.orders.ready')}</SelectItem>
                    <SelectItem value="completed">{t('admin.orders.completed')}</SelectItem>
                    <SelectItem value="cancelled">{t('admin.orders.cancelled')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {t('admin.orders.noOrders')}
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="space-y-4 md:hidden">
                  {filteredOrders.map((order) => {
                    const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
                    const orderTotal = order.order_items.reduce((sum, item) => {
                      const price = item.price || 0;
                      const quantity = parseFloat(item.quantity) || 0;
                      return sum + (price * quantity);
                    }, 0);
                    const isExpanded = expandedOrders.has(order.id);
                    const displayedItems = formatOrderItems(order.order_items, 2);
                    
                    return (
                      <Card 
                        key={order.id}
                        className="border-2 transition-all hover:shadow-md"
                        onClick={() => toggleOrderExpansion(order.id)}
                      >
                        <CardContent className="p-4">
                          {/* Card Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg">{order.customer_name}</h3>
                                <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {t(getStatusTranslationKey(order.status))}
                                </Badge>
                              </div>
                              <div className="text-2xl font-bold text-primary mt-2">
                                €{orderTotal.toFixed(2)}
                              </div>
                            </div>
                            <ChevronDown 
                              className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          </div>

                          {/* Items Preview - Badges */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {displayedItems.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {item.product} ×{item.quantity}
                              </Badge>
                            ))}
                            {order.order_items.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{order.order_items.length - 2} {t('admin.orders.more')}
                              </Badge>
                            )}
                          </div>

                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className="space-y-3 pt-3 border-t">
                              {/* All Items */}
                              <div>
                                <h4 className="text-sm font-semibold mb-2">{t('admin.table.items')}</h4>
                                <div className="space-y-2">
                                  {order.order_items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                      <span className="flex-1">
                                        <span className="text-muted-foreground">{item.quantity} {item.unit}</span>{' '}
                                        <span className="font-medium">{item.product}</span>
                                      </span>
                                      {item.price && (
                                        <span className="text-muted-foreground ml-2">
                                          €{(parseFloat(item.quantity) * item.price).toFixed(2)}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Pickup Details */}
                              <div>
                                <h4 className="text-sm font-semibold mb-2">{t('admin.table.pickup')}</h4>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{format(new Date(order.pickup_date), 'dd/MM/yyyy')} {order.pickup_time}</span>
                                </div>
                              </div>

                              {/* Contact Info */}
                              <div>
                                <h4 className="text-sm font-semibold mb-2">{t('admin.orderDetails.customerInfo')}</h4>
                                <div className="space-y-2">
                                  <a 
                                    href={`tel:${order.customer_phone}`}
                                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Phone className="h-4 w-4" />
                                    {order.customer_phone}
                                  </a>
                                  <a 
                                    href={`mailto:${order.customer_email}`}
                                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Mail className="h-4 w-4" />
                                    {order.customer_email}
                                  </a>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2 pt-3 border-t" onClick={(e) => e.stopPropagation()}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  {t('admin.orders.view')}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() => openWhatsAppDialog(order)}
                                >
                                  <MessageCircle className="h-4 w-4" />
                                </Button>
                                <a
                                  href={`tel:${order.customer_phone}`}
                                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9"
                                >
                                  <Phone className="h-4 w-4" />
                                </a>
                                <Select
                                  value={order.status}
                                  onValueChange={(value) => updateOrderStatus(order.id, value)}
                                >
                                  <SelectTrigger className="w-[120px] h-9">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">{t('admin.orders.pending')}</SelectItem>
                                    <SelectItem value="confirmed">{t('admin.orders.confirmed')}</SelectItem>
                                    <SelectItem value="ready">{t('admin.orders.ready')}</SelectItem>
                                    <SelectItem value="completed">{t('admin.orders.completed')}</SelectItem>
                                    <SelectItem value="cancelled">{t('admin.orders.cancelled')}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('admin.table.customer')}</TableHead>
                        <TableHead>{t('admin.table.items')}</TableHead>
                        <TableHead>{t('admin.table.total')}</TableHead>
                        <TableHead>{t('admin.table.pickup')}</TableHead>
                        <TableHead>{t('admin.table.status')}</TableHead>
                        <TableHead>{t('admin.table.created')}</TableHead>
                        <TableHead>{t('admin.table.actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => {
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
                              <div className="flex flex-wrap gap-1">
                                {order.order_items.slice(0, 3).map((item, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {item.product} ×{item.quantity}
                                  </Badge>
                                ))}
                                {order.order_items.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{order.order_items.length - 3}
                                  </Badge>
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
                                {t(getStatusTranslationKey(order.status))}
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
                                  {t('admin.orders.view')}
                                </Button>
                                
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
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
                                    <SelectItem value="pending">{t('admin.orders.pending')}</SelectItem>
                                    <SelectItem value="confirmed">{t('admin.orders.confirmed')}</SelectItem>
                                    <SelectItem value="ready">{t('admin.orders.ready')}</SelectItem>
                                    <SelectItem value="completed">{t('admin.orders.completed')}</SelectItem>
                                    <SelectItem value="cancelled">{t('admin.orders.cancelled')}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('admin.orderDetails.title')}</DialogTitle>
              <DialogDescription>
                {t('admin.orderDetails.orderId')} #{selectedOrder?.id.slice(0, 8)}
              </DialogDescription>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold mb-3">{t('admin.orderDetails.customerInfo')}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{t('admin.orderDetails.name')}</span>
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
                  <h3 className="font-semibold mb-3">{t('admin.orderDetails.orderItems')}</h3>
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
                  <h3 className="font-semibold mb-3">{t('admin.orderDetails.pickupDetails')}</h3>
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
                      {t('admin.orderDetails.notes')}
                    </h3>
                    <p className="p-3 bg-muted rounded-lg">{selectedOrder.notes}</p>
                  </div>
                )}

                {/* Status */}
                <div>
                  <h3 className="font-semibold mb-3">{t('admin.orderDetails.orderStatus')}</h3>
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
                      <SelectItem value="pending">{t('admin.orders.pending')}</SelectItem>
                      <SelectItem value="confirmed">{t('admin.orders.confirmed')}</SelectItem>
                      <SelectItem value="ready">{t('admin.orderDetails.readyForPickup')}</SelectItem>
                      <SelectItem value="completed">{t('admin.orders.completed')}</SelectItem>
                      <SelectItem value="cancelled">{t('admin.orders.cancelled')}</SelectItem>
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
                    {t('admin.orderDetails.sendWhatsApp')}
                  </Button>
                  
                  <Button
                    onClick={() => printOrder(selectedOrder)}
                    variant="outline"
                    className="w-full"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    {t('admin.orderDetails.printOrder')}
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
                <CardTitle>{t('admin.settings.templatesTitle')}</CardTitle>
                <CardDescription>
                  {t('admin.settings.templatesDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {['ready', 'confirmed', 'cancelled', 'default'].map((status) => (
                  <div key={status} className="space-y-2">
                    <Label className="text-base capitalize">{status} {t('admin.settings.statusLabel')}</Label>
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
                      {t('admin.settings.saveTemplate')}
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
            <AlertDialogTitle>{t('admin.whatsapp.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.whatsapp.customizeMessage')} {whatsappDialog.order?.customer_name}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            value={whatsappDialog.message}
            onChange={(e) => setWhatsappDialog({ ...whatsappDialog, message: e.target.value })}
            rows={6}
            className="my-4"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>{t('admin.whatsapp.cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={sendWhatsAppMessage} className="bg-green-600 hover:bg-green-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              {t('admin.whatsapp.send')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

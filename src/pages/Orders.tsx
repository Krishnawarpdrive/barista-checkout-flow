import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LocationBar from '@/components/LocationBar';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface ProductDetails {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface OrderItem {
  id: string;
  order: string;
  product: string;
  product_details: ProductDetails;
  quantity: number;
  price: string;
  total_amount: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: string;
  order_number: string;
  date: string;
  status: string;
  amount: number;
  type: string;
  payment_mode: string;
  payment_status: string;
  order_items: OrderItem[];
}

export default function Orders() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch orders when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch orders with hardcoded user ID
        const ordersResponse = await fetch(`/api/v1/get_order/?user=e319f95d-0fb6-4c18-a24f-d89c984aa632`);
        if (!ordersResponse.ok) {
          throw new Error('Failed to fetch orders');
        }
        const ordersData = await ordersResponse.json();
        
        // Fetch order items for each order
        const ordersWithItems = await Promise.all(
          ordersData.map(async (order: Order) => {
            const itemsResponse = await fetch(`/api/v1/get_order_item/?order=${order.id}`);
            if (!itemsResponse.ok) {
              throw new Error(`Failed to fetch items for order ${order.id}`);
            }
            const itemsData = await itemsResponse.json();
            return {
              ...order,
              order_items: itemsData
            };
          })
        );
        
        setOrders(ordersWithItems);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again later.');
        toast.error('Failed to load orders');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated) return null;

  // Filter orders based on status
  const currentOrders = orders.filter(order => 
    ['pending', 'preparing', 'ready', 'out_for_delivery'].includes(order.status.toLowerCase())
  );
  
  const previousOrders = orders.filter(order => 
    ['delivered', 'cancelled', 'failed'].includes(order.status.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-700',
      preparing: 'bg-blue-100 text-blue-700',
      ready: 'bg-purple-100 text-purple-700',
      out_for_delivery: 'bg-orange-100 text-orange-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
      failed: 'bg-red-100 text-red-700'
    };
    return statusMap[status.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-coasters-cream">
      <Header />
      <LocationBar />
      
      <main className="flex-grow pb-20">
        <div className="p-4">
          <h2 className="text-2xl font-hackney text-coasters-green mb-6">YOUR ORDERS</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coasters-green mx-auto mb-4"></div>
                <p className="text-coasters-green">Loading orders...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-coasters-green text-white px-4 py-2 rounded-lg hover:bg-coasters-green/90"
              >
                Try Again
              </button>
            </div>
          ) : (
            <Tabs defaultValue="current">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="current" className="flex-1">Current</TabsTrigger>
                <TabsTrigger value="previous" className="flex-1">Previous</TabsTrigger>
              </TabsList>
              
              <TabsContent value="current">
                {currentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {currentOrders.map(order => (
                      <div key={order.id} className="vintage-card relative overflow-hidden">
                        <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
                        
                        <div className="pt-4">
                          <div className="flex justify-between mb-3">
                            <div>
                              <h3 className="font-medium">{order.order_number}</h3>
                              <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                            </div>
                            <div className={`${getStatusColor(order.status)} text-sm font-medium px-3 py-1 rounded-full h-fit`}>
                              {order.status.replace(/_/g, ' ').toUpperCase()}
                            </div>
                          </div>
                          
                          <div className="border-t border-dashed border-gray-200 pt-3">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="flex justify-between py-1">
                                <span className="text-sm">{item.quantity}x {item.product_details.name}</span>
                                <span className="text-sm font-medium">₹{item.price}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="border-t border-dashed border-gray-200 mt-3 pt-3 flex justify-between">
                            <span className="font-medium">Total</span>
                            <span className="font-bold text-coasters-green">₹{order.amount}</span>
                          </div>
                          
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 h-2 rounded-full">
                              <div className={`${
                                order.status === 'pending' ? 'w-1/4' :
                                order.status === 'preparing' ? 'w-1/2' :
                                order.status === 'ready' ? 'w-3/4' :
                                'w-full'
                              } bg-coasters-green h-2 rounded-full`}></div>
                            </div>
                            <div className="flex justify-between mt-2">
                              <span className="text-xs text-gray-500">Order Placed</span>
                              <span className="text-xs text-gray-500">Preparing</span>
                              <span className="text-xs text-gray-500">Ready</span>
                              <span className="text-xs text-gray-500">Delivered</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No current orders</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="previous">
                {previousOrders.length > 0 ? (
                  <div className="space-y-4">
                    {previousOrders.map(order => (
                      <div key={order.id} className="vintage-card relative overflow-hidden">
                        <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
                        
                        <div className="pt-4">
                          <div className="flex justify-between mb-3">
                            <div>
                              <h3 className="font-medium">{order.order_number}</h3>
                              <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                            </div>
                            <div className={`${getStatusColor(order.status)} text-sm font-medium px-3 py-1 rounded-full h-fit`}>
                              {order.status.replace(/_/g, ' ').toUpperCase()}
                            </div>
                          </div>
                          
                          <div className="border-t border-dashed border-gray-200 pt-3">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="flex justify-between py-1">
                                <span className="text-sm">{item.quantity}x {item.product_details.name}</span>
                                <span className="text-sm font-medium">₹{item.price}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="border-t border-dashed border-gray-200 mt-3 pt-3 flex justify-between">
                            <span className="font-medium">Total</span>
                            <span className="font-bold text-coasters-green">₹{order.amount}</span>
                          </div>
                        </div>
                        
                        <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No previous orders</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}

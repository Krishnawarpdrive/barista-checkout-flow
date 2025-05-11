
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LocationBar from '@/components/LocationBar';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';

// Mock data for orders
const currentOrders = [
  {
    id: 'ORD12345',
    date: '15 May, 2023',
    items: [
      { name: 'Cappuccino', quantity: 2, price: 200 },
      { name: 'Mocha', quantity: 1, price: 140 }
    ],
    total: 340,
    status: 'Preparing'
  }
];

const previousOrders = [
  {
    id: 'ORD12344',
    date: '10 May, 2023',
    items: [
      { name: 'Espresso', quantity: 1, price: 80 },
      { name: 'Latte', quantity: 2, price: 240 }
    ],
    total: 320,
    status: 'Delivered'
  },
  {
    id: 'ORD12343',
    date: '5 May, 2023',
    items: [
      { name: 'Cold Brew', quantity: 1, price: 130 },
      { name: 'Flat White', quantity: 1, price: 110 }
    ],
    total: 240,
    status: 'Delivered'
  }
];

export default function Orders() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="flex flex-col min-h-screen bg-coasters-cream">
      <Header />
      <LocationBar />
      
      <main className="flex-grow pb-20">
        <div className="p-4">
          <h2 className="text-2xl font-hackney text-coasters-green mb-6">YOUR ORDERS</h2>
          
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
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="bg-coasters-orange/10 text-coasters-orange text-sm font-medium px-3 py-1 rounded-full h-fit">
                            {order.status}
                          </div>
                        </div>
                        
                        <div className="border-t border-dashed border-gray-200 pt-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between py-1">
                              <span className="text-sm">{item.quantity}x {item.name}</span>
                              <span className="text-sm font-medium">₹{item.price}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-dashed border-gray-200 mt-3 pt-3 flex justify-between">
                          <span className="font-medium">Total</span>
                          <span className="font-bold text-coasters-green">₹{order.total}</span>
                        </div>
                        
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 h-2 rounded-full">
                            <div className="w-1/2 bg-coasters-green h-2 rounded-full"></div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-xs text-gray-500">Order Placed</span>
                            <span className="text-xs text-gray-500">Preparing</span>
                            <span className="text-xs text-gray-500">Out for Delivery</span>
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
                            <h3 className="font-medium">{order.id}</h3>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full h-fit">
                            {order.status}
                          </div>
                        </div>
                        
                        <div className="border-t border-dashed border-gray-200 pt-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between py-1">
                              <span className="text-sm">{item.quantity}x {item.name}</span>
                              <span className="text-sm font-medium">₹{item.price}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t border-dashed border-gray-200 mt-3 pt-3 flex justify-between">
                          <span className="font-medium">Total</span>
                          <span className="font-bold text-coasters-green">₹{order.total}</span>
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
        </div>
      </main>
    </div>
  );
}

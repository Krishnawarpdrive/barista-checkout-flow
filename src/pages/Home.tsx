import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LocationBar from '@/components/LocationBar';
import CoffeeCard from '@/components/CoffeeCard';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Dices, Ticket } from 'lucide-react';
import CouponDrawer from '@/components/CouponDrawer';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [showCouponDrawer, setShowCouponDrawer] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch('/api/v1/get_product/');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        toast.error('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);
  
  const totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const handleCheckout = () => {
    // If user is logged in, go to cart page
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      // Otherwise go to login page
      navigate('/login');
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-coasters-cream">
      <Header />
      <LocationBar />
      
      <main className="flex-grow pb-24">
        <div className="p-4">
          <h2 className="text-2xl font-hackney text-coasters-green mb-6">
            {isAuthenticated 
              ? `HELLO ${user?.name.toUpperCase()}, LET'S ORDER HAPPINESS!` 
              : "DISCOVER OUR COFFEE"}
          </h2>
          
          {/* Dice Game Banner */}
          <div className="mb-6 bg-coasters-gold rounded-lg p-4 border-2 border-coasters-green/30 shadow-md relative overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-hackney text-xl text-coasters-green mb-1">TRY YOUR LUCK!</h3>
                <p className="text-coasters-green/80 text-sm mb-2">Play our dice game and win free coffee</p>
                <Button 
                  onClick={() => navigate('/dice-game')}
                  variant="secondary"
                  size="sm"
                  className="group"
                >
                  <Dices className="mr-1 group-hover:animate-bounce-subtle" />
                  Play Now
                </Button>
              </div>
              <div className="hidden sm:block">
                <Dices size={60} className="text-coasters-green opacity-80 animate-bounce-subtle" />
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coasters-green mx-auto mb-4"></div>
                <p className="text-coasters-green">Loading products...</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {products.map((coffee) => (
                <CoffeeCard 
                  key={coffee.id} 
                  coffee={{
                    ...coffee,
                    description: coffee.description || '',
                    image: coffee.image || 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2940&auto=format&fit=crop'
                  }} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      {totalCartItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-coasters-green p-4 flex items-center justify-between shadow-lg border-t-2 border-coasters-gold animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="bg-coasters-gold rounded-full w-10 h-10 flex items-center justify-center text-coasters-green font-bold animate-bounce-subtle">
              {totalCartItems}
            </div>
            <div className="text-white">
              <p className="text-sm">Total Price</p>
              <p className="text-xl font-bold">₹{cartTotal}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setShowCouponDrawer(true)}
              variant="outline"
              className="bg-transparent border-coasters-gold/50 text-coasters-gold hover:bg-coasters-gold/10 hover:text-white"
            >
              <Ticket className="mr-1" />
              Apply Coupon
            </Button>
            
            <Button 
              onClick={handleCheckout}
              className="bg-coasters-gold hover:bg-coasters-gold/90 text-coasters-green font-bold px-6 py-5 group transform transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="group-hover:animate-bounce-subtle" />
                <span>Checkout</span>
              </div>
            </Button>
          </div>
        </div>
      )}
      
      <CouponDrawer 
        open={showCouponDrawer} 
        onClose={() => setShowCouponDrawer(false)} 
      />
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LocationBar from '@/components/LocationBar';
import CoffeeCard from '@/components/CoffeeCard';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Dices, Ticket } from 'lucide-react';
import CouponDrawer from '@/components/CouponDrawer';

// Mock data
const coffeeProducts = [
  {
    id: '1',
    name: 'Cappuccino',
    price: 100,
    description: 'The perfect balance of espresso, steamed milk and foam.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Latte',
    price: 120,
    description: 'Smooth espresso with steamed milk and a light layer of foam.',
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?q=80&w=2787&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Espresso',
    price: 80,
    description: 'Strong and concentrated shot of coffee.',
    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?q=80&w=2787&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Mocha',
    price: 140,
    description: 'Espresso with chocolate and steamed milk.',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80239a?q=80&w=2874&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Flat White',
    price: 110,
    description: 'Espresso with microfoam - steamed milk with small bubbles.',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=2864&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'Cold Brew',
    price: 130,
    description: 'Coffee brewed with cold water for 12-24 hours.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2787&auto=format&fit=crop'
  },
];

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [showCouponDrawer, setShowCouponDrawer] = useState(false);
  
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {coffeeProducts.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
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

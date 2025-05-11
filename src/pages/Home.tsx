
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LocationBar from '@/components/LocationBar';
import CoffeeCard from '@/components/CoffeeCard';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

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
  
  const totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="flex flex-col min-h-screen bg-coasters-cream">
      <Header />
      <LocationBar />
      
      <main className="flex-grow pb-20">
        <div className="p-4">
          <h2 className="text-2xl font-hackney text-coasters-green mb-6">
            {isAuthenticated 
              ? `HELLO ${user?.name.toUpperCase()}, LET'S ORDER HAPPINESS!` 
              : "DISCOVER OUR COFFEE"}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {coffeeProducts.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        </div>
      </main>
      
      {totalCartItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-coasters-green p-4 flex items-center justify-between">
          <div className="text-white">
            <p className="text-sm">Total Price</p>
            <p className="text-xl font-bold">₹{items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</p>
          </div>
          
          <Button 
            onClick={() => navigate('/cart')}
            className="bg-coasters-gold hover:bg-coasters-gold/90 text-black font-bold px-6 py-5"
          >
            Pay Now
          </Button>
        </div>
      )}
    </div>
  );
}

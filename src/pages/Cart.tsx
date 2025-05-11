
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LocationBar from '@/components/LocationBar';
import CartItemCard from '@/components/CartItemCard';
import PaymentSummary from '@/components/PaymentSummary';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, X } from 'lucide-react';

export default function Cart() {
  const { items, applyCoupon, couponCode, removeCoupon, clearCart, getTotal } = useCart();
  const [coupon, setCoupon] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = () => {
    if (coupon) {
      applyCoupon(coupon);
      setCoupon('');
    }
  };
  
  const handleCheckout = () => {
    // In a real app, we would handle payment processing here
    clearCart();
    navigate('/order-success');
  };
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <LocationBar />
        
        <div className="flex-grow flex flex-col items-center justify-center p-8 bg-coasters-cream">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some coffee to get started!</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-coasters-orange hover:bg-coasters-orange/90"
          >
            Go to Menu
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-coasters-cream">
      <Header />
      <LocationBar />
      
      <main className="flex-grow p-4 pb-24">
        <h2 className="text-2xl font-hackney text-coasters-green mb-6">YOUR CART</h2>
        
        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>
        
        {/* Coupon Section */}
        <div className="mb-6">
          {couponCode ? (
            <Alert className="bg-green-50 border-green-200 text-green-800">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Offer applied successfully!</strong>
                  </AlertDescription>
                </div>
                <button onClick={removeCoupon} className="text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </Alert>
          ) : (
            <div className="flex gap-2">
              <Input 
                placeholder="Enter coupon code" 
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-grow"
              />
              <Button 
                onClick={handleApplyCoupon}
                className="bg-coasters-orange hover:bg-coasters-orange/90 whitespace-nowrap"
              >
                Apply
              </Button>
            </div>
          )}
        </div>
        
        <div className="geometric-pattern h-4 w-full mb-6"></div>
        
        <PaymentSummary />
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-coasters-green p-4 flex items-center justify-between">
        <div className="text-white">
          <p className="text-sm">Total Price</p>
          <p className="text-xl font-bold">₹{getTotal()}</p>
        </div>
        
        <Button 
          onClick={handleCheckout}
          className="bg-coasters-gold hover:bg-coasters-gold/90 text-black font-bold px-6 py-5"
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
}

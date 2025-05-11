
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LocationBar from '@/components/LocationBar';
import CartItemCard from '@/components/CartItemCard';
import PaymentSummary from '@/components/PaymentSummary';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import CouponDrawer from '@/components/CouponDrawer';

// New component imports
import EmptyCartState from '@/components/cart/EmptyCartState';
import CartCouponSection from '@/components/cart/CartCouponSection';
import CartDiceGameCta from '@/components/cart/CartDiceGameCta';
import CartLoginDrawer from '@/components/cart/CartLoginDrawer';
import CartCheckoutFooter from '@/components/cart/CartCheckoutFooter';

export default function Cart() {
  const { items, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showLoginDrawer, setShowLoginDrawer] = useState(false);
  const [showCouponDrawer, setShowCouponDrawer] = useState(false);
  const navigate = useNavigate();
  
  const handleProceedToPayment = () => {
    if (isAuthenticated) {
      handleCheckout();
    } else {
      setShowLoginDrawer(true);
    }
  };
  
  const handleCheckout = () => {
    // In a real app, we would handle payment processing here
    clearCart();
    navigate('/order-success');
  };
  
  const handleGuestCheckout = () => {
    // Skip login and proceed to checkout as guest
    handleCheckout();
  };
  
  const handlePlayDice = () => {
    // Navigate to dice game with cart items for pricing
    navigate('/dice-game', { state: { items } });
  };
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <LocationBar />
        <EmptyCartState />
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
        <CartCouponSection onOpenCouponDrawer={() => setShowCouponDrawer(true)} />
        
        {/* Play Dice Game CTA */}
        <CartDiceGameCta onPlayDice={handlePlayDice} />
        
        <div className="geometric-pattern h-4 w-full mb-6"></div>
        
        <PaymentSummary />
      </main>
      
      {/* Checkout Footer */}
      <CartCheckoutFooter onProceed={handleProceedToPayment} />
      
      {/* Login Options Drawer */}
      <CartLoginDrawer 
        open={showLoginDrawer} 
        onClose={() => setShowLoginDrawer(false)}
        onGuestCheckout={handleGuestCheckout}
      />
      
      {/* Coupon Drawer */}
      <CouponDrawer 
        open={showCouponDrawer} 
        onClose={() => setShowCouponDrawer(false)} 
      />
    </div>
  );
}

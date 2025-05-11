import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LocationBar from '@/components/LocationBar';
import CartItemCard from '@/components/CartItemCard';
import PaymentSummary from '@/components/PaymentSummary';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, X } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import CouponDrawer from '@/components/CouponDrawer';

export default function Cart() {
  const { items, applyCoupon, couponCode, removeCoupon, clearCart, getTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const [coupon, setCoupon] = useState('');
  const [showLoginDrawer, setShowLoginDrawer] = useState(false);
  const [showCouponDrawer, setShowCouponDrawer] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = () => {
    if (coupon) {
      applyCoupon(coupon);
      setCoupon('');
    }
  };
  
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
  
  const handleLoginWithWhatsApp = () => {
    // Navigate to login page
    navigate('/login');
  };
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <LocationBar />
        
        <div className="flex-grow flex flex-col items-center justify-center p-8 bg-coasters-cream">
          <div className="vintage-card p-8 text-center">
            <h2 className="text-2xl font-hackney text-coasters-green mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some coffee to get started!</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-coasters-orange hover:bg-coasters-orange/90 font-hackney"
            >
              Go to Menu
            </Button>
          </div>
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
        <div className="vintage-card mb-6 relative overflow-hidden">
          <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
          
          {couponCode ? (
            <Alert className="bg-green-50 border-green-200 text-green-800 mt-4">
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
            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => setShowCouponDrawer(true)}
                className="bg-coasters-orange hover:bg-coasters-orange/90 whitespace-nowrap font-hackney flex-grow"
              >
                Browse Available Coupons
              </Button>
            </div>
          )}
          
          <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
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
          onClick={handleProceedToPayment}
          className="bg-coasters-gold hover:bg-coasters-gold/90 text-black font-hackney px-6 py-5"
        >
          Proceed to Payment
        </Button>
      </div>
      
      {/* Login Options Drawer */}
      <Drawer open={showLoginDrawer} onClose={() => setShowLoginDrawer(false)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="font-hackney text-coasters-green text-2xl">LOGIN OPTIONS</DrawerTitle>
          </DrawerHeader>
          
          <div className="px-4 pb-2">
            <p className="text-gray-500 mb-6">Choose how you'd like to continue with your order</p>
            
            <div className="space-y-4">
              <Button 
                onClick={handleLoginWithWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 h-14 text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/>
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/>
                  <path d="M9 14a.5.5 0 0 0 .5.5c.667 0 1.333-.083 2-.25.667-.167 1.333-.417 2-.75a.5.5 0 0 0-.5-.866 9.11 9.11 0 0 1-1.75.666c-.583.15-1.167.217-1.75.2a.5.5 0 0 0-.5.5Z"/>
                </svg>
                Login with WhatsApp
              </Button>
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-2 text-sm text-gray-400">
                    OR
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={handleGuestCheckout}
                variant="outline" 
                className="w-full border-2 h-14 text-lg"
              >
                Continue as Guest
              </Button>
            </div>
          </div>
          
          <DrawerFooter>
            <Button variant="outline" onClick={() => setShowLoginDrawer(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
      {/* Coupon Drawer */}
      <CouponDrawer 
        open={showCouponDrawer} 
        onClose={() => setShowCouponDrawer(false)} 
      />
    </div>
  );
}

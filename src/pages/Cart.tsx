import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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
import CartLoginDrawer from '@/components/cart/CartLoginDrawer';
import CartCheckoutFooter from '@/components/cart/CartCheckoutFooter';

import CartDiceGameCta from '@/components/cart/CartDiceGameCta';

export default function Cart() {
  const { items, clearCart, getSubtotal, getTax, getTotal, discount, couponCode } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [showLoginDrawer, setShowLoginDrawer] = useState(false);
  const [showCouponDrawer, setShowCouponDrawer] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const handleProceedToPayment = () => {
    if (isAuthenticated) {
      handleCheckout();
    } else {
      setShowLoginDrawer(true);
    }
  };
  
  const handleCheckout = async () => {
    try {
      setIsSubmitting(true);
      
      // Generate a unique order number (you might want to move this to the backend)
      const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      // Prepare order data
      const orderData = {
        user: "e319f95d-0fb6-4c18-a24f-d89c984aa632",
        outlet: "1ae6aa5a-87dc-45a0-84cb-e29a5f6b329d",
        order_number: orderNumber,
        status: "pending",
        date: new Date().toISOString(),
        amount: getTotal(),
        type: "online",
        payment_mode: "online",
        payment_status: "pending",
        // Optional fields
        payment_reference: null,
        payment: null
      };

      // Call create_order API
      const response = await fetch('/api/v1/create_order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const orderResponse = await response.json();
      console.log('Order Response:', orderResponse); // Debug log

      if (!orderResponse || !orderResponse.id) {
        throw new Error('Order ID not received from server');
      }

      const orderId = orderResponse.id;
      
      // Create all order items in a single request
      const orderItemsData = items.map(item => ({
        order: orderId,
        product: item.id,
        quantity: item.quantity,
        price: item.price,
        total_amount: item.price * item.quantity
      }));

      console.log('Order Items Data:', orderItemsData); // Debug log

      const orderItemsResponse = await fetch('/api/v1/create_order_item/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderItemsData)
      });

      if (!orderItemsResponse.ok) {
        const errorData = await orderItemsResponse.json();
        console.error('Order Items Error:', errorData); // Debug log
        throw new Error(errorData.error || 'Failed to create order items');
      }

      const orderItemsResult = await orderItemsResponse.json();
      console.log('Order Items Result:', orderItemsResult); // Debug log
      
      // Clear cart and show success message
      clearCart();
      toast.success('Order placed successfully!');
      
      // Navigate to order success page
      navigate('/order-success', { state: { orderId } });
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleGuestCheckout = () => {
    // Skip login and proceed to checkout as guest
    handleCheckout();
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
        
        <div className="geometric-pattern h-4 w-full mb-6"></div>
        
        <PaymentSummary />
      </main>
      
      {/* Play Dice CTA */}
      <CartDiceGameCta />
      
      {/* Checkout Footer */}
      <CartCheckoutFooter onProceed={handleProceedToPayment} isLoading={isSubmitting} />
      
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
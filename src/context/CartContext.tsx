import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

// Optional now since we're removing customization
export type CoffeeCustomization = {
  preparation: 'Light Coffee' | 'Dark Coffee';
  sweetness: 'Sugar' | 'Sugar Less' | 'No Sugar';
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization?: CoffeeCustomization; // Keep optional for backwards compatibility
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  applyCoupon: (code: string) => boolean;
  discount: number;
  couponCode: string | null;
  removeCoupon: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  const addToCart = (item: CartItem) => {
    // Simplified matching logic without customization
    const existingItem = items.find(i => i.id === item.id);

    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + item.quantity);
      toast.success(`Updated quantity of ${item.name}`);
    } else {
      setItems([...items, item]);
      toast.success(`Added ${item.name} to cart`);
    }
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscount(0);
    setCouponCode(null);
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return Math.round(getSubtotal() * 0.05); // 5% GST
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const tax = getTax();
    return subtotal + tax - discount;
  };

  const applyCoupon = (code: string) => {
    // Simple coupon logic for demo
    if (code === "COASTERS50") {
      const discountAmount = Math.min(50, getSubtotal() * 0.25); // 25% off up to ₹50
      setDiscount(discountAmount);
      setCouponCode(code);
      toast.success(`Coupon applied! You saved ₹${discountAmount}`);
      return true;
    }
    
    if (code === "FIRST100") {
      const discountAmount = Math.min(100, getSubtotal() * 0.3); // 30% off up to ₹100
      setDiscount(discountAmount);
      setCouponCode(code);
      toast.success(`Coupon applied! You saved ₹${discountAmount}`);
      return true;
    }
    
    toast.error("Invalid coupon code");
    return false;
  };

  const removeCoupon = () => {
    setDiscount(0);
    setCouponCode(null);
    toast.info("Coupon removed");
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getSubtotal, 
        getTax,
        getTotal,
        applyCoupon,
        discount,
        couponCode,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

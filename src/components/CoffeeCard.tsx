
import React, { useState, useEffect } from 'react';
import { useCart, CartItem } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface CoffeeCardProps {
  coffee: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  };
}

export default function CoffeeCard({ coffee }: CoffeeCardProps) {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(0);
  
  // Check if the item is already in the cart
  useEffect(() => {
    const cartItem = items.find(item => item.id === coffee.id);
    if (cartItem) {
      setIsInCart(true);
      setItemQuantity(cartItem.quantity);
    } else {
      setIsInCart(false);
      setItemQuantity(0);
    }
  }, [items, coffee.id]);

  const handleAddToCart = () => {
    const item: CartItem = {
      id: coffee.id,
      name: coffee.name,
      price: coffee.price,
      quantity: quantity,
      image: coffee.image
    };
    
    addToCart(item);
    setQuantity(1);
  };
  
  const increaseQuantity = () => {
    if (!isInCart) {
      setQuantity(prev => Math.min(prev + 1, 10));
    } else {
      const item: CartItem = {
        id: coffee.id,
        name: coffee.name,
        price: coffee.price,
        quantity: 1,
        image: coffee.image
      };
      addToCart(item);
    }
  };
  
  const decreaseQuantity = () => {
    if (!isInCart) {
      setQuantity(prev => Math.max(prev - 1, 1));
    } else {
      const item: CartItem = {
        id: coffee.id,
        name: coffee.name,
        price: coffee.price,
        quantity: -1,
        image: coffee.image
      };
      addToCart(item);
    }
  };

  return (
    <div className="relative rounded-lg bg-white overflow-hidden mb-4 border-2 border-coasters-gold shadow-md transform transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
      {/* Zigzag top edge */}
      <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
      
      <div className="flex pt-6 px-3">
        <div className="flex items-start flex-1 gap-3">
          <div className="flex-1">
            <h3 className="font-hackney text-lg text-coasters-green">{coffee.name}</h3>
            <p className="font-bold text-coasters-orange">₹{coffee.price}</p>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{coffee.description}</p>
          </div>
        </div>
        
        <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 border-coasters-gold shadow-sm">
          <img 
            src={coffee.image} 
            alt={coffee.name} 
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110" 
          />
        </div>
      </div>
      
      <div className="p-3 mt-2 flex justify-between items-center">
        {!isInCart ? (
          <>
            <div className="flex items-center border-2 border-coasters-green rounded-lg overflow-hidden">
              <button 
                onClick={decreaseQuantity}
                className="w-8 h-8 bg-coasters-green text-white flex items-center justify-center"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              
              <span className="w-8 text-center font-bold">{quantity}</span>
              
              <button 
                onClick={increaseQuantity}
                className="w-8 h-8 bg-coasters-green text-white flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="bg-coasters-orange hover:bg-coasters-orange/90 text-white font-hackney px-6 transition-all duration-300 hover:-translate-y-0.5 focus:ring-2 focus:ring-coasters-orange/50 focus:outline-none"
            >
              ADD
            </Button>
          </>
        ) : (
          <div className="flex justify-between w-full items-center">
            <div className="text-sm text-coasters-green font-medium">In Cart</div>
            <div className="flex items-center border-2 border-coasters-orange rounded-lg overflow-hidden">
              <button 
                onClick={decreaseQuantity}
                className="w-8 h-8 bg-coasters-orange text-white flex items-center justify-center"
              >
                <Minus size={16} />
              </button>
              
              <span className="w-10 text-center font-bold">{itemQuantity}</span>
              
              <button 
                onClick={increaseQuantity}
                className="w-8 h-8 bg-coasters-orange text-white flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Zigzag bottom edge */}
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}

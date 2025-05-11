
import React, { useState } from 'react';
import { useCart, CartItem } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

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
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const item: CartItem = {
      id: coffee.id,
      name: coffee.name,
      price: coffee.price,
      quantity: quantity,
      image: coffee.image
      // Removed customization
    };
    
    addToCart(item);
    setQuantity(1);
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10));
  };
  
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="relative rounded-lg bg-white overflow-hidden mb-4 border-2 border-coasters-gold">
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
        
        <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 border-coasters-gold">
          <img 
            src={coffee.image} 
            alt={coffee.name} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
      
      <div className="p-3 mt-2 flex justify-between items-center">
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
          className="bg-coasters-orange hover:bg-coasters-orange/90 text-white font-hackney px-6"
        >
          ADD
        </Button>
      </div>
      
      {/* Zigzag bottom edge */}
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}

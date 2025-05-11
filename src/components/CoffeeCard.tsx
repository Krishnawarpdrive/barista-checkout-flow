
import React, { useState } from 'react';
import { useCart, CartItem, CoffeeCustomization } from '@/context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

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
  const [showCustomize, setShowCustomize] = useState(false);
  const [customization, setCustomization] = useState<CoffeeCustomization>({
    preparation: 'Light Coffee',
    sweetness: 'Sugar'
  });

  const handleAddToCart = () => {
    const item: CartItem = {
      id: coffee.id,
      name: coffee.name,
      price: coffee.price,
      quantity: 1,
      image: coffee.image,
      customization
    };
    
    addToCart(item);
    setShowCustomize(false);
  };

  return (
    <>
      <div className="rounded-lg bg-white overflow-hidden">
        <div className="w-full h-36">
          <img 
            src={coffee.image} 
            alt={coffee.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="p-3">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-lg">{coffee.name}</h3>
              <p className="font-bold">₹{coffee.price}</p>
            </div>
            
            <Button 
              onClick={() => setShowCustomize(true)}
              className="bg-coasters-orange hover:bg-coasters-orange/90 text-white px-6"
            >
              ADD
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">{coffee.description}</p>
          <button className="text-sm text-coasters-orange mt-1">Read More</button>
        </div>
      </div>
      
      <Dialog open={showCustomize} onOpenChange={setShowCustomize}>
        <DialogContent className="bg-coasters-green text-white border-0 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-center font-hackney text-2xl">Customize Your Coffee</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="bg-white rounded-lg p-4 text-black">
              <h3 className="font-bold text-lg mb-2">Select Preparation style</h3>
              <p className="text-amber-600 text-sm mb-4">Required - Select any 1 option</p>
              
              <div className="space-y-2">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setCustomization({...customization, preparation: 'Light Coffee'})}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${customization.preparation === 'Light Coffee' ? 'bg-coasters-green' : 'border border-gray-300'}`}>
                    {customization.preparation === 'Light Coffee' && <Check className="text-white" size={16} />}
                  </div>
                  <span>Light Coffee</span>
                </div>
                
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setCustomization({...customization, preparation: 'Dark Coffee'})}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${customization.preparation === 'Dark Coffee' ? 'bg-coasters-green' : 'border border-gray-300'}`}>
                    {customization.preparation === 'Dark Coffee' && <Check className="text-white" size={16} />}
                  </div>
                  <span>Dark Coffee</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 text-black">
              <h3 className="font-bold text-lg mb-2">Select Your Taste</h3>
              <p className="text-amber-600 text-sm mb-4">Required - Select any 1 option</p>
              
              <div className="space-y-2">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setCustomization({...customization, sweetness: 'Sugar'})}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${customization.sweetness === 'Sugar' ? 'bg-coasters-green' : 'border border-gray-300'}`}>
                    {customization.sweetness === 'Sugar' && <Check className="text-white" size={16} />}
                  </div>
                  <span>Sugar</span>
                </div>
                
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setCustomization({...customization, sweetness: 'Sugar Less'})}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${customization.sweetness === 'Sugar Less' ? 'bg-coasters-green' : 'border border-gray-300'}`}>
                    {customization.sweetness === 'Sugar Less' && <Check className="text-white" size={16} />}
                  </div>
                  <span>Sugar Less</span>
                </div>
                
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setCustomization({...customization, sweetness: 'No Sugar'})}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${customization.sweetness === 'No Sugar' ? 'bg-coasters-green' : 'border border-gray-300'}`}>
                    {customization.sweetness === 'No Sugar' && <Check className="text-white" size={16} />}
                  </div>
                  <span>No Sugar</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="geometric-pattern h-4 w-full"></div>
          
          <Button 
            onClick={handleAddToCart} 
            className="bg-coasters-gold hover:bg-coasters-gold/90 text-black font-bold py-6"
          >
            Add to Cart - ₹{coffee.price}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

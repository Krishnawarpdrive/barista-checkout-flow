
import { Button } from '@/components/ui/button';
import { CircleDollarSign } from 'lucide-react';
import { GameItem } from '@/pages/DiceGame';

interface PaymentSectionProps {
  selectedItems: GameItem[];
  onPayment: () => void;
  onBack: () => void;
}

export default function PaymentSection({
  selectedItems,
  onPayment,
  onBack
}: PaymentSectionProps) {
  return (
    <div className="vintage-card">
      <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
      
      <h2 className="font-hackney text-xl text-coasters-green mb-4">PAYMENT</h2>
      
      <div className="bg-white rounded-md border-2 border-coasters-gold p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">Selected Items:</span>
          <span className="font-bold">{selectedItems.length}</span>
        </div>
        
        <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
          {selectedItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-8 h-8 rounded-full object-cover mr-2" 
                />
                <span>{item.name}</span>
              </div>
              <span>₹25</span>
            </div>
          ))}
        </div>
        
        <div className="mb-4">
          <p className="text-center font-medium text-sm bg-coasters-gold/10 p-2 rounded-md">
            You will get {selectedItems.length} {selectedItems.length === 1 ? 'chance' : 'chances'} to roll the dice!
          </p>
        </div>
        
        <div className="border-t border-dashed border-coasters-green/30 pt-3 mt-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-coasters-green">Total</span>
            <span className="font-bold text-lg">₹{selectedItems.length * 25}</span>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onPayment}
        variant="gold"
        className="w-full group"
      >
        <CircleDollarSign className="mr-1 group-hover:animate-bounce-subtle" />
        Pay ₹{selectedItems.length * 25}
      </Button>
      
      <div className="mt-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="w-full"
        >
          Back to Item Selection
        </Button>
      </div>
      
      <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
    </div>
  );
}

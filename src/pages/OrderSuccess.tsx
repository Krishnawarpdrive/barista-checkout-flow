
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Generate a random order ID
    const randomId = Math.floor(10000 + Math.random() * 90000);
    
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="flex flex-col min-h-screen bg-coasters-green">
      <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-6">
          <CheckCircle2 className="h-24 w-24 text-coasters-gold mx-auto" />
        </div>
        
        <h1 className="text-3xl font-hackney text-white mb-2">ORDER PLACED!</h1>
        <p className="text-coasters-gold text-lg mb-6">Your coffee is brewing...</p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 w-full max-w-sm mb-8">
          <p className="text-white mb-2">Order ID: #CM2548</p>
          <p className="text-white mb-2">Estimated Delivery: 15-20 mins</p>
          <p className="text-white">Payment: Completed</p>
        </div>
        
        <Button 
          onClick={() => navigate('/')}
          className="bg-coasters-gold hover:bg-coasters-gold/90 text-black font-bold px-8 py-6"
        >
          Back to Menu
        </Button>
      </div>
      
      <div className="geometric-pattern h-10"></div>
    </div>
  );
}

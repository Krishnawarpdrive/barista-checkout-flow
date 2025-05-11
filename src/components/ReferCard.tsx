
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ReferCard() {
  const { user } = useAuth();
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  // Generate a unique referral code based on the user ID or use a default
  const referralCode = user?.id ? `CSTR${user.id.slice(0, 6).toUpperCase()}` : 'CSTR123456';
  const referralLink = `https://coasters.app/refer?code=${referralCode}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on Coasters!',
        text: 'Use my referral code to get ₹50 off your first order!',
        url: referralLink,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      window.open(`https://wa.me/?text=Join me on Coasters! Use my referral code ${referralCode} to get ₹50 off your first order! ${referralLink}`);
    }
  };
  
  return (
    <div className="p-4">
      <div className="vintage-card relative overflow-hidden">
        <div className="zigzag-divider absolute top-0 left-0 right-0"></div>
        
        <div className="pt-4">
          <h3 className="text-xl font-hackney text-coasters-green mb-2">REFER & EARN</h3>
          <p className="text-sm text-gray-600 mb-4">Share with friends & both get ₹50 off!</p>
          
          <div className="stamp-border p-4 mb-4">
            <p className="text-sm font-medium text-gray-500">Your Referral Code</p>
            <div className="flex justify-between items-center mt-1">
              <h4 className="font-hackney text-xl text-coasters-green">{referralCode}</h4>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleCopy}
                className="hover:bg-coasters-gold/20"
              >
                <Copy size={18} />
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleShare}
            className="w-full bg-coasters-gold text-coasters-green hover:bg-coasters-gold/90 font-medium flex items-center gap-2 py-5"
          >
            <Share2 size={18} />
            Share via WhatsApp
          </Button>
          
          <div className="flex justify-between mt-6 rounded-lg bg-coasters-green/5 p-3">
            <div>
              <p className="text-sm text-gray-600">Total Referrals</p>
              <p className="text-xl font-bold text-coasters-green">3</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rewards Earned</p>
              <p className="text-xl font-bold text-coasters-green">₹150</p>
            </div>
          </div>
        </div>
        
        <div className="zigzag-divider-reverse absolute bottom-0 left-0 right-0"></div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium mb-3">How it works</h4>
        <ol className="space-y-4">
          <li className="flex gap-3">
            <div className="bg-coasters-gold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <span className="text-coasters-green font-bold text-sm">1</span>
            </div>
            <p className="text-sm">Share your unique code with friends</p>
          </li>
          <li className="flex gap-3">
            <div className="bg-coasters-gold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <span className="text-coasters-green font-bold text-sm">2</span>
            </div>
            <p className="text-sm">They get ₹50 off their first order</p>
          </li>
          <li className="flex gap-3">
            <div className="bg-coasters-gold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              <span className="text-coasters-green font-bold text-sm">3</span>
            </div>
            <p className="text-sm">You get ₹50 after their purchase</p>
          </li>
        </ol>
      </div>
    </div>
  );
}

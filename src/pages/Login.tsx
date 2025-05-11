
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { login, verifyOtp } = useAuth();
  const navigate = useNavigate();
  
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      return;
    }
    
    await login(phone);
    setOtpSent(true);
  };
  
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 4) {
      return;
    }
    
    const success = await verifyOtp(otp);
    if (success) {
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-1/2 bg-coasters-gold">
        <div className="flex flex-col items-center justify-center pt-16">
          <img 
            src="/lovable-uploads/f18002df-c4b8-4741-891a-9978b6e0bc10.png" 
            alt="One small dum break" 
            className="w-64 h-64 object-contain"
          />
        </div>
      </div>
      
      <div className="geometric-pattern h-10"></div>
      
      <div className="flex-grow bg-coasters-green flex flex-col items-center px-8 py-12">
        <h2 className="text-yellow-400 text-xl mb-2">Fall in Love with</h2>
        <h1 className="font-hackney text-white text-4xl tracking-wider mb-8">COASTERS</h1>
        
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="phone" className="block text-white mb-2">Phone Number</label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-white"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-coasters-gold hover:bg-coasters-gold/90 text-black font-bold py-6 mt-6"
            >
              Send WhatsApp OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="otp" className="block text-white mb-2">Enter OTP</label>
              <Input
                id="otp"
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="4-digit OTP"
                className="w-full bg-white text-center text-2xl tracking-widest"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-coasters-gold hover:bg-coasters-gold/90 text-black font-bold py-6 mt-6"
            >
              Verify & Continue
            </Button>
            
            <button 
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full text-white text-center py-4"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

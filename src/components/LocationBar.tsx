
import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocationBar() {
  return (
    <div className="bg-coasters-gold text-coasters-green py-2 px-4 flex items-center gap-2 border-b border-coasters-green/20">
      <MapPin size={20} strokeWidth={2.5} />
      <span className="text-sm font-medium">37th A Cross Rd, Jaya Nagar</span>
    </div>
  );
}

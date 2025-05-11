
import React from 'react';

export default function LocationBar() {
  return (
    <div className="bg-coasters-green text-white py-2 px-4 flex items-center gap-2 border-t border-white/10">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      <span className="text-sm">37th A Cross Rd, Jaya Nagar</span>
    </div>
  );
}

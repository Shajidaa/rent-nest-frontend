import React from 'react';
import Navbar from './Navbar';
import { getMe } from '@/service/getMe';
import { Phone } from 'lucide-react'; // Optional: for a clean icon (or use your preferred icon library)

export default async function NavTopBar() {
  const user = await getMe();

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#002c22] text-white text-xs sm:text-sm py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex justify-end items-center">
          <a 
            href="tel:+02234356" 
            className="flex items-center gap-2 font-medium hover:opacity-90 
            transition-opacity focus:outline-none focus:ring-2
             focus:ring-white/20 rounded px-1"
            aria-label="Call our hotline at +02234356"
          >
            <Phone className="w-3.5 h-3.5 opacity-80" />
            <span>Hotline: <strong className="tracking-wide">+02234356</strong></span>
          </a>
        </div>
      </div>

      {/* Main Navigation Component */}
      <Navbar {...user} />
    </>
  );
}
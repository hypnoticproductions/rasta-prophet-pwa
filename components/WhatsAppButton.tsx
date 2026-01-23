'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const RODNIEL_PHONE = '17584863825';
const DEFAULT_MESSAGE = 'Blessings Rodniel, I am reaching out from The Rasta Prophet App.';

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${RODNIEL_PHONE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Rodniel on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-24 right-6 z-[100] group cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse effect */}
      <div className="absolute inset-0 rounded-full bg-[#FFD700] animate-ping opacity-25" />
      
      {/* Main button */}
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD700] via-[#E5C100] to-[#B8860B] shadow-lg shadow-[#FFD700]/30 flex items-center justify-center border-2 border-[#FFD700]/50">
        <MessageCircle className="w-7 h-7 text-black" strokeWidth={2.5} />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with Rodniel
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-black/90" />
        </div>
      </div>
    </motion.a>
  );
}

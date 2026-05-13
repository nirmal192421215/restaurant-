"use client";

import { MessageCircle, Calendar } from "lucide-react";

export default function MobileActions() {
  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919342626096"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-medium text-sm whitespace-nowrap">
          Chat with us
        </span>
      </a>

      {/* Mobile Sticky Footer CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-t border-[var(--color-brand-beige)] p-4 flex gap-4">
        <button className="flex-1 bg-[var(--color-brand-orange)] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
          <Calendar className="w-5 h-5" />
          Reserve Table
        </button>
      </div>
    </>
  );
}

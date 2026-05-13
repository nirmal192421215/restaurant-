"use client";

import { MessageCircle, Calendar, UtensilsCrossed, ShoppingBag, Home } from "lucide-react";
import { useReservation } from "@/context/ReservationContext";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileActions() {
  const { openDrawer } = useReservation();
  const { openCart, totalItems } = useCart();

  const navItems = [
    { name: "Home", icon: Home, href: "#" },
    { name: "Menu", icon: UtensilsCrossed, href: "#menu" },
    { name: "Book", icon: Calendar, action: openDrawer },
    { name: "Cart", icon: ShoppingBag, action: openCart, badge: totalItems },
  ];

  return (
    <>
      {/* WhatsApp Floating Button - Moved slightly up to avoid overlapping nav */}
      <a
        href="https://wa.me/919597574989"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Premium Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-6 pt-2 pointer-events-none">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-center justify-around p-2 pointer-events-auto">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => item.action ? item.action() : window.location.hash = item.href || "#"}
              className="flex flex-col items-center gap-1 p-2 relative group flex-1"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors group-active:bg-[var(--color-brand-orange)]/10">
                <item.icon className="w-5 h-5 text-[var(--color-brand-charcoal)] group-active:text-[var(--color-brand-orange)]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tighter text-[var(--color-brand-charcoal)]/60 group-active:text-[var(--color-brand-orange)]">
                {item.name}
              </span>
              
              {/* Badge for Cart */}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute top-1 right-1/4 w-5 h-5 bg-[var(--color-brand-orange)] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  {item.badge}
                </span>
              )}
              
              <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-[var(--color-brand-orange)] opacity-0 group-active:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}


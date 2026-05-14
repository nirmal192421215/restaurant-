"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Menu, X } from "lucide-react";
import { useReservation } from "@/context/ReservationContext";
import DndLogo from "@/components/layout/DndLogo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openDrawer } = useReservation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Menu", href: "#menu" },
    { name: "Reserve", href: "#reserve" },
    { name: "Offers", href: "#offers" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--color-brand-cream)]/90 backdrop-blur-md shadow-sm py-2 md:py-4"
          : "bg-transparent py-2 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="group">
          <DndLogo size="sm" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative group font-medium text-sm text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-orange)] transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-brand-orange)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-brand-charcoal)]">
            <MapPin className="w-4 h-4 text-[var(--color-brand-orange)] group-hover:scale-110 transition-transform" />
            <span>DND Fine Dining</span>
          </div>
          <button 
            onClick={openDrawer}
            className="bg-[var(--color-brand-orange)] hover:bg-[#CC5A08] text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-[0_4px_14px_0_rgba(232,104,10,0.39)] hover:shadow-[0_6px_20px_rgba(232,104,10,0.23)] hover:-translate-y-0.5"
          >
            Book a Table
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-[var(--color-brand-charcoal)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-[var(--color-brand-cream)] shadow-xl border-t border-[var(--color-brand-beige)] py-4 px-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-[var(--color-brand-charcoal)] py-2 border-b border-[var(--color-brand-beige)]/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-2 py-2 text-sm font-medium text-[var(--color-brand-charcoal)]">
            <MapPin className="w-4 h-4 text-[var(--color-brand-orange)]" />
            <span>DND Fine Dining</span>
          </div>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); openDrawer(); }}
            className="w-full mt-2 bg-[var(--color-brand-orange)] text-white px-6 py-3 rounded-full font-medium shadow-[0_4px_14px_0_rgba(232,104,10,0.39)]"
          >
            Book a Table
          </button>
        </motion.div>
      )}
    </header>
  );
}

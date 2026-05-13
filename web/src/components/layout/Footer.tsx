"use client";

import { useState } from "react";
import Link from "next/link";
import { Globe, Send, Mail, Phone, CheckCircle2 } from "lucide-react";
import DndLogo from "@/components/layout/DndLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      // Reset after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <footer id="contact" className="bg-[var(--color-brand-cream)] pt-16 pb-8 border-t border-[var(--color-brand-beige)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Social */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="group">
              <DndLogo size="lg" />            
            </Link>
            <p className="text-[var(--color-brand-charcoal)]/80 text-sm leading-relaxed">
              Where Every Meal Becomes a Memory. Experience premium dining with our 
              exclusive live grill and curated buffet selections.
            </p>
            <div className="flex gap-4">
              <a href="https://dndstudioin.netlify.app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-orange)] hover:-translate-y-1 transition-all duration-300">
                <Globe className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/the.dnd.studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-orange)] hover:-translate-y-1 transition-all duration-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://wa.me/919342626096" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-orange)] hover:-translate-y-1 transition-all duration-300">
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading text-xl font-semibold text-[var(--color-brand-charcoal)]">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'Our Menu', href: '#menu' },
                { name: 'Reserve a Table', href: '#reserve' },
                { name: 'Special Offers', href: '#offers' },
                { name: 'Gift Cards', href: '#reserve' },
                { name: 'About Us', href: '#about' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[var(--color-brand-charcoal)]/80 hover:text-[var(--color-brand-orange)] transition-colors text-sm font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading text-xl font-semibold text-[var(--color-brand-charcoal)]">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col gap-2 text-[var(--color-brand-charcoal)]/80 text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[var(--color-brand-orange)] shrink-0" />
                  <a href="tel:+919342626096" className="hover:text-[var(--color-brand-orange)] transition-colors">
                    +91 93426 26096
                  </a>
                </div>
                <div className="flex items-center gap-3 ml-8">
                  <a href="tel:+919597574989" className="hover:text-[var(--color-brand-orange)] transition-colors">
                    +91 95975 74989
                  </a>
                </div>
                <div className="flex items-center gap-3 ml-8">
                  <a href="tel:+916374160068" className="hover:text-[var(--color-brand-orange)] transition-colors">
                    +91 63741 60068
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-[var(--color-brand-charcoal)]/80 text-sm">
                <Mail className="w-5 h-5 text-[var(--color-brand-orange)] shrink-0" />
                <a href="mailto:dnd.studio.in@gmail.com" className="hover:text-[var(--color-brand-orange)] transition-colors">
                  dnd.studio.in@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading text-xl font-semibold text-[var(--color-brand-charcoal)]">Newsletter</h4>
            <p className="text-[var(--color-brand-charcoal)]/80 text-sm">
              Subscribe to get exclusive offers, priority bookings, and culinary news.
            </p>
            {status === "success" ? (
              <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 rounded-lg border border-[var(--color-brand-beige)] focus:outline-none focus:border-[var(--color-brand-orange)] focus:ring-1 focus:ring-[var(--color-brand-orange)] transition-all bg-white text-[var(--color-brand-charcoal)]"
                />
                <button 
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-[var(--color-brand-charcoal)] hover:bg-black text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Subscribing...
                    </>
                  ) : (
                    "Subscribe Now"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-brand-beige)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-brand-charcoal)]/80 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} DND Fine Dining. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-[var(--color-brand-charcoal)]/60">
            <Link href="#" className="hover:text-[var(--color-brand-orange)] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--color-brand-orange)] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[var(--color-brand-orange)] transition-colors">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

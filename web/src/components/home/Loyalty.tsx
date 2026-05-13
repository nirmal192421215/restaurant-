"use client";

import { motion } from "framer-motion";
import { Gift, Coins, Award, Sparkles } from "lucide-react";

export default function Loyalty() {
  return (
    <section className="py-24 bg-[var(--color-brand-beige)] relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-brand-orange)_2px,_transparent_2px)] bg-[length:30px_30px]"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden max-w-6xl mx-auto border border-[var(--color-brand-cream)]">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Content */}
            <div className="flex-1 p-10 md:p-16 lg:p-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-brand-orange)]/10 text-[var(--color-brand-orange)] font-bold text-sm mb-6 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>DND Rewards</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-brand-charcoal)] mb-6 leading-tight">
                Join Our DND Family
              </h2>
              
              <p className="text-[var(--color-brand-charcoal)]/70 text-lg mb-10 leading-relaxed max-w-xl">
                Become an exclusive member and unlock a world of culinary privileges. Earn points on every visit and enjoy perks that make your dining experience even more memorable.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center shrink-0">
                    <Gift className="w-6 h-6 text-[var(--color-brand-orange)]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-brand-charcoal)] mb-1">Birthday Perks</h4>
                    <p className="text-sm text-[var(--color-brand-charcoal)]/60">Complimentary dessert and 20% off on your birthday week.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-orange)]/10 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-[var(--color-brand-orange)]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--color-brand-charcoal)] mb-1">Exclusive Invites</h4>
                    <p className="text-sm text-[var(--color-brand-charcoal)]/60">Get VIP access to our new menu tasting events.</p>
                  </div>
                </div>
              </div>

              <button className="bg-[var(--color-brand-orange)] hover:bg-[#CC5A08] text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_4px_14px_0_rgba(232,104,10,0.39)] hover:shadow-[0_6px_20px_rgba(232,104,10,0.23)] hover:-translate-y-0.5 text-lg w-full sm:w-auto">
                Join Now for Free
              </button>
            </div>

            {/* Right Visual (Points System UI) */}
            <div className="flex-1 bg-[var(--color-brand-charcoal)] p-10 md:p-16 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-orange)]/20 blur-[80px] rounded-full"></div>
              
              <div className="relative z-10 w-full max-w-sm">
                <div className="flex flex-col gap-6 relative">
                  {/* Connection Line */}
                  <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-gradient-to-b from-[var(--color-brand-orange)] to-white/20"></div>
                  
                  {/* Step 1 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-6 relative"
                  >
                    <div className="w-14 h-14 rounded-full bg-[var(--color-brand-charcoal)] border-2 border-[var(--color-brand-orange)] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(232,104,10,0.5)]">
                      <span className="font-heading font-bold text-white text-xl">1</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex-1">
                      <h4 className="text-white font-bold mb-1">Dine & Earn</h4>
                      <p className="text-white/60 text-sm">Earn 10 points for every ₹100 spent.</p>
                    </div>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-6 relative"
                  >
                    <div className="w-14 h-14 rounded-full bg-[var(--color-brand-charcoal)] border-2 border-[var(--color-brand-orange)] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(232,104,10,0.5)]">
                      <Coins className="w-6 h-6 text-[var(--color-brand-orange)]" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex-1">
                      <h4 className="text-white font-bold mb-1">Accumulate</h4>
                      <p className="text-white/60 text-sm">Watch your points grow in your digital wallet.</p>
                    </div>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-6 relative"
                  >
                    <div className="w-14 h-14 rounded-full bg-[var(--color-brand-orange)] border-2 border-[var(--color-brand-orange)] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(232,104,10,0.8)]">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-[var(--color-brand-orange)]/50 rounded-2xl p-4 flex-1">
                      <h4 className="text-white font-bold mb-1">Redeem & Enjoy</h4>
                      <p className="text-[var(--color-brand-orange)] text-sm font-medium">Get free meals & upgrades!</p>
                    </div>
                  </motion.div>
                  
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

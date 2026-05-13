"use client";

import { motion } from "framer-motion";
import { Utensils, Flame, Sparkles, Clock } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    title: "Authentic Banana Leaf Meals",
    description: "Experience the tradition of eating on a fresh banana leaf with our grand South Indian meals.",
    icon: <Utensils className="w-8 h-8 text-[var(--color-brand-orange)]" />,
  },
  {
    id: 2,
    title: "Live Tawa Grill",
    description: "Savor the spices as our chefs prepare fresh fish and meat grills on the traditional tawa.",
    icon: <Flame className="w-8 h-8 text-[var(--color-brand-orange)]" />,
  },
  {
    id: 3,
    title: "Heritage Ambience",
    description: "A dining space that blends traditional Tamil architecture with modern luxury comforts.",
    icon: <Sparkles className="w-8 h-8 text-[var(--color-brand-orange)]" />,
  },
  {
    id: 4,
    title: "Traditional Degree Coffee",
    description: "Enjoy the perfect cup of authentic filter coffee brewed with the finest chicory blend.",
    icon: <Clock className="w-8 h-8 text-[var(--color-brand-orange)]" />,
  }
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-24 bg-[var(--color-brand-charcoal)] relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-[var(--color-brand-orange)]/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            The DND Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            We don&apos;t just serve food; we craft culinary experiences. Discover what makes dining with us truly special.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(232,104,10,0.15)] group"
            >
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-cream)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

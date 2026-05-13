"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Tag } from "lucide-react";

const OFFERS = [
  {
    id: 1,
    title: "Weekend Banana Leaf Feast",
    description: "Indulge in our grand 'Virundhu' with 24+ items served traditionally on a fresh banana leaf.",
    price: "₹349",
    originalPrice: "₹499",
    image: "/banana_leaf_full_feast_1778343522477.png",
    tag: "Bestseller",
  },
  {
    id: 2,
    title: "Madurai Street Food Night",
    description: "Experience the legendary Kari Dosa, Kothu Parotta, and Kalakki from the streets of Madurai.",
    price: "₹249",
    originalPrice: "₹349",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2000&auto=format&fit=crop",
    tag: "Mon-Fri Special",
  },
  {
    id: 3,
    title: "Chettinad Spice Trail",
    description: "A specialized selection of fiery Chettinad curries and pepper-infused delicacies.",
    price: "₹299",
    originalPrice: "₹399",
    image: "https://www.themealdb.com/images/media/meals/vvstvq1487342592.jpg",
    tag: "Spicy",
  },
  {
    id: 4,
    title: "Filter Coffee & Tiffin Combo",
    description: "Start your morning with our signature Degree Coffee and hot Kanchipuram Idli.",
    price: "₹129",
    originalPrice: "₹199",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2000&auto=format&fit=crop",
    tag: "Morning Special",
  }
];

export default function OffersCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="offers" className="py-24 bg-[var(--color-brand-beige)]/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-[var(--color-brand-orange)] font-medium mb-4">
              <Tag className="w-5 h-5" />
              <span className="uppercase tracking-wider text-sm">Exclusive Deals</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-brand-charcoal)]">
              Unmissable Offers
            </h2>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-[var(--color-brand-charcoal)]/20 flex items-center justify-center text-[var(--color-brand-charcoal)] hover:bg-[var(--color-brand-orange)] hover:text-white hover:border-[var(--color-brand-orange)] transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-[var(--color-brand-charcoal)] flex items-center justify-center text-white hover:bg-[var(--color-brand-orange)] transition-all shadow-md hover:shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="container mx-auto px-4 md:px-8">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 pt-4 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {OFFERS.map((offer, index) => (
            <motion.div 
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[320px] md:min-w-[400px] w-full max-w-[420px] snap-start shrink-0 group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 h-full flex flex-col relative">
                
                {/* Image */}
                <div className="h-56 relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[var(--color-brand-charcoal)] uppercase tracking-wide">
                    {offer.tag}
                  </div>
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-heading font-bold text-[var(--color-brand-charcoal)] mb-3 group-hover:text-[var(--color-brand-orange)] transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-[var(--color-brand-charcoal)]/70 text-sm mb-6 flex-grow leading-relaxed">
                    {offer.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <div className="text-[var(--color-brand-charcoal)]/40 line-through text-sm">
                        {offer.originalPrice}
                      </div>
                      <div className="text-3xl font-bold text-[var(--color-brand-orange)]">
                        {offer.price}
                      </div>
                    </div>
                    <button className="bg-[var(--color-brand-cream)] hover:bg-[var(--color-brand-orange)] hover:text-white text-[var(--color-brand-charcoal)] px-6 py-3 rounded-xl font-medium transition-colors">
                      Claim Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* CSS to hide scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}

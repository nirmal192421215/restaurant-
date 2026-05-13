"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Arjun Mehta",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    rating: 5,
    text: "Absolutely stunning experience. The live grill at the table was a game-changer, and the unlimited buffet spread had incredible variety. Definitely coming back!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    rating: 5,
    text: "The ambience is so premium, yet very warm and welcoming. Perfect place for our anniversary dinner. The staff was incredibly attentive to all our needs.",
  },
  {
    id: 3,
    name: "Rohan Desai",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
    rating: 4,
    text: "Loved the Madurai Kari Dosa! The reservation process was seamless, and we got our table immediately. Great Jigarthanda and even better Chettinad curries.",
  },
  {
    id: 4,
    name: "Sneha Patel",
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    rating: 5,
    text: "One of the best dining experiences I've had in the city. The dynamic menu means there's always something new to try. Highly recommended!",
  },
  {
    id: 5,
    name: "Karan Singh",
    image: "https://i.pravatar.cc/150?u=a04258114e29026701d",
    rating: 5,
    text: "The Loyalty program is totally worth it! Redeemed my birthday offer yesterday and felt so special. The food quality remains consistently top-notch.",
  }
];

export default function Testimonials() {
  // Duplicate the array to create a seamless infinite scroll effect
  const duplicatedReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-brand-charcoal)] mb-4">
          Words from Our Guests
        </h2>
        <p className="text-[var(--color-brand-charcoal)]/70 max-w-2xl mx-auto">
          Don&apos;t just take our word for it. Here&apos;s what our beloved patrons have to say about their DND experience.
        </p>
      </div>

      <div className="relative">
        {/* Gradient Masks for smooth fading edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-64 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-64 bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Carousel Track */}
        <div className="flex group w-fit">
          <motion.div
            className="flex gap-6 px-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {/* Hover to pause can be complex with framer-motion's pure CSS animations, 
                so we use a CSS approach or just let it flow nicely. For simplicity, we keep it flowing. */}
            {duplicatedReviews.map((review, index) => (
              <div 
                key={`${review.id}-${index}`}
                className="w-[300px] md:w-[400px] flex-shrink-0 bg-[var(--color-brand-cream)]/50 border border-[var(--color-brand-beige)] rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <Quote className="w-10 h-10 text-[var(--color-brand-orange)]/20 mb-4" />
                <p className="text-[var(--color-brand-charcoal)]/80 mb-8 line-clamp-4 leading-relaxed">
                  &quot;{review.text}&quot;
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-[var(--color-brand-charcoal)]">{review.name}</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < review.rating ? "text-[var(--color-brand-orange)] fill-[var(--color-brand-orange)]" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

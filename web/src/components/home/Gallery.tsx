"use client";

import { motion } from "framer-motion";

const IMAGES = [
  {
    id: 1,
    url: "/south_indian_dosa_chef_1778343335713.png",
    title: "Mastering the Dosa",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1000&auto=format&fit=crop",
    title: "Steamed Soft Idlis",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    url: "/banana_leaf_full_feast_1778343522477.png",
    title: "Traditional Banana Leaf Feast",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1000&auto=format&fit=crop",
    title: "The Grand South Thali",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    title: "Elegant Indian Ambience",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop",
    title: "Signature Dum Biryani",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=1000&auto=format&fit=crop",
    title: "Authentic Tiffin Platter",
    className: "md:col-span-1 md:row-span-1",
  }
];

export default function Gallery() {
  return (
    <section className="py-24 bg-[var(--color-brand-cream)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-brand-charcoal)] mb-4"
          >
            A Glimpse of Perfection
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--color-brand-charcoal)]/70 max-w-2xl mx-auto"
          >
            Explore our curated gallery showcasing the art of culinary presentation and the elegant ambience of our restaurant.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 auto-rows-[160px] md:auto-rows-[250px] grid-flow-dense">
          {IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.className}`}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-heading text-2xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

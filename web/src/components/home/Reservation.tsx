"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Users, Clock, Search, ChevronDown } from "lucide-react";
import { useReservation } from "@/context/ReservationContext";

export default function Reservation() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("main");
  const [guests, setGuests] = useState("2");
  
  const { openDrawer } = useReservation();

  return (
    <section id="reserve" className="py-24 relative bg-white">
      {/* Decorative Background — overflow clipped to its own wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-brand-beige)] rounded-full blur-[120px] opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-brand-charcoal)] mb-4">
              Reserve Your Table
            </h2>
            <p className="text-[var(--color-brand-charcoal)]/70 max-w-2xl mx-auto">
              Skip the line and book your premium dining experience in advance. 
              We recommend booking at least 24 hours prior for weekend dinners.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-[var(--color-brand-beige)] p-6 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Location Selector */}
              <div className="flex flex-col gap-2 relative group">
                <label className="text-sm font-medium text-[var(--color-brand-charcoal)]/80 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[var(--color-brand-orange)]" />
                  Location
                </label>
                <select 
                  className="w-full appearance-none bg-[var(--color-brand-beige)]/30 border border-transparent focus:border-[var(--color-brand-orange)] focus:bg-white text-[var(--color-brand-charcoal)] rounded-xl px-4 py-3 outline-none transition-all cursor-pointer font-medium"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="main">DND Fine Dining - Main Outlet</option>
                </select>
              </div>

              {/* Date Picker */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-brand-charcoal)]/80 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[var(--color-brand-orange)]" />
                  Date
                </label>
                <input 
                  type="date" 
                  className="w-full bg-[var(--color-brand-beige)]/30 border border-transparent focus:border-[var(--color-brand-orange)] focus:bg-white text-[var(--color-brand-charcoal)] rounded-xl px-4 py-3 outline-none transition-all cursor-pointer font-medium"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              {/* Guest Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-brand-charcoal)]/80 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--color-brand-orange)]" />
                  Guests
                </label>
                <select 
                  className="w-full appearance-none bg-[var(--color-brand-beige)]/30 border border-transparent focus:border-[var(--color-brand-orange)] focus:bg-white text-[var(--color-brand-charcoal)] rounded-xl px-4 py-3 outline-none transition-all cursor-pointer font-medium"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {[1,2,3,4,5,6,7,8,"9+"].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              {/* Advanced Interactive Time Picker */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium text-[var(--color-brand-charcoal)]/80 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--color-brand-orange)]" />
                  Time
                </label>
                <div 
                  onClick={openDrawer}
                  className="w-full bg-[var(--color-brand-beige)]/30 border border-[var(--color-brand-beige)] hover:border-[var(--color-brand-orange)] focus:bg-white text-[var(--color-brand-charcoal)] rounded-xl px-4 py-3 outline-none transition-all cursor-pointer font-medium flex justify-between items-center"
                >
                  <span className={selectedTime ? "text-[var(--color-brand-charcoal)]" : "text-gray-500"}>
                    {selectedTime || "Select time"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>

              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button 
                onClick={openDrawer}
                className="w-full bg-[var(--color-brand-orange)] hover:bg-[#CC5A08] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_4px_14px_0_rgba(232,104,10,0.39)] hover:shadow-[0_6px_20px_rgba(232,104,10,0.23)] hover:-translate-y-0.5 text-lg flex items-center justify-center gap-2 group"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Check Availability
              </button>
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}

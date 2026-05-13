"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sun, Moon } from "lucide-react";
import { useReservation } from "@/context/ReservationContext";

type TimeSlot = { time: string; status: "available" | "limited" | "full" };

export default function ReservationDrawer() {
  const { isOpen, closeDrawer } = useReservation();
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<"lunch" | "dinner">("lunch");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = () => {
    if (!selectedTime) {
      alert("Please select a time slot first.");
      return;
    }
    
    setIsBooking(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
      
      // Close drawer after success
      setTimeout(() => {
        closeDrawer();
        // Reset states for next time
        setTimeout(() => setBookingSuccess(false), 500);
      }, 2000);
    }, 1500);
  };

  // Generate slots
  useEffect(() => {
    if (isOpen) {
      const slots: TimeSlot[] = [];
      const startHour = selectedMeal === "lunch" ? 11 : 18;
      const endHour = selectedMeal === "lunch" ? 15 : 22;

      for (let hour = startHour; hour <= endHour; hour++) {
        for (const min of [0, 30]) {
          if (hour === endHour && min === 30) continue;
          
          const timeString = `${hour > 12 ? hour - 12 : hour}:${min === 0 ? '00' : '30'} ${hour >= 12 ? 'PM' : 'AM'}`;
          
          // Dummy logic
          let status: "available" | "limited" | "full" = "available";
          if (Math.random() > 0.8) status = "full";
          else if (Math.random() > 0.5) status = "limited";
          
          slots.push({ time: timeString, status });
        }
      }
      const timer = setTimeout(() => {
        setTimeSlots(slots);
        setSelectedTime("");
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, selectedMeal, selectedDayIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 z-[1000] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[1001] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 font-heading">Dining at</h2>
              <button
                onClick={closeDrawer}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 flex flex-col gap-6" style={{ WebkitOverflowScrolling: 'touch' }}>

              {/* Date & Time Section */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-5">
                <h3 className="font-bold text-lg text-gray-900">Select Date & Time</h3>
                
                {/* Date Slider (Simplified) */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {[...Array(7)].map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() + i);
                    const isSelected = i === selectedDayIndex;
                    return (
                      <button 
                        key={i}
                        onClick={() => setSelectedDayIndex(i)}
                        className={`flex flex-col items-center justify-center min-w-[70px] h-20 rounded-xl border transition-all ${
                          isSelected 
                            ? "bg-[var(--color-brand-orange)] border-[var(--color-brand-orange)] text-white shadow-md" 
                            : "bg-gray-50 border-gray-200 text-gray-600 hover:border-[var(--color-brand-orange)]"
                        }`}
                      >
                        <span className="text-xs font-bold uppercase">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-sm font-bold">{d.getDate()} {d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Lunch/Dinner Toggle */}
                <div className="inline-flex bg-gray-50 p-1 rounded-xl border border-gray-100 self-start">
                  <button 
                    onClick={() => setSelectedMeal("lunch")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${selectedMeal === "lunch" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <Sun className="w-4 h-4" /> Lunch
                  </button>
                  <button 
                    onClick={() => setSelectedMeal("dinner")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${selectedMeal === "dinner" ? "bg-white text-[var(--color-brand-orange)] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <Moon className="w-4 h-4" /> Dinner
                  </button>
                </div>

                {/* Time Slots */}
                {timeSlots.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={slot.status === "full"}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                          selectedTime === slot.time
                            ? "bg-[#1e3a8a] border-[#1e3a8a] text-white"
                            : slot.status === "full"
                              ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                              : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
                {selectedTime && (
                   <p className="text-xs font-bold text-center text-[#1e3a8a] uppercase">Starts ₹749</p>
                )}
              </div>

            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-white">
                <button 
                  onClick={handleBook}
                  disabled={isBooking || bookingSuccess || !selectedTime}
                  className={`w-full py-4 rounded-xl font-bold transition-all text-lg flex items-center justify-center gap-2 ${
                    bookingSuccess 
                      ? 'bg-green-500 text-white shadow-md' 
                      : !selectedTime
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-[var(--color-brand-orange)] hover:bg-[#CC5A08] text-white shadow-[0_4px_14px_0_rgba(232,104,10,0.39)]'
                  }`}
                >
                    {isBooking ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Booking...
                      </>
                    ) : bookingSuccess ? (
                      "Booking Confirmed!"
                    ) : (
                      "Continue to Book"
                    )}
                </button>
            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

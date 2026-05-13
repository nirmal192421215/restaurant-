"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useState } from "react";

export default function CartDrawer() {
  const { cartItems, isCartOpen, closeCart, updateQuantity, removeItem, totalItems, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    setIsPlacing(true);
    setTimeout(() => {
      setIsPlacing(false);
      setOrderPlaced(true);
      clearCart();
      setTimeout(() => {
        setOrderPlaced(false);
        closeCart();
      }, 3000);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-[1000] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[430px] bg-white z-[1001] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--color-brand-orange)]/10 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[var(--color-brand-orange)]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 font-heading">Your Order</h2>
                  <p className="text-xs text-gray-400">{totalItems} {totalItems === 1 ? "item" : "items"} selected</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {orderPlaced ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
                    >
                      <CheckCircle className="w-14 h-14 text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 font-heading">Order Placed!</h3>
                    <p className="text-gray-500">Your order has been received and will be prepared shortly. Enjoy your meal! 🍽️</p>
                  </motion.div>
                ) : cartItems.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 text-center px-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 font-heading">Your order is empty</h3>
                    <p className="text-gray-400 text-sm">Browse the menu and add your favourite dishes!</p>
                    <button
                      onClick={closeCart}
                      className="mt-2 bg-[var(--color-brand-orange)] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#CC5A08] transition-colors"
                    >
                      Browse Menu
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="items" className="p-4 flex flex-col gap-3">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex items-center gap-4 bg-gray-50 rounded-2xl p-3 border border-gray-100"
                      >
                        {/* Item Image */}
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        {/* Item Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <div className={`w-2.5 h-2.5 rounded-sm border ${item.isVeg ? "border-green-600" : "border-red-600"} flex items-center justify-center`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
                            </div>
                            <p className="font-bold text-sm text-gray-900 truncate">{item.name}</p>
                          </div>
                          <p className="text-[var(--color-brand-orange)] font-bold text-sm">₹{item.price * item.quantity}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="w-3.5 h-3.5 text-red-400" />
                            ) : (
                              <Minus className="w-3.5 h-3.5 text-gray-600" />
                            )}
                          </button>
                          <span className="w-5 text-center font-bold text-gray-900 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-[var(--color-brand-orange)] flex items-center justify-center hover:bg-[#CC5A08] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>
                      </motion.div>
                    ))}

                    {/* Bill Summary */}
                    <div className="mt-2 bg-[var(--color-brand-cream)] rounded-2xl p-4 border border-[var(--color-brand-beige)]">
                      <h3 className="font-bold text-gray-700 text-sm mb-3">Bill Summary</h3>
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{item.name} × {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="border-t border-dashed border-gray-300 my-2" />
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Subtotal</span>
                        <span>₹{totalPrice}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>GST (5%)</span>
                        <span>₹{Math.round(totalPrice * 0.05)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-gray-900 text-sm mt-2">
                        <span>Total</span>
                        <span className="text-[var(--color-brand-orange)]">₹{totalPrice + Math.round(totalPrice * 0.05)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {!orderPlaced && cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-white">
                <button
                  onClick={handlePlaceOrder}
                  disabled={isPlacing}
                  className="w-full py-4 bg-[var(--color-brand-orange)] hover:bg-[#CC5A08] disabled:bg-gray-300 text-white rounded-xl font-bold text-base transition-all shadow-[0_4px_14px_0_rgba(232,104,10,0.39)] flex items-center justify-center gap-2"
                >
                  {isPlacing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Place Order · ₹{totalPrice + Math.round(totalPrice * 0.05)}
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

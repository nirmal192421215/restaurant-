"use client";

import { ReservationProvider } from "@/context/ReservationContext";
import { CartProvider } from "@/context/CartContext";
import ReservationDrawer from "@/components/home/ReservationDrawer";
import CartDrawer from "@/components/home/CartDrawer";
import { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <ReservationProvider>
        {children}
        <ReservationDrawer />
        <CartDrawer />
      </ReservationProvider>
    </CartProvider>
  );
}

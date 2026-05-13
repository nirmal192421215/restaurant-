"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ReservationContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const ReservationContext = createContext<ReservationContextType>({
  isOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ReservationContext.Provider
      value={{
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservation = () => useContext(ReservationContext);

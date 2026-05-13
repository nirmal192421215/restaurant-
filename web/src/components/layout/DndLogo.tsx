"use client";

import Image from "next/image";

interface DndLogoProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function DndLogo({ size = "sm", className = "" }: DndLogoProps) {
  const isLarge = size === "lg";
  const width = isLarge ? 160 : 96;
  const height = isLarge ? 160 : 96;

  return (
    <div className={`relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105 ${className}`}>
      <Image 
        src="/assets/dnd-logo.png" 
        alt="DND Fine Dining Logo" 
        width={width} 
        height={height} 
        className="object-contain drop-shadow-sm"
        priority
      />
    </div>
  );
}

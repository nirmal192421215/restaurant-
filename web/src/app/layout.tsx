import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import MobileActions from "@/components/layout/MobileActions";
import ClientProviders from "@/components/layout/ClientProviders";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DND Fine Dining | Authentic South Indian Culinary Heritage",
  description: "Experience the finest South Indian flavors with our traditional Banana Leaf meals, live grills, and premium buffet. Where Every Meal Becomes a Memory.",
  keywords: ["South Indian Restaurant", "Fine Dining", "Banana Leaf Meals", "Tamil Nadu Cuisine", "DND Fine Dining", "Live Grill", "Buffet"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <ClientProviders>
          {children}
          <MobileActions />
        </ClientProviders>
      </body>
    </html>
  );
}


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
  openGraph: {
    title: "DND Fine Dining | Authentic South Indian Culinary Heritage",
    description: "Experience the finest South Indian flavors. Where Every Meal Becomes a Memory.",
    url: "https://restaurant-nk.vercel.app/",
    siteName: "DND Fine Dining",
    images: [
      {
        url: "/banana_leaf_full_feast_1778343522477.png",
        width: 1200,
        height: 630,
        alt: "DND Fine Dining - Traditional Banana Leaf Feast",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DND Fine Dining | South Indian Culinary Heritage",
    description: "Experience the finest South Indian flavors.",
    images: ["/banana_leaf_full_feast_1778343522477.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
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


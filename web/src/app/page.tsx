import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import OffersCarousel from "@/components/home/OffersCarousel";
import Reservation from "@/components/home/Reservation";
import MenuSystem from "@/components/home/MenuSystem";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Gallery from "@/components/home/Gallery";
import Loyalty from "@/components/home/Loyalty";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Reservation />
        <WhyChooseUs />
        <MenuSystem />
        <OffersCarousel />
        <Gallery />
        <Loyalty />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}




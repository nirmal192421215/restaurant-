"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useReservation } from "@/context/ReservationContext";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HERO_SLIDES = [
  {
    id: 1,
    title: "MINI MEALS",
    subtitle: "A quick, satisfying assortment of traditional mixed rice dishes.",
    price: "₹120",
    priceSub: "Per person",
    timing: "Everyday Lunch",
    image: "/assets/mini-meals.jpg",
    tagText: "QUICK LUNCH"
  },
  {
    id: 2,
    title: "VEG MEALS",
    subtitle: "Standard vegetarian thali for a wholesome everyday lunch.",
    price: "₹160",
    priceSub: "Per person",
    timing: "Everyday Lunch",
    image: "/assets/veg-meals.png",
    tagText: "WHOLESOME"
  },
  {
    id: 3,
    title: "FISH MEALS",
    subtitle: "Coastal style rice meal served with spicy fish curry and crispy fried anchovies.",
    price: "₹280",
    priceSub: "Per person",
    timing: "Coastal Special",
    image: "/assets/fish-meals.jpg",
    tagText: "SEAFOOD LOVERS"
  },
  {
    id: 4,
    title: "NON-VEG MEALS",
    subtitle: "Hearty meat-lovers thali served with rich gravies and boiled egg.",
    price: "₹220",
    priceSub: "Per person",
    timing: "Meat-lovers Special",
    image: "/assets/non-veg-meals.jpg",
    tagText: "HEARTY FEAST"
  }
];

// Floating particle canvas
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number; dAlpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed particles
    for (let i = 0; i < 38; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: -(Math.random() * 0.4 + 0.1),
        alpha: Math.random() * 0.35 + 0.05,
        dAlpha: (Math.random() - 0.5) * 0.003,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 104, 10, ${p.alpha})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
        p.alpha += p.dAlpha;

        if (p.alpha <= 0.02 || p.alpha >= 0.4) p.dAlpha *= -1;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      style={{ opacity: 0.7 }}
    />
  );
}

export default function Hero() {
  const { openDrawer } = useReservation();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">

      {/* ── LAYERED BACKGROUND SYSTEM ── */}

      {/* 1. Warm luxury base gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 120% 100% at 50% 40%, #FDF6EC 0%, #F5E6D3 45%, #EDD5B8 75%, #D4956A 100%)"
        }}
      />

      {/* 2. Cinematic vignette — darker edges */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(80,30,5,0.28) 100%)"
        }}
      />

      {/* 3. Ambient glow — top-right warm orange */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          top: "-10%",
          right: "-8%",
          width: "clamp(280px, 45vw, 600px)",
          height: "clamp(280px, 45vw, 600px)",
          background: "radial-gradient(circle, rgba(232,104,10,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* 4. Ambient glow — bottom-left golden */}
      <div
        className="absolute pointer-events-none z-[1]"
        style={{
          bottom: "-12%",
          left: "-8%",
          width: "clamp(250px, 40vw, 550px)",
          height: "clamp(250px, 40vw, 550px)",
          background: "radial-gradient(circle, rgba(251,192,45,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* 5. Subtle grain texture overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* 6. Floating particles */}
      <ParticleCanvas />

      {/* ── SWIPER STYLES ── */}
      <style dangerouslySetInnerHTML={{__html: `
        .hero-swiper {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 60px;
        }
        .hero-swiper .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 85%;
          max-width: 1100px;
          border-radius: 24px;
          filter: blur(3px) brightness(0.55) saturate(0.8);
          opacity: 0.7;
          transform: scale(0.93);
          transition: filter 0.5s ease, transform 0.5s ease, opacity 0.5s ease;
        }
        @media (min-width: 1024px) {
          .hero-swiper .swiper-slide {
            width: 72%;
          }
        }
        .hero-swiper .swiper-slide-active {
          filter: blur(0px) brightness(1) saturate(1);
          opacity: 1;
          transform: scale(1);
        }
        /* Orange border glow on active slide */
        .hero-swiper .swiper-slide-active > div {
          box-shadow: 0 0 0 2px rgba(232,104,10,0.55), 0 35px 70px rgba(0,0,0,0.38), 0 0 60px rgba(232,104,10,0.18);
        }
        .hero-swiper .swiper-pagination {
          bottom: 14px;
        }
        .hero-swiper .swiper-pagination-bullet {
          background-color: rgba(80,30,5,0.3);
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background-color: #E8680A;
          width: 32px;
          border-radius: 6px;
          box-shadow: 0 0 8px rgba(232,104,10,0.6);
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white;
          background: rgba(232,104,10,0.18);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(232,104,10,0.3);
          transition: background 0.25s ease, box-shadow 0.25s ease;
        }
        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
          color: #E8680A;
        }
        .hero-swiper .swiper-button-next:hover,
        .hero-swiper .swiper-button-prev:hover {
          background: rgba(232,104,10,0.55);
          box-shadow: 0 0 20px rgba(232,104,10,0.4);
        }
        .hero-swiper .swiper-button-next:hover:after,
        .hero-swiper .swiper-button-prev:hover:after {
          color: white;
        }

        /* Slide card hover zoom */
        .hero-card-img {
          transition: transform 2200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .swiper-slide-active .hero-card-img:hover {
          transform: scale(1.06);
        }

        /* Steam / smoke pulse */
        @keyframes steamRise {
          0%   { transform: translateY(0px) scaleX(1);   opacity: 0.12; }
          50%  { transform: translateY(-18px) scaleX(1.15); opacity: 0.07; }
          100% { transform: translateY(-36px) scaleX(0.9); opacity: 0; }
        }
        .steam-blob {
          animation: steamRise 3.5s ease-in-out infinite;
        }
        .steam-blob:nth-child(2) { animation-delay: 1.2s; }
        .steam-blob:nth-child(3) { animation-delay: 2.4s; }

        /* Floating glow blob animation */
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-14px) scale(1.04); }
        }
        .ambient-blob {
          animation: floatBlob 7s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .hero-swiper .swiper-slide {
            width: 90%;
            filter: blur(2px) brightness(0.6);
          }
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}} />

      {/* ── SWIPER CAROUSEL ── */}
      <div className="relative z-10 w-full">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 80,
            depth: 320,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          className="hero-swiper"
        >
          {HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full aspect-square md:aspect-[4/3] max-w-[800px] mx-auto rounded-[2rem] overflow-hidden bg-gray-900 group border border-white/10">

                {/* Full Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="hero-card-img w-full h-full object-cover"
                  />
                  {/* Rich bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  {/* Side vignette for depth */}
                  <div className="absolute inset-0"
                    style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)" }}
                  />
                </div>

                {/* Steam effect blobs */}
                <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 z-[5] pointer-events-none">
                  {[0,1,2].map(i => (
                    <div key={i} className="steam-blob absolute"
                      style={{
                        left: `${(i - 1) * 28}px`,
                        bottom: 0,
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "rgba(255,220,170,0.09)",
                        filter: "blur(12px)",
                      }}
                    />
                  ))}
                </div>

                {/* Orange glow inside card — active highlight */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[3] pointer-events-none"
                  style={{
                    width: "70%",
                    height: "35%",
                    background: "radial-gradient(ellipse at center bottom, rgba(232,104,10,0.22) 0%, transparent 75%)",
                    filter: "blur(18px)",
                  }}
                />

                {/* Content Overlay — Bottom aligned */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

                    {/* Left Side Info */}
                    <div className="flex-1">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFE082] font-semibold text-xs md:text-sm mb-4 uppercase tracking-widest shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-[#E8680A] animate-pulse" />
                        {slide.tagText}
                      </div>

                      <h2 className="text-white font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-3 drop-shadow-xl">
                        {slide.title}
                      </h2>

                      <p className="text-white/80 text-base md:text-lg max-w-md drop-shadow-md mb-2">
                        {slide.subtitle}
                      </p>

                      <p className="text-[#FFE082] text-sm md:text-base tracking-wide flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-[#FFE082]" />
                        {slide.timing}
                      </p>
                    </div>

                    {/* Right Side Pricing & Actions — glassmorphism card */}
                    <div
                      className="flex flex-col items-start md:items-end p-5 md:p-6 rounded-2xl shadow-2xl min-w-[220px]"
                      style={{
                        background: "rgba(10,5,2,0.45)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "1px solid rgba(232,104,10,0.25)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)"
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 border border-white bg-green-600 flex items-center justify-center rounded-[2px]">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                        {slide.id !== 2 && (
                          <div className="w-3 h-3 border border-white bg-red-600 flex items-center justify-center rounded-[2px]">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        )}
                        <span className="text-white/70 text-xs uppercase tracking-wider ml-1">Veg &amp; Non-Veg</span>
                      </div>

                      <div className="flex items-start text-white mb-1">
                        <span className="text-4xl md:text-5xl font-black text-[#FBC02D] tracking-tight"
                          style={{ textShadow: "0 0 20px rgba(251,192,45,0.4)" }}>
                          {slide.price}
                        </span>
                        <span className="text-xl md:text-2xl text-[#FBC02D] mt-1">*</span>
                      </div>

                      <p className="text-white/60 text-xs uppercase tracking-widest mb-5">{slide.priceSub}</p>

                      <button
                        onClick={openDrawer}
                        className="w-full text-white py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all active:scale-95"
                        style={{
                          background: "linear-gradient(135deg, #E8680A 0%, #CC5008 100%)",
                          boxShadow: "0 0 24px rgba(232,104,10,0.5), 0 4px 12px rgba(0,0,0,0.3)"
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 36px rgba(232,104,10,0.75), 0 4px 16px rgba(0,0,0,0.4)";
                          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(232,104,10,0.5), 0 4px 12px rgba(0,0,0,0.3)";
                          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                        }}
                      >
                        Reserve Table
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

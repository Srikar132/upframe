"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { RollingText } from "@/components/shared/rolling-text";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=500&auto=format&fit=crop",
    initialRotation: -20,
    x: -100,
    y: 15,
    zIndex: 10,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
    initialRotation: -10,
    x: -60,
    y: 0,
    zIndex: 20,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=500&auto=format&fit=crop",
    initialRotation: -5,
    x: -20,
    y: 5,
    zIndex: 30,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=500&auto=format&fit=crop",
    initialRotation: 5,
    x: 20,
    y: -5,
    zIndex: 40,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=500&auto=format&fit=crop",
    initialRotation: 10,
    x: 60,
    y: 0,
    zIndex: 50,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
    initialRotation: 20,
    x: 100,
    y: 15,
    zIndex: 60,
  },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Use a unique name to avoid any potential scope collision
      const isMobileView = window.innerWidth < 768;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobileView ? "+=250%" : "+=150%", // Extended runway for mobile horizontal scroll
          pin: true,
          scrub: 1.5,
        },
      });

      if (isMobileView) {
        // Mobile: Professional Horizontal Scroll
        // Start cards fanned out to the right side of the screen
        tl.set(cardsRef.current, {
          x: (i) => (i * 300) + 150,
          rotation: (i) => (i - 2.5) * 10,
          scale: 0.8,
        });

        // Deep horizontal displacement for a clear 'scrolling' feel
        tl.to(cardsRef.current, {
          x: (i) => (i * 300) - 1800,
          rotation: 0,
          scale: 1,
          ease: "none",
        });
      } else {
        // Desktop: High-End Expansion Logic
        const spreadMultiplier = 230;
        tl.to(cardsRef.current, {
          x: (i) => (i - (CARDS.length - 1) / 2) * spreadMultiplier,
          rotation: 0,
          y: 0,
          scale: 1,
          stagger: {
            each: 0.02,
            from: "center",
          },
          ease: "power2.inOut",
        });
      }

      // Parallax for Background Decorative Elements
      tl.to(".hero-bg-object", {
        scale: 1.1,
        yPercent: -5,
        ease: "none",
      }, 0);

      tl.to(".bg-text", {
        yPercent: 5,
        ease: "none",
      }, 0);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center pt-20"
    >
      {/* Main Heading - Fluid Typography with clamp() for smooth responsiveness */}
      <div className="relative z-20 flex flex-col items-center mb-[clamp(-15vh,-10vw,-4vh)] px-4 w-full overflow-visible">
          <h2 className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-[0.3em] font-black leading-[clamp(0.7,0.75,1)] md:leading-none tracking-[0.05rem] text-foreground text-center font-tomorrow uppercase whitespace-nowrap overflow-visible">
              <RollingText text="Crafted" className="text-[clamp(3.5rem,20vw,8rem)] md:text-[6vw]" />
              <RollingText text="Creative" className="text-[clamp(3.5rem,20vw,8rem)] md:text-[6vw]" />
              <RollingText text="Coding" className="text-[clamp(3.5rem,20vw,8rem)] md:text-[6vw]" />
          </h2>
      </div>

      {/* Background Hero Text */}
      <div className="bg-text absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 -translate-y-[6vh]">
        <h1 className="text-[clamp(10vw,20vw,25vw)] font-black text-foreground/[0.06] uppercase tracking-[-0.05em] leading-none whitespace-nowrap font-tomorrow">
          UPFRAME
        </h1>
      </div>

      {/* Background Decorative Object */}
      <div className="hero-bg-object absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none z-10">
        <div className="relative w-full h-full max-w-[1200px] aspect-square" />
      </div>

      {/* Cards Container - Fluid vertical positioning */}
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl mx-auto h-[400px] flex items-center justify-center z-20 mt-[clamp(12vh,15vh,38vh)] md:mt-[38vh]"
      >
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => { cardsRef.current[i] = el }}
            className={cn(
              "absolute w-[clamp(150px,25vw,210px)] aspect-square rounded-[1rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl transition-shadow duration-500 hover:shadow-primary/20 hover:border-primary/20 group",
            )}
            style={{
              zIndex: card.zIndex,
              transform: `rotate(${card.initialRotation}deg) translate(${card.x}px, ${card.y}px) scale(0.95)`,
            }}
          >
            <Image
              src={card.image}
              alt={`Abstract Art ${card.id}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 180px, 200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          </div>
        ))}
      </div>

      {/* Hero Bottom Information */}
      <div className="absolute bottom-5 left-10 right-10 flex justify-between items-end z-30">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
          </div>
        </div>

        <div className="hidden md:block">
          <p className="text-foreground/30 text-[10px] font-bold tracking-[0.2em] uppercase text-right leading-relaxed">
            Premium Digital Experience <br /> for modern brands.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

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
    image: "https://images.unsplash.com/photo-1635776062127-d3ad4af3da9e?q=80&w=500&auto=format&fit=crop",
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1.5,
        },
      });

      const isMobile = window.innerWidth < 768;
      // Restoring wide spread: 200px cards + ~40px gap = 240px multiplier
      const spreadMultiplier = isMobile ? 130 : 230;

      // Purely horizontal expansion
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

      // Parallax for Background Object
      tl.to(".hero-bg-object", {
        scale: 1.1,
        yPercent: -5,
        ease: "none",
      }, 0);

      // Parallax for Background Text
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
      {/* Main Heading - Fluid Typography "CRAFTED CREATIVE CODING" */}
      <div className="relative z-20 flex flex-col items-center mb-[-3.5vh] px-4">
          <h2 className="text-[7.5vw] md:text-[6.5vw] font-black leading-[1.9] tracking-[0.1rem] text-foreground text-center font-tomorrow uppercase whitespace-nowrap">
              Crafted Creative Coding
          </h2>
      </div>

      {/* Background Text - Shifted slightly up */}
      <div className="bg-text absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 -translate-y-[6vh]">
        <h1 className="text-[20vw] font-black text-foreground/[0.06] uppercase tracking-[-0.05em] leading-none whitespace-nowrap font-tomorrow">
          UPFRAME
        </h1>
      </div>

      {/* Background 3D Object */}
      <div className="hero-bg-object absolute inset-0 flex items-center justify-center opacity-50 pointer-events-none z-10">
        <div className="relative w-full h-full max-w-[1200px] aspect-square" />
      </div>

      {/* Cards Container - Positioned precisely below the text */}
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl mx-auto h-[400px] flex items-center justify-center z-20 mt-[38vh]"
      >
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => { cardsRef.current[i] = el }}
            className={cn(
              "absolute w-[200px] md:w-[210px] aspect-square rounded-[1rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl transition-shadow duration-500 hover:shadow-primary/20 hover:border-primary/20 group",
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

      {/* Bottom Info & Badge */}
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
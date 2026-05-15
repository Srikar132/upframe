"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { RollingText } from "@/components/shared/rolling-text";
import { HeroCards, CARDS } from "./hero-cards";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1.5,
          },
        });

        const cardWidth = 150;
        const gap = 3;
        const totalWidth = cardWidth + gap;

        // Phase 1: Match initial desktop position exactly
        tl.set(cardsRef.current, {
          x: (i) => CARDS[i].x,
          y: (i) => CARDS[i].y,
          rotation: (i) => CARDS[i].initialRotation,
          scale: 0.95,
        });

        // Phase 2: Converge into a neat row
        tl.to(cardsRef.current, {
          x: (i) => (i * totalWidth) + 20,
          rotation: 0,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
        });

        // Phase 3: Horizontal scroll
        const scrollDistance = (CARDS.length * totalWidth) - window.innerWidth + 40;
        tl.to(cardsRef.current, {
          x: (i) => (i * totalWidth) - scrollDistance,
          duration: 1.5,
          ease: "none",
        });

        // Common background animations
        tl.to(".hero-bg-object", { scale: 1.1, yPercent: -5, ease: "none" }, 0);
        tl.to(".bg-text", { yPercent: 5, ease: "none" }, 0);
      });

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1.5,
          },
        });

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

        tl.to(".hero-bg-object", { scale: 1.1, yPercent: -5, ease: "none" }, 0);
        tl.to(".bg-text", { yPercent: 5, ease: "none" }, 0);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center pt-20"
    >
      {/* Static Background Smoke Layers - Extreme Edge Accents (Light Theme Only) */}
      <div className="absolute -left-18 top-0 bottom-0 w-[200px] md:w-[300px] pointer-events-none opacity-60 dark:hidden">
        <Image src="/hero/smoke-left.png" alt="" fill className="object-contain object-left" priority />
      </div>
      <div className="absolute -right-20 top-0 bottom-0 w-[200px] md:w-[300px] pointer-events-none opacity-60 dark:hidden">
        <Image src="/hero/smoke-right.png" alt="" fill className="object-contain object-right" priority />
      </div>

      {/* Main Heading - Fluid Typography with clamp() for smooth responsiveness */}
      <div className="relative z-20 flex flex-col items-center mb-[clamp(-8vh,-5vw,-2vh)] px-4 w-full overflow-visible md:translate-y-[6vh]">
        <h2 className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-[0.3em] font-black leading-[clamp(0.7,0.75,1)] md:leading-none tracking-[0.05rem] text-foreground text-center font-tomorrow uppercase whitespace-nowrap overflow-visible">
          <RollingText text="Crafted" className="text-[clamp(3.5rem,20vw,8rem)] md:text-[6vw]" />
          <RollingText text="Creative" className="text-[clamp(3.5rem,20vw,8rem)] md:text-[6vw]" />
          <RollingText text="Coding" className="text-[clamp(3.5rem,20vw,8rem)] md:text-[6vw]" />
        </h2>
      </div>

      {/* Background Hero Text with Interactive Shimmer */}
      <div className="bg-text absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 -translate-y-[6vh]">
        {/* Base Static Layer */}
        <h1 className="text-[clamp(10vw,20vw,25vw)] font-black text-foreground/[0.06] uppercase tracking-[-0.05em] leading-none whitespace-nowrap font-tomorrow">
          UPFRAME
        </h1>

        {/* Interactive Shimmer Layer */}
        <h1
          className="absolute text-[clamp(10vw,20vw,25vw)] font-black uppercase tracking-[-0.05em] leading-none whitespace-nowrap font-tomorrow"
          style={{
            backgroundImage: "linear-gradient(135deg, #999999 0%, #e2e2e2 25%, #ffffff 50%, #e2e2e2 75%, #999999 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
          }}
        >
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
        className="relative w-full max-w-7xl mx-auto h-[400px] flex items-center justify-center z-20 mt-[clamp(5vh,8vh,38vh)] md:mt-[38vh]"
      >
        <HeroCards cardsRef={cardsRef} />
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
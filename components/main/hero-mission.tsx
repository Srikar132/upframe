"use client";

import React, { useRef } from "react";
import Image from "next/image";
import CustomButton from "@/components/ui/custom-button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroMission Component
 * Restyled as a premium centered pill with a custom background color.
 */
export const HeroMission = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scroll-triggered rotation for the globe
    gsap.to(globeRef.current, {
      rotation: 180,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, []);

  return (
    <section ref={containerRef} className="w-full h-screen flex items-center justify-center px-4 md:px-10">
      <div className="relative w-full max-w-6xl h-[500px] bg-[#5A5B56] rounded-[100px] md:rounded-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 px-8 md:px-24 overflow-hidden shadow-2xl">
        {/* Subtle texture or glow could be added here */}
        
        <div ref={globeRef} className="relative w-[clamp(140px,18vw,240px)] aspect-square shrink-0">
          <Image 
            src="/hero/globe.png" 
            alt="Rotating Globe" 
            fill 
            className="object-contain brightness-110 contrast-125" 
            priority 
          />
        </div>
        
        <div className="flex flex-col gap-10 max-w-2xl text-center md:text-left items-center md:items-start">
          <p className="text-white/80 text-xl md:text-2xl font-medium leading-[1.4] tracking-tight">
            At Upframe, we specialize in visionary design and high-performance digital experiences, 
            crafting scalable websites, applications, and intelligent solutions that elevate modern brands.
          </p>
          
          <CustomButton isFlowing className="w-[clamp(180px,22vw,240px)] h-auto py-5 md:py-6 bg-[#D4F242] text-black border-none">
            say okay
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

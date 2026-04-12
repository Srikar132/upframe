"use client";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";

const LINES = [
  { text: "SMALL TEAM", accent: false },
  { text: "ZERO COMPROMISE", accent: false },
  { text: "WE SHIP WEBSITES THAT LOAD FAST", accent: false },
  { text: "LOOK SHARP", accent: false },
  { text: "AND CONVERT", accent: false },
  { text: "NO FLUFF", accent: false },
  { text: "JUST US", accent: false },
  { text: "YOUR VISION..", accent: true },
];

gsap.registerPlugin(ScrollTrigger);

const WhatWeDo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  // Scoped: heading + lines
  useGSAP(() => {
    const heading = containerRef.current?.querySelector(".heading");
    const lines = containerRef.current?.querySelectorAll(".line");

    if (!heading || !lines) return;

    gsap.fromTo(
      heading,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    lines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: containerRef });

  // Unscoped: pin + scale tied to full section scroll
  useGSAP(() => {
    if (!imageWrapRef.current || !sectionRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {      
      gsap.fromTo(
        imageWrapRef.current,
        { scale: 1 },
        {
          scale: 1.55,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,  // pin starts when image hits viewport
            start: "center center",         // image center hits viewport center
            endTrigger: sectionRef.current, // scale completes at section bottom
            end: "bottom bottom",
            pin: true,                      // image freezes while section scrolls
            pinSpacing: false,              // section provides its own height
            scrub: 1.2,
          },
        }
      );
    });
    
    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        imageWrapRef.current,
        { scale: 0.4 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,  // pin starts when image hits viewport
            start: "center center",         // image center hits viewport center
            endTrigger: sectionRef.current, // scale completes at section bottom
            end: "bottom bottom",
            pin: true,                      // image freezes while section scrolls
            pinSpacing: false,              // section provides its own height
            scrub: 1.2,
          },
        }
      );
      
    })

  });

  return (
    // ⚠️ extra bottom padding gives scroll room for the pin to play out
    <section
      ref={sectionRef}
      className="bg-background w-full relative z-20 pb-[60vh]"
    >
      <div ref={containerRef} className="container py-10 flex items-center flex-col gap-10">

        {/* Eyebrow */}
        <div className="overflow-hidden">
          <span className="heading block opacity-0 text-sm font-thin tracking-[0.22em] uppercase text-muted-foreground">
            WHAT WE DO ?
          </span>
        </div>

        {/* Headline lines */}
        <div className="flex flex-wrap gap-x-5 gap-y-3 justify-center">
          {LINES.map(({ text, accent }, i) => (
            <div key={i} className="overflow-hidden">
              <h3 className={`line ${accent ? "text-primary" : ""} text-center opacity-0`}>
                {text}
              </h3>
            </div>
          ))}
        </div>

        {/* Cursive text */}
        <div className="w-full max-w-2xl mx-auto px-4">
          <p className="font-cursive p-xl p-content text-center">
            First, we learn your goals, users, and constraints. Then we rapidly
            design, build, and iterate — delivering sharp, fast-loading websites
            that look great and convert.
          </p>
        </div>

        {/* Image — inside container but pin is unscoped */}
        <div
          ref={imageWrapRef}
          className="relative w-full rounded-2xl aspect-video max-w-2xl bg-foreground mx-auto overflow-hidden"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/what-we-do.png"
            fill
            alt="UPFRAME at work"
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;
"use client";

import useIntro from "@/store/intro-store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const LINES = [
  { text: "WE BUILD", accent: false },
  { text: "DIGITAL", accent: false },
  { text: "PRODUCTS THAT", accent: false },
  { text: "GROW", accent: true },   // ← line break happens here naturally
  { text: "BUSINESSES", accent: false },
];


const Hero = () => {
  const completed = useIntro((s) => s.completed);
  const hasHydrated = useIntro((s) => s._hasHydrated); // ← subscribe, don't read once
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!hasHydrated) return;

    const tl = gsap.timeline({
      delay: completed ? 0 : 4, // no delay if intro already done
      defaults: { ease: "power3.out" },
    });

    tl.fromTo(
      ".hero-line",
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.3 }
    );

    tl.fromTo(
      ".hero-bar",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: containerRef, dependencies: [hasHydrated] }); // ← remove `completed` from deps

  return (
    <section
      ref={containerRef}
      className="w-full fixed inset-0 h-screen overflow-hidden  flex items-center justify-center bg-foreground text-background overflow-hidden z-10"
    >
      <div className="container  flex flex-wrap justify-center gap-x-5 gap-y-1">
        {LINES.map(({ text, accent }, i) => (
          <div
            key={i}
            className="overflow-hidden"
            /* force "GROW" onto its own row so FAST follows it */
            // style={i === 2 ? { flexBasis: "100%" } : undefined}
          >
            <h1
              className={`hero-line ${accent ? "text-primary" : ""} text-center opacity-0`}
            >
              {text}
            </h1>
          </div>
        ))}
      </div>

      <div className="absolute h-1/4  bg-gradient-to-t from-primary to-transparent inset-x-0 bottom-0">
        <div className="px-4! sm:px-6! lg:px-8! hero-bar w-full flex items-end flex-wrap py-2 lg:py-4  h-full justify-between opacity-0">
          <p className="p-inline p-base! lg:max-w-1/3">
            UPFRAME is a digital product agency that helps businesses grow.
            We are a team of experts in design, development, and marketing.
          </p>
          <p className="p-inline p-xs lg:max-w-1/2">
            SCROLL DOWN TO SEE OUR WORK
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
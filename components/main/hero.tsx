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

  }, { scope: containerRef, dependencies: [hasHydrated] }); // ← remove `completed` from deps

  return (
    <section
      ref={containerRef}
      className="w-full h-screen overflow-hidden  flex items-center justify-center overflow-hidden z-10!"
    >
      <div className="container relative h-full  flex flex-wrap justify-center gap-x-5 gap-y-1">

        {/* Corner marks */}
        {/* <span className="absolute top-6 left-6 w-4 h-4 border-t border-l border-foreground" />
        <span className="absolute top-6 right-6 w-4 h-4 border-t border-r border-foreground" />
        <span className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-foreground" />
        <span className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-foreground" /> */}


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

    </section>
  );
};

export default Hero;
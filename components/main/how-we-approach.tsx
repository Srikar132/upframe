"use client";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";

const LINES = [
  { text: "I BUILD WEBSITES FOR", accent: false },
  { text: "EXPERTISE-LED", accent: false },
  { text: "COMPANIES THAT MAKE", accent: false },
  { text: "THEIR VALUE", accent: false },
  { text: "UNDENIABLE", accent: false },
  { text: "AND", accent: false },
  { text: '"YES"', accent: true },
  { text: "INEVITABLE.", accent: false },
];

gsap.registerPlugin(ScrollTrigger);

const WhatWeDo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heading = containerRef.current?.querySelector(".heading");
    const lines = containerRef.current?.querySelectorAll(".line");

    if (!heading || !lines) return;

    // Heading — triggers once, no scrub
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

    // Lines — each reveals as it enters viewport
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

  return (
    <section
      ref={containerRef}
      className="min-h-screen mt-[100vh] text-background bg-foreground w-full relative z-20"
    >
      <div className="container flex items-center flex-col">
        <div className="overflow-hidden mt-20 mb-4">
          <span className="heading block opacity-0 text-sm font-thin">
            WHAT WE DO ?
          </span>
        </div>

        <div className="flex flex-wrap mt-20 gap-x-5 gap-y-1 justify-center">
          {LINES.map(({ text, accent }, i) => (
            <div
              key={i}
              className="overflow-hidden"
            >
              <h2
                className={`line ${accent ? "text-primary" : ""} text-center opacity-0`}
              >
                {text}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
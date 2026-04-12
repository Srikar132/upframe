"use client";

import useIntro from "@/store/intro-store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin, ScrollTrigger, SplitText } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

/* ─── Data ───────────────────────────────────── */
const LINES = [
  { text: "WE BUILD",      accent: false },
  { text: "DIGITAL",       accent: false },
  { text: "PRODUCTS THAT", accent: false },
  { text: "GROW",          accent: true  },
  { text: "BUSINESSES",    accent: false },
];

const MARQUEE_ITEMS = [
  "Brand Identity", "Web Design", "Digital Products",
  "Motion & Interaction", "Conversion-First", "React & Next.js",
  "Full-Stack Builds", "Brand Identity", "Web Design", "Digital Products",
  "Motion & Interaction", "Conversion-First", "React & Next.js",
  "Full-Stack Builds",
];

/* ─── SVG dot-grid (data URI) ─────────────────── */
const DOT_GRID = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Ccircle cx='1' cy='1' r='1.1' fill='%231B1A18' fill-opacity='0.07'/%3E%3C/svg%3E")`;

/* ══════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════ */
export default function Hero() {
  const completed   = useIntro((s) => s.completed);
  const hasHydrated = useIntro((s) => s._hasHydrated);

  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const splitRef    = useRef<SplitText | null>(null);

  /* ── Main GSAP setup ─────────────────────────── */
  useGSAP(() => {
    if (!hasHydrated) return;

    document.fonts.ready.then(() => {

      /* 1. SplitText — chars + words */
      const split = SplitText.create(".hero-line", {
        type:       "chars,words",
        charsClass: "hero-char",
      });
      splitRef.current = split;

      /* Stamp data-content on each char for scramble reset target */
      split.chars.forEach((c) => {
        gsap.set(c, { attr: { "data-content": (c as HTMLElement).innerHTML } });
      });

      const baseDelay = completed ? 0 : 4.3;

      /* 2. Entrance timeline */
      const tl = gsap.timeline({ delay: baseDelay, defaults: { ease: "power3.out" } });

      tl
        .from(split.chars, {
          y:        -90,
          opacity:  0,
          rotation: "random(-55, 55)",
          duration: 0.8,
          ease:     "back.out(1.5)",
          stagger:  { each: 0.028, from: "random" },
        }, "-=0.25")
        .fromTo(".hero-badge",
          { opacity: 0, scale: 0.6, rotation: -25 },
          { opacity: 1, scale: 1,   rotation: 0,  duration: 0.55, ease: "back.out(2.2)" },
          "-=0.35"
        )
        .fromTo(".hero-marquee-wrap",
          { opacity: 0 },
          { opacity: 1, duration: 0.55 },
          "-=0.2"
        );

      /* 4. Scroll parallax */
      ScrollTrigger.create({
        trigger:    sectionRef.current,
        start:      "top top",
        end:        "bottom top",
        scrub:      1.2,
        pin:        true,
        pinSpacing: false,
      });
    });

  }, { scope: sectionRef, dependencies: [hasHydrated] });

  return (
    <section
      ref={sectionRef}
      className="relative w-full transition-all duration-300 h-screen overflow-hidden flex flex-col items-center justify-center z-10 select-none"
      style={{ backgroundImage: DOT_GRID }}
    >

      {/* ══════════════════════════
          BADGE — top right
      ══════════════════════════ */}
      <div className="absolute top-20 right-10 z-10">
        <div className="hero-badge opacity-0 relative w-[84px] h-[84px] shrink-0">
          <svg
            viewBox="0 0 84 84"
            className="absolute inset-0 w-full h-full"
            style={{ animation: "badge-spin 13s linear infinite" }}
            aria-hidden
          >
            <defs>
              <path
                id="badge-arc"
                d="M 42,42 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0"
                fill="none"
              />
            </defs>
            <text
              fontSize="6.6"
              letterSpacing="3.0"
              fontFamily="var(--font-sans)"
              fontWeight="500"
              fill="#1B1A18"
              fillOpacity="0.25"
            >
              <textPath href="#badge-arc">
                AVAILABLE · UPFRAME · 2025 ·&nbsp;
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-[10px] rounded-full border border-foreground/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary/70" />
          </div>
        </div>
      </div>

      {/* ══════════════════════════
          CENTER — headline
      ══════════════════════════ */}
      <div
        ref={headlineRef}
        className="container relative z-10 flex-1 flex flex-col justify-center cursor-default"
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-0 2xl:gap-y-2">
          {LINES.map(({ text, accent }, i) => (
            <div key={i} className="overflow-hidden">
              <h1
                className={`hero-line leading-[0.88] tracking-tight text-center
                  ${accent ? "text-primary" : "text-foreground"}`}
              >
                {text}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════
          MARQUEE — bottom-right corner
          
          How it works:
          • Outer wrapper is a square (350×350) positioned at bottom:0 right:0
            with overflow-hidden — acts as the clipping mask.
          • Inner rail sits at bottom:0 right:0 of that wrapper (same corner),
            then rotates -45deg with transform-origin:"bottom right".
          • Rotating from that corner means the strip always touches the bottom
            wall AND the right wall, sweeping diagonally toward top-left.
          • Width 500px ensures the rotated text fills the full diagonal of the
            350px square (diagonal ≈ 495px).
      ══════════════════════════ */}
      <div
        className="z-10! hero-marquee-wrap opacity-0 absolute bottom-0 right-0 overflow-hidden pointer-events-none max-sm:hidden"
        style={{ width: "350px", height: "350px" }}
      >
        {/* Rail anchored to bottom-right, rotated -45deg from that corner */}
        <div
          className=" flex items-center "
          style={{
            transformOrigin: "bottom right",
            transform:       "rotate(-45deg)",
          }}
        >
          <div
            className="flex shrink-0 whitespace-nowrap"
            style={{ animation: "marquee-scroll 22s linear infinite" }}
          >
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-3">
                <span className="p-xs uppercase tracking-[0.15em] text-foreground font-medium">
                  {item}
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-primary/45 shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes badge-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hero-char {
          display: inline-block;
          will-change: transform, opacity;
        }
      `}</style>

    </section>
  );
}
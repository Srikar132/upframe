"use client";

import { useGSAP } from "@gsap/react";
import { useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";

const HoverText = forwardRef(function HoverText(
  {
    text,
    className = "",
  }: {
    text: string;
    className?: string;
  },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  const letters = text.split("");

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const top = el.querySelectorAll(".top .letter");
    const bottom = el.querySelectorAll(".bottom .letter");

    gsap.set(top, { yPercent: 0 });
    gsap.set(bottom, { yPercent: 120 });

    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(top, {
        yPercent: -120,
        stagger: 0.035,
        duration: 0.4,
        ease: "power3.inOut",
      })
      .to(
        bottom,
        {
          yPercent: 0,
          stagger: 0.035,
          duration: 0.4,
          ease: "power3.inOut",
        },
        0
      );
  }, []);

  // 👇 expose controls
  useImperativeHandle(ref, () => ({
    play: () => tl.current?.play(),
    reverse: () => tl.current?.reverse(),
  }));

  return (
    <div
      ref={containerRef}
      className={`relative inline-block overflow-hidden ${className}`}
    >
      <div className="top absolute left-0 top-0 w-full">
        {letters.map((l, i) => (
          <span key={i} className="letter inline-block">
            {l === " " ? "\u00A0" : l}
          </span>
        ))}
      </div>

      <div className="bottom">
        {letters.map((l, i) => (
          <span key={i} className="letter inline-block">
            {l === " " ? "\u00A0" : l}
          </span>
        ))}
      </div>
    </div>
  );
});

export default HoverText;
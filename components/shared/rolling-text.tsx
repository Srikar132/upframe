"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface RollingTextProps {
  text: string;
  className?: string;
}

/**
 * RollingText Component (High-Fidelity Version)
 * Optimized for fluid responsiveness and rapid interaction.
 * Prevents 'stuck' letters by meticulously managing GSAP tween lifecycles.
 */
export const RollingText = ({ text, className }: RollingTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const words = text.split(" ");

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const chars = containerRef.current.querySelectorAll(".interactive-char");
      
      chars.forEach((char) => {
        const onEnter = () => {
          gsap.killTweensOf(char);
          gsap.to(char, {
            scale: 1.15,
            y: -10,
            color: "var(--primary)",
            duration: 0.35,
            ease: "power2.out",
            zIndex: 50,
            overwrite: "auto",
          });
        };

        const onLeave = () => {
          gsap.killTweensOf(char);
          gsap.to(char, {
            scale: 1,
            y: 0,
            color: "inherit",
            duration: 0.35,
            ease: "power2.inOut",
            zIndex: 1,
            overwrite: "auto",
          });
        };

        char.addEventListener("mouseenter", onEnter);
        char.addEventListener("mouseleave", onLeave);
        // Touchend for mobile smoothness if hovered
        char.addEventListener("touchend", onLeave);
      });

      // Global container-level reset to ensure NO letters ever get stuck
      const resetAll = () => {
        gsap.killTweensOf(chars);
        gsap.to(chars, {
          scale: 1,
          y: 0,
          color: "inherit",
          duration: 0.4,
          ease: "power2.inOut",
          zIndex: 1,
          overwrite: "auto",
        });
      };

      containerRef.current.addEventListener("mouseleave", resetAll);
      window.addEventListener("blur", resetAll); // Reset if user switches tabs

      return () => {
        containerRef.current?.removeEventListener("mouseleave", resetAll);
        window.removeEventListener("blur", resetAll);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-flex flex-nowrap items-center justify-center cursor-default select-none whitespace-nowrap py-[clamp(10px,2vh,30px)]",
        className
      )}
      aria-label={text}
    >
      {words.map((word, wordIdx) => (
        <React.Fragment key={wordIdx}>
          <span className="inline-flex whitespace-nowrap overflow-visible">
            {word.split("").map((char, charIdx) => (
              <span
                key={charIdx}
                className="interactive-char inline-block relative px-[0.01em] transition-colors duration-300"
                style={{ transformOrigin: "bottom center" }}
              >
                {char}
              </span>
            ))}
          </span>
          {wordIdx < words.length - 1 && (
            <span className="inline-block px-[0.2em]">&nbsp;</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

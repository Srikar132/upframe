"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  isFlowing?: boolean;
}

const CustomButton = ({ children, className, isFlowing, ...props }: CustomButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  useGSAP(() => {
    if (isFlowing && marqueeRef.current) {
      const textWidth = marqueeRef.current.scrollWidth / 2;
      gsap.to(marqueeRef.current, {
        x: -textWidth,
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    }
  }, [isFlowing]);

  const onMouseEnter = contextSafe(() => {
    // Fill Animation
    gsap.to(fillRef.current, {
      y: "0%",
      duration: 0.4,
      ease: "power3.out",
    });
    
    // Text Color Transition
    if (isFlowing && marqueeRef.current) {
      gsap.to(marqueeRef.current.children, {
        color: "var(--primary)",
        duration: 0.4,
        ease: "power3.out",
      });
    } else if (textRef.current) {
      gsap.to(textRef.current, {
        color: "var(--primary)",
        duration: 0.4,
        ease: "power3.out",
      });
    }

    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });

  const onMouseLeave = contextSafe(() => {
    // Fill Reset
    gsap.to(fillRef.current, {
      y: "100%",
      duration: 0.4,
      ease: "power3.inOut",
    });
    
    // Text Color Reset
    if (isFlowing && marqueeRef.current) {
      gsap.to(marqueeRef.current.children, {
        color: "currentColor",
        duration: 0.4,
        ease: "power3.inOut",
      });
    } else if (textRef.current) {
      gsap.to(textRef.current, {
        color: "var(--primary-foreground)",
        duration: 0.4,
        ease: "power3.inOut",
      });
    }

    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power3.inOut",
    });
  });

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden group rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 px-8 py-4 border border-primary",
        isFlowing ? "bg-[#D4F242] text-black" : "bg-primary text-primary-foreground",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {/* Fill Layer - Responsive to theme via CSS variables or classes */}
      <div
        ref={fillRef}
        className="absolute inset-0 bg-white dark:bg-zinc-900 translate-y-[100%] pointer-events-none"
      />
      
      {isFlowing ? (
        <div className="relative flex items-center whitespace-nowrap overflow-hidden z-10">
          <div ref={marqueeRef} className="flex items-center gap-8">
            <span>{children}</span>
            <span>{children}</span>
            <span>{children}</span>
            <span>{children}</span>
            {/* Seamless loop duplicates */}
            <span>{children}</span>
            <span>{children}</span>
            <span>{children}</span>
            <span>{children}</span>
          </div>
        </div>
      ) : (
        <span 
          ref={textRef}
          className="relative z-10"
        >
          {children}
        </span>
      )}
    </button>
  );
};

export default CustomButton;

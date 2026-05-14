"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const CustomButton = ({ children, className, ...props }: CustomButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  const onMouseEnter = contextSafe(() => {
    gsap.to(fillRef.current, {
      y: "0%",
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(textRef.current, {
      color: "var(--primary)",
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(buttonRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(fillRef.current, {
      y: "100%",
      duration: 0.4,
      ease: "power3.inOut",
    });
    gsap.to(textRef.current, {
      color: "var(--primary-foreground)",
      duration: 0.4,
      ease: "power3.inOut",
    });
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
        "relative overflow-hidden group bg-primary rounded-full px-8 py-4 font-bold text-sm tracking-widest uppercase transition-all duration-300",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {/* Fill Layer */}
      <div
        ref={fillRef}
        className="absolute inset-0 bg-white translate-y-[100%] pointer-events-none"
      />
      
      {/* Content */}
      <span 
        ref={textRef}
        className="relative z-10 text-primary-foreground"
      >
        {children}
      </span>
    </button>
  );
};

export default CustomButton;

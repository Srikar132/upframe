"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<HTMLDivElement>(null);



  return (
    <section className="section bg-foreground text-background min-h-screen flex items-center rounded-2xl!">
      <div ref={containerRef} className="container common-padding mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">

        {/* Left: Image Stack */}
        <div className="relative order-2 lg:order-1">
          <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5] border border-white/10 shadow-2xl">
            <Image
              src="/about/office-team.png"
              alt="Modern Office Team"
              fill
              className="object-cover brightness-90 contrast-110"
            />
          </div>

          {/* Floating Purple Balls with Parallax */}
          {/* <div
            ref={ballsRef}
            className="absolute -top-16 -right-16 md:-top-24 md:-right-24 w-64 h-64 md:w-96 md:h-96 z-20 pointer-events-none filter drop-shadow-[0_20px_50px_rgba(124,93,250,0.4)]"
          >
            <Image
              src="/about/purple-balls.png"
              alt="Digital Connectivity Asset"
              fill
              className="object-contain"
            />
          </div> */}
        </div>

        {/* Right: Content Column */}
        <div className="flex flex-col gap-10 order-1 lg:order-2">
          {/* Reusing section-header pattern */}
          <div className="section-header !flex-col !items-start !mb-0 !gap-4">
            <div className="header-label text-background/50 ">
              About Us
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              Welcome to modern <br className="hidden md:block" /> time technology
            </h2>
          </div>

          <div className="flex flex-col gap-8 max-w-xl">
            <p className="text-lg md:text-xl text-background/70 leading-relaxed font-medium">
              Artificial Intelligence is all about teaching machines to think for themselves. Using advanced algorithms, AI helps computers learn, analyze, and respond just like a human would — making decisions faster and more accurately.
            </p>
            <p className="text-base md:text-lg text-background/50 leading-relaxed">
              AI can generally be categorized as either Narrow AI, optimized for specialized tasks like voice recognition or recommendation systems, or General AI, which aspires to match human intelligence by understanding and performing diverse tasks.
            </p>
          </div>

          {/* Standard Shadcn Button */}
          <Button size={"lg"} className="rounded-full w-fit">
            Contact Us
          </Button>
        </div>

      </div>
    </section>
  );
};

export default About;
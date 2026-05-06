"use client";

import { useRef, useId } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PRESETS = {
    ripple: { numOctaves: 3, seed: 2, freqMultiplier: 1 },
    melt:   { numOctaves: 5, seed: 8, freqMultiplier: 0.6 },
    wave:   { numOctaves: 2, seed: 5, freqMultiplier: 1.4 },
};

interface LiquidCardProps {
    src: string;
    alt: string;
    title?: string;
    subtitle?: string;
    /** Fixed CSS height (e.g. "420px"). Omit or pass "auto" for natural aspect-ratio. */
    width?: string;
    height?: string;
    /** Max-height guard when using natural aspect-ratio (e.g. "480px"). */
    maxHeight?: string;
    distortionStyle?: "ripple" | "melt" | "wave";
    baseFrequency?: number;
    displacementScale?: number;
    duration?: number;
    className?: string;
    onClick?: () => void;
}

export default function LiquidCard({
    src,
    alt,
    title,
    subtitle,
    width = "320px",
    height,
    maxHeight,
    distortionStyle = "ripple",
    baseFrequency = 0.015,
    displacementScale = 35,
    duration = 0.8,
    className = "",
    onClick,
}: LiquidCardProps) {
    const uid      = useId().replace(/:/g, "");
    const filterId = `liquid-filter-${uid}`;
    const clipId   = `liquid-clip-${uid}`;

    const turbRef     = useRef<SVGFETurbulenceElement>(null);
    const dispRef     = useRef<SVGFEDisplacementMapElement>(null);
    const wrapRef     = useRef<HTMLDivElement>(null);
    const imgInnerRef = useRef<HTMLDivElement>(null);

    const preset    = PRESETS[distortionStyle];
    const freq      = baseFrequency * preset.freqMultiplier;
    const autoMode  = !height || height === "auto";

    useGSAP(() => {
        const turb     = turbRef.current;
        const disp     = dispRef.current;
        const el       = wrapRef.current;
        const imgInner = imgInnerRef.current;
        if (!turb || !disp || !el) return;

        const state = { scale: 0, freq };

        const sync = () => {
            turb.setAttribute("baseFrequency", state.freq.toFixed(5));
            disp.setAttribute("scale",         state.scale.toFixed(3));
        };

        let enterTl: gsap.core.Timeline | null = null;
        let leaveTl: gsap.core.Timeline | null = null;

        const onEnter = () => {
            leaveTl?.kill();
            enterTl?.kill();

            enterTl = gsap.timeline()
                .to(state, {
                    scale: displacementScale,
                    freq: freq * 2,
                    duration: duration * 0.5,
                    ease: "power2.out",
                    onUpdate: sync,
                })
                .to(state, {
                    scale: displacementScale * 0.68,
                    freq: freq * 1.25,
                    duration: duration * 0.5,
                    ease: "sine.inOut",
                    onUpdate: sync,
                })
                .to(state, {
                    freq: freq * 1.55,
                    duration: 2,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    onUpdate: sync,
                });

            if (imgInner) {
                gsap.to(imgInner, { scale: 1.07, duration: duration * 1.4, ease: "power2.out" });
            }
        };

        const onLeave = () => {
            enterTl?.kill();
            leaveTl?.kill();

            leaveTl = gsap.timeline().to(state, {
                scale: 0,
                freq,
                duration: duration,
                ease: "power3.out",
                onUpdate: sync,
            });

            if (imgInner) {
                gsap.to(imgInner, { scale: 1, duration: duration, ease: "power3.out" });
            }
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);

        return () => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, { scope: wrapRef, dependencies: [distortionStyle, baseFrequency, displacementScale, duration] });

    return (
        <Card
            ref={wrapRef}
            onClick={onClick}
            className={cn("liquid-card-container p-0 gap-0 ring-0", className)}
            style={{ width, cursor: onClick ? "pointer" : "default" }}
        >
            {/* Hidden SVG filter */}
            <svg
                width="0"
                height="0"
                style={{ position: "absolute", pointerEvents: "none" }}
                aria-hidden
            >
                <defs>
                    <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        <rect x="0" y="0" width="1" height="1" rx="0.04" />
                    </clipPath>
                    <filter
                        id={filterId}
                        x="-20%"
                        y="-20%"
                        width="140%"
                        height="140%"
                        colorInterpolationFilters="linearRGB"
                    >
                        <feTurbulence
                            ref={turbRef}
                            type="turbulence"
                            baseFrequency={freq}
                            numOctaves={preset.numOctaves}
                            seed={preset.seed}
                            result="turbulence"
                        />
                        <feDisplacementMap
                            ref={dispRef}
                            in="SourceGraphic"
                            in2="turbulence"
                            scale={0}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Image wrapper — filter + clip applied here */}
            <div
                className="liquid-card-img-wrapper"
                style={{
                    ...(autoMode ? {} : { height }),
                    ...(autoMode && maxHeight ? { maxHeight } : {}),
                    position: "relative",
                    borderRadius: "var(--radius-xl)",
                    filter: `url(#${filterId})`,
                    clipPath: `url(#${clipId})`,
                }}
            >
                {autoMode ? (
                    /* Natural aspect-ratio: image drives its own height */
                    <div
                        ref={imgInnerRef}
                        className="w-full will-change-transform origin-center"
                    >
                        <Image
                            src={src}
                            alt={alt}
                            width={0}
                            height={0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="w-full h-auto block"
                            draggable={false}
                        />
                    </div>
                ) : (
                    /* Fixed height: fill the explicit container */
                    <div
                        ref={imgInnerRef}
                        className="absolute inset-0 w-full h-full will-change-transform origin-center"
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="liquid-card-img"
                            draggable={false}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}
            </div>

            {(title || subtitle) && (
                <div className="p-1">
                    {title    && <p className="liquid-card-title">{title}</p>}
                    {subtitle && <p className="liquid-card-subtitle">{subtitle}</p>}
                </div>
            )}
        </Card>
    );
}

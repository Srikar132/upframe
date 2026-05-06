"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
    title: string;
    description: string;
    image: string;
    bgColor: string;
    textColor?: string;
    className?: string;
    imageSize?: string;
    href?: string;
    /** When true: image fills right side as bg, text on left */
    imageBg?: boolean;
}


const services: ServiceCardProps[] = [
    {
        title: "Brand Identity",
        description: "Crafting legendary visual stories that define your market presence with premium aesthetics.",
        image: "/services/brand-design.png",
        bgColor: "var(--secondary)",
        textColor: "text-white",
        className: "col-span-1 lg:row-span-2 min-h-[490px]",
        imageSize: "h-28",
        href: "/services/brand-identity",
    },
    {
        title: "Technology Start-up Branding",
        description: "Your product may be groundbreaking, but without a strong brand it risks getting lost in the noise.",
        image: "/services/startup-branding.png",
        bgColor: "var(--muted)",
        textColor: "text-foreground",
        // spans 2 cols on lg, sits beside the first card
        className: "col-span-1 lg:col-span-2 lg:row-span-2 min-h-[490px]",
        imageBg: true,
        href: "/services/startup-branding",
    },
    {
        title: "Digital Marketing Campaigns",
        description: "Campaigns that capture attention, spark action, and convert with precision.",
        image: "/services/strategy.png",
        bgColor: "#fce4ec",
        textColor: "text-black",
        className: "col-span-1 row-span-1 min-h-[340px]",
        imageSize: "h-32",
        href: "/services/digital-marketing",
    },
    {
        title: "AI Technology Implementation",
        description: "AI has the power to transform your business — but only when implemented the right way.",
        image: "/services/web-apps.png",
        bgColor: "#d4f53c",
        textColor: "text-black",
        className: "col-span-1 row-span-1 min-h-[340px]",
        imageSize: "h-32",
        href: "/services/ai-technology",
    },
    {
        title: "Data Security Technology",
        description: "Robust protection against threats, breaches, and vulnerabilities for your business.",
        image: "/services/ux-design.png",
        bgColor: "var(--foreground)",
        textColor: "text-background",
        className: "col-span-1 row-span-1 min-h-[340px]",
        imageSize: "h-32",
        href: "/services/data-security",
    },
];

/* ─── Arrow Button ──────────────────────────────────────── */
const ArrowButton = ({ textColor }: { textColor?: string }) => (
    <Button
        size="icon"
        variant="ghost"
        className={cn(
            "absolute top-5 right-5 z-20 rounded-full  shrink-0",
            "bg-primary/15 hover:bg-primary/30 backdrop-blur-sm border border-white/20",
            "transition-colors duration-300 group/arrow",
            textColor
        )}
        aria-label="View service"
    >
        <ArrowUpRight
            size={16}
            className={cn(
                "transition-transform duration-300 ease-out",
                "group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5"
            )}
        />
    </Button>
);

/* ─── Service Card ──────────────────────────────────────── */
const ServiceCard = ({
    title,
    description,
    image,
    bgColor,
    textColor = "text-foreground",
    className,
    imageSize = "h-36",
    href = "#",
    imageBg = false,
}: ServiceCardProps) => {
    return (
        <Link
            href={href}
            className={cn(
                "service-card relative overflow-hidden rounded-[2rem] group cursor-pointer opacity-0 block",
                className
            )}
            style={{ backgroundColor: bgColor }}
        >
            <ArrowButton textColor={textColor} />

            {imageBg ? (
                /* ── Layout B: text on left, image fills right half ── */
                <div className="relative flex h-full min-h-[inherit]">
                    {/* Text */}
                    <div className="relative z-10 flex flex-col justify-between p-7 md:p-9 w-[48%] shrink-0">
                        <h4 className={cn("text-2xl md:text-3xl font-black leading-tight tracking-tight", textColor)}>
                            {title}
                        </h4>
                        <p className={cn("text-sm md:text-base opacity-70 font-medium leading-relaxed mt-4", textColor)}>
                            {description}
                        </p>
                    </div>
                    {/* Image — right half, absolute fill */}
                    <div
                        className={cn(
                            "absolute right-0 top-0 bottom-0 w-[58%] pointer-events-none overflow-hidden",
                            "transition-transform duration-700 ease-out",
                            "group-hover:scale-[1.04]"
                        )}
                    >
                        <Image
                            src={image}
                            alt={title}
                            fill
                            sizes="40vw"
                            className="object-cover object-center"
                            priority
                        />
                    </div>
                </div>
            ) : (
                /* ── Layout A: vertical stack — title → image → description ── */
                <div className="flex flex-col h-full min-h-[inherit] p-7 md:p-9">
                    <h4 className={cn("font-black leading-none tracking-tight  pr-10", textColor)}>
                        {title}
                    </h4>

                    {/* Image centered */}
                    <div className="flex-1 flex items-center justify-center py-4">
                        <div
                            className={cn(
                                "relative transition-transform duration-700 ease-out pointer-events-none w-full max-w-[200px]",
                                "group-hover:scale-110 group-hover:-rotate-6",
                                imageSize
                            )}
                        >
                            <Image
                                src={image}
                                alt={title}
                                fill
                                sizes="200px"
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    <p className={cn("text-sm md:text-base opacity-70 font-medium leading-relaxed", textColor)}>
                        {description}
                    </p>
                </div>
            )}
        </Link>
    );
};

/* ─── Section ───────────────────────────────────────────── */
const OurServices = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(".service-card");
            gsap.fromTo(
                cards,
                { y: 60, autoAlpha: 0, scale: 0.96 },
                {
                    y: 0,
                    autoAlpha: 1,
                    scale: 1,
                    duration: 1.0,
                    stagger: 0.12,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                        once: true,
                    },
                }
            );
        },
        { scope: sectionRef }
    );




    return (
        <section ref={sectionRef} className="section common-padding container mx-auto">
            {/* Header */}
            <div className="section-header">
                <div className="flex flex-col gap-2">
                    <div className="header-label">Our Services</div>
                    <h4 className="font-black max-w-3xl leading-[1.05] tracking-tight text-foreground">
                        Explore the amazing{" "}
                        <br className="hidden md:block" />
                        digital services
                    </h4>
                </div>
                <Button size={"lg"} className="rounded-full self-start md:self-auto">See All Projects</Button>
            </div>

            {/* Grid */}
            <div
                ref={containerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-flow-dense gap-4 md:gap-5"
            >
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
        </section>
    );
};

export default OurServices;
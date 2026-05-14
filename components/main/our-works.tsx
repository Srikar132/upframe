"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomButton from "../ui/custom-button";
import { Badge } from "@/components/ui/badge";
import LiquidCard from "@/components/shared/liquid-card";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    title: string;
    media: {
        image?: string;
        video?: string;
    };
    tags: string[];
}

// Replace src values with your Cloudinary URLs
const projects: Project[] = [
    {
        id: "1",
        title: "Holographic Earpod with casing design",
        media: { image: "/services/brand-design.png" },
        tags: ["Branding"],
    },
    {
        id: "2",
        title: "Futuristic Earbud Concept Design",
        media: { image: "/services/startup-branding.png" },
        tags: ["Fashion"],
    },
    {
        id: "3",
        title: "Crystal-Shell Earpod Style Concept",
        media: { image: "/services/strategy.png" },
        tags: ["Fashion"],
    },
    {
        id: "4",
        title: "Prismatic Earpod and Case Concept",
        media: { image: "/services/ux-design.png" },
        tags: ["Mockup"],
    },
];

// Even indices → left column, odd indices → right column (matches reference image order)
const leftCol = projects.filter((_, i) => i % 2 === 0);
const rightCol = projects.filter((_, i) => i % 2 === 1);

/* ─── Project Card ─────────────────────────────────────────── */
const ProjectCard = ({ project }: { project: Project }) => {
    const { media: { image, video }, title, tags } = project;

    return (
        <div className={cn(
            "project-card opacity-0",
            "bg-card rounded-[1.75rem] ring-1 ring-border overflow-hidden",
            "flex flex-col"
        )}>
            {/* Text */}
            <div className="p-6 lg:p-8 flex flex-col gap-3">
                <h4 className="font-black leading-tight tracking-tight">{title}</h4>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))}
                </div>
            </div>

            {/* Media — aspect ratio comes from the asset itself */}
            {video ? (
                <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto  object-cover block"
                />
            ) : image ? (
                <LiquidCard
                    src={image}
                    alt={title}
                    width="100%"
                />
            ) : null}
        </div>
    );
};

/* ─── Section ──────────────────────────────────────────────── */
const OurWorks = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const colsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // toArray picks up all .project-card across both columns
            const cards = gsap.utils.toArray<HTMLElement>(".project-card");
            gsap.fromTo(
                cards,
                { y: 60, autoAlpha: 0, scale: 0.96 },
                {
                    y: 0,
                    autoAlpha: 1,
                    scale: 1,
                    duration: 1.0,
                    stagger: 0.14,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: colsRef.current,
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
            <div className="mx-auto max-w-5xl section-header">
                <div className="flex flex-col gap-2">
                    <div className="header-label">Our Portfolio</div>
                    <h4 className="font-black max-w-3xl leading-[1.05] tracking-tight text-foreground">
                        Explore the amazing{" "}
                        <br className="hidden md:block" />
                        projects we have done
                    </h4>
                </div>
                <CustomButton className="self-start md:self-auto">
                    See All Projects
                </CustomButton>
            </div>

            {/*
             * Two independent flex columns — each column stacks its cards at
             * their own natural height, so no row-height synchronisation occurs.
             * This is the only pure-CSS way to achieve the masonry look without
             * a JS library.
             *
             * On mobile the two columns collapse to a single stacked column
             * (flex-col → each col div is full-width, stacked vertically).
             */}
            <div
                ref={colsRef}
                className="mx-auto max-w-5xl flex flex-col md:flex-row gap-4 md:gap-5"
            >
                {/* Left column: items 0, 2, 4 … */}
                <div className="flex-1 flex flex-col gap-4 md:gap-5">
                    {leftCol.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* Right column: items 1, 3, 5 … */}
                <div className="flex-1 flex flex-col gap-4 md:gap-5">
                    {rightCol.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurWorks;

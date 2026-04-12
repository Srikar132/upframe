"use client";

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OurWorks = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Pinning the wrapper inside the container is more stable in React
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            // Stay pinned for 200% of the viewport height
            // end: "+=200%", 
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        });

    }, { scope: containerRef }); 

    return (
        // The 'trigger' section needs height to give the scroll something to move through
        <div ref={containerRef} className="w-full">
            <section ref={wrapperRef} className="common-section-dark h-screen">
                <div className="container space-y-10 flex items-center justify-center">
                    <h5>Our Works Content</h5>
                </div>
            </section>
        </div>
    );
}

export default OurWorks;
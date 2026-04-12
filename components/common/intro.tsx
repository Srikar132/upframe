"use client";
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import useIntro from '@/store/intro-store';

gsap.registerPlugin(DrawSVGPlugin);

const Intro = () => {
    const completed = useIntro((s) => s.completed);
    const markCompleted = useIntro((s) => s.markCompleted);
    const hasHydrated = useIntro((s) => s._hasHydrated); // ← reactive subscription
    const containerRef = useRef<HTMLDivElement>(null);
    const topHalfRef = useRef<HTMLDivElement>(null);
    const bottomHalfRef = useRef<HTMLDivElement>(null);
    const topSvgRef = useRef<SVGSVGElement>(null);
    const bottomSvgRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {

        if (!hasHydrated) return;

        // 🚫 STOP if already completed
        if (completed) {
            if (containerRef.current) {
                containerRef.current.style.display = "none";
            }
            return;
        }

        

        const topPaths = topSvgRef.current?.querySelectorAll('path');
        const bottomPaths = bottomSvgRef.current?.querySelectorAll('path');
        if (!topPaths || !bottomPaths) return;

        const allTopPaths = [...topPaths];
        const allBottomPaths = [...bottomPaths];
        const allPaths = [...allTopPaths, ...allBottomPaths];

        // document.body.style.overflow = 'hidden';

        gsap.set(containerRef.current, { visibility: 'visible' });

        gsap.set(allPaths, {
            drawSVG: '0%',
            stroke: '#BFA97A',
            fill: '#BFA97A',
            fillOpacity: 0,
        });

        const tl = gsap.timeline({ delay: 0.4 });

        // Step 1: Draw outlines — both halves perfectly in sync
        tl.to(allTopPaths, {
            drawSVG: '100%',
            duration: 1.3,
            stagger: 0.12,
            ease: 'power2.inOut',
        });
        tl.to(allBottomPaths, {
            drawSVG: '100%',
            duration: 1.3,
            stagger: 0.12,
            ease: 'power2.inOut',
        }, '<');

        // Step 2: Fill — top and bottom halves fill simultaneously
        tl.to(allTopPaths, {
            fillOpacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
        }, '+=0.12');
        tl.to(allBottomPaths, {
            fillOpacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
        }, '<'); // same moment as top fill — no sequential fill

        // Step 3: Blink sequence
        // tl.to(allPaths, { fillOpacity: 0, stroke: 'transparent', duration: 0.09, ease: 'none' }, '+=0.22');
        tl.to(allPaths, { fillOpacity: 1, duration: 0.09, ease: 'none' });
        // tl.to(allPaths, { fillOpacity: 0, stroke: 'transparent',  duration: 0.09, ease: 'none' }, '+=0.09');
        // tl.to(allPaths, { fillOpacity: 1, stroke: '#BFA97A',      duration: 0.09, ease: 'none' });
        // tl.to(allPaths, { fillOpacity: 0, stroke: 'transparent',  duration: 0.07, ease: 'none' }, '+=0.07');
        // tl.to(allPaths, { fillOpacity: 1, stroke: '#BFA97A',      duration: 0.07, ease: 'none' });

        // Hold so the full logo breathes
        tl.to({}, { duration: 0.45 });

        // Step 4: Cinematic split
        // Ease: long slow anticipation (0–40%) → explosive acceleration (40–90%) → silk settle (90–100%)
        // cubic-bezier(0.65, 0, 0.1, 1) gives that "held breath → release" quality
        const splitEase = 'cubic-bezier(0.65, 0, 0.08, 1)';

        // Micro-fade as panels begin to separate — feels weightless, not mechanical
        tl.to([topHalfRef.current, bottomHalfRef.current], {
            duration: 0.2,
            ease: 'sine.in',
        });

        // Top panel flies up — leads by a hair so it feels intentional, not jittery
        tl.to(topHalfRef.current, {
            yPercent: -100,
            duration: 1.1,
            ease: splitEase,
        }, '-=0.08');

        // Bottom panel follows 30ms later — the slight offset creates a "peeling" sensation
        tl.to(bottomHalfRef.current, {
            yPercent: 100,
            duration: 1.1,
            ease: splitEase,
            onComplete: () => {
                gsap.set(containerRef.current, { visibility: 'hidden' });
                markCompleted();
            },
        }, '<+=0.03');

    }, { dependencies :  [hasHydrated, completed]});

    const W = 900;
    const H = 160;
    const svgStyle: React.CSSProperties = {
        width: 'clamp(280px, 72vw, 860px)',
        height: 'auto',
        display: 'block',
        flexShrink: 0,
    };

    return (
        <section
            ref={containerRef}
            style={{ visibility: 'hidden' }}
            className=" fixed inset-0 z-50 w-screen h-screen pointer-events-none"
        >
            {/* TOP HALF — SVG center sits at 50vh */}
            <div
                ref={topHalfRef}
                className="absolute inset-x-0 top-0 bg-foreground overflow-hidden"
                style={{ height: '50%' }}
            >
                <div
                    className="absolute inset-x-0 flex justify-center"
                    style={{ bottom: 0, transform: 'translateY(50%)' }}
                >
                    <svg
                        ref={topSvgRef}
                        viewBox={`0 0 ${W} ${H}`}
                        xmlns="http://www.w3.org/2000/svg"
                        style={svgStyle}
                    >
                        <SvgPaths />
                    </svg>
                </div>
            </div>

            {/* BOTTOM HALF — SVG center sits at 50vh */}
            <div
                ref={bottomHalfRef}
                className="absolute inset-x-0 bottom-0 bg-foreground overflow-hidden"
                style={{ height: '50%' }}
            >
                <div
                    className="absolute inset-x-0 flex justify-center"
                    style={{ top: 0, transform: 'translateY(-50%)' }}
                >
                    <svg
                        ref={bottomSvgRef}
                        viewBox={`0 0 ${W} ${H}`}
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                        style={svgStyle}
                    >
                        <SvgPaths />
                    </svg>
                </div>
            </div>
        </section>
    );
};

/**
 * SvgPaths — Barlow Condensed 800/900 letterforms
 *
 * Barlow Condensed Heavy characteristics:
 *  - Narrow set-width (~55% of cap height per glyph)
 *  - Flat/square terminals — true grotesque, no rounding
 *  - Stroke contrast is very low (nearly monolinear)
 *  - Large open counters in P, R despite heavy weight
 *  - M has a V-notch that drops to ~55% of cap height
 *  - A has a tall narrow form, crossbar ~45% from cap
 *  - E has a slightly shorter mid-bar than top/bottom
 *
 * ViewBox: 0 0 900 160
 * Cap height: y=10 to y=148 (138px total)
 * Approximate glyph widths: U=112, P=110, F=100, R=116, A=122, M=134, E=104
 * Total: ~798px, centered in 900px viewport
 */
const SvgPaths = () => (
    <>
        {/* U — x: 16 to 128 */}
        <path
            fillRule="nonzero"
            d="
              M 16 10 L 44 10
              L 44 98 Q 44 122 72 122 Q 100 122 100 98
              L 100 10 L 128 10
              L 128 100 Q 128 148 72 148 Q 16 148 16 100
              Z
            "
            strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
        />

        {/* P — x: 142 to 254
            Large round bowl. Counter (white eye) punched out via evenodd.
        */}
        <path
            fillRule="evenodd"
            d="
              M 142 148 L 142 10 L 196 10
              Q 254 10 254 72 Q 254 128 196 128 L 170 128 L 170 148
              Z
              M 170 36 L 170 102 L 193 102
              Q 226 102 226 69 Q 226 36 193 36
              Z
            "
            strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
        />

        {/* F — x: 268 to 366 */}
        <path
            fillRule="nonzero"
            d="
              M 268 148 L 268 10 L 366 10 L 366 36
              L 296 36 L 296 76 L 356 76 L 356 102
              L 296 102 L 296 148
              Z
            "
            strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
        />

        {/* R — x: 380 to 498
            Bowl same proportion as P. Leg is straight diagonal.
        */}
        <path
            fillRule="evenodd"
            d="
              M 380 148 L 380 10 L 432 10
              Q 490 10 490 66 Q 490 104 458 116
              L 494 148 L 462 148
              L 428 116 L 408 116 L 408 148
              Z
              M 408 36 L 408 92 L 430 92
              Q 462 92 462 64 Q 462 36 430 36
              Z
            "
            strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
        />

        {/* A — x: 506 to 630
            Pointed apex. Crossbar at y=92 (~59% from top).
            evenodd punches the counter triangle above the crossbar.
        */}
        <path
            fillRule="evenodd"
            d="
              M 506 148 L 552 10 L 582 10 L 628 148 L 598 148
              L 585 108 L 549 108 L 536 148
              Z
              M 555 88 L 579 88 L 567 36
              Z
            "
            strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
        />

        {/* M — x: 642 to 778
            Outer verticals are full-height. Inner V apex at y=88.
        */}
        <path
            fillRule="nonzero"
            d="
              M 642 148 L 642 10 L 668 10
              L 710 88 L 752 10 L 778 10
              L 778 148 L 750 148
              L 750 60 L 722 116 L 698 116
              L 670 60 L 670 148
              Z
            "
            strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
        />

        {/* E — x: 792 to 886 */}
        <path
            fillRule="nonzero"
            d="
              M 792 148 L 792 10 L 886 10 L 886 36
              L 820 36 L 820 76 L 878 76 L 878 102
              L 820 102 L 820 122 L 886 122 L 886 148
              Z
            "
            strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
        />
    </>
);

export default Intro;
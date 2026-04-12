"use client";
import React from 'react'
import Button from '../ui/button'
import HoverText from '../common/hover-text'
import Link from 'next/link';
import { ArrowDownIcon } from '@phosphor-icons/react';

const SayOkay = () => {
    const sayOkayTextRef = React.useRef<any>(null);

    return (
        <section className='common-section-light'>
            <div className="flex-1 common-padding flex flex-col justify-center items-center gap-12 rounded-2xl! container min-h-[90vh] common-section-dark relative overflow-hidden">

                {/* Corner marks */}
                <span className="absolute top-6 left-6 w-4 h-4 border-t border-l border-primary/25" />
                <span className="absolute top-6 right-6 w-4 h-4 border-t border-r border-primary/25" />
                <span className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-primary/25" />
                <span className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-primary/25" />

                {/* Eyebrow */}
                <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <p className="font-thin tracking-[0.22em] uppercase text-sm text-muted-foreground">
                        Want to work with us?
                    </p>
                </div>

                {/* Headline */}
                <h2 className="inline text-center">
                    HE<span className="text-primary">LL</span>O.
                </h2>

                {/* Subtext */}
                <p className='p-inline p-base text-center max-w-lg font-light lowercase uppercase'>
                    We craft digital products that are fast, thoughtful, and built to make an impact. 
                    <span className='p-base lowercase font-cursive text-xl'> Let's build yours.</span>
                    {/* <ArrowDownIcon className='inline animate-bounce' /> */}
                </p>

                {/* CTA Button */}
                {/* CTA Button */}
                <Button
                    className='bg-white p-7 max-h-fit rounded-2xl! transition-all ease-linear duration-200 relative'
                    animationRef={sayOkayTextRef}
                >

                    <HoverText
                        ref={sayOkayTextRef}
                        className="w-full text-foreground font-heading whitespace-nowrap text-center font-bold uppercase text-[7vw] px-5"
                        text="SAY OKAY"
                    />

                    <h2 className="absolute  group-hover:scale-125! transform-content transition-all duration-300 ease-in-out  -top-3 -right-5 -md:right-10 text-orange-700 font-cursive">
                        #
                    </h2>
                </Button>

                {/* Below button row */}
                <div className="flex items-center gap-6 mt-1">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        Available for new projects
                    </span>
                </div>
            </div>
        </section >
    )
}

export default SayOkay
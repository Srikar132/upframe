"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import HoverText from "./hover-text";
import Button from "@/components/ui/button";
import Menu from "./menu";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuTextRef = useRef<any>(null);
    const letsTalkTextRef = useRef<any>(null);
    const menuRef = useRef<HTMLDivElement>(null);


    return (
        <>
            <nav className="w-full h-18 lg:h-20  fixed top-0 left-0 z-30!">
                <div className="px-4! sm:px-6! lg:px-8! py-2 lg:py-4 w-full h-full grid grid-cols-2 lg:grid-cols-3 items-center  on-cream-bg">

                    {/* LEFT - LOGO */}
                    <Link href="/" className="item logo h-full flex items-center rounded-lg  px-4 place-self-start">
                        <h4 className="font-semibold leading-none">UF</h4>
                    </Link>

                    {/* CENTER - MENU BUTTON */}
                    <Button
                        onClick={() => setMenuOpen(!menuOpen)}
                        animationRef={menuTextRef}
                        className="item place-self-end lg:place-self-center"
                    >
                        <HoverText ref={menuTextRef} text="MENU" className="tracking-wide" />

                        <div className="flex flex-col justify-center items-center w-6 h-full">
                            <span className="block w-7 h-[1.5px] bg-current mb-[5px]" />
                            <span className="block w-7 h-[1.5px] bg-current mb-[5px]" />
                            <span className="block w-7 h-[1.5px] bg-current" />
                        </div>
                    </Button>

                    {/* RIGHT - CTA */}
                    <Button
                        href="/contact"
                        animationRef={letsTalkTextRef}
                        className="item max-lg:hidden place-self-end"
                    >
                        <HoverText ref={letsTalkTextRef} text="CONTACT US!." />
                    </Button>

                </div>

            </nav>

            {/* <Menu ref={menuRef} className="" /> */}
        </>
    );
};

export default Navbar;
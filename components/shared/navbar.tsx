"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import HoverText from "./hover-text";
import { Button } from "@/components/ui/button";
import Menu from "./menu";
import { ThemeToggle } from "./theme-toggle";
import CustomButton from "@/components/ui/custom-button";
import gsap from "gsap";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const lastScrollY = useRef(0);
    const isHidden = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY.current;

            if (scrollingDown && currentScrollY > 150) {
                if (!isHidden.current) {
                    gsap.to(navRef.current, {
                        y: "-150%",
                        duration: 0.5,
                        ease: "power3.inOut"
                    });
                    isHidden.current = true;
                }
            } else if (!scrollingDown || currentScrollY < 50) {
                if (isHidden.current) {
                    gsap.to(navRef.current, {
                        y: "0%",
                        duration: 0.5,
                        ease: "power3.out"
                    });
                    isHidden.current = false;
                }
            }
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav
                ref={navRef}
                className="w-full fixed top-6 left-0 z-50 px-4 will-change-transform"
            >
                <div className="max-w-7xl mx-auto h-16 md:h-20 bg-white dark:bg-zinc-800/30 backdrop-blur-xl rounded-full flex items-center justify-between px-6 md:px-8 shadow-2xl transition-all duration-500">

                    {/* LEFT - LOGO */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-black text-primary-foreground transition-transform duration-500">
                            UF
                        </div>
                        <span className="font-bold text-xl tracking-tight text-foreground hidden md:block">UPFRAME</span>
                    </Link>

                    {/* CENTER - LINKS */}
                    <div className="hidden lg:flex items-center gap-10">
                        {["Home", "Services", "Portfolio", "About"].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT - CTA & MENU */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <CustomButton
                            className="hidden md:flex"
                        >
                            CONTACT US
                        </CustomButton>

                        <Button
                            onClick={() => setMenuOpen(!menuOpen)}
                            variant="ghost"
                            size="icon"
                            className="text-foreground hover:bg-foreground/10 rounded-full"
                        >
                            <div className="flex flex-col gap-1.5 w-6">
                                <span className="block w-full h-px bg-foreground" />
                                <span className="block w-full h-px bg-foreground" />
                            </div>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* <Menu ref={menuRef} className="" /> */}
        </>
    );
};

export default Navbar;
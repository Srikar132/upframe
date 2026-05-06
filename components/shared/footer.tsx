"use client";

import Link from "next/link";

/* ─────────────────────────────────────────────
   UPFRAME SVG — same letterform paths from intro.tsx
   ViewBox: 0 0 900 160
   ───────────────────────────────────────────── */
const UpframeSVG = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 900 160"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="UPFRAME"
  >
    {/* U */}
    <path
      fillRule="nonzero"
      d="M 16 10 L 44 10 L 44 98 Q 44 122 72 122 Q 100 122 100 98 L 100 10 L 128 10 L 128 100 Q 128 148 72 148 Q 16 148 16 100 Z"
      strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
    />
    {/* P */}
    <path
      fillRule="evenodd"
      d="M 142 148 L 142 10 L 196 10 Q 254 10 254 72 Q 254 128 196 128 L 170 128 L 170 148 Z M 170 36 L 170 102 L 193 102 Q 226 102 226 69 Q 226 36 193 36 Z"
      strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
    />
    {/* F */}
    <path
      fillRule="nonzero"
      d="M 268 148 L 268 10 L 366 10 L 366 36 L 296 36 L 296 76 L 356 76 L 356 102 L 296 102 L 296 148 Z"
      strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
    />
    {/* R */}
    <path
      fillRule="evenodd"
      d="M 380 148 L 380 10 L 432 10 Q 490 10 490 66 Q 490 104 458 116 L 494 148 L 462 148 L 428 116 L 408 116 L 408 148 Z M 408 36 L 408 92 L 430 92 Q 462 92 462 64 Q 462 36 430 36 Z"
      strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
    />
    {/* A */}
    <path
      fillRule="evenodd"
      d="M 506 148 L 552 10 L 582 10 L 628 148 L 598 148 L 585 108 L 549 108 L 536 148 Z M 555 88 L 579 88 L 567 36 Z"
      strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
    />
    {/* M */}
    <path
      fillRule="nonzero"
      d="M 642 148 L 642 10 L 668 10 L 710 88 L 752 10 L 778 10 L 778 148 L 750 148 L 750 60 L 722 116 L 698 116 L 670 60 L 670 148 Z"
      strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
    />
    {/* E */}
    <path
      fillRule="nonzero"
      d="M 792 148 L 792 10 L 886 10 L 886 36 L 820 36 L 820 76 L 878 76 L 878 102 L 820 102 L 820 122 L 886 122 L 886 148 Z"
      strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"
    />
  </svg>
);

/* ─────────────────────────────────────────────
   NAV LINK — underline-on-hover
   ───────────────────────────────────────────── */
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="group relative inline-block text-foreground/70 hover:text-foreground transition-colors duration-200"
  >
    {children}
    <span className="absolute left-0 -bottom-px h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
  </Link>
);

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="common-section-light w-full py-0! overflow-hidden">

      {/* ── Top rule ── */}
      <div className="container">
        <div className="w-full h-px bg-foreground/10" />
      </div>

      {/* ── Main content grid ── */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-0">

          {/* COL 1 — Brand blurb */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5 md:pr-10">
            <p className="p-sm text-foreground/40 uppercase tracking-[0.18em]">(Studio)</p>
            <p className="p-base text-foreground/60 leading-relaxed max-w-[22ch]">
              Small team. Zero compromise. We build digital products that convert.
            </p>
            {/* Availability pill */}
            <span className="inline-flex items-center gap-2 w-fit border border-foreground/10 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="p-xs text-foreground/50 uppercase tracking-widest">Available</span>
            </span>
          </div>

          {/* COL 2 — Menu */}
          <div className="flex flex-col gap-5">
            <p className="p-sm text-foreground/40 uppercase tracking-[0.18em]">(Menu)</p>
            <nav className="flex flex-col gap-3">
              {["Home", "Portfolio", "Process", "About", "Contact"].map((item) => (
                <NavLink key={item} href={`#${item.toLowerCase()}`}>
                  <span className="p-base font-medium">{item}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* COL 3 — Socials */}
          <div className="flex flex-col gap-5">
            <p className="p-sm text-foreground/40 uppercase tracking-[0.18em]">(Socials)</p>
            <nav className="flex flex-col gap-3">
              {[
                { label: "Instagram", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "Dribbble", href: "#" },
                { label: "Twitter / X", href: "#" },
              ].map(({ label, href }) => (
                <NavLink key={label} href={href}>
                  <span className="p-base font-medium">{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* COL 4 — Contact */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5 md:items-end md:text-right">
            <p className="p-sm text-foreground/40 uppercase tracking-[0.18em]">(Say "Hello")</p>
            <a
              href="mailto:hello@upframe.studio"
              className="group relative inline-block p-base font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              hello@upframe.studio
              <span className="absolute left-0 -bottom-px h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="tel:+919999999999"
              className="group relative inline-block p-sm text-foreground/40 hover:text-foreground/60 transition-colors duration-200"
            >
              +91 99999 99999
              <span className="absolute left-0 -bottom-px h-px w-0 bg-foreground/40 transition-all duration-300 group-hover:w-full" />
            </a>

            {/* Location */}
            <p className="p-xs text-foreground/30 uppercase tracking-widest mt-auto">
              Hyderabad, IN
            </p>
          </div>

        </div>
      </div>

      {/* ── Mid rule ── */}
      <div className="container">
        <div className="w-full h-px bg-foreground/10" />
      </div>

      {/* ── UPFRAME wordmark + copyright ── */}
      <div className="container pt-6 pb-0 flex flex-col gap-1">

        {/* Copyright row */}
        <div className="flex items-center justify-between">
          <p className="p-xs text-foreground/30 uppercase tracking-widest">
            © {year} UPFRAME. All rights reserved.
          </p>
          <p className="p-xs text-foreground/30 uppercase tracking-widest max-sm:hidden">
            Crafted with precision.
          </p>
        </div>

        {/* Giant wordmark SVG — flush to bottom */}
        <div className="w-full -mb-[6%]">
          <UpframeSVG className="w-full h-auto fill-foreground/[0.06] stroke-foreground/[0.06]" />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
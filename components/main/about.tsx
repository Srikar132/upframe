"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: "What problem does your startup solve?",
    a: "We eliminate the gap between ambitious ideas and real-world execution. Our platform connects strategy to action, giving teams the clarity and velocity to ship what matters most — consistently and at scale.",
  },
  {
    q: "Who is your ideal customer?",
    a: "Growth-stage startups and innovation teams inside enterprises who need more than project management. They need a system that thinks alongside them and surfaces the right priorities at every stage.",
  },
  {
    q: "How is this different from existing tools?",
    a: "Most tools track work. We accelerate outcomes. Our intelligence layer adapts to your team's rhythm — not just dashboards, but genuine operational clarity at every level of the organisation.",
  },
  {
    q: "Is the platform available now?",
    a: "We are in an exclusive early-access program with select design partners. Applications are open — we onboard thoughtfully, ensuring every partner gets real, founder-level attention.",
  },
  {
    q: "What is your funding and growth trajectory?",
    a: "We are backed by operators-turned-investors who have built category-defining companies. Our north star is sustainable, compounding growth — not vanity metrics or hollow valuations.",
  },
  {
    q: "How do you handle data privacy and security?",
    a: "Data privacy is non-negotiable for us. We are SOC2 Type II compliant, all data is encrypted at rest and in transit, and we never share user data with third parties. Your data is always yours.",
  },
];

const About = () => {
  const faqItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const openIdxRef = useRef<number | null>(null);

  useGSAP(() => {
          faqItemsRef.current.forEach((item, i) => {
        if (!item) return;
        const panel = item.querySelector<HTMLDivElement>(".faq-panel")!;
        const content = item.querySelector<HTMLDivElement>(".faq-content")!;
        const bar = item.querySelector<HTMLDivElement>(".faq-bar")!;
        const ph = item.querySelector<HTMLSpanElement>(".faq-ph")!;
        const pv = item.querySelector<HTMLSpanElement>(".faq-pv")!;
        const words = item.querySelectorAll<HTMLSpanElement>(".faq-word");
        const numEl = item.querySelector<HTMLSpanElement>(".faq-num")!;

        gsap.set(panel, { height: 0 });
        gsap.set(content, { opacity: 0 });
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

        gsap.from(item.querySelector(".faq-trigger"), {
          opacity: 0,
          x: -50,
          duration: 0.85,
          delay: i * 0.07,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 93%" },
        });

        const openItem = () => {
          gsap
            .timeline()
            .to(panel, { height: "auto", duration: 0.6, ease: "expo.out" })
            .to(bar, { scaleX: 1, duration: 0.65, ease: "expo.out" }, "-=0.5")
            .to(content, { opacity: 1, duration: 0.28, ease: "power2.out" }, "-=0.3")
            .to(
              words,
              { opacity: 1, y: 0, stagger: 0.018, duration: 0.5, ease: "power3.out" },
              "-=0.18",
            );
          gsap.to(ph, { rotation: 45, duration: 0.32, ease: "back.out(2)" });
          gsap.to(pv, { rotation: 135, duration: 0.32, ease: "back.out(2)" });
          gsap.to(numEl, { color: "#111", duration: 0.25 });
          openIdxRef.current = i;
        };

        const closeItem = (el: HTMLDivElement) => {
          const p2 = el.querySelector<HTMLDivElement>(".faq-panel")!;
          const c2 = el.querySelector<HTMLDivElement>(".faq-content")!;
          const b2 = el.querySelector<HTMLDivElement>(".faq-bar")!;
          const h2 = el.querySelector<HTMLSpanElement>(".faq-ph")!;
          const v2 = el.querySelector<HTMLSpanElement>(".faq-pv")!;
          const n2 = el.querySelector<HTMLSpanElement>(".faq-num")!;
          const w2 = el.querySelectorAll<HTMLSpanElement>(".faq-word");
          gsap
            .timeline()
            .to(c2, { opacity: 0, duration: 0.2 })
            .to(p2, { height: 0, duration: 0.48, ease: "expo.in" }, "-=0.1")
            .to(b2, { scaleX: 0, duration: 0.35, ease: "expo.in" }, "-=0.4");
          gsap.to(h2, { rotation: 0, duration: 0.28 });
          gsap.to(v2, { rotation: 90, duration: 0.28 });
          gsap.to(n2, { color: "rgba(17,17,17,.22)", duration: 0.25 });
          gsap.set(w2, { opacity: 0, y: 10 });
        };

        item.querySelector(".faq-trigger")?.addEventListener("click", () => {
          if (openIdxRef.current === i) {
            closeItem(item);
            openIdxRef.current = null;
          } else {
            if (openIdxRef.current !== null)
              closeItem(faqItemsRef.current[openIdxRef.current]!);
            openItem();
          }
        });
    });
  })

  return (
    <section className='common-section-light min-h-screen overflow-hidden'>
      <div className="container text-center ">
        <span className="text-center mx-auto font-heading font-bold uppercase tracking-tight leading-none text-[20vw]!">
          ABOUT
        </span>
        <p className="text-center w-full p-xl p-content">
          We are a team of passionate builders, designers, and strategists on a mission to empower startups to ship faster and smarter. With years of experience at the intersection of product development and operational excellence, we understand the unique challenges that growth-stage companies face. We believe that great ideas deserve great execution, and we're here to make that a reality for our customers.
        </p>

        
        {/* Right */}
        <div>
          {faqs.map((item, i) => (
            <div
              key={i}
              ref={(el) => { faqItemsRef.current[i] = el; }}
              className="faq-item relative border-t border-black/10 last:border-b last:border-black/10"
            >
              <div
                className="faq-bar absolute left-0 top-[-1px] h-[2px] w-full bg-black"
                style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
              />
              <button className="faq-trigger flex w-full items-center justify-between gap-5 py-6 text-left">
                <span className="flex items-start gap-4">
                  <span
                    className="faq-num font-mono text-[11px] font-bold pt-[3px] min-w-[2rem]"
                    style={{ color: "rgba(17,17,17,.22)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[clamp(14px,1.8vw,18px)] font-bold text-black leading-[1.3] tracking-[-0.015em] transition-opacity hover:opacity-60">
                    {item.q}
                  </span>
                </span>
                <span className="relative h-[22px] w-[22px] flex-shrink-0">
                  <span className="faq-ph absolute left-0 top-1/2 h-[2px] w-[22px] -translate-y-1/2 rounded-full bg-black" />
                  <span
                    className="faq-pv absolute left-1/2 top-0 h-[22px] w-[2px] -translate-x-1/2 rounded-full bg-black"
                    style={{ transform: "translateX(-50%)" }}
                  />
                </span>
              </button>
              <div className="faq-panel overflow-hidden" style={{ height: 0 }}>
                <div className="faq-content pb-6 pl-[calc(2rem+16px)]" style={{ opacity: 0 }}>
                  <p
                    className="text-[14px] font-medium leading-[1.85] text-black/58"
                    style={{ fontFamily: "Arial,sans-serif" }}
                  >
                    {item.a.split(" ").map((w, wi) => (
                      <span
                        key={wi}
                        className="faq-word inline-block mr-[0.26em]"
                        style={{ opacity: 0, transform: "translateY(10px)" }}
                      >
                        {w}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About;
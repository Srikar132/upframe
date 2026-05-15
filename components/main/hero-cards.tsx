"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const CARDS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=500&auto=format&fit=crop",
    initialRotation: -20,
    x: -100,
    y: 15,
    zIndex: 10,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
    initialRotation: -10,
    x: -60,
    y: 0,
    zIndex: 20,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=500&auto=format&fit=crop",
    initialRotation: -5,
    x: -20,
    y: 5,
    zIndex: 30,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=500&auto=format&fit=crop",
    initialRotation: 5,
    x: 20,
    y: -5,
    zIndex: 40,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=500&auto=format&fit=crop",
    initialRotation: 10,
    x: 60,
    y: 0,
    zIndex: 50,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
    initialRotation: 20,
    x: 100,
    y: 15,
    zIndex: 60,
  },
];

interface HeroCardsProps {
  cardsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const HeroCards = ({ cardsRef }: HeroCardsProps) => {
  return (
    <>
      {CARDS.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => {
            if (cardsRef.current) {
              cardsRef.current[i] = el;
            }
          }}
          className={cn(
            "absolute w-[clamp(150px,25vw,210px)] aspect-square rounded-[1rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl transition-shadow duration-500 hover:shadow-primary/20 hover:border-primary/20 group",
          )}
          style={{
            zIndex: card.zIndex,
            transform: `rotate(${card.initialRotation}deg) translate(${card.x}px, ${card.y}px) scale(0.95)`,
          }}
        >
          <Image
            src={card.image}
            alt={`Abstract Art ${card.id}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 180px, 200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        </div>
      ))}
    </>
  );
};

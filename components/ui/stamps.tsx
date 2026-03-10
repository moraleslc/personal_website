"use client";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Stamp = {
  country: string;
  city?: string;
  emoji: string;
  color: string;
  size: "sm" | "md" | "lg";
  rotate: number;
  top: string;
  left: string;
};

const stamps: Stamp[] = [
  { country: "Mexico", city: "Guadalajara", emoji: "🌵", color: "border-green-600 text-green-700", size: "lg", rotate: -8, top: "5%", left: "35%" },
  { country: "Japan", city: "Tokyo", emoji: "⛩️", color: "border-red-500 text-red-600", size: "md", rotate: 5, top: "0%", left: "65%" },
  { country: "China", city: "Beijing", emoji: "🐉", color: "border-yellow-600 text-yellow-700", size: "sm", rotate: -4, top: "30%", left: "80%" },
  { country: "Korea", city: "Seoul", emoji: "🌸", color: "border-pink-500 text-pink-600", size: "md", rotate: 7, top: "45%", left: "40%" },
  { country: "UK", city: "London", emoji: "🎡", color: "border-blue-600 text-blue-700", size: "sm", rotate: -6, top: "55%", left: "70%" },
  { country: "Cuba", city: "Havana", emoji: "🎺", color: "border-orange-500 text-orange-600", size: "lg", rotate: 4, top: "65%", left: "50%" },
  { country: "USA", city: "New York", emoji: "🗽", color: "border-indigo-500 text-indigo-600", size: "sm", rotate: -3, top: "20%", left: "55%" },
  { country: "Belize", city: "Belize City", emoji: "🌊", color: "border-teal-500 text-teal-600", size: "md", rotate: 6, top: "75%", left: "75%" },
];

const sizeMap = {
  sm: "w-20 h-20 text-xs",
  md: "w-28 h-28 text-sm",
  lg: "w-36 h-36 text-base",
};

const emojiSizeMap = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-4xl",
};

const StampItem = ({ stamp }: { stamp: Stamp }) => {
  return (
    <motion.div
      className={`absolute ${sizeMap[stamp.size]}`}
      style={{ top: stamp.top, left: stamp.left, rotate: stamp.rotate }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, zIndex: 20 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 12 }}
      viewport={{ once: true }}
    >
      {/* Stamp border */}
      <div className={`w-full h-full border-4 border-dashed ${stamp.color} flex flex-col items-center justify-center gap-1 bg-white/60 p-1`}
        style={{ boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)" }}
      >
        <span className={emojiSizeMap[stamp.size]}>{stamp.emoji}</span>
        <span className={`font-code font-bold leading-tight text-center ${stamp.color.split(" ")[1]}`}>
          {stamp.country}
        </span>
        {stamp.city && (
          <span className={`font-code leading-tight text-center opacity-70 ${stamp.color.split(" ")[1]}`}>
            {stamp.city}
          </span>
        )}
      </div>

      {/* Ink overlay for worn look */}
      <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none" />
    </motion.div>
  );
};

const Stamps = () => {
  const stampsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!stampsRef.current) return;

  const ctx = gsap.context(() => {
    const viewportCenter = window.innerHeight / 2;
    const stampsHeight = stampsRef.current!.offsetHeight;
    const centeredY = viewportCenter - stampsHeight / 2;

    gsap.fromTo(
      stampsRef.current,
      { y: 0 },
      {
        y: centeredY,
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  return () => ctx.revert();
}, []);

  return (
    <div ref={stampsRef} className="relative w-full h-full min-h-100">
      {stamps.map((stamp) => (
        <StampItem key={stamp.country} stamp={stamp} />
      ))}
    </div>
  );
};

export default Stamps;
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

export type Experience = {
  date: string;
  role: string;
  company: string;
  description: string;
  sticky?: string;
};

const TimelineItem = ({ item }: { item: Experience }) => {
  const ref = useRef(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isVisible = useRef(false);

  const handleMouseEnter = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    if (!stickyRef.current || isVisible.current) return; // skip if already shown
    isVisible.current = true;
    gsap.killTweensOf(stickyRef.current);
    gsap.set(stickyRef.current, { display: "block" });
    gsap.fromTo(
      stickyRef.current,
      { opacity: 0, rotateX: -90, transformOrigin: "top center" },
      { opacity: 1, rotateX: 0, duration: 0.5, ease: "back.out(1.4)" }
    );
  };

  const handleMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      if (!stickyRef.current) return;
      isVisible.current = false;
      gsap.killTweensOf(stickyRef.current);
      gsap.to(stickyRef.current, {
        opacity: 0,
        rotateX: -90,
        transformOrigin: "top center",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (stickyRef.current) gsap.set(stickyRef.current, { display: "none" });
        },
      });
    }, 100);
  };

  return (
    <div
      className="relative isolate"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative pl-10 pb-12 flex items-start gap-8"
      >
        <div className="absolute left-3 top-0 bottom-0 w-px bg-black" />
        <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-pink-300 border-2 border-black" />
        <div className="flex-1">
          <span className="font-code text-sm text-gray-500">{item.date}</span>
          <h3 className="font-bold text-lg">{item.role}</h3>
          <p className="text-gray-600 font-code text-sm">{item.company}</p>
          <p className="mt-2">{item.description}</p>
        </div>

      {item.sticky && (
        <div
          ref={stickyRef}
          onMouseEnter={handleMouseEnter}
          style={{ display: "none", perspective: "600px" }}
          className="absolute left-full top-0 ml-8 w-44 min-h-24 bg-yellow-200 p-3 shadow-md font-handwriting text-sm -rotate-3 self-start mt-1 border border-yellow-300"
        >
          {item.sticky}
        </div>
      )}
      </motion.div>
    </div>
  );
};

export default TimelineItem;
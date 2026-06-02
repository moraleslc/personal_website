"use client";
import { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SkillCard = {
  id?: string;
  title: string;
  emoji: string;
  color: string;
  borderColor: string;
  skills: string[];
};

type CertCard = {
  name: string;
  issuer: string;
  date: string;
  emoji: string;
  href: string;
};

const colorStyles: Record<string, { background: string; borderColor: string }> = {
  "bg-blue-100": { background: "#dbeafe", borderColor: "#60a5fa" },
  "bg-pink-100": { background: "#fce7f3", borderColor: "#f472b6" },
  "bg-yellow-100": { background: "#fef9c3", borderColor: "#facc15" },
};

const SkillCard = ({ card, index }: { card: SkillCard; index: number }) => {
  const styles = colorStyles[card.color] ?? { background: "#f3f4f6", borderColor: "#9ca3af" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Tilt
        tiltMaxAngleX={12}
        tiltMaxAngleY={12}
        glareEnable={true}
        glareMaxOpacity={0.5}
        glareColor="#ffffff"
        glarePosition="all"
        scale={1.03}
        transitionSpeed={400}
      >
        <div
          style={{ background: styles.background, borderColor: styles.borderColor }}
          className="border-4 rounded-xl p-5 w-56 min-h-72 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] flex flex-col gap-3"
        >
          <div className="flex flex-col items-center border-b-2 border-black/20 pb-3">
            <span className="text-4xl mb-1">{card.emoji}</span>
            <h3 className="font-code font-bold text-sm uppercase tracking-wider">{card.title}</h3>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {card.skills.map((skill) => (
              <span key={skill} className="font-code text-xs bg-white/70 border border-black/20 rounded-full px-2 py-0.5">
                {skill}
              </span>
            ))}
          </div>
          <div className="mt-auto text-center">
            <span className="font-code text-xs opacity-40">✦ skills ✦</span>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const CertMarquee = ({ certs }: { certs: CertCard[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || certs.length === 0) return;

    const id = requestAnimationFrame(() => {
      const singleSetWidth = trackRef.current!.scrollWidth / 2;
      gsap.set(trackRef.current, { x: 0 });
      gsap.to(trackRef.current, {
        x: -singleSetWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
        onRepeat: () => {
          gsap.set(trackRef.current, { x: 0 });
        },
      });
    });

    return () => cancelAnimationFrame(id);
  }, [certs]);

  return (
    <div className="overflow-x-hidden w-screen relative py-8">
      <div ref={trackRef} className="flex gap-6 overflow-visible">
        {[...certs, ...certs].map((cert, index) => (
          <a key={index} href={cert.href} target="_blank" rel="noopener noreferrer">
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#ffffff"
              glarePosition="all"
              scale={1.03}
              transitionSpeed={400}
            >
              <div className="bg-purple-100 border-4 border-purple-400 rounded-xl p-5 w-48 min-h-56 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] flex flex-col gap-2">
                <div className="flex flex-col items-center border-b-2 border-black/20 pb-2">
                  <span className="text-3xl mb-1">{cert.emoji}</span>
                  <span className="font-code text-xs opacity-50 uppercase">certification</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1 flex-1 justify-center">
                  <p className="font-code font-bold text-xs leading-tight">{cert.name}</p>
                  <p className="font-code text-xs opacity-60">{cert.issuer}</p>
                </div>
                <div className="mt-auto text-center border-t-2 border-black/20 pt-2">
                  <span className="font-code text-xs opacity-50">{cert.date}</span>
                </div>
              </div>
            </Tilt>
          </a>
        ))}
      </div>
    </div>
  );
};

const SkillCards = ({ cards }: { cards: SkillCard[] }) => {
  return (
    <div id="skills">
      <h3 className="font-code font-bold mb-6 text-lg">Tech Stack</h3>
      <div className="flex flex-wrap gap-8 mb-16">
        {cards.map((card, index) => (
          <SkillCard key={card.title} card={card} index={index} />
        ))}
      </div>
    </div>
  );
};

export { CertMarquee };
export default SkillCards;
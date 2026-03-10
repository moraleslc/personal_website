"use client";
import { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SkillCard = {
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

const skillCards: SkillCard[] = [
    {
    title: "Tools",
    emoji: "🔧",
    color: "bg-blue-100",
    borderColor: "border-blue-400",
    skills: ["Figma", "Git", "Jira", "Confluence", "Postman", "MySQL", "VS Code", "Heroku", "CANoe", "DOORS", "vFlash", "vTESTstudio", "winIDEA", "Adobe AE", "Adobe AI", "Adobe PS"],
  },
  {
    title: "Languages",
    emoji: "💻",
    color: "bg-pink-100",
    borderColor: "border-pink-400",
    skills: ["C++", "CSS", "HTML", "JavaScript", "MATLAB", "Python", "R", "TypeScript"],
  },
  {
    title: "Frameworks",
    emoji: "⚙️",
    color: "bg-yellow-100",
    borderColor: "border-yellow-400",
    skills: ["Arduino", "Flask", "Next.js", "Node.js", "React", "Tailwind CSS", "Jasmine"],
  },
];

const certCards: CertCard[] = [
  { name: "Programming Foundations with JavaScript, HTML and CSS", issuer: "Coursera", date: "February 2026", emoji: "💻", href:"https://www.coursera.org/account/accomplishments/verify/JBU6ZE9YU0BX" },
  { name: "Figma UI UX Design Essentials", issuer: "Udemy", date: "Oct 2024", emoji: "🎨", href:"https://www.udemy.com/certificate/UC-30df6262-d23b-43c9-b6ba-02164d6f8218/"},
  { name: "AWS Academy Cloud Foundations", issuer: "Credly", date: "May 2024", emoji: "☁️", href:"https://www.credly.com/badges/1988beaa-4d4c-4816-b947-4501dd6802fe/public_url" },
  { name: "Scrum Fundamentals Certified", issuer: "SCRUMstudy", date: "May 2023", emoji: "🔄", href:"https://www.scrumstudy.com/certification/verify?type=SFC&number=980645" },
  { name: "MOS Word 2016", issuer: "Certiport", date: "Feb 2020", emoji: "📝", href:"https://drive.google.com/file/d/1VLmd0jVl3wKT0UN0yBr8BaruZNP80K7d/view?usp=drive_href" },
  { name: "MOS PowerPoint 2016", issuer: "Certiport", date: "Mar 2020", emoji: "📊", href:"https://drive.google.com/file/d/1mfHhKXK_tTzSqicm0kJtQ-hQdnS8WE-W/view?usp=drive_href" },
  { name: "MOS Excel 2016", issuer: "Certiport", date: "Mar 2020", emoji: "📈", href:"https://drive.google.com/file/d/1XhOCtHJvD7XMIG_A4pFfGjRSEOArUp7j/view?usp=sharing" },
];

const SkillCard = ({ card, index }: { card: SkillCard; index: number }) => {
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
        <div className={`${card.color} border-4 ${card.borderColor} rounded-xl p-5 w-56 min-h-72 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] flex flex-col gap-3`}>
          {/* Card header */}
          <div className="flex flex-col items-center border-b-2 border-black/20 pb-3">
            <span className="text-4xl mb-1">{card.emoji}</span>
            <h3 className="font-code font-bold text-sm uppercase tracking-wider">{card.title}</h3>
          </div>

          {/* Skills list */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {card.skills.map((skill) => (
              <span
                key={skill}
                className="font-code text-xs bg-white/70 border border-black/20 rounded-full px-2 py-0.5"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Card footer */}
          <div className="mt-auto text-center">
            <span className="font-code text-xs opacity-40">✦ skills ✦</span>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const CertMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-x-hidden w-screen relative py-8">
      <div ref={trackRef} className="flex gap-6 overflow-visible">
        {[...certCards, ...certCards].map((cert, index) => (
            <a
              key={index}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
            >
          <Tilt
            key={index}
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

const SkillCards = () => {
  return (
    <div id="skills">
      <h3 className="font-code font-bold mb-6 text-lg">Tech Stack</h3>
      <div className="flex flex-wrap gap-8 mb-16">
        {skillCards.map((card, index) => (
          <SkillCard key={card.title} card={card} index={index} />
        ))}
      </div>
    </div>
  );
};

export { CertMarquee };
export default SkillCards;
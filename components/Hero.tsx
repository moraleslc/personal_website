"use client";
import React from "react";
import { TypewriterEffect } from "./ui/typewriter-effect";
import FloatingImages from "./ui/floating-images";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">

      {/* DECORATIONS (floating images) */}
      <FloatingImages
        src="/images/plumbob.png"
        className="absolute top-25 left-5 rotate-8"
        duration={3}
        delay={0} 
        distance={10}
        sound = "/sounds/sims.mp3"
      />

      <FloatingImages
        src="/images/cursor.png"
        className="absolute top-32 right-5 rotate-6"
        duration={2}
        delay={1} 
        distance={5}
        sound="/sounds/click.mp3"
      />

      <FloatingImages
        src="/images/pig.png"
        className="absolute bottom-10 right-30 rotate-12"
        duration={0}
        delay={2} 
        distance={6}
        sound="/sounds/pig.mp3"
      />

      <FloatingImages
        src = "/images/paper-plane.png"
        className="absolute bottom-5 left-35 rotate-2"
        duration={2}
        delay={1} 
        distance={8}
        sound="/sounds/paper-plane.mp3"
      />

      <FloatingImages
        src = "/images/star.png"
        className="absolute bottom-40 left-20 rotate-5"
        duration={10}
        delay={0} 
        distance={15}
        sound="/sounds/star.mp3"
      />

      <FloatingImages
        src = "/images/pompompurin.png"
        className="absolute top-75 right-15 rotate-6"
        duration={10}
        delay={2} 
        distance={20}
        sound="/sounds/pompompurin.mp3"
      />

      <FloatingImages 
        src = "/images/figma.png"
        className="absolute top-5 left-35 rotate-350"
        duration={4}
        delay={1} 
        distance={12}
        sound="/sounds/figma.mp3"
      />

      <FloatingImages 
        src = "/images/vscode.png"
        className="absolute bottom-50 right-10 rotate-355"
        duration={2}
        delay={0.5} 
        distance={8}
        sound="/sounds/vscode.mp3"
      />

      <FloatingImages
        src = "/images/coffee.png"
        className="absolute top-0 right-35 rotate-340"
        duration={5}
        delay={1}
        distance={15}
        sound="/sounds/coffee.mp3"
      />

      <FloatingImages
        src = "/images/oreo.png"
        className="absolute bottom-70 left-3 rotate-5"
        duration={2}
        delay={0}
        distance={6}
        sound="/sounds/oreo.mp3"
      />

      {/* CONTENT */}
      <div className="h-full flex flex-col items-center justify-center text-center">

        <h1 className="font-handwriting h1 z-10">
          Carla Morales
        </h1>

        <TypewriterEffect
          className="font-code text-2xl"
          words={[
            { text: "Software" },
            { text: "Engineer" },
          ]}
        />

        <div className="flex flex-wrap gap-6 justify-center mt-10 z-10">
          <Link href="#about">
            <button className="hero-button">About</button>
          </Link>

          <Link href="#experience">
            <button className="hero-button">Experience</button>
          </Link>

          <Link href="#skills">
            <button className="hero-button">Skills</button>
          </Link>

          <Link href="#blog">
            <button className="hero-button">Blog</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Hero;
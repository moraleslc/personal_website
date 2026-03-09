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
        className="absolute top-20 left-5 rotate-8"
      />

      <FloatingImages
        src="/images/cursor.png"
        className="absolute top-32 right-5 rotate-6"
      />

      <FloatingImages
        src="/images/pig.png"
        className="absolute bottom-10 right-30 rotate-12"
      />

      <FloatingImages
        src = "/images/paper-plane.png"
        className="absolute bottom-5 left-35 rotate-2" 
      />

      <FloatingImages
        src = "/images/star.png"
        className="absolute bottom-35 left-20 rotate-5" 
      />

      <FloatingImages
        src = "/images/pompompurin.png"
        className="absolute top-65 right-15 rotate-6"
      />

      <FloatingImages 
        src = "/images/figma.png"
        className="absolute top-5 left-35 rotate-350"
      />

      <FloatingImages 
        src = "images/vscode.png"
        className="absolute bottom-45 right-10 rotate-355"
      />

      <FloatingImages
        src = "/images/coffee.png"
        className="absolute top-5 right-35 rotate-340"
      />

      <FloatingImages
        src = "/images/oreo.png"
        className="absolute bottom-55 left-3 rotate-5"
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

          <Link href="#projects">
            <button className="hero-button">Projects</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Hero;
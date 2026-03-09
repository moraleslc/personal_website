"use client";
import React, { useRef } from 'react'
import { motion } from "framer-motion"
import Link from "next/link";
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)


const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/moraleslc" },
  { label: "GitHub",   href: "https://github.com/moraleslc" },
  { label: "Email",    href: "mailto:morales.lc1610@gmail.com" },
]

const ScrambleLink = ({ label, href }: { label: string; href: string }) => {
  const ref = useRef(null)

  const handleMouseEnter = () => {
    gsap.to(ref.current, {
      duration: 0.6,
      scrambleText: {
        text: label,
        chars: "lowerCase",
        speed: 0.4,
      },
    })
  }

  return (
    <Link href={href} ref={ref} onMouseEnter={handleMouseEnter}>
      {label}
    </Link>
  )
}

const About = () => {
  return (
    <div className='relative h-screen w-screen mt-8 overflow-hidden'>
      <h2 className='h2 font-code text-left mx-20'> About Me </h2>
      <div className='mx-20'>
        <p>Hi! I'm Carla (she/her), a Computer Science and Technology graduate from Tec de Monterrey, based in Mexico. I have a deep passion for the intersection of tech and design — particularly UI/UX — where I love crafting experiences that are as intuitive as they are visually thoughtful. </p>
        <p>Alongside design, I have a strong interest in Quality Assurance, a field I hold close to my heart. There's something deeply satisfying about the meticulous, often invisible work that QA demands. I firmly believe that exceptional QA is an art form in itself — when done right, it goes completely unnoticed, and that's exactly the point. A seamless experience doesn't happen by accident.</p>
        
        <p> Aside from tech, I enjoy videogames, my main favorites being Minecraft, Sims and Ghost of Tsushima. My sweet spot will always be a Matcha!</p>
        
        <div className='flex gap-8 font-code mt-6'>
          
          {links.map((link) => (
            <ScrambleLink key={link.label} {...link} />
          ))}

        </div>

      </div>
      
    </div>
  )
}

export default About
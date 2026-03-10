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
    <div id= "about" className='relative mt-8 overflow-hidden'>
      <h2 className='h2 font-code text-left mx-20'> About Me </h2>
      <div className='mx-20'>
        <p>Hi! I'm Carla (she/her), a Computer Science and Technology graduate from Tec de Monterrey, living in Mexico. </p>
        <p>When I was a child, I loved spending time in the computer, a lot. I love the endless possibilities one can do with tech, especially design! We are always the end user of a product or service, and we never notice good design or quality when it's well done. Isn't that crazy? That's where QA is sometimes forgotten. When a project has a good QA team, you'll never notice. Quality Assurance work will always be a noble job, we'll always push for outstanding work so you never have a bad experience! 👀 </p>
        <p> Aside from tech, I enjoy swimming, journaling, and videogames, my main favorites being Minecraft, Sims and Ghost of Tsushima (if it wasn't obvious lol). My soft spot will always be pigs and a Matcha!</p>
        
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
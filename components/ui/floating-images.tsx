"use client";
import { motion } from "motion/react";
import { useRef } from "react";

type FloatingImageProps = {
  src: string;
  alt?: string;
  className?: string;
  duration?: number;
  delay?: number;
  distance?: number;
  sound?: string;
};

export default function FloatingImage({
  src,
  alt = "",
  className = "",
  duration = 4,
  delay = 0,
  distance = 12,
  sound,

}: FloatingImageProps) {

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleHoverStart = () => {
    if (sound) {
        if (!audioRef.current) {
        audioRef.current = new Audio(sound);
        // audioRef.current.loop = true;
        }
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
};

const handleHoverEnd = () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }
};

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`absolute w-40 ${className}`}
      animate={{ y: [0, -distance, 0], scale: 1 }}
      transition={{
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        scale: { duration: 0.2 },
      }}
      whileHover={{ scale: 1.15, zIndex: 20 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    />
  );
}
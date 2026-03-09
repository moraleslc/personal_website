"use client";

import { motion } from "motion/react";

type FloatingImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

export default function FloatingImage({
  src,
  alt = "",
  className = "",
}: FloatingImageProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`absolute w-40 ${className}`}
      animate={{
          y: [0, -12, 0],
          scale: 1
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: { duration: 0.2 }
        }}
        whileHover= {{ 
          scale: 1.15,
          zIndex: 20
        }}
      />
  );
}
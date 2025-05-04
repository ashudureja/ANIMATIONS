import React from "react";
import { motion } from "framer-motion";

const RevealLinks = () => {
  return (
    <section className="grid w-full h-full place-content-center gap-2 bg-purple-300 px-8 py-12 text-black rounded-lg">
      <FlipLink href="#">Twitter</FlipLink>
      <FlipLink href="#">Linkedin</FlipLink>
      <FlipLink href="#">Facebook</FlipLink>
      <FlipLink href="#">Instagram</FlipLink>
    </section>
  );
};

const DURATION = 0.3; 
const STAGGER = 0.02; 
const EASE = [0.4, 0, 0.2, 1]; 

interface FlipLinkProps {
  children: string;
  href: string;
}

const FlipLink: React.FC<FlipLinkProps> = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      whileTap={{ scale: 0.98 }} // Add subtle tap interaction
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-6xl"
      style={{
        lineHeight: 0.75,
        transformPerspective: 800, 
      }}
    >
      <div>
        {children.split("").map((l: string, i: number) => (
          <motion.span
            variants={{
              initial: { 
                y: 0,
                rotateX: 0,
              },
              hovered: { 
                y: "-110%",
                rotateX: -50, 
              },
            }}
            transition={{
              duration: DURATION,
              ease: EASE,
              delay: STAGGER * i,
            }}
            className="inline-block origin-bottom"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l: string, i: number) => (
          <motion.span
            variants={{
              initial: { 
                y: "100%",
                rotateX: 50, 
              },
              hovered: { 
                y: 0,
                rotateX: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: EASE,
              delay: STAGGER * i,
            }}
            className="inline-block origin-top"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default RevealLinks; 
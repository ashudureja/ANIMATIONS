import React, { useRef } from "react";
import { motion, useTransform, animate } from "framer-motion";

const Quantumlink = () => {
  return (
    <div className="grid w-full h-full place-content-center bg-[#ccff33] overflow-hidden">
      <QuantumLink href="#">Twitter</QuantumLink>
      <QuantumLink href="#">Linkedin</QuantumLink>
      <QuantumLink href="#">Facebook</QuantumLink>
      <QuantumLink href="#">Instagram</QuantumLink>
    </div>
  );
};

const QuantumLink = ({ children, href }) => {
  const ref = useRef(null);

  const handleHoverStart = () => {
    animate(
      ref.current,
      {
        transformPerspective: 900,
        translateZ: 130,
      },
      { duration: 0.4, type: "spring" }
    );
  };

  const handleHoverEnd = () => {
    animate(ref.current, { translateZ: 0 }, { duration: 0.5 });
    animate(
      ".letter",
      {
        scale: 1,
      },
      { duration: 0.3 }
    );
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className="relative block overflow-visible text-6xl tracking-tight font-extrabold uppercase text-black  md:text-8xl"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <div className="relative flex">
        {children.split("").map((letter, i) => (
          <motion.span
            key={i}
            className="letter relative inline-block origin-center px-1"
          >
            <span className="block origin-top transition-transform duration-500 hover:scale-y-0">
              {letter}
            </span>
            <span className="absolute left-0 top-0 block origin-bottom scale-y-0  transition-transform duration-500 hover:scale-y-100">
              {letter}
            </span>
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default Quantumlink;

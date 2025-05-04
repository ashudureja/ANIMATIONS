import SplashCursor from "../Components/SplashCursor";
import { Link } from "react-router-dom";
import { GlowEffectButton } from "../Components/glow-effect-button";
import { motion } from "framer-motion";

export function Hero() {
  const variants = {
    initial: {
      clipPath: "inset(100% 0 0 0)",
    },
    animate: {
      clipPath: "inset(0% 0 0% 0)",
      transition: {
        duration: 0.8,
        ease: [0.83, 0, 0.17, 1],
      },
    },
  };

  return (
    <section id="hero">
      <SplashCursor />
      <div className="animation-delay-8 h-screen bg-gray-100 animate-fadeIn flex flex-col items-center justify-center px-4 text-center">
        <div className="mb-10 mt-4 md:mt-6">
          <div className="px-2">
            <motion.div
              className="border-ali relative mx-auto h-full max-w-7xl p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] md:px-12 md:py-20"
              variants={variants}
              initial="initial"
              animate="animate"
            >
              <h1 className="font-custom text-shadow-lg   float-animation select-none flex-col px-3 py-2 text-center text-5xl font-semibold leading-none tracking-tight md:flex-col md:text-8xl lg:flex-row lg:text-8xl">
                Your complete platform for the{" "}
                <motion.span className="rainbow-text  text-shadow-xs ">
                  Animations
                </motion.span>
                .
              </h1>
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-6 cursor-pointer">
            <Link to="/animation">
              <GlowEffectButton name="Explore" />
            </Link>
          </div>
        </div>
      </div>
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
      ></canvas>
    </section>
  );
}

export default Hero;

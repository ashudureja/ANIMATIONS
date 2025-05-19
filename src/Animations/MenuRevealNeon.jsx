import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";

const defaultLinks = [
  { title: "About", href: "/" },
  { title: "Skills", href: "/" },
  { title: "Experience", href: "/" },
  { title: "Projects", href: "/" },
  { title: "Contact", href: "/" },
];

const defaultFooter = [
  { title: "Facebook", href: "/" },
  { title: "LinkedIn", href: "/" },
  { title: "Instagram", href: "/" },
  { title: "Twitter", href: "/" },
];

const perspectiveAnimation = {
  initial: {
    opacity: 0,
    rotateX: 100,
    translateY: 80,
  },
  enter: (i) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.05 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "linear", ease: [0.76, 0, 0.24, 1] },
  },
};

const footerAnimation = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, type: "tween", ease: "easeInOut" },
  },
};

const MenuNeon = () => {
  const [click, setClick] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hover, setHoveredIndex] = useState(null);
  const [hover2, setHoveredIndex2] = useState(null);
  const [windowWidth, setWindowWidth] = useState(() => {
    if (typeof window !== "undefined") return window.innerWidth;
    return 0;
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (click) {
      setTimeout(() => {
        setMenuOpen(true);
      }, 500);
    } else {
      setMenuOpen(false);
    }
  }, [click]);

  const menuAnimation = {
    open: {
      width: windowWidth < 768 ? "90vw" : "480px",
      height: windowWidth < 768 ? "80vh" : "574px",
      top: windowWidth < 768 ? "20px" : "24px",
      right: windowWidth < 768 ? "20px" : "24px",
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: windowWidth < 768 ? "90px" : "110px",
      height: windowWidth < 768 ? "40px" : "46px",
      top: windowWidth < 768 ? "32px" : "32px",
      right: windowWidth < 768 ? "32px" : "32px",
      transition: {
        duration: 0.75,
        delay: 0.3,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <div className="h-screen w-full bg-black relative">
      <div >
        <Menubutton
          click={click}
          setClick={setClick}
          windowWidth={windowWidth}
        />
        <motion.div
          className="absolute flex flex-col justify-center rounded-3xl bg-[#d0ff71]"
          variants={menuAnimation}
          initial="closed"
          animate={click ? "open" : "closed"}
        >
          <div className="flex flex-col ml-4 md:ml-10">
            {menuOpen &&
              defaultLinks.map((link, i) => {
                const isHovered = hover === i;
                return (
                  <div
                    className="-mb-1"
                    style={{ perspective: "70px", perspectiveOrigin: "bottom" }}
                    key={i}
                  >
                    <motion.div
                      className="flex items-center gap-2"
                      variants={perspectiveAnimation}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      custom={i}
                    >
                      <motion.svg
                        animate={isHovered ? { width: 48 } : { width: 0 }}
                        width="0"
                        height="31"
                        viewBox="0 0 105 62"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 31H103M103 31L73.5 1.5M103 31L73.5 60.5"
                          stroke="#010202"
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                        ></path>
                      </motion.svg>

                      <motion.a
                        href={link.href}
                        className="text-black text-[36px] md:text-[46px]"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {link.title}
                      </motion.a>
                    </motion.div>
                  </div>
                );
              })}
          </div>
          {menuOpen && (
            <motion.div className="footer grid grid-cols-2 sm:grid-cols-2 ml-4 md:ml-13 mt-8">
              {defaultFooter.map((link, i) => {
                const { title, href } = link;
                const isHovered2 = hover2 === i;
                return (
                  <motion.div
                    className="relative w-fit mb-2"
                    variants={footerAnimation}
                    custom={i}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    onMouseEnter={() => setHoveredIndex2(i)}
                    onMouseLeave={() => setHoveredIndex2(null)}
                    key={ `f_${i}`}
                  >
                    <motion.a
                      href={href}
                      className="text-black  text-lg sm:text-xl"
                    >
                      {title}
                    </motion.a>

                    <motion.div
                      className="absolute left-0 bottom-0 h-[2px] bg-black"
                      animate={{
                        width: isHovered2 ? "100%" : "0%",
                      }}
                      initial={{ width: "0%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

function Menubutton({ click, setClick, windowWidth }) {
  return (
    <button
      onClick={() => setClick(!click)}
      className="absolute cursor-pointer z-[999] top-8 right-8  w-[90px] md:w-[110px] h-[40px] md:h-[46px] rounded-[25px] overflow-hidden bg-lime-400"
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ y: click ? "-100%" : "0%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Slide bg="bg-[#d0ff71]" clr="text-black">
          MENU
        </Slide>
        <Slide bg="bg-black" clr="text-[#d0ff71]">
          CLOSE
        </Slide>
      </motion.div>
    </button>
  );
}

function Slide({ children, bg, clr }) {
  return (
    <div
      className={`h-full w-full text-[16px] md:text-[18px] flex items-center justify-center ${bg} ${clr}`}
    >
      {children}
    </div>
  );
}

export default MenuNeon;

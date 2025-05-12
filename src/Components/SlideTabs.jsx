import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const SlideTabsExample = () => {
  return (
    <div className="bg-neutral-100 py-8 sm:py-12 md:py-20">
      <SlideTabs />
    </div>
  );
};

export const SlideTabs = ({ tabs = [], onTabClick }) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => setPosition(pv => ({ ...pv, opacity: 0 }))}
      className="relative mx-auto flex w-fit max-w-full overflow-x-auto rounded-full border-2 border-black bg-white p-1 scrollbar-hide"
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          setPosition={setPosition}
          onClick={() => onTabClick?.(tab.value)}
        >
          {tab.title}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

export const Tab = ({ children, setPosition, onClick }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={onClick}
      className="relative z-10 block cursor-pointer px-4 py-2 text-sm uppercase text-white mix-blend-difference md:px-6 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-10 rounded-full bg-black md:h-12"
    />
  );
};
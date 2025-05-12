import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const SlideTabsExample = () => {
  return (
    <div className="bg-neutral-100 py-10 md:py-20">
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
      onMouseLeave={() =>
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }))
      }
      className="relative mx-auto flex w-fit max-w-full overflow-x-auto rounded-full border-2 border-black bg-white p-1"
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
      className="relative z-10 block cursor-pointer px-2 py-1 text-xs uppercase text-white mix-blend-difference sm:px-3 sm:py-1.5 sm:text-sm md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-6 rounded-full bg-black sm:h-7 md:h-12"
    />
  );
};
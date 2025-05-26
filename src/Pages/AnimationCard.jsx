import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { IoVideocamOutline } from "react-icons/io5";

export const styles = document.createElement("style");
styles.innerHTML = `
  @keyframes wave {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .ribbon {
    position: relative;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  }
  
 
  
  .ribbon-wave {
    background: linear-gradient(45deg, 
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.8) 50%,
      rgba(255,255,255,0) 100%);
    background-size: 200% 200%;
    animation: wave 2s infinite linear;
    transform: rotate(-45deg) scale(2);
  }
  
  
  }
`;
document.head.appendChild(styles);

const AnimationCard = ({
  id,
  featured,
  category,
  name,
  description,
  tags,
  componentKey,
  code,
  className,
  video,
}) => {
  const videoref = useRef();
  useEffect(() => {
    if (videoref.current) {
      videoref.current.playbackRate = 1.5;
    }
  });
  const [enter, setEnter] = useState(false);
  console.log(video);
  return (
    <Link to={`/animation/${id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className={`cursor-pointer rounded-xl relative h-50  shadow-2xl ${className || ""}`}
        onMouseEnter={() => setEnter(true)}
        onMouseLeave={() => setEnter(false)}
      >
        {!enter && (
          <div className="absolute top-2 left-2 z-[999]  p-1 rounded-sm">
            
            {typeof IoVideocamOutline !== "undefined" ? (
              <IoVideocamOutline />
            ) : (
              <span className="text-xs ">▶️</span>
            )}
          </div>
        )}
        {/* {featured && (
          <div className="ribbon-container  absolute top-0 right-0 z-10 overflow-hidden w-24 h-24">
            <div className="ribbon bg-green-500 text-black font-bold py-1 rotate-45 shadow-md transform translate-y-3 translate-x-3 w-32 text-center relative overflow-hidden">
              <span className="z-20 relative tracking-wider text-xs">NEW</span>
              <div className="ribbon-wave absolute inset-0 opacity-30"></div>
            </div>
          </div>
        )} */}
        {componentKey ? (
          <>
            <video
              ref={videoref}
              src={video.asset.url}
              className="absolute inset-0 w-full rounded-lg h-full object-cover object-center z-0"
              autoPlay
              muted
              loop
              playsInline
            />
          </>
        ) : (
          <div className="text-sm custom-font opacity-60 p-4 overflow-hidden max-h-full">
            {name}
          </div>
        )}
      </motion.div>

      <h3 className="text-sm text-gray-500 font-bold  mt-3 ml-1">{name}</h3>
    </Link>
  );
};

AnimationCard.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  componentKey: PropTypes.string,
  code: PropTypes.string,
  className: PropTypes.string,
};

export default AnimationCard;

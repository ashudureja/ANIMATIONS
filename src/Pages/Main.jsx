import React from "react";
import {motion} from "framer-motion"
import { useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import AnimationCategory from "./AnimationCategory";

const Main = ({children}) => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        <div className="flex min-h-screen">
          {location.pathname.startsWith("/main") && <Sidebar />}
          <div className="flex-1 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;

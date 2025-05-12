import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import AnimationCard from "./AnimationCard";
import { getAnimationsByCategory } from "../lib/sanity";
import { getAllAnimations } from "../lib/sanity";
import Main from "./Main";
import { Link } from "react-router-dom";
import { SlideTabs } from "../Components/SlideTabs";
const AnimationCategory = () => {
  const [animations, setAnimations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");

  const categories = [
    { title: "All", value: "" },
    { title: "Text", value: "text-effects" },
    { title: "Buttons", value: "buttons" },
    { title: "Cards", value: "cards" },
    { title: "SVG", value: "svg-transitions" },
    
    { title: "Background", value: "backgrounds" },
  ];

  useEffect(() => {
    async function fetchAnimations() {
      try {
        setLoading(true);
        let data;

        if (category) {
          data = await getAnimationsByCategory(category);
        } else {
          data = await getAllAnimations();
          console.log(data);
        }

        setAnimations(data);
      } catch (err) {
        console.error("Error fetching animations:", err);
        setError("Failed to load animations");
      } finally {
        setLoading(false);
      }
    }

    fetchAnimations();
  }, [category]);

  // Loading state
  if (loading) {
    return (
      <Main className="">
        <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <div className="absolute -inset-1 rounded-full blur-md bg-primary/20 -z-10"></div>
            </div>
            <span className="text-lg font-medium text-muted-foreground">
              Loading animation details...
            </span>
          </div>
        </div>
      </Main>
    );
  }

  // Error or not found state
  if (error || !animations) {
    return (
      <Main>
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center py-20 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Animation Not Found</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {error ||
                "The animation you're looking for doesn't exist or has been removed."}
            </p>
            <Link to={`/components/${category}`}>
              <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300">
                Back to
              </button>
            </Link>
          </div>
        </div>
      </Main>
    );
  }

  // Animation variants for staggered animations
  const fadeIn = {
    hidden: { y: 20 },
    visible: (custom) => ({
     
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <main className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-6 py-6 " >
      <div className="pb-5">
        <SlideTabs tabs={categories} onTabClick={setCategory} />
      </div>
      <motion.div
        className="rounded-2xl min-h-[93vh]  border-[1px] border-border shadow-xl bg-primary px-4 sm:px-6 lg:px-8 py-2"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        custom={0}
      >
       
          
            <motion.div
              initial="hidden"
              animate="show"
              className="grid mt-5  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
            >
              {animations.map((animation) => (
                <motion.div key={animation._id}>
                  <AnimationCard
                    id={animation.id.current}
                    category={animation.category}
                    name={animation.name}
                    description={animation.description}
                    tags={animation.tags}
                    componentKey={animation.componentKey}
                    code={animation.code}
                    video={animation.video}
                    featured={animation.featured}
                  />
                </motion.div>
              ))}
            </motion.div>
        
       
      </motion.div>
    </main>
  );
};

export default AnimationCategory;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Loader2,
  Maximize2,
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { getAnimationById } from "../lib/sanity";
import { CodeBlock } from "../Components/Codeblock";
import TabsContent from "../Components/TabsContent";
import Main from "./Main";
import DynamicComponentRenderer from "../Components/DynamicComponentRender";
import { Button } from "../Components/MovingBorder";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

// Enhanced CodeBlock
const EnhancedCodeBlock = ({
  type = "",
  code,
  language,
  showLineNumbers = true,
  collapsible = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Only apply truncation if collapsible is true
  const truncatedCode =
    collapsible && !expanded && code.split("\n").length > 15
      ? code.split("\n").slice(0, 15).join("\n")
      : code;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div className="relative">
      {type === "copy" && !expanded && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900 via-black/60 to-transparent z-1" />
      )}
      <div className="absolute right-3 top-3 z-10">
        <button
          onClick={copyToClipboard}
          className="p-1.5 cursor-pointer z-10 rounded text-gray-400 hover:text-white transition-colors text-primary"
          aria-label="Copy code"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>

      <CodeBlock
        code={truncatedCode}
        language={language}
        showLineNumbers={showLineNumbers}
      />

      {/* expand button  */}
      {collapsible && !expanded && code.split("\n").length > 15 && (
        <button
          onClick={() => setExpanded(true)}
          className="px-3 py-1 cursor-pointer z-10 -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 rounded-lg bg-gradient-to-r from-gray-100  to-gray-200
  text-primary font-medium flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
        >
          Expand
        </button>
      )}

      {/*  collapse button*/}
      {collapsible && expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="px-3 cursor-pointer py-1 z-10 absolute bottom-2 left-1/2 -translate-x-1/2 rounded-lg bg-gray-100 hover:bg-primary/20 text-primary font-medium flex items-center gap-2 transition-colors"
        >
          Collapse
        </button>
      )}
    </div>
  );
};

// Main component
const AnimationDetail = () => {
  const { category, id } = useParams();
  const [animation, setAnimation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Get category display name (capitalize first letter of each word)
  const categoryDisplayName = category
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Fetch animation details from Sanity
  useEffect(() => {
    setLoading(true);
    setError(null);

    getAnimationById(id)
      .then((data) => {
        if (data) {
          setAnimation(data);
        } else {
          setError("Animation not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching animation:", err);
        setError("Failed to load animation. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  // Toggle fullscreen preview
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);

    // When entering fullscreen, prevent body scrolling
    if (!isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <Main>
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 blur-md"></div>
              <Loader2 className="relative z-10 h-12 w-12 animate-spin text-primary drop-shadow" />
            </div>
            <p className="text-lg font-semibold text-muted-foreground">
              Loading something awesome...
            </p>
          </div>
        </div>
      </Main>
    );
  }
  

  // Error or not found state
  if (error || !animation) {
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
                Back to {categoryDisplayName}
              </button>
            </Link>
          </div>
        </div>
      </Main>
    );
  }

  // Combined tabs with Code and How to Use merged
  const tabs = [
    {
      id: "implementation",
      label: "Implementation",
      content: (
        <div className="space-y-6">
          {/* <h3 className="text-xl font-semibold mb-4">Implementation Guide</h3> */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                1
              </span>
              Copy/paste code in your components folder
            </h4>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mt-4 relative"
            >
              <EnhancedCodeBlock
                type="copy"
                code={animation.code}
                language="jsx"
                collapsible={true}
                className="relative z-20"
              />
            </motion.div>
          </div>
          <div className="space-y-2 mt-8">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                2
              </span>
              Import the component
            </h4>
            <EnhancedCodeBlock
              code={`import { ${animation.name.replace(/\s/g, "")} } from './components/animations/${animation.name.replace(/\s/g, "")}'`}
              language="jsx"
            />
          </div>
          <div className="space-y-2 mt-8">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                3
              </span>
              Use the component in your application
            </h4>
            <EnhancedCodeBlock code={animation.usage} language="jsx" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm">
                4
              </span>
              Customize appearance (optional)
            </h4>
            <p className="text-muted-foreground mt-1">
              You can customize the appearance by changing tailwind classes in
              the component.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "dependencies",
      label: "Dependencies",
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Required Dependencies</h3>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-xl border shadow-sm">
              <h4 className="text-lg font-medium mb-2">Required packages</h4>
              <div className="mt-4">
                <EnhancedCodeBlock
                  code={animation.dependencies}
                  language="bash"
                />
              </div>
            </div>
            {animation.utils && (
              <div className="p-4 bg-muted/30 rounded-xl border shadow-sm mt-6">
                <h4 className="text-lg font-medium mb-2">Utility functions</h4>
                <p className="text-muted-foreground mt-1 mb-3">
                  The component relies on these utility functions:
                </p>
                <div className="mt-4">
                  <EnhancedCodeBlock code={animation.utils} language="tsx" />
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Fullscreen Preview */}
      {isFullscreen && animation.componentKey && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed  inset-0 z-50 bg-black/70  backdrop-blur-xl flex items-center p-19 justify-center"
        >
          <div className="absolute top-20 right-20">
            <button
              onClick={toggleFullscreen}
              className="p-3 rounded-full cursor-pointer  text-black/50 hover:text-black hover:rotate-90 transition-all"
              aria-label="Close fullscreen preview"
            >
              <X size={24} />
            </button>
          </div>
          <div className="w-full h-full  flex items-center justify-center rounded-xl">
            <DynamicComponentRenderer componentKey={animation.componentKey} />
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0}
          className="rounded-2xl overflow-hidden border border-border shadow-xl bg-primary"
        >
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <Link to={`/animation`}>
                <button className="inline-flex cursor-pointer items-center text-sm text-black/40 mb-5 p-0 h-auto font-medium group transition-all bg-transparent">
                  <ChevronLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
              </Link>

              <motion.div
                variants={fadeIn}
                custom={1}
                className="flex items-center   gap-2"
              >
                <h1 className="text-4xl font-extrabold text-black">
                  {animation.name}
                </h1>
                <div className="flex hover:scale-[98%] cursor-pointer px-3 py-[1px] mt-1 gap-2 rounded-lg items-center justify-center bg-orange-500">
                  <Link to={`/blog/${id}`} className=" ">
                    BLOG
                  </Link>
                  <img className="h-5 mb-1 " src="https://media2.giphy.com/media/ujpaHBFQxnZIALTObQ/200w.gif?cid=6c09b952ilo42vh50u059j14il0kjpfjgiv31ypwd7uc83an&ep=v1_stickers_search&rid=200w.gif&ct=s"></img>
                </div>
              </motion.div>

              <motion.p
                variants={fadeIn}
                custom={2}
                className="text-black/70 mt-3 text-lg max-w-3xl"
              >
                {animation.description}
              </motion.p>

              {animation.tags?.length > 0 && (
                <motion.div
                  variants={fadeIn}
                  custom={2.5}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {animation.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Preview Section */}
            <motion.div variants={fadeIn} custom={3} className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Preview</h2>

                <div>
                  {animation.componentKey && (
                    <Link
                      to={`/livepreview/${animation.componentKey}`}
                      
                      className="flex items-center p-2 gap-3 bg-white text-black  text-sm cursor-pointer border border-border rounded-full hover:shadow-sm transition-all duration-300"
                    >
                      <Maximize2 className="h-4 w-4" />
                      Fullscreen
                    </Link>
                  )}
                </div>
              </div>

              {window.innerWidth > 768 ? <div className="h-[100vh] bg-black overflow-y-auto rounded-2xl w-full shadow-inner">
                <DynamicComponentRenderer
                  componentKey={animation.componentKey}
                />
              </div>: <div className="h-[200px] bg-black p-5 text-white text-sm text-center flex justify-center items-center overflow-y-auto rounded-2xl w-full shadow-inner">
                Click on the Fullscreen button to view the animation in mobile.
                </div>}
            </motion.div>

            {/* Tabs for Implementation and Dependencies */}
            <motion.div variants={fadeIn} custom={4}>
              <TabsContent tabs={tabs} defaultTab="implementation" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AnimationDetail;

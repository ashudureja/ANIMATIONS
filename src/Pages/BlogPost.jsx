import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client } from "../lib/sanity";
import { Loader2, ChevronLeft } from "lucide-react";
import Main from "./Main";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from '@sanity/image-url';
import { CodeBlock } from "../Components/Codeblock"; // Adjust path as needed

// Create an image URL builder instance
const builder = imageUrlBuilder(client);

// Helper function to generate image URL
const urlFor = (source) => builder.image(source);

const customSerializers = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value).width(600).auto("format").url();
      return <img src={imageUrl} alt={value.alt || "Image"} className="w-full" />;
    },
    code: ({ value }) => {
      return <CodeBlock code={value.code} language={value.language || 'javascript'} />;
    },
    animationEmbed: ({ value }) => {
      return (
        <div className="my-6">
          <iframe 
            src={value.src} 
            title={value.description || "Animation"} 
            className="w-full h-64 border-0 rounded-lg"
          />
          {value.description && (
            <p className="text-sm text-center text-muted-foreground mt-2">
              {value.description}
            </p>
          )}
        </div>
      );
    }
  },
  // This is crucial for preserving whitespace
  block: {
    // Special handling for empty blocks to preserve line breaks
    normal: ({ children }) => {
      // If block is empty or only contains whitespace, render it as a line break
      if (!children || children.length === 0 || (typeof children[0] === 'string' && children[0].trim() === '')) {
        return <div className="empty-line-break h-6"></div>; // Adjust height as needed
      }
      // Otherwise render as normal paragraph
      return <p className="mb-4">{children}</p>;
    }
  }
};

const BlogPost = () => {
  const { animationId } = useParams(); // animationId from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    client
      .fetch(
        `*[_type == "post" && animationId.current == $animationId][0]{
          title,
          publishedAt,
          content[]
        }`,
        { animationId }
      )
      .then((data) => {
        if (data) {
          console.log("Blog post data:", data);
          setPost(data);
        } else {
          setError("Blog post not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post.");
        setLoading(false);
      });
  }, [animationId]);

  if (loading) {
    return (
      <Main>
        <div className="mx-auto max-w-2xl px-6 py-16 flex flex-col items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <span className="text-lg font-medium text-muted-foreground">
            Loading blog post...
          </span>
        </div>
      </Main>
    );
  }

  if (error || !post) {
    return (
      <Main>
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Blog Post Not Found</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            {error || "The blog post you're looking for doesn't exist or has been removed."}
          </p>
          <Link to={`/animation/${animationId}`}>
            <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-300">
              Back to Animations
            </button>
          </Link>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link to={`/animation/${animationId}`}>
          <button className="inline-flex cursor-pointer items-center text-sm text-black/40 mb-5 p-0 h-auto font-medium group transition-all bg-transparent">
            <ChevronLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </Link>
        <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>
        <div className="text-muted-foreground mb-8 text-sm">
          {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
        </div>
        <div className="prose prose-lg max-w-none whitespace-pre-wrap">
          {/* The whitespace-pre-wrap class helps preserve whitespace */}
          <PortableText value={post.content} components={customSerializers} />
        </div>
      </div>
    </Main>
  );
};

export default BlogPost;
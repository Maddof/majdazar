import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Typewriter({
  text,
  className = "",
  speed = 100,
  cursor = true,
  start = true,
  as: Component = "h1",
  onAnimationComplete,
  ...props // Pass through any additional props to the component (e.g., aria-label, id, role, etc.)
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasCalledComplete = useRef(false);

  // Reset typing effect when text changes
  useEffect(() => {
    if (!start) {
      setCurrentIndex(0);
      hasCalledComplete.current = false;
      return;
    }

    setCurrentIndex(0);
    hasCalledComplete.current = false;
  }, [text, start]);

  useEffect(() => {
    if (!start) return;
    if (currentIndex >= text.length) return;

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text.length, speed, start]);

  useEffect(() => {
    if (start && currentIndex >= text.length && !hasCalledComplete.current) {
      hasCalledComplete.current = true;
      onAnimationComplete?.();
    }
  }, [currentIndex, text.length, start, onAnimationComplete]);

  // Text to display based on current index
  const visibleText = text.slice(0, currentIndex);

  const isTyping = start && currentIndex < text.length;

  return (
    <Component
      className={`relative inline-block ${className}`}
      aria-label={text}
      {...props}
    >
      {/* Ghost: takes space but not visible */}

      <span className="invisible whitespace-pre">
        {text}
        {cursor ? "|" : ""}
      </span>

      {/* Real animated content on top */}
      <span className="absolute inset-0 whitespace-pre">
        {visibleText}
        {cursor && start && (
          <motion.span
            className="inline-block"
            animate={isTyping ? { opacity: 1 } : { opacity: [0, 1, 0] }}
            transition={
              isTyping
                ? { duration: 0 }
                : { duration: 1, repeat: 3, ease: "linear" }
            }
          >
            |
          </motion.span>
        )}
      </span>
    </Component>
  );
}

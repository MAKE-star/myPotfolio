// src/components/ui/TypingText.jsx
//
// Cycles through an array of words with a typewriter effect.
// Used in HeroSection to cycle: DEVELOPER → ENGINEER → BUILDER
//
// Usage:
//   <TypingText words={["DEVELOPER", "ENGINEER", "BUILDER"]} />
//
// Props:
//   words        string[]  — list of words to cycle through
//   typeSpeed    number    — ms per character typed (default 80)
//   deleteSpeed  number    — ms per character deleted (default 45)
//   pauseAfter   number    — ms to hold the completed word (default 1800)
//   className    string    — extra classes on the outer span
//   showCaret    bool      — show blinking block caret (default true)

import { useEffect, useRef, useState } from "react";

export default function TypingText({
  words = ["DEVELOPER", "ENGINEER", "BUILDER"],
  typeSpeed = 80,
  deleteSpeed = 45,
  pauseAfter = 1800,
  className = "",
  showCaret = true,
}) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // "typing" | "pausing" | "deleting"
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    if (phase === "typing") {
      if (display.length < currentWord.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplay(currentWord.slice(0, display.length + 1));
        }, typeSpeed);
      } else {
        timeoutRef.current = setTimeout(() => setPhase("pausing"), pauseAfter);
      }
    }

    if (phase === "pausing") {
      // Already paused in the "typing" branch above; transition to deleting
      timeoutRef.current = setTimeout(() => setPhase("deleting"), 0);
    }

    if (phase === "deleting") {
      if (display.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplay((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      } else {
        // Move to next word
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [display, phase, wordIndex, words, typeSpeed, deleteSpeed, pauseAfter]);

  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-mono)",
        letterSpacing: "0.12em",
        display: "inline-flex",
        alignItems: "center",
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {display}
      {showCaret && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "0.55em",
            height: "1em",
            background: "var(--clr-accent)",
            marginLeft: "2px",
            verticalAlign: "text-bottom",
            animation: "blink 1.1s step-end infinite",
          }}
        />
      )}
    </span>
  );
}
// src/components/ui/TerminalBracket.jsx
//
// Wraps any child with Tushar-style ┌ ┐ └ ┘ corner brackets.
//
// Usage:
//   <TerminalBracket>React</TerminalBracket>             → inline tag
//   <TerminalBracket block className="my-class">        → block panel
//     <p>Content</p>
//   </TerminalBracket>
//
// Props:
//   block      — renders as a block-level div instead of inline span
//   className  — extra classes on the wrapper
//   dim        — reduces bracket opacity (default 0.5, dim gives 0.25)
//   accent     — overrides bracket color (default: var(--clr-accent))
//   label      — optional mono label shown at top-left corner seam
//   animate    — if true, brackets fade in via CSS class "bracket-visible"
//     (pair with GSAP to add the class on scroll)

import { useRef, useEffect } from "react";

export default function TerminalBracket({
  children,
  block = false,
  className = "",
  dim = false,
  label = null,
  animate = false,
  style = {},
  ...rest
}) {
  const Tag = block ? "div" : "span";

  const opacity = dim ? 0.25 : 0.6;

  const bracketStyle = {
    fontFamily: "var(--font-mono)",
    color: "var(--clr-accent)",
    fontSize: "0.8em",
    lineHeight: 1,
    opacity,
    userSelect: "none",
    pointerEvents: "none",
    transition: "opacity 0.3s ease",
  };

  if (!block) {
    // ── Inline mode: renders as  ┌ content ┐  on one line
    return (
      <Tag
        className={`inline-flex items-center gap-[0.2em] ${className}`}
        style={style}
        {...rest}
      >
        <span style={bracketStyle} aria-hidden="true">
          ┌
        </span>
        {children}
        <span style={bracketStyle} aria-hidden="true">
          ┐
        </span>
      </Tag>
    );
  }

  // ── Block mode: full four-corner treatment
  return (
    <Tag
      className={`relative ${animate ? "bracket-animate" : ""} ${className}`}
      style={style}
      {...rest}
    >
      {/* Top-left */}
      <span
        aria-hidden="true"
        style={{
          ...bracketStyle,
          position: "absolute",
          top: "-0.6em",
          left: "-0.1em",
          fontSize: "0.85rem",
        }}
      >
        ┌─
      </span>

      {/* Optional label at top seam */}
      {label && (
        <span
          style={{
            position: "absolute",
            top: "-0.65em",
            left: "1.4em",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            color: "var(--clr-text-muted)",
            textTransform: "uppercase",
            userSelect: "none",
            backgroundColor: "var(--clr-bg)",
            padding: "0 0.3em",
          }}
        >
          {label}
        </span>
      )}

      {/* Top-right */}
      <span
        aria-hidden="true"
        style={{
          ...bracketStyle,
          position: "absolute",
          top: "-0.6em",
          right: "-0.1em",
          fontSize: "0.85rem",
        }}
      >
        ─┐
      </span>

      {/* Content */}
      {children}

      {/* Bottom-left */}
      <span
        aria-hidden="true"
        style={{
          ...bracketStyle,
          position: "absolute",
          bottom: "-0.6em",
          left: "-0.1em",
          fontSize: "0.85rem",
        }}
      >
        └─
      </span>

      {/* Bottom-right */}
      <span
        aria-hidden="true"
        style={{
          ...bracketStyle,
          position: "absolute",
          bottom: "-0.6em",
          right: "-0.1em",
          fontSize: "0.85rem",
        }}
      >
        ─┘
      </span>
    </Tag>
  );
}
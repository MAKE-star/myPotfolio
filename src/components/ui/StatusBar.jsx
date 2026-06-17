// src/components/ui/StatusBar.jsx
//
// Renders a single Tushar-style status metric:
//   ▓▓▓▓░  LABEL   ████░  VALUE
//
// Usage:
//   <StatusBar label="UPTIME"   value="99.9%" pct={99} />
//   <StatusBar label="RESPONSE" value="OPTIMAL" pct={80} />
//   <StatusBar label="STATUS"   value="AVAILABLE" pct={100} accent />
//
// Props:
//   label    string  — uppercase metric name
//   value    string  — display value on the right
//   pct      number  — 0–100, controls fill width
//   accent   bool    — makes value text use --clr-accent (for final STATUS line)
//   delay    number  — CSS animation delay in seconds for staggered entrance
//   animate  bool    — if true, fill grows from 0 on mount (default true)

import { useEffect, useRef, useState } from "react";

export default function StatusBar({
  label = "METRIC",
  value = "100%",
  pct = 100,
  accent = false,
  delay = 0,
  animate = true,
}) {
  const [filled, setFilled] = useState(animate ? 0 : pct);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!animate) return;

    const timer = setTimeout(() => {
      // rAF-based grow so it respects GSAP's scroll trigger timing
      const start = performance.now();
      const duration = 1200; // ms

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setFilled(eased * pct);
        if (progress < 1) rafRef.current = requestAnimationFrame(step);
      }

      rafRef.current = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pct, delay, animate]);

  // Build block string: 5 chars, filled = ▓, empty = ░
  const blocks = 5;
  const filledBlocks = Math.round((filled / 100) * blocks);
  const blockString = "▓".repeat(filledBlocks) + "░".repeat(blocks - filledBlocks);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.06em",
        lineHeight: 1.4,
      }}
    >
      {/* Block fill display */}
      <span
        aria-hidden="true"
        style={{
          color: "var(--clr-accent)",
          opacity: 0.8,
          minWidth: "5ch",
          letterSpacing: "0.02em",
        }}
      >
        {blockString}
      </span>

      {/* Label */}
      <span
        style={{
          color: "var(--clr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          minWidth: "8ch",
        }}
      >
        {label}
      </span>

      {/* Value */}
      <span
        style={{
          color: accent ? "var(--clr-accent)" : "var(--clr-text-primary)",
          fontWeight: accent ? 700 : 400,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Convenience: render a stack of StatusBars ────────────────────────────────
// <StatusPanel items={[{ label, value, pct, accent }]} />
export function StatusPanel({ items = [], className = "" }) {
  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
    >
      {items.map((item, i) => (
        <StatusBar key={item.label} {...item} delay={i * 0.15} />
      ))}
    </div>
  );
}
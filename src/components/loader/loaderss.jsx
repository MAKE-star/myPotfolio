// src/components/loader/Loader.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

/*
  LOADER — Refined "terminal identity" concept
  ─────────────────────────────────────────────
  - Progress bar is driven over a locked 5-second duration.
  - Exit: clean fade-out seamlessly into the dark app background.
*/

export default function Loaderss({ onComplete, ready }) {
  const rootRef = useRef();
  const barFillRef = useRef();
  const counterRef = useRef();
  const exitFiredRef = useRef(false);
  const progressRef = useRef(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // ── Locked 5-Second Progress Driver ─────────────────────────────
    const TOTAL_DURATION = 5000; // Locked to exactly 5 seconds
    const start = Date.now();
    let rafId;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      
      progressRef.current = progress;

      // Update DOM components smoothly
      if (barFillRef.current) barFillRef.current.style.transform = `scaleX(${progress / 100})`;
      if (counterRef.current) counterRef.current.textContent = String(Math.floor(progress)).padStart(3, "0");

      if (progress < 100) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Handle Exit Check ─────────────────────────────────────────────
  // Runs continuously to evaluate if both the 5 seconds are up and assets are ready
  useEffect(() => {
    let checkInterval;

    const tryExit = () => {
      if (progressRef.current >= 100 && ready) {
        if (exitFiredRef.current) return;
        exitFiredRef.current = true;

        clearInterval(checkInterval);

        // Smoothly fade out the loader container over 0.5s
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            document.body.style.overflow = "unset";
            onComplete(); // Safely unmounts loader in App.jsx
          }
        });
      }
    };

    // Keep checking progress and readiness status every 50ms
    checkInterval = setInterval(tryExit, 50);

    return () => clearInterval(checkInterval);
  }, [ready, onComplete]);

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050a05",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 280,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Identity Block */}
        <div
          style={{
            borderLeft: "1px solid rgba(168,192,96,0.2)",
            paddingLeft: 14,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(24px, 2.5vw, 32px)",
              color: "#f5f0e4",
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            [ MA ]
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 8,
              letterSpacing: "0.22em",
              color: "rgba(245,240,228,0.4)",
              textTransform: "uppercase",
            }}
          >
            Core Dev / Portfolio
          </div>
        </div>

        {/* Progress System */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              width: "100%",
              height: 2,
              background: "rgba(168,192,96,0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              ref={barFillRef}
              style={{
                position: "absolute",
                inset: 0,
                background: "#a8c060",
                transformOrigin: "left center",
                transform: "scaleX(0)",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 7,
                letterSpacing: "0.45em",
                color: "rgba(245,240,228,0.18)",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              LOADING ASSETS
            </span>
            <span
              ref={counterRef}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(13px, 1.4vw, 16px)",
                color: "#a8c060",
                letterSpacing: "0.1em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              000
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "clamp(18px,3.5vh,36px)",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Space Mono', monospace",
          fontSize: 7,
          letterSpacing: "0.15em",
          color: "rgba(245,240,228,0.15)",
        }}
      >
        SYS.INIT // 2026
      </div>
    </div>
  );
}
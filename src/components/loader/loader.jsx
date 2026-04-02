// src/components/loader/Loader.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

/*
  LOADER — Refined "terminal identity" concept
  ─────────────────────────────────────────────
  Inspired by minimal creative-dev portfolios (Crépelle, Harris):
  - Smaller initials + monospaced role text instead of oversized full name
  - ASCII bracket framing for the name block
  - Progress bar is driven by REAL elapsed time vs asset loading
  - Exit: clean fade-out, no curtain, no colour flash
  - Fires exit only when `ready` prop is true (assets loaded)
*/

export default function Loader({ onComplete, ready }) {
  const rootRef = useRef();
  const barFillRef = useRef();
  const counterRef = useRef();
  const exitFiredRef = useRef(false);
  const progressRef = useRef(0); // 0-100, drives both bar and counter

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // ── Progress driver ─────────────────────────────────────────────
    // Ticks from 0 → 92 on its own (over ~3 s).
    // Jumps to 100 the moment `ready` fires (handled in second effect).
    const DURATION = 3000; // ms to reach 92%
    const start = Date.now();
    let rafId;

    const tick = () => {
      const elapsed = Date.now() - start;
      const raw = Math.min(elapsed / DURATION, 1);
      // ease-out so it slows near 92 while waiting for assets
      const eased = 1 - Math.pow(1 - raw, 3);
      const value = Math.round(eased * 92); // caps at 92 until ready

      progressRef.current = value;

      if (counterRef.current) {
        counterRef.current.textContent = String(value).padStart(3, "0");
      }
      if (barFillRef.current) {
        barFillRef.current.style.transform = `scaleX(${value / 100})`;
      }

      if (raw < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
    };
  }, []);

  // ── Exit: waits for assets AND minimum animation time ──────────────
  useEffect(() => {
    if (!ready || exitFiredRef.current) return;
    exitFiredRef.current = true;

    // Animate progress to 100 quickly, then fade out
    const jumpTo100 = () => {
      let v = progressRef.current;
      const step = () => {
        v = Math.min(v + 4, 100);
        progressRef.current = v;
        if (counterRef.current) {
          counterRef.current.textContent = String(v).padStart(3, "0");
        }
        if (barFillRef.current) {
          barFillRef.current.style.transform = `scaleX(${v / 100})`;
        }
        if (v < 100) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    jumpTo100();

    // Short pause at 100 so user registers it, then fade out
    gsap.to(rootRef.current, {
      opacity: 0,
      duration: 0.65,
      delay: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete?.();
      },
    });
  }, [ready]);

  // ── Cleanup on unmount ──────────────────────────────────────────────
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      if (rootRef.current) gsap.killTweensOf(rootRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap');

        @keyframes ld-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes ld-letter {
          from { clip-path: inset(0 0 100% 0); transform: translateY(14px); opacity: 0; }
          to   { clip-path: inset(0 0 0% 0);   transform: translateY(0);    opacity: 1; }
        }

        @keyframes ld-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        @keyframes ld-glow-pulse {
          0%, 100% { opacity: 0.07; transform: translate(-50%,-50%) scale(1); }
          50%      { opacity: 0.14; transform: translate(-50%,-50%) scale(1.08); }
        }

        @keyframes ld-line-in {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }

        .ld-letter {
          display: inline-block;
          animation: ld-letter 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .ld-fade-up  { animation: ld-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .ld-line-in  { animation: ld-line-in 0.7s cubic-bezier(0.4,0,0.2,1) both; }
        .ld-cursor   { animation: ld-blink 1s step-end infinite; }
      `}</style>

      <div
        ref={rootRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#080d04",
          overflow: "hidden",
          fontFamily: "'Space Mono', monospace",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ── Subtle grid ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(168,192,96,0.03) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(168,192,96,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── Radial glow ── */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(500px, 70vw)",
            height: "min(500px, 70vw)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,192,96,1) 0%, transparent 70%)",
            animation: "ld-glow-pulse 3s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* ── Corner labels ── */}
        <div
          className="ld-fade-up"
          style={{
            animationDelay: "1.6s",
            position: "absolute",
            top: "clamp(18px,3.5vh,36px)",
            left: "clamp(18px,3.5vw,42px)",
            fontSize: 8,
            letterSpacing: "0.45em",
            color: "rgba(168,192,96,0.35)",
          }}
        >
          PORTFOLIO · 2026
        </div>

        <div
          className="ld-fade-up"
          style={{
            animationDelay: "1.6s",
            position: "absolute",
            top: "clamp(18px,3.5vh,36px)",
            right: "clamp(18px,3.5vw,42px)",
            fontSize: 8,
            letterSpacing: "0.45em",
            color: "rgba(168,192,96,0.35)",
            textAlign: "right",
          }}
        >
          LAGOS · NG
        </div>

        {/* ── Main name block ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "clamp(6px, 1.2vw, 12px)",
            marginBottom: "clamp(28px, 4vw, 48px)",
          }}
        >
          {/* Top bracket line */}
          <div
            className="ld-line-in"
            style={{
              animationDelay: "0.1s",
              width: "clamp(160px, 28vw, 320px)",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(168,192,96,0.5), transparent)",
            }}
          />

          {/* JAMES — first name */}
          <div
            aria-label="JAMES"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 9vw, 7.5rem)",
              lineHeight: 1,
              letterSpacing: "0.18em",
              color: "#f5f0e4",
              display: "flex",
              userSelect: "none",
            }}
          >
            {"JAMES".split("").map((ch, i) => (
              <span
                key={i}
                className="ld-letter"
                style={{ animationDelay: `${0.15 + i * 0.06}s` }}
              >
                {ch}
              </span>
            ))}
          </div>

          {/* Thin divider between names */}
          <div
            style={{
              width: "clamp(120px, 20vw, 240px)",
              height: 1,
              background: "rgba(168,192,96,0.2)",
            }}
          />

          {/* OLUWALEKE — last name, slightly smaller + accent colour */}
          <div
            aria-label="OLUWALEKE"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2rem, 6vw, 5rem)",
              lineHeight: 1,
              letterSpacing: "0.22em",
              color: "#a8c060",
              display: "flex",
              userSelect: "none",
            }}
          >
            {"OLUWALEKE".split("").map((ch, i) => (
              <span
                key={i}
                className="ld-letter"
                style={{ animationDelay: `${0.45 + i * 0.05}s` }}
              >
                {ch}
              </span>
            ))}
          </div>

          {/* Bottom bracket line */}
          <div
            className="ld-line-in"
            style={{
              animationDelay: "0.1s",
              width: "clamp(160px, 28vw, 320px)",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(168,192,96,0.5), transparent)",
            }}
          />
        </div>

        {/* ── Role tag with blinking cursor ── */}
        <div
          className="ld-fade-up"
          style={{
            animationDelay: "1.0s",
            fontSize: "clamp(7px, 0.85vw, 9px)",
            letterSpacing: "0.5em",
            color: "rgba(245,240,228,0.3)",
            marginBottom: "clamp(28px, 4.5vw, 52px)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ color: "#a8c060", opacity: 0.5 }}>{">"}</span>
          FULL‑STACK ENGINEER
          <span className="ld-cursor" style={{ color: "#a8c060" }}>
            _
          </span>
        </div>

        {/* ── Progress bar + counter ── */}
        <div
          className="ld-fade-up"
          style={{
            animationDelay: "1.2s",
            width: "clamp(180px, 26vw, 300px)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {/* Bar track */}
          <div
            style={{
              width: "100%",
              height: 2,
              background: "rgba(245,240,228,0.07)",
              borderRadius: 1,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Actual fill — controlled via ref, not CSS animation */}
            <div
              ref={barFillRef}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, #3d5518, #a8c060, #cfe07a)",
                transformOrigin: "left center",
                transform: "scaleX(0)",
                transition: "transform 0.08s linear",
              }}
            />
          </div>

          {/* Counter row */}
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

        {/* ── Bottom index ── */}
        <div
          className="ld-fade-up"
          style={{
            animationDelay: "1.8s",
            position: "absolute",
            bottom: "clamp(18px,3.5vh,36px)",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 7,
            letterSpacing: "0.4em",
            color: "rgba(245,240,228,0.1)",
            whiteSpace: "nowrap",
          }}
        >
          [ 01 / INIT ]
        </div>
      </div>
    </>
  );
}

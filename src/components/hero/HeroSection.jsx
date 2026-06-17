// src/components/hero/HeroSection.jsx
//
// Final merged version:
//   • Mayopo's full structure: African SVG pattern, BadgeCanvas (lazy),
//     vertical social rail, GSAP scroll-out, bottom bar, mobile layout
//   • Our terminal content: prompt line, MAYOPO / ADEOYE_ name,
//     typewriter cycling role, status bars, terminal CTAs
//   • BadgeCanvas replaces Mayopo's Three.js lanyard with our ID card + QR flip
//
// App.jsx needs zero changes — same export, same props (none).

import { useState, useEffect, Suspense, useRef, lazy } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TypingText from "../ui/TypingText";
import { StatusPanel } from "../ui/StatusBar";

const BadgeCanvas = lazy(() => import("./BadgeCanvas"));
gsap.registerPlugin(ScrollTrigger);

// ── Status bar items ─────────────────────────────────────────────────────────
const STATUS_ITEMS = [
  { label: "UPTIME",     value: "99.9%",       pct: 99,  },
  { label: "ASSESSMENT", value: "4.85 / 5.00", pct: 97,  },
  { label: "STATUS",     value: "AVAILABLE",   pct: 100, accent: true },
];

// ── Vertical social rail (desktop right edge) ────────────────────────────────
function SocialRail() {
  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/MAKE-star",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/mayopo-adeoye/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/2349052368651",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/make_d_great/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="hero-social-rail"
      style={{
        position: "absolute",
        right: 0, top: 0, bottom: 0,
        width: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderLeft: "1px solid rgba(57,255,106,0.1)",
        zIndex: 5,
      }}
    >
      {/* "DRAG BADGE" rotated label */}
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.3em",
        color: "rgba(57,255,106,0.45)",
        transform: "rotate(-90deg)",
        whiteSpace: "nowrap",
        userSelect: "none",
        position: "absolute",
        top: 320,
      }}>
        ↑ DRAG BADGE
      </span>

      {/* Social icons */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 22,
        position: "absolute",
        top: 500,
      }}>
        {socials.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
              transition: "color .2s, transform .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--clr-accent)";
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.35)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {icon}
          </a>
        ))}
      </div>

      <div style={{
        width: 1, height: 36,
        background: "rgba(57,255,106,0.15)",
        margin: "20px 0",
        flexShrink: 0,
      }} />
    </div>
  );
}

// ── Main HeroSection ─────────────────────────────────────────────────────────
export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP scroll-out (Mayopo's effect — section scales + blurs as user scrolls away)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        scale: 1.06,
        opacity: 0,
        filter: "blur(10px)",
        ease: "power2.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

        @keyframes blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fmFadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fmFade      { from{opacity:0} to{opacity:1} }
        @keyframes availBlink  { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes scanSweep   { from{transform:translateY(-100%)} to{transform:translateY(900%)} }
        @keyframes badgeSwing  {
          0%  {transform:rotate(-4deg)}
          50% {transform:rotate(3.5deg)}
          100%{transform:rotate(-4deg)}
        }

        .fm-up { animation: fmFadeUp .9s cubic-bezier(.16,1,.3,1) forwards; opacity:0; }
        .fm-in { animation: fmFade   .7s cubic-bezier(.16,1,.3,1) forwards; opacity:0; }

        /* ── Layout ── */
        .hero-layout {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .hero-canvas-wrap {
          position: absolute;
          inset: 0;
          right: 52px;
          z-index: 0;
        }
        .hero-content-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 clamp(1.5rem, 5vw, 3.5rem);
          position: relative;
          z-index: 1;
          pointer-events: none;
        }
        .hero-content-wrap > * { pointer-events: auto; }

        .hero-bottom {
          position: absolute;
          bottom: 28px;
          left: clamp(1.5rem, 5vw, 3.5rem);
          right: calc(52px + 16px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
        }

        .hero-mobile-gradient { display: none; }
        .hero-social-rail     { transition: opacity .3s; }

        /* ── Tablet ── */
        @media (max-width: 900px) {
          .hero-canvas-wrap { right: 52px; }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .hero-social-rail     { display: none !important; }
          .hero-bottom-socials  { display: none !important; }

          .hero-canvas-wrap {
            position: absolute !important;
            inset: 0 !important;
            right: 0 !important;
            height: 100% !important;
            z-index: 0;
          }
          .hero-mobile-gradient {
            display: block;
            position: absolute;
            inset: 0; z-index: 2;
            background: linear-gradient(
              to bottom,
              rgba(5,10,5,0.55) 0%,
              rgba(5,10,5,0.04) 28%,
              rgba(5,10,5,0.04) 46%,
              rgba(5,10,5,0.88) 64%,
              rgba(5,10,5,0.98) 100%
            );
            pointer-events: none;
          }
          .hero-content-wrap {
            position: absolute !important;
            bottom: 44px; left: 0; right: 0;
            top: unset !important;
            flex: unset !important;
            align-items: flex-start;
            padding: 0 1.25rem !important;
            z-index: 3;
          }
          .hero-bottom {
            position: absolute !important;
            bottom: 14px; left: 1.25rem; right: 1.25rem;
            top: unset !important;
            z-index: 4;
          }
          .hero-name { font-size: clamp(3.2rem, 14vw, 5rem) !important; }
          .hero-role-row { margin-top: 0.75rem !important; }
          .hero-meta-row { display: none !important; }
          .hero-status   { display: none !important; }
          .hero-scroll-hint { display: none !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="hero"
        style={{
          height: "100svh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          willChange: "transform",
        }}
      >
        <div className="hero-layout" style={{ height: "100%" }}>

          {/* ── African SVG pattern + ambient glow (Mayopo's) ── */}
          <div className="hero-canvas-wrap">
            {/* Ambient glow */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              pointerEvents: "none", zIndex: 1,
            }}>
              <div style={{
                width: 500, height: 500, opacity: 0.1, borderRadius: "50%",
                background: "radial-gradient(circle,rgba(57,255,106,0.6) 0%,transparent 70%)",
                filter: "blur(80px)",
              }} />
            </div>

            {/* Kente / African pattern SVG */}
            <svg
              aria-hidden="true"
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:2 }}
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 1440 900"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <style>{`
                  @keyframes hp-march  { from{stroke-dashoffset:0} to{stroke-dashoffset:-80} }
                  @keyframes hp-march2 { from{stroke-dashoffset:0} to{stroke-dashoffset:80}  }
                  @keyframes hp-pulse  { 0%,100%{opacity:.04} 50%{opacity:.09} }
                  @keyframes hp-pulse2 { 0%,100%{opacity:.03} 50%{opacity:.07} }
                  @keyframes hp-pulse3 { 0%,100%{opacity:.035} 50%{opacity:.08} }
                  .hm1{stroke-dasharray:40 40;animation:hp-march  10s linear infinite}
                  .hm2{stroke-dasharray:40 40;animation:hp-march2 10s linear infinite}
                  .hm3{stroke-dasharray:20 20;animation:hp-march  7s  linear infinite}
                  .hp1{animation:hp-pulse  7s ease-in-out infinite}
                  .hp2{animation:hp-pulse2 9s ease-in-out infinite 2s}
                  .hp3{animation:hp-pulse3 8s ease-in-out infinite 4s}
                `}</style>
              </defs>
              {/* Base grid */}
              <g stroke="#39ff6a" strokeWidth="0.4" fill="none" opacity="0.04">
                {[100,200,300,400,500,600,700,800].map(y => <line key={`y${y}`} x1="0" y1={y} x2="1440" y2={y}/>)}
                {[120,240,360,480,600,720,840,960,1080,1200,1320].map(x => <line key={`x${x}`} x1={x} y1="0" x2={x} y2="900"/>)}
              </g>
              {/* Left edge band */}
              <g className="hp1">
                <line x1="32" y1="0" x2="32" y2="900" stroke="#39ff6a" strokeWidth="0.9" fill="none"/>
                <polyline points="24,0 16,25 24,50 16,75 24,100 16,125 24,150 16,175 24,200 16,225 24,250 16,275 24,300 16,325 24,350 16,375 24,400 16,425 24,450 16,475 24,500 16,525 24,550 16,575 24,600 16,625 24,650 16,675 24,700 16,725 24,750 16,775 24,800 16,825 24,850 16,875 24,900" stroke="#39ff6a" strokeWidth="1" fill="none"/>
              </g>
              {/* Right edge band */}
              <g className="hp2">
                <line x1="1408" y1="0" x2="1408" y2="900" stroke="#1e8c3a" strokeWidth="0.9" fill="none"/>
                <polyline points="1416,0 1424,25 1416,50 1424,75 1416,100 1424,125 1416,150 1424,175 1416,200 1424,225 1416,250 1424,275 1416,300 1424,325 1416,350 1424,375 1416,400 1424,425 1416,450 1424,475 1416,500 1424,525 1416,550 1424,575 1416,600 1424,625 1416,650 1424,675 1416,700 1424,725 1416,750 1424,775 1416,800 1424,825 1416,850 1424,875 1416,900" stroke="#39ff6a" strokeWidth="1" fill="none"/>
              </g>
              {/* Top border zigzag */}
              <g className="hp1">
                <line x1="0" y1="28" x2="1440" y2="28" stroke="#1e8c3a" strokeWidth="0.8" fill="none"/>
                <polyline points="0,12 24,4 48,12 72,4 96,12 120,4 144,12 168,4 192,12 216,4 240,12 264,4 288,12 312,4 336,12 360,4 384,12 408,4 432,12 456,4 480,12 504,4 528,12 552,4 576,12 600,4 624,12 648,4 672,12 696,4 720,12 744,4 768,12 792,4 816,12 840,4 864,12 888,4 912,12 936,4 960,12 984,4 1008,12 1032,4 1056,12 1080,4 1104,12 1128,4 1152,12 1176,4 1200,12 1224,4 1248,12 1272,4 1296,12 1320,4 1344,12 1368,4 1392,12 1416,4 1440,12" stroke="#39ff6a" strokeWidth="1" fill="none"/>
              </g>
              {/* Bottom border zigzag */}
              <g className="hp2">
                <line x1="0" y1="872" x2="1440" y2="872" stroke="#1e8c3a" strokeWidth="0.8" fill="none"/>
                <polyline points="0,888 24,896 48,888 72,896 96,888 120,896 144,888 168,896 192,888 216,896 240,888 264,896 288,888 312,896 336,888 360,896 384,888 408,896 432,888 456,896 480,888 504,896 528,888 552,896 576,888 600,896 624,888 648,896 672,888 696,896 720,888 744,896 768,888 792,896 816,888 840,896 864,888 888,896 912,888 936,896 960,888 984,896 1008,888 1032,896 1056,888 1080,896 1104,888 1128,896 1152,888 1176,896 1200,888 1224,896 1248,888 1272,896 1296,888 1320,896 1344,888 1368,896 1392,888 1416,896 1440,888" stroke="#39ff6a" strokeWidth="1" fill="none"/>
              </g>
              {/* Left-zone kente bands */}
              <g className="hp2">
                <line x1="0" y1="180" x2="560" y2="180" stroke="#1e8c3a" strokeWidth="1" fill="none"/>
                <polyline points="0,188 20,180 40,188 60,180 80,188 100,180 120,188 140,180 160,188 180,180 200,188 220,180 240,188 260,180 280,188 300,180 320,188 340,180 360,188 380,180 400,188 420,180 440,188 460,180 480,188 500,180 520,188 540,180 560,188" stroke="#39ff6a" strokeWidth="0.9" fill="none"/>
                <line x1="0" y1="196" x2="560" y2="196" stroke="#1e8c3a" strokeWidth="1" fill="none"/>
              </g>
              <g className="hp3">
                <line x1="0" y1="680" x2="560" y2="680" stroke="#1e8c3a" strokeWidth="1" fill="none"/>
                <polyline points="0,688 20,680 40,688 60,680 80,688 100,680 120,688 140,680 160,688 180,680 200,688 220,680 240,688 260,680 280,688 300,680 320,688 340,680 360,688 380,680 400,688 420,680 440,688 460,680 480,688 500,680 520,688 540,680 560,688" stroke="#39ff6a" strokeWidth="0.9" fill="none"/>
                <line x1="0" y1="696" x2="560" y2="696" stroke="#1e8c3a" strokeWidth="1" fill="none"/>
              </g>
              {/* Marching diamond chains */}
              <polyline className="hm1" points="0,450 36,418 72,450 108,418 144,450 180,418 216,450 252,418 288,450 324,418 360,450 396,418 432,450 468,418 504,450 540,418 560,430" stroke="#39ff6a" strokeWidth="1.1" fill="none" opacity="0.1"/>
              <polyline className="hm2" points="0,450 36,482 72,450 108,482 144,450 180,482 216,450 252,482 288,450 324,482 360,450 396,482 432,450 468,482 504,450 540,482 560,470" stroke="#1e8c3a" strokeWidth="1.1" fill="none" opacity="0.08"/>
              {/* Corner rosettes */}
              <g fill="none" stroke="#39ff6a" strokeWidth="0.8" className="hp1">
                <circle cx="72" cy="72" r="18"/><circle cx="72" cy="72" r="10"/>
                <line x1="72" y1="54" x2="72" y2="90"/><line x1="54" y1="72" x2="90" y2="72"/>
                <line x1="59" y1="59" x2="85" y2="85"/><line x1="85" y1="59" x2="59" y2="85"/>
              </g>
              <g fill="none" stroke="#39ff6a" strokeWidth="0.8" className="hp3">
                <circle cx="72" cy="828" r="18"/><circle cx="72" cy="828" r="10"/>
                <line x1="72" y1="810" x2="72" y2="846"/><line x1="54" y1="828" x2="90" y2="828"/>
              </g>
              {/* Scattered diamonds */}
              <g fill="none" stroke="#39ff6a" strokeWidth="0.8">
                <polygon points="120,450 136,434 152,450 136,466" className="hp1"/>
                <polygon points="280,280 294,266 308,280 294,294" className="hp2"/>
                <polygon points="280,620 294,606 308,620 294,634" className="hp3"/>
                <polygon points="420,350 432,338 444,350 432,362" className="hp1"/>
                <polygon points="180,120 192,108 204,120 192,132" className="hp3"/>
                <polygon points="360,160 372,148 384,160 372,172" className="hp2"/>
              </g>
            </svg>

            {/* BadgeCanvas — our terminal ID card with QR flip */}
            <Suspense fallback={null}>
              <BadgeCanvas isMobile={isMobile} />
            </Suspense>
          </div>

          {/* Mobile gradient overlay */}
          <div className="hero-mobile-gradient" />

          {/* ── Main text content ── */}
          <div className="hero-content-wrap">
            <div style={{ maxWidth: 580, width: "100%" }}>

              {/* Prompt line */}
              <div className="fm-up" style={{ animationDelay: "0.25s", marginBottom: "1.25rem" }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(0.65rem, 1.2vw, 0.8rem)",
                  color: "var(--clr-accent)",
                  letterSpacing: "0.06em",
                  opacity: 0.75,
                }}>
                  ❯ mayopo@lagos:~$
                </span>
              </div>

              {/* Name — MAYOPO */}
              <div className="fm-up" style={{ animationDelay: "0.35s" }}>
                <h1 className="hero-name" style={{
                  margin: 0,
                  lineHeight: 0.88,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  fontSize: "clamp(4rem, 11vw, 9.5rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--clr-text-primary)",
                }}>
                  MAYOPO
                </h1>
              </div>

              {/* Name — ADEOYE_ */}
              <div className="fm-up" style={{ animationDelay: "0.42s" }}>
                <h1 className="hero-name" style={{
                  margin: 0,
                  lineHeight: 0.88,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  fontSize: "clamp(4rem, 11vw, 9.5rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--clr-text-primary)",
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "0.06em",
                }}>
                  ADEOYE
                  <span aria-hidden="true" style={{
                    display: "inline-block",
                    width: "0.5em", height: "0.76em",
                    background: "var(--clr-accent)",
                    marginBottom: "0.05em",
                    animation: "blink 1.1s step-end infinite",
                    flexShrink: 0,
                  }} />
                </h1>
              </div>

              {/* Role + typewriter */}
              <div className="fm-up hero-role-row" style={{
                animationDelay: "0.5s",
                marginTop: "clamp(1rem, 2vw, 1.75rem)",
                display: "flex",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: "0.4rem 0.8rem",
              }}>
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)",
                  fontWeight: 400,
                  color: "var(--clr-text-secondary)",
                }}>
                  Full Stack Developer —
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(0.8rem, 1.4vw, 1rem)",
                  color: "var(--clr-text-primary)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35em",
                }}>
                  <span style={{ color: "var(--clr-accent)", opacity: 0.6 }}>┌</span>
                  <TypingText
                    words={["DEVELOPER", "ENGINEER", "BUILDER", "PROBLEM SOLVER"]}
                    typeSpeed={75}
                    deleteSpeed={40}
                    pauseAfter={2000}
                    showCaret={false}
                  />
                  <span style={{ color: "var(--clr-accent)", opacity: 0.6 }}>┐</span>
                </span>
              </div>

              {/* Meta row */}
              <div className="fm-up hero-meta-row" style={{
                animationDelay: "0.58s",
                marginTop: "0.65rem",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.3rem 1rem",
              }}>
                {["5+ years", "Lagos, NG", "Fintech & Enterprise", "Available for work"].map((item, i, arr) => (
                  <span key={item} style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(0.6rem, 1vw, 0.72rem)",
                    color: i === arr.length - 1 ? "var(--clr-accent)" : "var(--clr-text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}>
                    {item}
                    {i < arr.length - 1 && (
                      <span aria-hidden="true" style={{
                        display: "inline-block",
                        width: 3, height: 3,
                        borderRadius: "50%",
                        background: "var(--clr-text-muted)",
                        opacity: 0.4,
                        marginLeft: "-0.5rem",
                      }} />
                    )}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="fm-up" style={{
                animationDelay: "0.66s",
                marginTop: "clamp(1.25rem, 2.5vw, 2rem)",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.65rem",
              }}>
                <a href="#projects" style={ctaPrimary}
                  onMouseEnter={e => { e.currentTarget.style.background="var(--clr-accent)"; e.currentTarget.style.color="#050a05"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--clr-accent)"; }}>
                  View Work →
                </a>
                <a href="#contact" style={ctaSecondary}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="var(--clr-border-hi)"; e.currentTarget.style.color="var(--clr-text-primary)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="var(--clr-border)"; e.currentTarget.style.color="var(--clr-text-secondary)"; }}>
                  Get In Touch
                </a>
                <a href="/Mayopo_Adeoye_CV.pdf" target="_blank" rel="noopener noreferrer"
                  style={ctaSecondary}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="var(--clr-border-hi)"; e.currentTarget.style.color="var(--clr-text-primary)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="var(--clr-border)"; e.currentTarget.style.color="var(--clr-text-secondary)"; }}>
                  ⤓ CV
                </a>
              </div>

              {/* Status bars */}
              <div className="fm-up hero-status" style={{
                animationDelay: "0.74s",
                marginTop: "clamp(1.5rem, 3vw, 2.5rem)",
              }}>
                <StatusPanel items={STATUS_ITEMS} />
              </div>

              {/* Scroll hint */}
              <div className="fm-up hero-scroll-hint" style={{
                animationDelay: "0.82s",
                marginTop: "clamp(1.25rem, 2.5vw, 2rem)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  color: "var(--clr-text-muted)",
                  textTransform: "uppercase",
                }}>└──╼ scroll</span>
                <span aria-hidden="true" style={{
                  display: "inline-block",
                  width: 24, height: 1,
                  background: "var(--clr-text-muted)",
                  opacity: 0.3,
                }} />
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="hero-bottom fm-in" style={{ animationDelay: "1s" }}>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "rgba(255,255,255,0.18)",
              letterSpacing: "0.3em",
            }}>
              © 2026 MAYOPO ADEOYE
            </span>
            <div className="hero-bottom-socials" style={{ display: "flex", gap: 28 }}>
              {[
                ["↗ GITHUB",   "https://github.com/MAKE-star"],
                ["↗ LINKEDIN", "https://www.linkedin.com/in/mayopo-adeoye/"],
              ].map(([label, href]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.18)",
                    letterSpacing: "0.3em",
                    textDecoration: "none",
                    transition: "color .2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--clr-accent)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.18)"}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Vertical social rail ── */}
          <SocialRail />

        </div>
      </section>
    </>
  );
}

// ── Shared button styles ─────────────────────────────────────────────────────
const ctaBase = {
  display: "inline-flex",
  alignItems: "center",
  padding: "0.6rem 1.3rem",
  fontFamily: "var(--font-mono)",
  fontSize: "clamp(0.62rem, 1.1vw, 0.72rem)",
  letterSpacing: "0.1em",
  textDecoration: "none",
  textTransform: "uppercase",
  transition: "all 0.2s ease",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const ctaPrimary = {
  ...ctaBase,
  background: "transparent",
  color: "var(--clr-accent)",
  border: "1px solid var(--clr-accent)",
};

const ctaSecondary = {
  ...ctaBase,
  background: "transparent",
  color: "var(--clr-text-secondary)",
  border: "1px solid var(--clr-border)",
};
// src/components/hero/HeroSection.jsx
import { useState, useEffect, Suspense, useRef, lazy } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
const BadgeCanvas = lazy(() => import("./BadgeCanvas"));
gsap.registerPlugin(ScrollTrigger);

// ─── Menu Overlay ─────────────────────────────────────────────────────────────
function MenuOverlay({ open, onClose }) {
  const links = ["About", "Projects", "Stack", "Collabs", "Contact"];
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "#1c2410",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform .7s cubic-bezier(.16,1,.3,1)",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div
        style={{
          padding: "40px clamp(24px,5vw,48px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid rgba(245,240,228,0.08)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Share Tech Mono',monospace",
            fontSize: 11,
            letterSpacing: "0.4em",
            color: "rgba(245,240,228,0.5)",
            textAlign: "left",
          }}
        >
          CLOSE
        </button>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={onClose}
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(2rem,5vw,4.5rem)",
                color: "rgba(245,240,228,0.25)",
                textDecoration: "none",
                lineHeight: 1.1,
                transition: "color .2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#f5f0e4")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(245,240,228,0.25)")
              }
            >
              {l}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: 10,
              color: "rgba(245,240,228,0.3)",
              letterSpacing: "0.3em",
            }}
          >
            JAMES THE BUILD
          </span>
          <a
            href="mailto:hello@jamesasuelimen.com"
            style={{
              fontFamily: "'Share Tech Mono',monospace",
              fontSize: 10,
              color: "rgba(245,240,228,0.3)",
              letterSpacing: "0.2em",
              textDecoration: "none",
            }}
          >
            HELLO@JAMESASUELIMEN.COM
          </a>
        </div>
      </div>
      <div
        style={{
          background: "linear-gradient(135deg,#232e15,#141a0c)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(168,192,96,0.12) 0%,transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(3rem,8vw,7rem)",
            color: "rgba(168,192,96,0.15)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            userSelect: "none",
          }}
        >
          {"{ }"}
        </div>
      </div>
    </div>
  );
}

// ─── Vertical Social Rail ──────────────────────────────────────────────────────
function SocialRail() {
  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/jamesking77-create/",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jamesasuelimen77/",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      href: "#",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4l16 16M4 20L20 4" />
        </svg>
      ),
    },
    {
      label: "Behance",
      href: "https://www.behance.net/jamesasuelimen",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 6h7.5a3.5 3.5 0 0 1 0 7H1V6z" />
          <path d="M1 13h8.5a3.5 3.5 0 0 1 0 7H1v-7z" />
          <path d="M14 7h7" />
          <path d="M21 12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.9 0 3.56-1.06 4.4-2.62" />
        </svg>
      ),
    },
    {
      label: "Dribbble",
      href: "https://dribbble.com/jamesking777",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72" />
          <path d="M10.6 21.7c1.12-5.23 1.8-8.46 3.35-11.55" />
          <path d="M2.36 13.5c5.57.63 9.13.44 13.85-1" />
        </svg>
      ),
    },
    {
      label: "Discord",
      href: "https://discord.com/users/jamesking8460",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
          <circle cx="9" cy="13" r="1.5" />
          <circle cx="15" cy="13" r="1.5" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/08142186524",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/_jamess_kingg/",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
        right: 0,
        top: 0,
        bottom: 0,
        width: 52,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderLeft: "1px solid rgba(168,192,96,0.15)",
        zIndex: 5,
      }}
    >
      <span
        style={{
          fontFamily: "'Share Tech Mono',monospace",
          fontSize: 17,
          letterSpacing: "0.3em",
          color: "rgba(168,192,96,0.6)",
          transform: "rotate(-90deg)",
          whiteSpace: "nowrap",
          userSelect: "none",
          position: "absolute",
          top: 344,
        }}
      >
        ↑ DRAG BADGE
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          position: "absolute",
          top: 544,
        }}
      >
        {socials.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            style={{
              width: 22,
              height: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(245,240,228,0.65)",
              textDecoration: "none",
              transition: "color .2s, transform .2s",
              borderRadius: 4,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#a8c060";
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(245,240,228,0.65)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {icon}
          </a>
        ))}
      </div>
      <div
        style={{
          width: 1,
          height: 36,
          background: "rgba(168,192,96,0.2)",
          margin: "20px 0",
          flexShrink: 0,
        }}
      />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  // const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  // useEffect(() => {
  //   document.body.style.overflow = menuOpen ? "hidden" : "";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [menuOpen]);

  return (
    <>
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Orbitron:wght@400;500&family=Share+Tech+Mono&family=DM+Sans:wght@300;400;500&family=Rajdhani:wght@600;700&family=Exo+2:wght@700;800;900&display=swap');

        @keyframes fmFadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fmFade   { from{opacity:0} to{opacity:1} }
        .fm-up { animation: fmFadeUp .9s cubic-bezier(.16,1,.3,1) forwards; opacity:0; }
        .fm-in { animation: fmFade .7s cubic-bezier(.16,1,.3,1) forwards; opacity:0; }

        .fm-pill {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 26px; border-radius: 100px;
          border: 1px solid rgba(245,240,228,0.25);
          background: transparent; color: #f5f0e4;
          font-family: 'Share Tech Mono', monospace; font-size: 11px;
          letter-spacing: .08em; cursor: pointer; text-decoration: none;
          transition: background .3s, border-color .3s, transform .3s;
          white-space: nowrap;
        }
        .fm-pill:hover { background: rgba(245,240,228,0.08); border-color: rgba(245,240,228,0.45); transform: translateY(-2px); }
        .fm-pill-accent { background: #a8c060; border-color: #a8c060; color: #1c2410; font-weight: 700; font-size: 11px; letter-spacing: .06em; }
        .fm-pill-accent:hover { background: #bcd470; border-color: #bcd470; transform: translateY(-2px); }
        .fm-dot { width: 6px; height: 6px; border-radius: 50%; background: #a8c060; flex-shrink: 0; }
        .fm-pill-accent .fm-dot { background: #1c2410; }

        /* ── DESKTOP LAYOUT ── */
        .hero-layout {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        // .hero-nav {
        //   flex-shrink: 0;
        //   display: flex; align-items: center; justify-content: space-between;
        //   padding: 28px 48px 0;
        //   padding-right: calc(52px + 24px + 24px);
        //   position: relative; z-index: 2;
        // }

        .hero-canvas-wrap {
          position: absolute;
          inset: 0;
          right: 52px;
          z-index: 0;
        }

        .hero-content-wrap {
          flex: 1; display: flex; align-items: center;
          padding: 0 48px;
          position: relative; z-index: 1;
          pointer-events: none;
        }
        .hero-content-wrap > * { pointer-events: auto; }

        .hero-bottom {
          position: absolute;
          bottom: 28px; left: 48px;
          right: calc(52px + 16px);
          display: flex; justify-content: space-between; align-items: center;
          z-index: 2;
        }

        .hero-mobile-gradient { display: none; }
        .hero-drag-hint { display: none !important; }
        .hero-social-rail { transition: opacity .3s; }

        /* ── TABLET (≤ 900px) ── */
        @media (max-width: 900px) {
          .hero-nav {
            padding: 20px 24px 0;
            padding-right: calc(52px + 16px);
          }
          .hero-content-wrap { padding: 0 24px; }
          .hero-bottom { left: 24px; }
          .hero-nav-contact { display: none; }
        }

        /* ── MOBILE (≤ 640px) ── */
        @media (max-width: 640px) {
          .hero-social-rail    { display: none !important; }
          .hero-bottom-socials { display: none !important; }
          .hero-nav-contact    { display: none !important; }

          .hero-layout { position: relative; }

          .hero-nav {
            position: absolute !important;
            top: 0; left: 0; right: 0;
            padding: 22px 22px 0 !important;
            z-index: 10;
          }

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
            inset: 0;
            z-index: 2;
            background: linear-gradient(
              to bottom,
              rgba(20, 26, 12, 0.52) 0%,
              rgba(20, 26, 12, 0.04) 28%,
              rgba(20, 26, 12, 0.04) 46%,
              rgba(20, 26, 12, 0.86) 64%,
              rgba(20, 26, 12, 0.98) 100%
            );
            pointer-events: none;
          }

          .hero-content-wrap {
            position: absolute !important;
            bottom: 44px; left: 0; right: 0;
            top: unset !important;
            flex: unset !important;
            align-items: flex-start;
            padding: 0 20px !important;
            z-index: 3;
            pointer-events: none;
          }
          .hero-content-wrap > * { pointer-events: auto; }

          .hero-bottom {
            position: absolute !important;
            bottom: 14px; left: 20px; right: 20px;
            top: unset !important;
            z-index: 4;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            padding: 0;
          }

          /* ── TYPOGRAPHY — all bumped up for readability ── */
          .hero-h1 { font-size: clamp(1.9rem, 8vw, 2.6rem) !important; }

          .hero-para {
            font-size: 14px !important;
            line-height: 1.65 !important;
            color: rgba(245,240,228,0.75) !important; /* brighter than before */
          }

          /* label row */
          .hero-label-row span {
            font-size: 11px !important;
            letter-spacing: 0.3em !important;
            color: rgba(245,240,228,0.65) !important;
          }

          /* Spacing */
          .hero-label-row { margin-bottom: 10px !important; }
          .hero-h1-wrap   { margin-bottom: 10px !important; }
          .hero-para-wrap { margin-bottom: 18px !important; }

          /* ── BUTTONS ── */
          .hero-btn-row {
            display: flex !important;
            flex-direction: row !important;
            gap: 10px !important;
            flex-wrap: nowrap !important;
            width: 100%;
            margin-bottom: 0 !important;
          }
          .hero-btn-row .fm-pill {
            flex: 1;
            justify-content: center;
            padding: 14px 12px !important;
            font-size: 14px !important;
            letter-spacing: 0.08em !important;
            gap: 7px !important;
            border-width: 1.5px !important;
          }
          /* outline button — make text brighter so it pops on dark bg */
          .hero-btn-row .fm-pill:not(.fm-pill-accent) {
            color: #f5f0e4 !important;
            border-color: rgba(245,240,228,0.5) !important;
          }
          /* accent button — ensure dark text on green is crisp */
          .hero-btn-row .fm-pill-accent {
            font-size: 14px !important;
            color: #1c2410 !important;
            letter-spacing: 0.06em !important;
          }
          .fm-dot { width: 5px !important; height: 5px !important; }

          /* copyright */
          .hero-bottom span {
            font-size: 10px !important;
            color: rgba(245,240,228,0.35) !important;
          }
        }

        /* ── VERY SMALL (≤ 380px) ── */
        @media (max-width: 380px) {
          .hero-h1 { font-size: 1.7rem !important; }
          .hero-nav { padding: 18px 16px 0 !important; }
          .hero-content-wrap { padding: 0 16px !important; bottom: 42px; }
          .hero-bottom { left: 16px; right: 16px; }
          .hero-btn-row .fm-pill { font-size: 11px !important; padding: 13px 8px !important; }
        }
      `}</style>  

      {/* <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} /> */}

      <section
        ref={sectionRef}
        style={{
          height: "100svh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          willChange: "transform",
        }}
      >
        <div className="hero-layout" style={{ height: "100%" }}>
          {/* ── NAV ── */}
          {/* <div className="hero-nav fm-in" style={{ animationDelay: "0.1s" }}>
            <button
              className="fm-in"
              style={{
                animationDelay: "0.1s",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: 11,
                letterSpacing: "0.4em",
                color: "rgba(245,240,228,0.55)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: 0,
              }}
              onClick={() => setMenuOpen(true)}
            >
              <span style={{ fontSize: 14 }}>✕</span> MENU
            </button>

            <div
              className="fm-in"
              style={{
                animationDelay: "0.15s",
                fontSize: 10,
                fontWeight: 500,
                color: "#f5f0e4",
                letterSpacing: "0.06em",
              }}
            >
              JAMES OLUWALEKE
            </div>

            <a
              href="#contact"
              className="fm-pill fm-in hero-nav-contact"
              style={{
                animationDelay: "0.2s",
                padding: "9px 20px",
                fontSize: 10,
              }}
            >
              CONTACT
            </a>
          </div> */}

          {/* ── 3D CANVAS — full bleed on both desktop and mobile ── */}
          <div className="hero-canvas-wrap">
            {/* Ambient glow — unchanged */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 500,
                  height: 500,
                  opacity: 0.12,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(168,192,96,0.7) 0%,transparent 70%)",
                  filter: "blur(70px)",
                }}
              />
            </div>

            {/* ── African pattern — behind everything, left + edge zones only ── */}
            <svg
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 2,
              }}
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
        .hm1 { stroke-dasharray:40 40; animation:hp-march  10s linear infinite }
        .hm2 { stroke-dasharray:40 40; animation:hp-march2 10s linear infinite }
        .hm3 { stroke-dasharray:20 20; animation:hp-march  7s  linear infinite }
        .hp1 { animation:hp-pulse  7s  ease-in-out infinite }
        .hp2 { animation:hp-pulse2 9s  ease-in-out infinite 2s }
        .hp3 { animation:hp-pulse3 8s  ease-in-out infinite 4s }
      `}</style>
              </defs>

              {/* ═══ BASE FABRIC GRID — full canvas, very faint ═══ */}
              <g stroke="#a8c060" strokeWidth="0.4" fill="none" opacity="0.045">
                {[100, 200, 300, 400, 500, 600, 700, 800].map((y) => (
                  <line key={`hy${y}`} x1="0" y1={y} x2="1440" y2={y} />
                ))}
                {[120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320].map(
                  (x) => (
                    <line key={`hx${x}`} x1={x} y1="0" x2={x} y2="900" />
                  ),
                )}
              </g>

              {/* ═══ LEFT EDGE BAND ═══ */}
              <g className="hp1">
                <line
                  x1="32"
                  y1="0"
                  x2="32"
                  y2="900"
                  stroke="#d4a843"
                  strokeWidth="0.9"
                  fill="none"
                />
                <polyline
                  points="24,0 16,25 24,50 16,75 24,100 16,125 24,150 16,175 24,200 16,225 24,250 16,275 24,300 16,325 24,350 16,375 24,400 16,425 24,450 16,475 24,500 16,525 24,550 16,575 24,600 16,625 24,650 16,675 24,700 16,725 24,750 16,775 24,800 16,825 24,850 16,875 24,900"
                  stroke="#a8c060"
                  strokeWidth="1"
                  fill="none"
                />
                <line
                  x1="44"
                  y1="0"
                  x2="44"
                  y2="900"
                  stroke="#d4a843"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.5"
                />
              </g>

              {/* ═══ RIGHT EDGE BAND ═══ */}
              <g className="hp2">
                <line
                  x1="1408"
                  y1="0"
                  x2="1408"
                  y2="900"
                  stroke="#d4a843"
                  strokeWidth="0.9"
                  fill="none"
                />
                <polyline
                  points="1416,0 1424,25 1416,50 1424,75 1416,100 1424,125 1416,150 1424,175 1416,200 1424,225 1416,250 1424,275 1416,300 1424,325 1416,350 1424,375 1416,400 1424,425 1416,450 1424,475 1416,500 1424,525 1416,550 1424,575 1416,600 1424,625 1416,650 1424,675 1416,700 1424,725 1416,750 1424,775 1416,800 1424,825 1416,850 1424,875 1416,900"
                  stroke="#a8c060"
                  strokeWidth="1"
                  fill="none"
                />
                <line
                  x1="1396"
                  y1="0"
                  x2="1396"
                  y2="900"
                  stroke="#d4a843"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.5"
                />
              </g>

              {/* ═══ TOP BORDER ZIGZAG ═══ */}
              <g className="hp1">
                <line
                  x1="0"
                  y1="28"
                  x2="1440"
                  y2="28"
                  stroke="#d4a843"
                  strokeWidth="0.8"
                  fill="none"
                />
                <polyline
                  points="0,12 24,4 48,12 72,4 96,12 120,4 144,12 168,4 192,12 216,4 240,12 264,4 288,12 312,4 336,12 360,4 384,12 408,4 432,12 456,4 480,12 504,4 528,12 552,4 576,12 600,4 624,12 648,4 672,12 696,4 720,12 744,4 768,12 792,4 816,12 840,4 864,12 888,4 912,12 936,4 960,12 984,4 1008,12 1032,4 1056,12 1080,4 1104,12 1128,4 1152,12 1176,4 1200,12 1224,4 1248,12 1272,4 1296,12 1320,4 1344,12 1368,4 1392,12 1416,4 1440,12"
                  stroke="#a8c060"
                  strokeWidth="1"
                  fill="none"
                />
                <polyline
                  points="0,20 24,12 48,20 72,12 96,20 120,12 144,20 168,12 192,20 216,12 240,20 264,12 288,20 312,12 336,20 360,12 384,20 408,12 432,20 456,12 480,20 504,12 528,20 552,12 576,20 600,12 624,20 648,12 672,20 696,12 720,20 744,12 768,20 792,12 816,20 840,12 864,20 888,12 912,20 936,12 960,20 984,12 1008,20 1032,12 1056,20 1080,12 1104,20 1128,12 1152,20 1176,12 1200,20 1224,12 1248,20 1272,12 1296,20 1320,12 1344,20 1368,12 1392,20 1416,12 1440,20"
                  stroke="#d4a843"
                  strokeWidth="0.6"
                  fill="none"
                  opacity="0.6"
                />
              </g>

              {/* ═══ BOTTOM BORDER ZIGZAG ═══ */}
              <g className="hp2">
                <line
                  x1="0"
                  y1="872"
                  x2="1440"
                  y2="872"
                  stroke="#d4a843"
                  strokeWidth="0.8"
                  fill="none"
                />
                <polyline
                  points="0,888 24,896 48,888 72,896 96,888 120,896 144,888 168,896 192,888 216,896 240,888 264,896 288,888 312,896 336,888 360,896 384,888 408,896 432,888 456,896 480,888 504,896 528,888 552,896 576,888 600,896 624,888 648,896 672,888 696,896 720,888 744,896 768,888 792,896 816,888 840,896 864,888 888,896 912,888 936,896 960,888 984,896 1008,888 1032,896 1056,888 1080,896 1104,888 1128,896 1152,888 1176,896 1200,888 1224,896 1248,888 1272,896 1296,888 1320,896 1344,888 1368,896 1392,888 1416,896 1440,888"
                  stroke="#a8c060"
                  strokeWidth="1"
                  fill="none"
                />
              </g>

              {/* ═══ LEFT-ZONE HORIZONTAL KENTE BANDS (stop at x=580 — before badge) ═══ */}
              <g className="hp2">
                <line
                  x1="0"
                  y1="180"
                  x2="560"
                  y2="180"
                  stroke="#d4a843"
                  strokeWidth="1"
                  fill="none"
                />
                <polyline
                  points="0,188 20,180 40,188 60,180 80,188 100,180 120,188 140,180 160,188 180,180 200,188 220,180 240,188 260,180 280,188 300,180 320,188 340,180 360,188 380,180 400,188 420,180 440,188 460,180 480,188 500,180 520,188 540,180 560,188"
                  stroke="#a8c060"
                  strokeWidth="0.9"
                  fill="none"
                />
                <line
                  x1="0"
                  y1="196"
                  x2="560"
                  y2="196"
                  stroke="#d4a843"
                  strokeWidth="1"
                  fill="none"
                />
              </g>
              <g className="hp3">
                <line
                  x1="0"
                  y1="680"
                  x2="560"
                  y2="680"
                  stroke="#d4a843"
                  strokeWidth="1"
                  fill="none"
                />
                <polyline
                  points="0,688 20,680 40,688 60,680 80,688 100,680 120,688 140,680 160,688 180,680 200,688 220,680 240,688 260,680 280,688 300,680 320,688 340,680 360,688 380,680 400,688 420,680 440,688 460,680 480,688 500,680 520,688 540,680 560,688"
                  stroke="#a8c060"
                  strokeWidth="0.9"
                  fill="none"
                />
                <line
                  x1="0"
                  y1="696"
                  x2="560"
                  y2="696"
                  stroke="#d4a843"
                  strokeWidth="1"
                  fill="none"
                />
              </g>

              {/* ═══ MARCHING DIAMOND CHAIN — left half only ═══ */}
              <polyline
                className="hm1"
                points="0,450 36,418 72,450 108,418 144,450 180,418 216,450 252,418 288,450 324,418 360,450 396,418 432,450 468,418 504,450 540,418 560,430"
                stroke="#a8c060"
                strokeWidth="1.1"
                fill="none"
                opacity="0.12"
              />
              <polyline
                className="hm2"
                points="0,450 36,482 72,450 108,482 144,450 180,482 216,450 252,482 288,450 324,482 360,450 396,482 432,450 468,482 504,450 540,482 560,470"
                stroke="#d4a843"
                strokeWidth="1.1"
                fill="none"
                opacity="0.09"
              />

              {/* ═══ MARCHING ACCENT — top-left quarter ═══ */}
              <polyline
                className="hm3"
                points="0,90 20,78 40,90 60,78 80,90 100,78 120,90 140,78 160,90 180,78 200,90 220,78 240,90 260,78 280,90 300,78 320,90 340,78 360,90 380,78 400,90 420,78 440,90 460,78 480,90 500,78 520,90 540,78 560,90"
                stroke="#d4a843"
                strokeWidth="0.8"
                fill="none"
                opacity="0.1"
              />

              {/* ═══ MARCHING ACCENT — bottom-left quarter ═══ */}
              <polyline
                className="hm3"
                points="0,810 20,822 40,810 60,822 80,810 100,822 120,810 140,822 160,810 180,822 200,810 220,822 240,810 260,822 280,810 300,822 320,810 340,822 360,810 380,822 400,810 420,822 440,810 460,822 480,810 500,822 520,810 540,822 560,810"
                stroke="#d4a843"
                strokeWidth="0.8"
                fill="none"
                opacity="0.1"
              />

              {/* ═══ STAIRCASE STEPS — top-left corner ═══ */}
              <g stroke="#a8c060" strokeWidth="0.9" fill="none" className="hp1">
                <polyline points="56,60 90,60 90,100 130,100 130,140 170,140 170,180" />
                <polyline points="56,340 90,340 90,300 130,300 130,260 170,260 170,220 210,220 210,200" />
              </g>

              {/* ═══ STAIRCASE STEPS — bottom-left corner ═══ */}
              <g stroke="#a8c060" strokeWidth="0.9" fill="none" className="hp2">
                <polyline points="56,840 90,840 90,800 130,800 130,760 170,760 170,720" />
                <polyline points="56,560 90,560 90,600 130,600 130,640 170,640 170,680" />
              </g>

              {/* ═══ SCATTERED DIAMONDS — left zone + corners ═══ */}
              <g fill="none" stroke="#a8c060" strokeWidth="0.8">
                <polygon
                  points="120,450 136,434 152,450 136,466"
                  className="hp1"
                />
                <polygon
                  points="280,280 294,266 308,280 294,294"
                  className="hp2"
                />
                <polygon
                  points="280,620 294,606 308,620 294,634"
                  className="hp3"
                />
                <polygon
                  points="420,350 432,338 444,350 432,362"
                  className="hp1"
                />
                <polygon
                  points="420,550 432,538 444,550 432,562"
                  className="hp2"
                />
                <polygon
                  points="180,120 192,108 204,120 192,132"
                  className="hp3"
                />
                <polygon
                  points="180,780 192,768 204,780 192,792"
                  className="hp1"
                />
                <polygon
                  points="360,160 372,148 384,160 372,172"
                  className="hp2"
                />
                <polygon
                  points="360,740 372,728 384,740 372,752"
                  className="hp3"
                />
              </g>
              {/* right-edge corner diamonds */}
              <g fill="none" stroke="#d4a843" strokeWidth="0.7">
                <polygon
                  points="1360,120 1372,108 1384,120 1372,132"
                  className="hp2"
                />
                <polygon
                  points="1360,780 1372,768 1384,780 1372,792"
                  className="hp3"
                />
                <polygon
                  points="1300,450 1312,438 1324,450 1312,462"
                  className="hp1"
                />
              </g>

              {/* ═══ CORNER ROSETTES ═══ */}
              <g fill="none" stroke="#a8c060" strokeWidth="0.8" className="hp1">
                <circle cx="72" cy="72" r="18" />
                <circle cx="72" cy="72" r="10" />
                <line x1="72" y1="54" x2="72" y2="90" />
                <line x1="54" y1="72" x2="90" y2="72" />
                <line x1="59" y1="59" x2="85" y2="85" />
                <line x1="85" y1="59" x2="59" y2="85" />
              </g>
              <g fill="none" stroke="#a8c060" strokeWidth="0.8" className="hp3">
                <circle cx="72" cy="828" r="18" />
                <circle cx="72" cy="828" r="10" />
                <line x1="72" y1="810" x2="72" y2="846" />
                <line x1="54" y1="828" x2="90" y2="828" />
                <line x1="59" y1="815" x2="85" y2="841" />
                <line x1="85" y1="815" x2="59" y2="841" />
              </g>
              <g fill="none" stroke="#d4a843" strokeWidth="0.8" className="hp2">
                <circle cx="1368" cy="72" r="18" />
                <circle cx="1368" cy="72" r="10" />
                <line x1="1368" y1="54" x2="1368" y2="90" />
                <line x1="1350" y1="72" x2="1386" y2="72" />
                <line x1="1355" y1="59" x2="1381" y2="85" />
                <line x1="1381" y1="59" x2="1355" y2="85" />
              </g>
              <g fill="none" stroke="#d4a843" strokeWidth="0.8" className="hp1">
                <circle cx="1368" cy="828" r="18" />
                <circle cx="1368" cy="828" r="10" />
                <line x1="1368" y1="810" x2="1368" y2="846" />
                <line x1="1350" y1="828" x2="1386" y2="828" />
                <line x1="1355" y1="815" x2="1381" y2="841" />
                <line x1="1381" y1="815" x2="1355" y2="841" />
              </g>

              {/* ═══ VERTICAL ACCENT — far left, between edge band and content ═══ */}
              <g className="hp3">
                <line
                  x1="200"
                  y1="0"
                  x2="200"
                  y2="900"
                  stroke="#d4a843"
                  strokeWidth="0.7"
                  fill="none"
                  opacity="0.5"
                />
                <polyline
                  points="208,0 200,30 208,60 200,90 208,120 200,150 208,180 200,210 208,240 200,270 208,300 200,330 208,360 200,390 208,420 200,450 208,480 200,510 208,540 200,570 208,600 200,630 208,660 200,690 208,720 200,750 208,780 200,810 208,840 200,870 208,900"
                  stroke="#a8c060"
                  strokeWidth="0.8"
                  fill="none"
                  opacity="0.5"
                />
              </g>
            </svg>

            {/* BadgeCanvas — unchanged */}
            <Suspense fallback={null}>
              <BadgeCanvas isMobile={isMobile} />
            </Suspense>
          </div>

          {/* ── MOBILE GRADIENT OVERLAY ── */}
          {/*
            Sits between the canvas (z:0) and the text (z:3).
            On desktop this div is display:none via CSS.
            On mobile it creates the cinematic fade that keeps
            the badge visible above and text readable below.
          */}
          <div className="hero-mobile-gradient" />

          {/* ── MAIN TEXT CONTENT ── */}
          <div className="hero-content-wrap">
            <div style={{ maxWidth: 560, width: "100%" }}>
              {/* Label */}
              <div
                className="fm-up hero-label-row"
                style={{
                  animationDelay: "0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 1,
                    background: "#a8c060",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Share Tech Mono',monospace",
                    fontSize: 10,
                    letterSpacing: "0.4em",
                    color: "rgba(245,240,228,0.5)",
                  }}
                >
                  FULL STACK ENGINEER
                </span>
              </div>

              {/* Heading */}
              <div
                className="fm-up hero-h1-wrap"
                style={{ animationDelay: "0.4s", marginBottom: 16 }}
              >
                <h1
                  className="hero-h1"
                  style={{
                    // ── OPTION A — Rajdhani 700 (sharper, more angular, closest to BEYNO) ──
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 700,

                    // ── OPTION B — Exo 2 900 (bolder, blockier, more cinematic) ──
                    // fontFamily: "'Exo 2', sans-serif",
                    // fontWeight: 900,

                    fontSize: "clamp(2.4rem, 6vw, 5.8rem)", // slightly bigger since Rajdhani is condensed
                    color: "#f5f0e4",
                    lineHeight: 1.05,
                    letterSpacing: "0.06em", // tight spacing like the movie title
                    textTransform: "uppercase", // force all caps like Black Panther
                    margin: 0,
                  }}
                >
                  BUILDING THE
                  <br />
                  <span style={{ color: "#a8c060" }}>DIGITAL</span> FUTURE.
                </h1>
              </div>

              {/* Para */}
              <div
                className="fm-up hero-para-wrap"
                style={{ animationDelay: "0.55s", marginBottom: 28 }}
              >
                <p
                  className="hero-para"
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 15,
                    color: "rgba(245,240,228,0.55)",
                    lineHeight: 1.75,
                    maxWidth: 440,
                    margin: 0,
                  }}
                >
                  Creative software engineer crafting experiences with precision
                  and passion — specialising in modern web, mobile and
                  interactive design.
                </p>
              </div>

              {/* Buttons */}
              <div
                className="fm-up hero-btn-row"
                style={{
                  animationDelay: "0.7s",
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <a href="#about" className="fm-pill fm-pill-accent">
                  <span className="fm-dot" />
                  EXPLORE MY WORK
                  <span className="fm-dot" />
                </a>
                <a href="#projects" className="fm-pill">
                  VIEW PROJECTS ↗
                </a>
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="hero-bottom fm-in" style={{ animationDelay: "1s" }}>
            <span
              style={{
                fontFamily: "'Share Tech Mono',monospace",
                fontSize: 9,
                color: "rgba(245,240,228,0.2)",
                letterSpacing: "0.3em",
              }}
            >
              © 2026 JAMES OLUWALEKE
            </span>
            <div
              className="hero-bottom-socials"
              style={{ display: "flex", gap: 28 }}
            >
              {[
                ["↗ GITHUB", "https://github.com/jamesking77-create/"],
                ["↗ LINKEDIN", "https://www.linkedin.com/in/jamesasuelimen77/"],
              ].map(([l, h]) => (
                <a
                  key={l}
                  href={h}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Share Tech Mono',monospace",
                    fontSize: 9,
                    color: "rgba(245,240,228,0.2)",
                    letterSpacing: "0.3em",
                    textDecoration: "none",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#a8c060")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(245,240,228,0.2)")
                  }
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* ── VERTICAL SOCIAL RAIL (desktop only) ── */}
          <SocialRail />
        </div>
      </section>
    </>
  );
}

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

      {/* ── ICONS cluster ── */}
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

      {/* ── Divider ── */}
      <div
        style={{
          width: 1,
          height: 36,
          background: "rgba(168,192,96,0.2)",
          margin: "20px 0",
          flexShrink: 0,
        }}
      />

      {/* ── DRAG BADGE hint ── */}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Orbitron:wght@400;500&family=Share+Tech+Mono&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fmFadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fmFade   { from{opacity:0} to{opacity:1} }
        .fm-up { animation: fmFadeUp .9s cubic-bezier(.16,1,.3,1) forwards; opacity:0; }
        .fm-in { animation: fmFade .7s cubic-bezier(.16,1,.3,1) forwards; opacity:0; }

        .fm-pill {
          display:inline-flex; align-items:center; gap:10px;
          padding:13px 26px; border-radius:100px;
          border:1px solid rgba(245,240,228,0.25);
          background:transparent; color:#f5f0e4;
          font-family:'Share Tech Mono',monospace; font-size:11px;
          letter-spacing:.08em; cursor:pointer; text-decoration:none;
          transition:background .3s,border-color .3s,transform .3s;
          white-space: nowrap;
        }
        .fm-pill:hover { background:rgba(245,240,228,0.08); border-color:rgba(245,240,228,0.45); transform:translateY(-2px); }
        .fm-pill-accent { background:#a8c060; border-color:#a8c060; color:#1c2410; font-weight:700; font-size:14px; letter-spacing:.06em; }
        .fm-pill-accent:hover { background:#bcd470; border-color:#bcd470; transform:translateY(-2px); }
        .fm-dot { width:6px; height:6px; border-radius:50%; background:#a8c060; flex-shrink:0; }
        .fm-pill-accent .fm-dot { background:#1c2410; }

        .hero-layout {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .hero-nav {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          /* Right padding accounts for the 52px rail + 24px safe gap */
          padding: 28px 48px 0;
          padding-right: calc(52px + 24px + 24px);
          position: relative;
          z-index: 2;
        }

        .hero-canvas-wrap {
          position: absolute;
          inset: 0;
          /* Keep canvas from bleeding into the rail */
          right: 52px;
          z-index: 0;
        }

        .hero-content-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 48px;
          position: relative;
          z-index: 1;
          pointer-events: none;
        }
        .hero-content-wrap > * { pointer-events: auto; }

        .hero-bottom {
          position: absolute;
          bottom: 28px;
          left: 48px;
          /* Stop bottom bar before the rail */
          right: calc(52px + 16px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
        }

        /* Hide the old drag hint — rail has it now */
        .hero-drag-hint { display: none !important; }

        /* Hide social rail on mobile */
        .hero-social-rail {
          transition: opacity .3s;
        }

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
          .hero-social-rail { display: none !important; }

          .hero-canvas-wrap {
            position: relative !important;
            inset: unset !important;
            right: 0 !important;
            height: 52vh;
            flex-shrink: 0;
          }

          .hero-content-wrap {
            position: relative !important;
            flex: 1;
            align-items: flex-start;
            padding: 20px 20px 0;
          }

          .hero-nav {
            position: absolute;
            top: 0; left: 0; right: 0;
            padding: 18px 20px 0 !important;
            z-index: 10;
          }

          .hero-bottom {
            position: relative !important;
            bottom: unset !important;
            left: unset !important; right: unset !important;
            padding: 16px 20px 20px;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .hero-bottom-socials { display: none; }
          .hero-nav-contact { display: none; }
          .hero-h1 { font-size: clamp(1.8rem, 8vw, 2.6rem) !important; }
          .hero-para { font-size: 13px !important; }
          .fm-pill { padding: 11px 20px !important; font-size: 18px !important; }
        }

        /* ── VERY SMALL (≤ 380px) ── */
        @media (max-width: 380px) {
          .hero-canvas-wrap { height: 45vh; }
          .hero-h1 { font-size: 1.8rem !important; }
          .hero-content-wrap { padding: 14px 16px 0; }
          .hero-bottom { padding: 12px 16px 16px; }
        }
      `}</style>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

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
        <div className="hero-layout">
          {/* ── NAV ── */}
          <div
            className="hero-nav pointer-events-auto fm-in"
            style={{ animationDelay: "0.1s" }}
          >
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
                fontFamily: "'Orbitron',sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "#f5f0e4",
                letterSpacing: "0.06em",
              }}
            >
              JAMES OLUWALEKE
            </div>

            {/*
              Contact button: padding-right on .hero-nav already keeps it
              clear of the rail. No extra margin needed — the layout handles it.
            */}
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
          </div>

          {/* ── 3D CANVAS ── */}
          <div className="hero-canvas-wrap">
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
            <Suspense fallback={null}>
              <BadgeCanvas isMobile={isMobile} />
            </Suspense>
          </div>

          {/* ── MAIN TEXT CONTENT ── */}
          <div className="hero-content-wrap">
            <div style={{ maxWidth: 560 }}>
              {/* Label */}
              <div
                className="fm-up"
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

              {/* Heading — Orbitron for the tech feel */}
              <div
                className="fm-up"
                style={{ animationDelay: "0.4s", marginBottom: 16 }}
              >
                <h1
                  className="hero-h1"
                  style={{
                    fontFamily: "'Orbitron',sans-serif",
                    fontSize: "clamp(2rem,5.5vw,5rem)",
                    fontWeight: 500,
                    color: "#f5f0e4",
                    lineHeight: 1.08,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}
                >
                  BUILDING THE
                  <br />
                  <span style={{ color: "#a8c060" }}>DIGITAL</span> FUTURE.
                </h1>
              </div>

              {/* Para — DM Sans stays for readability */}
              <div
                className="fm-up"
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
                className="fm-up"
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

          {/* ── VERTICAL SOCIAL RAIL ── */}
          <SocialRail />
        </div>
      </section>
    </>
  );
}

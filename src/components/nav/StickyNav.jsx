// src/components/nav/StickyNav.jsx
import { useState, useEffect } from "react";

function MenuOverlay({ open, onClose }) {
  const links = ["About", "Projects", "Stack", "Collabs", "Contact"];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
      {/* left panel */}
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
                fontSize: "clamp(2.2rem,5vw,4.5rem)",
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

      {/* right panel */}
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

export default function StickyNav({ hidden }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .snav-menu-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px; letter-spacing: 0.35em;
          color: rgba(245,240,228,0.9);
          display: flex; align-items: center; gap: 10px;
          padding: 8px 0;
          font-weight: 600;
          transition: color .2s;
        }
        .snav-menu-btn:hover { color: #a8c060; }

        .snav-menu-icon {
          width: 28px; height: 20px;
          display: flex; flex-direction: column;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .snav-menu-icon span {
          display: block; height: 1.5px;
          background: currentColor;
          border-radius: 2px;
          transition: transform .3s, opacity .3s, width .3s;
        }
        .snav-menu-icon span:nth-child(2) { width: 70%; }
        .snav-menu-btn:hover .snav-menu-icon span:nth-child(2) { width: 100%; }

        .snav-contact {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 22px; border-radius: 100px;
          border: 1.5px solid rgba(168,192,96,0.5);
          background: transparent; color: #f5f0e4;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; letter-spacing: 0.1em; font-weight: 600;
          cursor: pointer; text-decoration: none;
          transition: background .3s, border-color .3s, color .3s, transform .2s;
          white-space: nowrap;
        }
        .snav-contact:hover {
          background: #a8c060;
          border-color: #a8c060;
          color: #1c2410;
          transform: translateY(-1px);
        }
        .snav-contact-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #a8c060; flex-shrink: 0;
          transition: background .3s;
        }
        .snav-contact:hover .snav-contact-dot { background: #1c2410; }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .snav-header {
            top: 12px !important;
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            width: calc(100% - 32px) !important;
            padding: 12px 18px !important;
            border-radius: 100px !important;
            background: rgba(20,26,12,0.55) !important;
            backdrop-filter: blur(18px) !important;
            -webkit-backdrop-filter: blur(18px) !important;
            border: 1px solid rgba(168,192,96,0.15) !important;
            box-shadow: 0 8px 32px rgba(0,0,0,0.35) !important;
          }
          .snav-menu-label { display: none; }
          .snav-menu-icon {
            width: 22px !important;
            height: 15px !important;
          }
          .snav-contact {
            padding: 7px 13px !important;
            font-size: 9px !important;
            letter-spacing: 0.07em !important;
          }
          .snav-contact-dot {
            width: 4px !important;
            height: 4px !important;
          }
        }
      `}</style>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <header
        className="snav-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          display: hidden ? "none" : "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "26px 52px",
          background: scrolled ? "rgba(14,20,8,0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(168,192,96,0.1)" : "none",
          transition: "background .4s, border-color .4s",
        }}
      >
        {/* MENU trigger */}
        <button className="snav-menu-btn" onClick={() => setMenuOpen(true)}>
          <span className="snav-menu-icon">
            <span />
            <span />
            <span />
          </span>
          <span className="snav-menu-label">MENU</span>
        </button>

        {/* contact pill */}
        <a href="#contact" className="snav-contact">
          <span className="snav-contact-dot" />
          CONTACT
        </a>
      </header>
    </>
  );
}

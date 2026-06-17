// src/components/nav/StickyNav.jsx
//
// Replaces Mayopo's StickyNav exactly — same props, same export.
//
// Props:
//   hidden  bool  — passed from App.jsx, hides nav until loader completes
//
// Behaviour:
//   • Sticky bar at top with ┌MA┐ logo + hamburger
//   • On menu open: fullscreen dark overlay with giant nav links (left)
//     and ambient code text (right) — matching Mayopo's layout
//   • Terminal touches: bracket logo, ❯ prefix on links, mono font accents
//   • GSAP animates links in on open, out on close
//   • Active section tracked via IntersectionObserver
//   • Escape key closes menu

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Stack",      href: "#stack"      },
  { label: "Contact",    href: "#contact"    },
];

// Ambient code lines shown on the right side of the open menu (purely decorative)
const CODE_LINES = [
  "const engineer = {",
  "  name: 'Mayopo Adeoye',",
  "  location: 'Lagos, NG',",
  "  years: 5,",
  "  focus: [",
  "    'Fintech',",
  "    'Enterprise Systems',",
  "    'Real-time Apps',",
  "  ],",
  "  assessment: {",
  "    score: 4.85,",
  "    verdict: 'Strong Hire',",
  "  },",
  "  stack: [",
  "    'React', 'Node.js',",
  "    'Java', 'PostgreSQL',",
  "    'NestJS', 'Docker',",
  "  ],",
  "  available: true,",
  "}",
  "",
  "// Triple-layer concurrency:",
  "// Advisory locks +",
  "// SELECT FOR UPDATE +",
  "// SERIALIZABLE isolation",
  "",
  "export default engineer;",
];

export default function StickyNav({ hidden = false }) {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActive]  = useState("");
  const [scrolled, setScrolled]     = useState(false);

  const overlayRef  = useRef(null);
  const linksRef    = useRef([]);
  const metaRef     = useRef(null);
  const tlRef       = useRef(null);

  // ── Track scroll for nav border ─────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section via IntersectionObserver ──────────────────────────
  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) =>
      document.querySelector(href)
    ).filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // ── Escape key ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Lock body scroll when menu open ─────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── GSAP: open menu ─────────────────────────────────────────────────
  const openMenu = useCallback(() => {
    setMenuOpen(true);

    requestAnimationFrame(() => {
      if (tlRef.current) tlRef.current.kill();

      const tl = gsap.timeline();
      tlRef.current = tl;

      // Overlay fade in
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );

      // Links stagger in from left
      tl.fromTo(
        linksRef.current.filter(Boolean),
        { opacity: 0, x: -48 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.07,
        },
        "-=0.15"
      );

      // Meta line fade in
      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );
    });
  }, []);

  // ── GSAP: close menu ────────────────────────────────────────────────
  const closeMenu = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setMenuOpen(false),
    });
  }, []);

  const handleLinkClick = useCallback((href) => {
    closeMenu();
    // Small delay so overlay fades before scroll jumps
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  }, [closeMenu]);

  return (
    <>
      {/* ── Sticky bar ────────────────────────────────────────────── */}
      <nav
        aria-label="Site navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          height: "60px",
          background: scrolled
            ? "rgba(5,10,5,0.92)"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "all",
          transition: "opacity 0.4s ease, background 0.3s, border-color 0.3s",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          aria-label="Back to top"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--clr-text-primary)",
            textDecoration: "none",
            letterSpacing: "0.04em",
            display: "flex",
            alignItems: "center",
            gap: "0.1em",
          }}
        >
          <span style={{ color: "var(--clr-accent)", opacity: 0.7 }}>┌</span>
          <span style={{ fontWeight: 700 }}>MA</span>
          <span style={{ color: "var(--clr-accent)", opacity: 0.7 }}>┐</span>
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: activeSection === href.slice(1)
                  ? "var(--clr-accent)"
                  : "var(--clr-text-secondary)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== href.slice(1))
                  e.currentTarget.style.color = "var(--clr-text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color =
                  activeSection === href.slice(1)
                    ? "var(--clr-accent)"
                    : "var(--clr-text-secondary)";
              }}
            >
              {label}
            </a>
          ))}

          <a
            href="/Mayopo_Adeoye_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "var(--clr-accent)",
              border: "1px solid var(--clr-accent)",
              padding: "0.3rem 0.75rem",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--clr-accent)";
              e.currentTarget.style.color = "#050a05";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--clr-accent)";
            }}
          >
            ⤓ CV
          </a>
        </div>

        {/* Hamburger (visible on mobile + always shows menu trigger) */}
        <button
          onClick={openMenu}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "flex-end",
          }}
          className="menu-btn"
        >
          <span style={burgerLine()} />
          <span style={{ ...burgerLine(), width: "16px" }} />
        </button>
      </nav>

      {/* ── Fullscreen overlay ────────────────────────────────────── */}
      {menuOpen && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "#050a05",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            overflow: "hidden",
          }}
        >
          {/* Left: nav links */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(2rem, 8vw, 6rem) clamp(2rem, 8vw, 5rem)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "clamp(1.5rem, 5vw, 3rem)",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                color: "var(--clr-text-secondary)",
                textTransform: "uppercase",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--clr-text-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--clr-text-secondary)"}
            >
              <span style={{ fontSize: "1rem", lineHeight: 1 }}>×</span>
              <span>Close</span>
            </button>

            {/* Links */}
            <nav aria-label="Menu links">
              {NAV_LINKS.map(({ label, href }, i) => (
                <div
                  key={href}
                  ref={(el) => (linksRef.current[i] = el)}
                  style={{ marginBottom: "0.15rem" }}
                >
                  <button
                    onClick={() => handleLinkClick(href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0.3rem 0",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.6rem",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.querySelector(".link-text").style.color = "var(--clr-text-primary)";
                      e.currentTarget.querySelector(".link-prefix").style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.querySelector(".link-text").style.color = "var(--clr-text-muted)";
                      e.currentTarget.querySelector(".link-prefix").style.opacity = "0.3";
                    }}
                  >
                    <span
                      className="link-prefix"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                        color: "var(--clr-accent)",
                        opacity: 0.3,
                        transition: "opacity 0.2s",
                        alignSelf: "center",
                        lineHeight: 1,
                      }}
                    >
                      ❯
                    </span>
                    <span
                      className="link-text"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.0,
                        color: "var(--clr-text-muted)",
                        transition: "color 0.2s",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                </div>
              ))}
            </nav>

            {/* Meta footer */}
            <div
              ref={metaRef}
              style={{
                position: "absolute",
                bottom: "clamp(1.5rem, 4vw, 3rem)",
                left: "clamp(2rem, 8vw, 5rem)",
              }}
            >
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                color: "var(--clr-text-muted)",
                textTransform: "uppercase",
                lineHeight: 1.8,
              }}>
                Mayopo Adeoye<br />
                <a
                  href="mailto:adeoyemayopoelijah@gmail.com"
                  style={{
                    color: "var(--clr-text-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--clr-accent)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "var(--clr-text-muted)"}
                >
                  adeoyemayopoelijah@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Right: ambient scrolling code panel */}
          <div
            aria-hidden="true"
            style={{
              position: "relative",
              borderLeft: "1px solid rgba(255,255,255,0.04)",
              overflow: "hidden",
              height: "100%",
              width: "100%",
            }}
          >
            {/* Top + bottom fade masks */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
              background: `linear-gradient(
                to bottom,
                #050a05 0%,
                transparent 18%,
                transparent 82%,
                #050a05 100%
              )`,
            }} />

            {/* Scrolling inner — duplicated so loop is seamless */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              animation: "codeScroll 22s linear infinite",
              paddingLeft: "clamp(2rem, 5vw, 4rem)",
              paddingTop: "4rem",
            }}>
              {/* First copy */}
              <pre style={codeStyle}>{CODE_LINES.join("\n")}</pre>
              {/* Duplicate for seamless loop */}
              <pre style={{ ...codeStyle, marginTop: "3rem" }}>{CODE_LINES.join("\n")}</pre>
            </div>
          </div>
        </div>
      )}

      {/* ── Responsive CSS ────────────────────────────────────────── */}
      <style>{`
        @keyframes codeScroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @media (min-width: 768px) {
          .menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .menu-btn { display: flex !important; }
        }
        /* On desktop the hamburger is hidden but
           the fullscreen menu is still accessible via keyboard */
        @media (min-width: 768px) {
          .menu-btn {
            display: flex !important;
            opacity: 0.4;
          }
          .menu-btn:hover { opacity: 1; }
        }
        /* Fullscreen overlay goes single-column on small screens */
        @media (max-width: 640px) {
          [role="dialog"][aria-label="Navigation menu"] {
            grid-template-columns: 1fr !important;
          }
          [role="dialog"][aria-label="Navigation menu"] > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

const burgerLine = () => ({
  display: "block",
  width: "22px",
  height: "1.5px",
  background: "var(--clr-text-secondary)",
  transition: "width 0.2s",
});

const codeStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: "clamp(0.58rem, 0.9vw, 0.76rem)",
  lineHeight: 1.9,
  color: "rgba(57,255,106,0.13)",
  margin: 0,
  userSelect: "none",
  whiteSpace: "pre",
  pointerEvents: "none",
};
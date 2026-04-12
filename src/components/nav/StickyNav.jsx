// src/components/nav/StickyNav.jsx
import { useState, useEffect, useRef } from "react";

// ─── Scrolling Code Panel ──────────────────────────────────────────────────────
function CodePanel() {
  const innerRef = useRef(null);
  const outerRef = useRef(null);
  const scrollPos = useRef(0);
  const dir = useRef(1);
  const paused = useRef(false);
  const rafRef = useRef(null);

  const SPEED = 0.45;
  const PAUSE_MS = 2000;

  const lines = [
    { ln: 1, html: `<cm>// HeroSection.jsx — James The Build</cm>` },
    {
      ln: 2,
      html: `<kw>import</kw> <pl>{ useState, useEffect, useRef }</pl> <kw>from</kw> <str>"react"</str><pl>;</pl>`,
    },
    {
      ln: 3,
      html: `<kw>import</kw> <pl>{ motion, AnimatePresence }</pl> <kw>from</kw> <str>"framer-motion"</str><pl>;</pl>`,
    },
    {
      ln: 4,
      html: `<kw>import</kw> gsap <kw>from</kw> <str>"gsap"</str><pl>;</pl>`,
    },
    {
      ln: 5,
      html: `<kw>import</kw> <pl>{ ScrollTrigger }</pl> <kw>from</kw> <str>"gsap/ScrollTrigger"</str><pl>;</pl>`,
    },
    { ln: 6, html: `` },
    { ln: 7, html: `<cm>// ─── constants ───────────────────────────</cm>` },
    {
      ln: 8,
      html: `<kw>const</kw> <fn>NAV_LINKS</fn> <pl>=</pl> <pl>[</pl><str>"About"</str><pl>,</pl> <str>"Projects"</str><pl>,</pl> <str>"Stack"</str><pl>,</pl> <str>"Collabs"</str><pl>,</pl> <str>"Contact"</str><pl>];</pl>`,
    },
    {
      ln: 9,
      html: `<kw>const</kw> <fn>STACK</fn> <pl>=</pl> <pl>[</pl><str>"React"</str><pl>,</pl> <str>"Node.js"</str><pl>,</pl> <str>"Three.js"</str><pl>,</pl> <str>"TypeScript"</str><pl>];</pl>`,
    },
    { ln: 10, html: `` },
    { ln: 11, html: `<cm>// ─── MenuOverlay ─────────────────────────</cm>` },
    {
      ln: 12,
      html: `<kw>function</kw> <fn>MenuOverlay</fn><pl>({</pl> open<pl>,</pl> onClose <pl>}) {</pl>`,
    },
    { ln: 13, html: `  <fn>useEffect</fn><pl>(() =></pl> <pl>{</pl>` },
    {
      ln: 14,
      html: `    document<pl>.</pl>body<pl>.</pl>style<pl>.</pl>overflow <pl>=</pl> open <pl>?</pl> <str>"hidden"</str> <pl>:</pl> <str>""</str><pl>;</pl>`,
    },
    { ln: 15, html: `  <pl>}, [</pl>open<pl>]);</pl>` },
    { ln: 16, html: `` },
    { ln: 17, html: `  <kw>return</kw> <pl>(</pl>` },
    { ln: 18, html: `    <tag>&lt;AnimatePresence&gt;</tag>` },
    { ln: 19, html: `      <pl>{</pl>open <pl>&amp;&amp;</pl>` },
    { ln: 20, html: `        <tag>&lt;motion.div</tag>` },
    {
      ln: 21,
      html: `          <attr>initial</attr><pl>={{</pl> x<pl>:</pl> <str>"-100%"</str> <pl>}}</pl>`,
    },
    {
      ln: 22,
      html: `          <attr>animate</attr><pl>={{</pl> x<pl>:</pl> <num>0</num> <pl>}}</pl>`,
    },
    {
      ln: 23,
      html: `          <attr>exit</attr><pl>={{</pl> x<pl>:</pl> <str>"-100%"</str> <pl>}}</pl>`,
    },
    {
      ln: 24,
      html: `          <attr>transition</attr><pl>={{</pl> duration<pl>:</pl> <num>0.7</num><pl>,</pl> ease<pl>:</pl> <pl>[</pl><num>.16</num><pl>,</pl><num>1</num><pl>,</pl><num>.3</num><pl>,</pl><num>1</num><pl>] }}</pl>`,
    },
    { ln: 25, html: `        <tag>&gt;</tag>` },
    {
      ln: 26,
      html: `          <tag>&lt;LeftPanel</tag> <attr>onClose</attr><pl>={</pl>onClose<pl>}</pl> <tag>/&gt;</tag>`,
    },
    { ln: 27, html: `          <tag>&lt;RightPanel</tag> <tag>/&gt;</tag>` },
    { ln: 28, html: `        <tag>&lt;/motion.div&gt;</tag>` },
    { ln: 29, html: `      <pl>}</pl>` },
    { ln: 30, html: `    <tag>&lt;/AnimatePresence&gt;</tag>` },
    { ln: 31, html: `  <pl>);</pl>` },
    { ln: 32, html: `<pl>}</pl>` },
    { ln: 33, html: `` },
    { ln: 34, html: `<cm>// ─── HeroSection ─────────────────────────</cm>` },
    {
      ln: 35,
      html: `<kw>export default function</kw> <fn>HeroSection</fn><pl>() {</pl>`,
    },
    {
      ln: 36,
      html: `  <kw>const</kw> <pl>[</pl>menuOpen<pl>,</pl> setMenuOpen<pl>]</pl> <pl>=</pl> <fn>useState</fn><pl>(</pl><kw>false</kw><pl>);</pl>`,
    },
    {
      ln: 37,
      html: `  <kw>const</kw> <pl>[</pl>isMobile<pl>,</pl> setIsMobile<pl>]</pl> <pl>=</pl> <fn>useState</fn><pl>(</pl><kw>false</kw><pl>);</pl>`,
    },
    {
      ln: 38,
      html: `  <kw>const</kw> sectionRef <pl>=</pl> <fn>useRef</fn><pl>(</pl><kw>null</kw><pl>);</pl>`,
    },
    { ln: 39, html: `` },
    { ln: 40, html: `  <fn>useEffect</fn><pl>(() =></pl> <pl>{</pl>` },
    {
      ln: 41,
      html: `    <kw>const</kw> <fn>check</fn> <pl>=</pl> <pl>() =></pl>`,
    },
    {
      ln: 42,
      html: `      <fn>setIsMobile</fn><pl>(</pl>window<pl>.</pl>innerWidth <pl>&lt;</pl> <num>768</num><pl>);</pl>`,
    },
    { ln: 43, html: `    <fn>check</fn><pl>();</pl>` },
    {
      ln: 44,
      html: `    window<pl>.</pl><fn>addEventListener</fn><pl>(</pl><str>"resize"</str><pl>,</pl> check<pl>);</pl>`,
    },
    {
      ln: 45,
      html: `    <kw>return</kw> <pl>() =></pl> window<pl>.</pl><fn>removeEventListener</fn><pl>(</pl><str>"resize"</str><pl>,</pl> check<pl>);</pl>`,
    },
    { ln: 46, html: `  <pl>}, []);</pl>` },
    { ln: 47, html: `` },
    { ln: 48, html: `  <fn>useEffect</fn><pl>(() =></pl> <pl>{</pl>` },
    {
      ln: 49,
      html: `    <kw>const</kw> ctx <pl>=</pl> gsap<pl>.</pl><fn>context</fn><pl>(() =></pl> <pl>{</pl>`,
    },
    {
      ln: 50,
      html: `      gsap<pl>.</pl><fn>to</fn><pl>(</pl>sectionRef<pl>.</pl>current<pl>, {</pl>`,
    },
    {
      ln: 51,
      html: `        scale<pl>:</pl> <num>1.06</num><pl>,</pl> opacity<pl>:</pl> <num>0</num><pl>,</pl>`,
    },
    {
      ln: 52,
      html: `        filter<pl>:</pl> <str>"blur(10px)"</str><pl>,</pl>`,
    },
    { ln: 53, html: `        ease<pl>:</pl> <str>"power2.in"</str><pl>,</pl>` },
    { ln: 54, html: `        scrollTrigger<pl>: {</pl>` },
    {
      ln: 55,
      html: `          trigger<pl>:</pl> sectionRef<pl>.</pl>current<pl>,</pl>`,
    },
    {
      ln: 56,
      html: `          start<pl>:</pl> <str>"bottom 80%"</str><pl>,</pl>`,
    },
    {
      ln: 57,
      html: `          end<pl>:</pl> <str>"bottom 20%"</str><pl>,</pl>`,
    },
    { ln: 58, html: `          scrub<pl>:</pl> <kw>true</kw><pl>,</pl>` },
    { ln: 59, html: `        <pl>},</pl>` },
    { ln: 60, html: `      <pl>});</pl>` },
    { ln: 61, html: `    <pl>},</pl> sectionRef<pl>);</pl>` },
    {
      ln: 62,
      html: `    <kw>return</kw> <pl>() =></pl> ctx<pl>.</pl><fn>revert</fn><pl>();</pl>`,
    },
    { ln: 63, html: `  <pl>}, []);</pl>` },
    { ln: 64, html: `` },
    { ln: 65, html: `  <kw>return</kw> <pl>(</pl>` },
    {
      ln: 66,
      html: `    <tag>&lt;section</tag> <attr>ref</attr><pl>={</pl>sectionRef<pl>}</pl> <attr>className</attr><pl>=</pl><str>"hero"</str><tag>&gt;</tag>`,
    },
    { ln: 67, html: `      <tag>&lt;MenuOverlay</tag>` },
    { ln: 68, html: `        <attr>open</attr><pl>={</pl>menuOpen<pl>}</pl>` },
    {
      ln: 69,
      html: `        <attr>onClose</attr><pl>={() =></pl> <fn>setMenuOpen</fn><pl>(</pl><kw>false</kw><pl>)}</pl>`,
    },
    { ln: 70, html: `      <tag>/&gt;</tag>` },
    {
      ln: 71,
      html: `      <tag>&lt;BadgeCanvas</tag> <attr>isMobile</attr><pl>={</pl>isMobile<pl>}</pl> <tag>/&gt;</tag>`,
    },
    { ln: 72, html: `      <tag>&lt;HeroContent</tag> <tag>/&gt;</tag>` },
    { ln: 73, html: `      <tag>&lt;SocialRail</tag> <tag>/&gt;</tag>` },
    { ln: 74, html: `    <tag>&lt;/section&gt;</tag>` },
    { ln: 75, html: `  <pl>);</pl>` },
    { ln: 76, html: `<pl>}</pl>` },
  ];

  // parse pseudo-tags into real spans
  const parse = (raw) =>
    raw
      .replace(/<cm>(.*?)<\/cm>/g, '<span class="cp-cm">$1</span>')
      .replace(/<kw>(.*?)<\/kw>/g, '<span class="cp-kw">$1</span>')
      .replace(/<fn>(.*?)<\/fn>/g, '<span class="cp-fn">$1</span>')
      .replace(/<str>(.*?)<\/str>/g, '<span class="cp-str">$1</span>')
      .replace(/<pl>(.*?)<\/pl>/g, '<span class="cp-pl">$1</span>')
      .replace(/<tag>(.*?)<\/tag>/g, '<span class="cp-tag">$1</span>')
      .replace(/<attr>(.*?)<\/attr>/g, '<span class="cp-attr">$1</span>')
      .replace(/<num>(.*?)<\/num>/g, '<span class="cp-num">$1</span>');

  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    const getMax = () => Math.max(0, inner.scrollHeight - outer.clientHeight);

    const tick = () => {
      if (!paused.current) {
        scrollPos.current += SPEED * dir.current;
        const max = getMax();

        if (scrollPos.current >= max) {
          scrollPos.current = max;
          paused.current = true;
          setTimeout(() => {
            dir.current = -1;
            paused.current = false;
          }, PAUSE_MS);
        }
        if (scrollPos.current <= 0) {
          scrollPos.current = 0;
          paused.current = true;
          setTimeout(() => {
            dir.current = 1;
            paused.current = false;
          }, PAUSE_MS);
        }
        inner.style.transform = `translateY(${-scrollPos.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <style>{`
        .cp-outer {
          flex: 1;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 88%, transparent 100%);
        }
        .cp-inner {
          position: absolute;
          top: 0; left: 0; right: 0;
          padding: 16px 20px 16px 14px;
          will-change: transform;
        }
        .cp-row {
          display: flex;
          align-items: baseline;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          line-height: 1.85;
          white-space: pre;
          /* ── GHOST OPACITY — barely there ── */
          opacity: 0.13;
        }
        .cp-ln {
          display: inline-block;
          min-width: 22px;
          font-size: 8.5px;
          color: rgba(168,192,96,1);
          text-align: right;
          margin-right: 12px;
          user-select: none;
          flex-shrink: 0;
        }
        .cp-cm   { color: rgba(245,240,228,1); font-style: italic; }
        .cp-kw   { color: rgba(168,192,96,1); }
        .cp-fn   { color: rgba(212,168,67,1); }
        .cp-str  { color: rgba(204,100,60,1); }
        .cp-pl   { color: rgba(245,240,228,1); }
        .cp-tag  { color: rgba(168,192,96,1); }
        .cp-attr { color: rgba(212,168,67,1); }
        .cp-num  { color: rgba(168,192,96,1); }
      `}</style>

      <div className="cp-outer" ref={outerRef}>
        <div className="cp-inner" ref={innerRef}>
          {lines.map(({ ln, html }) => (
            <div key={ln} className="cp-row">
              <span className="cp-ln">{ln}</span>
              <span dangerouslySetInnerHTML={{ __html: parse(html) }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Menu Overlay ──────────────────────────────────────────────────────────────
function MenuOverlay({ open, onClose }) {
  const links = ["About", "Projects", "Stack", "Collabs", "Contact"];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&display=swap');

        .mo-wrap {
          position: fixed; inset: 0; z-index: 1000;
          background: #1c2410;
          display: grid; grid-template-columns: 1fr 1fr;
          transform: translateX(-100%);
          transition: transform .7s cubic-bezier(.16,1,.3,1);
          pointer-events: none;
          overflow: hidden;
        }
        .mo-wrap.open {
          transform: translateX(0);
          pointer-events: auto;
        }

        /* subtle adinkra tile — matches hero opacity */
        .mo-bg-tile {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='28' fill='none' stroke='%23a8c060' stroke-width='0.6'/%3E%3Ccircle cx='40' cy='40' r='14' fill='none' stroke='%23a8c060' stroke-width='0.5'/%3E%3Cline x1='40' y1='12' x2='40' y2='68' stroke='%23a8c060' stroke-width='0.4'/%3E%3Cline x1='12' y1='40' x2='68' y2='40' stroke='%23a8c060' stroke-width='0.4'/%3E%3C/svg%3E");
          background-size: 80px 80px;
          opacity: 0.035; pointer-events: none; z-index: 0;
        }



        /* ── LEFT PANEL ── */
        .mo-left {
          padding: 40px 36px 44px 44px;
          display: flex; flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid rgba(168,192,96,0.08);
          position: relative; z-index: 2;
        }

        .mo-close {
          background: none; border: none; cursor: pointer;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; letter-spacing: 0.4em;
          color: rgba(245,240,228,0.3);
          display: flex; align-items: center; gap: 10px;
          padding: 0; transition: color 0.2s;
        }
        .mo-close:hover { color: #a8c060; }
        .mo-close-icon {
          width: 16px; height: 16px;
          position: relative; flex-shrink: 0;
        }
        .mo-close-icon::before, .mo-close-icon::after {
          content: ''; position: absolute;
          width: 100%; height: 1px; background: currentColor;
          top: 50%; left: 0;
        }
        .mo-close-icon::before { transform: rotate(45deg); }
        .mo-close-icon::after  { transform: rotate(-45deg); }

        .mo-nav { display: flex; flex-direction: column; gap: 2px; }

        .mo-link {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          color: rgba(245,240,228,0.18);
          text-decoration: none; line-height: 1.1;
          display: flex; align-items: center; gap: 12px;
          transition: color 0.2s, gap 0.3s;
        }
        .mo-link:hover { color: #f5f0e4; gap: 20px; }

        .mo-num {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.2em;
          color: rgba(168,192,96,0.35);
          margin-top: 6px; flex-shrink: 0;
          transition: color 0.2s;
        }
        .mo-link:hover .mo-num { color: #a8c060; }

        .mo-tick {
          display: inline-block; width: 0; height: 1px;
          background: #a8c060; transition: width 0.3s;
          flex-shrink: 0; margin-top: 6px;
        }
        .mo-link:hover .mo-tick { width: 20px; }

        .mo-footer { display: flex; flex-direction: column; gap: 3px; }
        .mo-footer span, .mo-footer a {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; color: rgba(245,240,228,0.2);
          letter-spacing: 0.3em; text-decoration: none;
        }

        /* ── RIGHT PANEL ── */
        .mo-right {
          position: relative; overflow: hidden;
          display: flex; flex-direction: column;
          z-index: 2;
        }

        .mo-code-header {
          flex-shrink: 0;
          padding: 14px 22px 10px;
          border-bottom: 1px solid rgba(168,192,96,0.06);
          display: flex; align-items: center; gap: 7px;
          opacity: 0.5;
        }
        .mo-dot { width: 7px; height: 7px; border-radius: 50%; }
        .mo-d1 { background: rgba(204,76,44,0.6); }
        .mo-d2 { background: rgba(212,168,67,0.6); }
        .mo-d3 { background: rgba(168,192,96,0.6); }
        .mo-filename {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; letter-spacing: 0.25em;
          color: rgba(245,240,228,0.3);
          margin-left: 6px;
        }

        /* corner marks */
        .mo-corner {
          position: absolute; width: 14px; height: 14px;
          border-color: rgba(168,192,96,0.15); border-style: solid; z-index: 4;
        }
        .mo-corner.tl { top: 18px; left: 18px; border-width: 1px 0 0 1px; }
        .mo-corner.tr { top: 18px; right: 18px; border-width: 1px 1px 0 0; }
        .mo-corner.bl { bottom: 18px; left: 18px; border-width: 0 0 1px 1px; }
        .mo-corner.br { bottom: 18px; right: 18px; border-width: 0 1px 1px 0; }

        .mo-ver-label {
          position: absolute; bottom: 28px; right: 20px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px; letter-spacing: 0.3em;
          color: rgba(168,192,96,0.12);
          writing-mode: vertical-rl; z-index: 4;
        }

        /* ── MOBILE ── */
        @media (max-width: 640px) {
          /* overlay stays fixed — never touches document flow */
          .mo-wrap {
            position: fixed !important;
            grid-template-columns: 1fr !important;
          }

          /* left panel: fills full overlay, sits above code ghost */
          .mo-left {
            position: relative;
            z-index: 2;
            padding: 36px 28px 40px 36px;
            background: transparent;
            min-height: 100vh;
            min-height: 100svh;
          }

          /* right panel: absolute full-bleed ghost layer behind left */
          .mo-right {
            display: flex !important;
            position: absolute !important;
            inset: 0 !important;
            z-index: 1 !important;
            pointer-events: none !important;
          }

          /* hide chrome on mobile */
          .mo-code-header,
          .mo-corner,
          .mo-ver-label { display: none !important; }

          /* barely subliminal on mobile */
          .cp-row { opacity: 0.065 !important; }

          .mo-link { font-size: clamp(2.6rem, 12vw, 3.6rem); }
        }
      `}</style>

      <div className={`mo-wrap${open ? " open" : ""}`}>
        <div className="mo-bg-tile" />

        {/* LEFT */}
        <div className="mo-left">
          <button className="mo-close" onClick={onClose}>
            <span className="mo-close-icon" />
            CLOSE
          </button>

          <nav className="mo-nav">
            {links.map((l, i) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={onClose}
                className="mo-link"
              >
                <span className="mo-num">0{i + 1}</span>
                <span className="mo-tick" />
                {l}
              </a>
            ))}
          </nav>

          <div className="mo-footer">
            <span>JAMES THE BUILD</span>
            <a href="mailto:hello@jamesasuelimen.com">
              HELLO@JAMESASUELIMEN.COM
            </a>
          </div>
        </div>

        {/* RIGHT — ghost code panel */}
        <div className="mo-right">
          <div className="mo-corner tl" />
          <div className="mo-corner tr" />
          <div className="mo-corner bl" />
          <div className="mo-corner br" />

          <div className="mo-code-header">
            <span className="mo-dot mo-d1" />
            <span className="mo-dot mo-d2" />
            <span className="mo-dot mo-d3" />
            <span className="mo-filename">HeroSection.jsx</span>
          </div>

          <CodePanel />

          <div className="mo-ver-label">REACT · JSX · v2026</div>
        </div>
      </div>
    </>
  );
}

// ─── Sticky Nav ────────────────────────────────────────────────────────────────
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
          padding: 8px 0; font-weight: 600;
          transition: color .2s;
        }
        .snav-menu-btn:hover { color: #a8c060; }

        .snav-menu-icon {
          width: 28px; height: 20px;
          display: flex; flex-direction: column;
          justify-content: space-between; flex-shrink: 0;
        }
        .snav-menu-icon span {
          display: block; height: 1.5px;
          background: currentColor; border-radius: 2px;
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
          background: #a8c060; border-color: #a8c060;
          color: #1c2410; transform: translateY(-1px);
        }
        .snav-contact-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #a8c060; flex-shrink: 0;
          transition: background .3s;
        }
        .snav-contact:hover .snav-contact-dot { background: #1c2410; }

        @media (max-width: 640px) {
          .snav-header {
            top: 12px !important;
            left: 50% !important; right: auto !important;
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
          .snav-menu-icon { width: 22px !important; height: 15px !important; }
          .snav-contact { padding: 7px 13px !important; font-size: 9px !important; }
          .snav-contact-dot { width: 4px !important; height: 4px !important; }
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
        <button className="snav-menu-btn" onClick={() => setMenuOpen(true)}>
          <span className="snav-menu-icon">
            <span />
            <span />
            <span />
          </span>
          <span className="snav-menu-label">MENU</span>
        </button>

        <a href="#contact" className="snav-contact">
          <span className="snav-contact-dot" />
          CONTACT
        </a>
      </header>
    </>
  );
}

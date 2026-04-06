// src/components/collabs/CollabSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { label } from "framer-motion/client";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  {
    name: "Aristack Solutions",
    // Direct URL from aristack.com homepage
    logo: "https://aristack.com/wp-content/uploads/2024/08/Screenshot-2021-02-13-at-21.32.22-removebg-preview.png",
    initials: "AS",
    color: "#1c2410",
    logoBg: "#fff",
  },
  {
    name: "Afrinvest",
    logo: "https://afrinvest.com/wp-content/uploads/2024/10/logo-full.svg",
    initials: "AF",
    color: "#00205b",
    logoBg: "#fff",
  },
  {
    name: "NDIC",
    logo: "https://ndic.gov.ng/wp-content/uploads/2020/07/cropped-NDIC_logo_White_bgd.png",
    initials: "ND",
    color: "#006633",
    logoBg: "#fff",
  },
  {
    name: "Access Bank",
    // Nigerian bank logo CDN — bank code 000014
    logo: "https://cdn.jsdelivr.net/gh/wovenfinance/cdn@main/logos/000014.png",
    initials: "AB",
    color: "#e2231a",
    logoBg: "#fff",
  },
  {
    name: "Union Bank",
    // Nigerian bank logo CDN — bank code 000018
    logo: "https://cdn.jsdelivr.net/gh/wovenfinance/cdn@main/logos/000018.png",
    initials: "UB",
    color: "#003087",
    logoBg: "#fff",
  },
  {
    name: "iBloom Decor",
    logo: "https://ibloomrentals.com/ibloomlogoalone.png", // ✅ served from public/
    initials: "iB",
    color: "#7c3aed",
    logoBg: "#f3e8ff",
  },
];

const collabs = [
  {
    name: "Felizdujadin999",
    avatar: "https://github.com/Felizdujadin999.png",
    label: "Felizdujadin",
    url: "https://github.com/Felizdujadin999",
  },
  {
    name: "Halobearer",
    avatar: "https://github.com/Halobearer.png",
    label: "Halobearer",
    url: "https://github.com/Halobearer",
  },
  {
    name: "EffiongTimothy",
    avatar: "https://github.com/EffiongTimothy.png",
    label: "EffiongTimothy",
    url: "https://github.com/EffiongTimothy",
  },
  {
    name: "MAKE-star",
    avatar: "https://github.com/MAKE-star.png",
    label: "MAKE-star",
    url: "https://github.com/MAKE-star",
  },
  {
    name: "Semicolon Africa",
    avatar: "https://semicolon.africa/favicon.ico",
    label: "Semicolon Africa",
    url: "https://semicolon.africa",
    isBrand: true,
  },
  {
    name: "popsoft01",
    avatar: "https://github.com/popsoft01.png",
    label: "popsoft01",
    url: "https://github.com/popsoft01",
  },
  {
    name: "dev-lab-aristack",
    avatar: "https://github.com/dev-lab-aristack.png",
    label: "dev-lab-aristack",
    url: "https://github.com/dev-lab-aristack",
  },
  {
    name: "youdeenov-zik",
    avatar: "https://github.com/youdeenov-zik.png",
    label: "youdeenov-zik",
    url: "https://github.com/youdeenov-zik",
  },
  {
    name: "VikitorChidi",
    avatar: "https://github.com/VikitorChidi.png",
    label: "VikitorChidi",
    url: "https://github.com/VikitorChidi",
  },
  {
    name: "Ziklag-Sam",
    avatar: "https://github.com/Ziklag-Sam.png",
    label: "Ziklag-Sam",
    url: "https://github.com/Ziklag-Sam",
  },
  {
    name: "rimi102",
    avatar: "https://github.com/rimi102.png",
    label: "rimi102",
    url: "https://github.com/rimi102",
  },
  {
    name: "Sti1phen",
    avatar: "https://github.com/Sti1phen.png",
    label: "Sti1phen",
    url: "https://github.com/Sti1phen",
  },
  {
    name: "FlorenceAs",
    avatar: "https://github.com/FlorenceAs.png",
    label: "FlorenceAs",
    url: "https://github.com/FlorenceAs",
  },
  {
    name: "Successor5",
    avatar: "https://github.com/Successor5.png",
    label: "Successor5",
    url: "https://github.com/Successor5",
  },
  {
    name: "thefolahan",
    avatar: "https://github.com/thefolahan.png",
    label: "thefolahan",
    url: "https://github.com/thefolahan",
  },
  {
    name: "Omotinuade",
    avatar: "https://github.com/Omotinuade.png",
    label: "Omotinuade",
    url: "https://github.com/Omotinuade",
  },
  {
    name: "Blessing",
    avatar: "https://github.com/blessingayo630.png",
    label: "Blessing",
    url: "https://github.com/blessingayo630",
  },
];

function ClientTickerItem({ client: c }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 20px",
        marginRight: 10,
        border: hovered
          ? "1.5px solid rgba(42,48,24,0.4)"
          : "1.5px solid rgba(42,48,24,0.15)",
        borderRadius: 100,
        background: hovered ? "rgba(42,48,24,0.08)" : "rgba(42,48,24,0.03)",
        flexShrink: 0,
        transform: hovered
          ? "scale(1.05) translateY(-3px)"
          : "scale(1) translateY(0)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        cursor: "default",
        boxShadow: hovered ? "0 8px 24px rgba(42,48,24,0.12)" : "none",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: imgErr ? c.color : c.logoBg || "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
          border: "1px solid rgba(42,48,24,0.1)",
          transition: "transform 0.3s",
          transform: hovered ? "rotate(8deg)" : "rotate(0deg)",
        }}
      >
        {!imgErr ? (
          <img
            src={c.logo}
            alt={c.name}
            onError={() => setImgErr(true)}
            style={{ width: "70%", height: "70%", objectFit: "contain" }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'Space Mono',monospace",
              fontWeight: 700,
              fontSize: 10,
              color: "#f5f0e4",
              letterSpacing: "0.05em",
            }}
          >
            {c.initials}
          </span>
        )}
      </div>
      <span
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: hovered ? "rgba(42,48,24,0.95)" : "rgba(42,48,24,0.75)",
          whiteSpace: "nowrap",
          transition: "color 0.25s",
        }}
      >
        {c.name}
      </span>
    </div>
  );
}

function CollabTickerItem({ collab: c }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  return (
    <a
      href={c.url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 20px",
        marginRight: 10,
        border: hovered
          ? "1.5px solid rgba(42,48,24,0.4)"
          : "1.5px solid rgba(42,48,24,0.15)",
        borderRadius: 100,
        background: hovered ? "rgba(42,48,24,0.08)" : "rgba(42,48,24,0.03)",
        flexShrink: 0,
        transform: hovered
          ? "scale(1.05) translateY(-3px)"
          : "scale(1) translateY(0)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        cursor: "pointer",
        boxShadow: hovered ? "0 8px 24px rgba(42,48,24,0.12)" : "none",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          border: hovered
            ? "2px solid #a8c060"
            : "2px solid rgba(42,48,24,0.12)",
          transition: "border-color 0.3s",
          background: "#2a3018",
        }}
      >
        {!imgErr ? (
          <img
            src={c.avatar}
            alt={c.label}
            onError={() => setImgErr(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono',monospace",
                fontWeight: 700,
                fontSize: 10,
                color: "#a8c060",
              }}
            >
              {c.label.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <span
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: hovered ? "rgba(42,48,24,0.95)" : "rgba(42,48,24,0.75)",
          whiteSpace: "nowrap",
          transition: "color 0.25s",
        }}
      >
        {c.label}
      </span>
    </a>
  );
}

function Ticker({ items, renderItem, reverse = false }) {
  const [paused, setPaused] = useState(false);
  return (
    <div
      style={{ overflow: "hidden", padding: "6px 0" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "fmMarquee 32s linear infinite",
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : "running",
          transition: "animation-play-state 0.2s",
        }}
      >
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i}>{renderItem(item)}</span>
        ))}
      </div>
    </div>
  );
}

function StatCell({ value, label, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="stat-cell"
      style={{
        padding: "clamp(28px,5vw,48px) clamp(16px,3vw,32px)",
        textAlign: "center",
        background: hovered ? "#1c2410" : "transparent",
        transition: "background 0.3s",
        cursor: "default",
        /* border-right handled via className + CSS below */
      }}
    >
      <motion.div
        animate={inView ? { scale: [0.5, 1.1, 1] } : {}}
        transition={{
          delay: index * 0.1 + 0.1,
          duration: 0.7,
          ease: "backOut",
        }}
        style={{
          fontFamily: "'Cabinet Grotesk',sans-serif",
          fontSize: "clamp(2rem,6vw,3.5rem)",
          fontWeight: 900,
          color: hovered ? "#a8c060" : "#1c2410",
          letterSpacing: "-0.03em",
          marginBottom: 6,
          transition: "color 0.3s",
        }}
      >
        {value}
      </motion.div>
      <div
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: "clamp(8px,1.5vw,10px)",
          letterSpacing: "0.3em",
          fontWeight: 700,
          color: hovered ? "rgba(245,240,228,0.55)" : "rgba(42,48,24,0.5)",
          textTransform: "uppercase",
          transition: "color 0.3s",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export function CollabSection() {
  const secRef = useRef();
  const headerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".collab-label",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".collab-heading-line",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".collab-desc",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".collab-ticker-1",
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".collab-ticker-1",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".collab-ticker-2",
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".collab-ticker-2",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collabs"
      ref={secRef}
      style={{
        background: "#f5f0e4",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "rgba(42,48,24,0.1)",
        }}
      />

      {/* ── Header ── */}
      <div
        ref={headerRef}
        style={{
          padding:
            "clamp(60px,10vh,130px) clamp(20px,6vw,72px) clamp(36px,5vh,56px)",
        }}
      >
        <div
          className="collab-label"
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "clamp(9px,1.5vw,11px)",
            letterSpacing: "0.4em",
            fontWeight: 700,
            color: "rgba(42,48,24,0.45)",
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          04 / Collabs
        </div>

        {/* Two-column on ≥640 px, stacked below */}
        <div className="collab-header-grid">
          <h2
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontSize: "clamp(2.4rem,7vw,5rem)",
              color: "#1c2410",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            <div
              className="collab-heading-line"
              style={{ display: "block", overflow: "hidden" }}
            >
              Built with &amp;
            </div>
            <div
              className="collab-heading-line"
              style={{ display: "block", overflow: "hidden" }}
            >
              <span style={{ color: "#4a6020", fontStyle: "italic" }}>
                built for.
              </span>
            </div>
          </h2>

          <p
            className="collab-desc"
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(16px,2.2vw,22px)",
              fontWeight: 700,
              color: "rgba(42,48,24,0.65)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Clients who trusted me with real products. Engineers I've shipped
            alongside. Real work, real results.
          </p>
        </div>
      </div>

      {/* ── Tickers ── */}
      <div
        style={{
          padding: "0 clamp(20px,6vw,72px)",
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        {/* clients */}
        <div>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "clamp(12px,1.2vw,9px)",
              letterSpacing: "0.4em",
              fontWeight: 1000,
              color: "rgba(42,48,24,0.4)",
              marginBottom: 12,
              textTransform: "uppercase",
            }}
          >
            Built for
          </div>
          <div className="collab-ticker-1">
            <Ticker
              items={clients}
              renderItem={(c) => <ClientTickerItem client={c} />}
            />
          </div>
        </div>

        {/* collabs */}
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "clamp(12px,1.2vw,9px)",
              letterSpacing: "0.4em",
              fontWeight: 1000,
              color: "rgba(42,48,24,0.4)",
              marginBottom: 12,
              textTransform: "uppercase",
            }}
          >
            Built with
          </div>
          <div className="collab-ticker-2">
            <Ticker
              items={collabs}
              renderItem={(c) => <CollabTickerItem collab={c} />}
              reverse
            />
          </div>
        </div>
      </div>

      {/* ── Stats grid ── */}
      <div className="stats-grid">
        {[
          ["8+", "Production Apps"],
          ["10+", "Clients Served"],
          ["4+", "Years Exp"],
          ["∞", "Lines of Code"],
        ].map(([v, l], i) => (
          <StatCell key={l} value={v} label={l} index={i} />
        ))}
      </div>

      <style>{`
        @keyframes fmMarquee {
          from { transform: translateX(0) }
          to   { transform: translateX(-33.333%) }
        }

        /* ── Header grid ── */
        .collab-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: end;
        }

        /* ── Stats grid: 4-col desktop ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(42,48,24,0.1);
        }
        .stat-cell:not(:last-child) {
          border-right: 1px solid rgba(42,48,24,0.1);
        }

        /* ── Tablet (≤ 768px) ── */
        @media (max-width: 768px) {
          .collab-header-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          /* 2×2 stats on tablet */
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat-cell:nth-child(2) {
            border-right: none;
          }
          .stat-cell:nth-child(1),
          .stat-cell:nth-child(2) {
            border-bottom: 1px solid rgba(42,48,24,0.1);
          }
          .stat-cell:nth-child(3) {
            border-right: 1px solid rgba(42,48,24,0.1);
          }
        }

        /* ── Mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          /* full-width stats stacked 1 col */
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          /* slightly smaller ticker pills */
          .collab-ticker-1 a,
          .collab-ticker-1 div[style],
          .collab-ticker-2 a {
            padding: 8px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default CollabSection;

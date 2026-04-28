// src/components/collabs/CollabSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Route every image through images.weserv.nl ───────────────────────────
// This proxy fetches the image server-side and re-serves it with open CORS
// headers, so mobile browsers never hit a blocked origin. The &n=-1 param
// disables caching on the proxy side so stale images never appear.
function proxied(url) {
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&n=-1`;
}

const clients = [
  {
    name: "Aristack Solutions",
    logo: proxied(
      "https://aristack.com/wp-content/uploads/2024/08/Screenshot-2021-02-13-at-21.32.22-removebg-preview.png",
    ),
    initials: "AS",
    color: "#1c2410",
    logoBg: "#fff",
  },
  {
    name: "Afrinvest",
    logo: proxied(
      "https://afrinvest.com/wp-content/uploads/2024/10/logo-full.svg",
    ),
    initials: "AF",
    color: "#00205b",
    logoBg: "#fff",
  },
  {
    name: "NDIC",
    logo: proxied(
      "https://ndic.gov.ng/wp-content/uploads/2020/07/cropped-NDIC_logo_White_bgd.png",
    ),
    initials: "ND",
    color: "#006633",
    logoBg: "#fff",
  },
  {
    name: "Access Bank",
    logo: proxied(
      "https://cdn.jsdelivr.net/gh/wovenfinance/cdn@main/logos/000014.png",
    ),
    initials: "AB",
    color: "#e2231a",
    logoBg: "#fff",
  },
  {
    name: "Union Bank",
    logo: proxied(
      "https://cdn.jsdelivr.net/gh/wovenfinance/cdn@main/logos/000018.png",
    ),
    initials: "UB",
    color: "#003087",
    logoBg: "#fff",
  },
  {
    name: "Semicolon Labs",
    logo: proxied(
      "https://labs.semicolon.africa/images/SemicolonWhiteLogo.svg",
    ),
    initials: "SL",
    color: "#000000",
    logoBg: "#000000",
  },
  {
    name: "iBloom Decor",
    logo: proxied("https://ibloomrentals.com/ibloomlogoalone.png"),
    initials: "iB",
    color: "#7c3aed",
    logoBg: "#f3e8ff",
  },
];

const collabs = [
  {
    name: "Felizdujadin999",
    avatar: proxied("https://github.com/Felizdujadin999.png"),
    label: "Felizdujadin",
    url: "https://github.com/Felizdujadin999",
  },
  {
    name: "Halobearer",
    avatar: proxied("https://github.com/Halobearer.png"),
    label: "Halobearer",
    url: "https://github.com/Halobearer",
  },
  {
    name: "EffiongTimothy",
    avatar: proxied("https://github.com/EffiongTimothy.png"),
    label: "EffiongTimothy",
    url: "https://github.com/EffiongTimothy",
  },
  {
    name: "MAKE-star",
    avatar: proxied("https://github.com/MAKE-star.png"),
    label: "MAKE-star",
    url: "https://github.com/MAKE-star",
  },
  {
    name: "Semicolon Africa",
    avatar: proxied("https://semicolon.africa/favicon.ico"),
    label: "Semicolon Africa",
    url: "https://semicolon.africa",
    isBrand: true,
  },
  {
    name: "popsoft01",
    avatar: proxied("https://github.com/popsoft01.png"),
    label: "popsoft01",
    url: "https://github.com/popsoft01",
  },
  {
    name: "dev-lab-aristack",
    avatar: proxied("https://github.com/dev-lab-aristack.png"),
    label: "dev-lab-aristack",
    url: "https://github.com/dev-lab-aristack",
  },
  {
    name: "youdeenov-zik",
    avatar: proxied("https://github.com/youdeenov-zik.png"),
    label: "youdeenov-zik",
    url: "https://github.com/youdeenov-zik",
  },
  {
    name: "VikitorChidi",
    avatar: proxied("https://github.com/VikitorChidi.png"),
    label: "VikitorChidi",
    url: "https://github.com/VikitorChidi",
  },
  {
    name: "Ziklag-Sam",
    avatar: proxied("https://github.com/Ziklag-Sam.png"),
    label: "Ziklag-Sam",
    url: "https://github.com/Ziklag-Sam",
  },
  {
    name: "rimi102",
    avatar: proxied("https://github.com/rimi102.png"),
    label: "rimi102",
    url: "https://github.com/rimi102",
  },
  {
    name: "Sti1phen",
    avatar: proxied("https://github.com/Sti1phen.png"),
    label: "Sti1phen",
    url: "https://github.com/Sti1phen",
  },
  {
    name: "FlorenceAs",
    avatar: proxied("https://github.com/FlorenceAs.png"),
    label: "FlorenceAs",
    url: "https://github.com/FlorenceAs",
  },
  {
    name: "Successor5",
    avatar: proxied("https://github.com/Successor5.png"),
    label: "Successor5",
    url: "https://github.com/Successor5",
  },
  {
    name: "thefolahan",
    avatar: proxied("https://github.com/thefolahan.png"),
    label: "thefolahan",
    url: "https://github.com/thefolahan",
  },
  {
    name: "Omotinuade",
    avatar: proxied("https://github.com/Omotinuade.png"),
    label: "Omotinuade",
    url: "https://github.com/Omotinuade",
  },
  {
    name: "Blessing",
    avatar: proxied("https://github.com/blessingayo630.png"),
    label: "Blessing",
    url: "https://github.com/blessingayo630",
  },
];

// ─── LogoImage — brand logo inside a pill ─────────────────────────────────
function LogoImage({ src, alt, initials, color, logoBg, size = 32 }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const showFallback = !loaded || error;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        // Brand color while loading/error; white bg once the logo is in
        background: showFallback ? color : logoBg || "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
        transition: "background 0.2s",
      }}
    >
      {/* Image is always mounted. Invisible until loaded, removed on error. */}
      {!error && (
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: "70%",
            height: "70%",
            objectFit: "contain",
            position: "absolute",
            inset: 0,
            margin: "auto",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.25s",
          }}
        />
      )}
      {/* Initials shown while image is in-flight OR if it failed */}
      {showFallback && (
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: Math.floor(size * 0.3),
            color: "#f5f0e4",
            letterSpacing: "0.05em",
            lineHeight: 1,
            userSelect: "none",
            position: "relative",
            zIndex: 1,
          }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

// ─── AvatarImage — GitHub/brand avatar ────────────────────────────────────
function AvatarImage({ src, alt, initials, size = 32 }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const showFallback = !loaded || error;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
        background: "#2a3018",
      }}
    >
      {!error && (
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            inset: 0,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.25s",
          }}
        />
      )}
      {showFallback && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: Math.floor(size * 0.3),
              color: "#a8c060",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            {initials.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Client ticker pill ────────────────────────────────────────────────────
function ClientTickerItem({ client: c }) {
  const [hovered, setHovered] = useState(false);

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
          border: "1px solid rgba(42,48,24,0.1)",
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          transition: "transform 0.3s",
          transform: hovered ? "rotate(8deg)" : "rotate(0deg)",
        }}
      >
        <LogoImage
          src={c.logo}
          alt={c.name}
          initials={c.initials}
          color={c.color}
          logoBg={c.logoBg}
          size={32}
        />
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
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

// ─── Collab ticker pill ────────────────────────────────────────────────────
function CollabTickerItem({ collab: c }) {
  const [hovered, setHovered] = useState(false);

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
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          border: hovered
            ? "2px solid #a8c060"
            : "2px solid rgba(42,48,24,0.12)",
          transition: "border-color 0.3s",
        }}
      >
        <AvatarImage
          src={c.avatar}
          alt={c.label}
          initials={c.label}
          size={32}
        />
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
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

// ─── Marquee strip ─────────────────────────────────────────────────────────
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

// ─── Stat cell ─────────────────────────────────────────────────────────────
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
          fontFamily: "'Cabinet Grotesk', sans-serif",
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
          fontFamily: "'Space Mono', monospace",
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

// ─── Section ───────────────────────────────────────────────────────────────
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

      {/* Header */}
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
            fontFamily: "'Space Mono', monospace",
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

        <div className="collab-header-grid">
          <h2
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
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
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(16px,2.2vw,22px)",
              fontWeight: 700,
              color: "rgba(42,48,24,0.65)",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Clients who trusted me with real products. Engineers I've shipped
            alongside. Real work. Real results.
          </p>
        </div>
      </div>

      {/* Tickers */}
      <div
        style={{
          padding: "0 clamp(20px,6vw,72px)",
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(9px,1.2vw,11px)",
              letterSpacing: "0.4em",
              fontWeight: 700,
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

        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(9px,1.2vw,11px)",
              letterSpacing: "0.4em",
              fontWeight: 700,
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

      {/* Stats */}
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
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .collab-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: end;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid rgba(42,48,24,0.1);
        }
        .stat-cell:not(:last-child) {
          border-right: 1px solid rgba(42,48,24,0.1);
        }
        @media (max-width: 768px) {
          .collab-header-grid { grid-template-columns: 1fr; gap: 20px; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-cell:nth-child(2) { border-right: none; }
          .stat-cell:nth-child(1),
          .stat-cell:nth-child(2) { border-bottom: 1px solid rgba(42,48,24,0.1); }
          .stat-cell:nth-child(3) { border-right: 1px solid rgba(42,48,24,0.1); }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}

export default CollabSection;

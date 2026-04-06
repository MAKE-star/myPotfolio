// src/components/stack/StackSection.jsx
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const ic = (path) => `${CDN}/${path}`;

const stackGroups = [
  {
    label: "Frontend",
    accent: "#a8c060",
    accentDim: "#a8c06022",
    tagline: "Pixels with purpose",
    number: "01",
    items: [
      { name: "React", icon: ic("react/react-original.svg") },
      { name: "Next.js", icon: ic("nextjs/nextjs-original.svg") },
      { name: "TypeScript", icon: ic("typescript/typescript-original.svg") },
      { name: "JavaScript", icon: ic("javascript/javascript-original.svg") },
      { name: "Tailwind", icon: ic("tailwindcss/tailwindcss-original.svg") },
      { name: "Three.js", icon: ic("threejs/threejs-original.svg") },
      { name: "Framer", icon: ic("framermotion/framermotion-original.svg") },
      { name: "MUI", icon: ic("materialui/materialui-original.svg") },
    ],
  },
  {
    label: "Backend",
    accent: "#10b981",
    accentDim: "#10b98122",
    tagline: "Logic at scale",
    number: "02",
    items: [
      { name: "Java", icon: ic("java/java-original.svg") },
      { name: "Spring", icon: ic("spring/spring-original.svg") },
      { name: "Node.js", icon: ic("nodejs/nodejs-original.svg") },
      { name: "Express", icon: ic("express/express-original.svg") },
      { name: "Python", icon: ic("python/python-original.svg") },
      { name: "Flask", icon: ic("flask/flask-original.svg") },
      { name: "PostgreSQL", icon: ic("postgresql/postgresql-original.svg") },
      { name: "MongoDB", icon: ic("mongodb/mongodb-original.svg") },
      { name: "Redis", icon: ic("redis/redis-original.svg") },
    ],
  },
  {
    label: "Tools & Cloud",
    accent: "#f59e0b",
    accentDim: "#f59e0b22",
    tagline: "Ship with confidence",
    number: "03",
    items: [
      { name: "Git", icon: ic("git/git-original.svg") },
      { name: "Docker", icon: ic("docker/docker-original.svg") },
      { name: "Jenkins", icon: ic("jenkins/jenkins-original.svg") },
      {
        name: "AWS",
        icon: ic("amazonwebservices/amazonwebservices-plain-wordmark.svg"),
      },
      { name: "Figma", icon: ic("figma/figma-original.svg") },
      { name: "VS Code", icon: ic("vscode/vscode-original.svg") },
      { name: "Vercel", icon: ic("vercel/vercel-original.svg") },
    ],
  },
];

// ─── Laptop SVG Mockup ────────────────────────────────────────────────────────
function LaptopMockup() {
  const codeLines = [
    { text: "const stack = {", color: "#f5f0e4" },
    { text: "  frontend: [", color: "#f5f0e4" },
    { text: "    'React', 'Next.js',", color: "#a8c060" },
    { text: "    'TypeScript',", color: "#a8c060" },
    { text: "  ],", color: "#f5f0e4" },
    { text: "  backend: [", color: "#f5f0e4" },
    { text: "    'Spring', 'Node',", color: "#10b981" },
    { text: "    'PostgreSQL',", color: "#10b981" },
    { text: "  ],", color: "#f5f0e4" },
    { text: "  cloud: [", color: "#f5f0e4" },
    { text: "    'AWS', 'Docker',", color: "#f59e0b" },
    { text: "  ],", color: "#f5f0e4" },
    { text: "}", color: "#f5f0e4" },
    { text: "", color: "transparent" },
    { text: "// shipping with 🚀", color: "#a8c06055" },
  ];

  return (
    <svg
      viewBox="0 0 520 360"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <defs>
        <radialGradient id="screenGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#a8c060" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#a8c060" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="baseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a2010" />
          <stop offset="100%" stopColor="#0d1008" />
        </linearGradient>
      </defs>

      {/* Lid */}
      <rect
        x="30"
        y="10"
        width="460"
        height="295"
        rx="14"
        ry="14"
        fill="#0d1508"
        stroke="#a8c06032"
        strokeWidth="1.5"
      />
      {/* Screen */}
      <rect
        x="46"
        y="24"
        width="428"
        height="267"
        rx="8"
        ry="8"
        fill="#111806"
      />
      <rect
        x="46"
        y="24"
        width="428"
        height="267"
        rx="8"
        ry="8"
        fill="url(#screenGlow)"
      />
      {/* Tab bar */}
      <rect
        x="46"
        y="24"
        width="428"
        height="26"
        rx="8"
        ry="8"
        fill="#0a1006"
      />
      <rect x="46" y="38" width="428" height="12" fill="#0a1006" />
      {/* Active tab */}
      <rect x="56" y="30" width="90" height="16" rx="4" fill="#1c2410" />
      <text
        x="72"
        y="42"
        fontFamily="'Space Mono',monospace"
        fontSize="7"
        fill="#a8c06090"
      >
        stack.ts
      </text>
      <circle cx="148" cy="38" r="3" fill="#a8c06060" />
      {/* Inactive tab */}
      <rect x="152" y="32" width="70" height="14" rx="4" fill="#111806" />
      <text
        x="162"
        y="43"
        fontFamily="'Space Mono',monospace"
        fontSize="7"
        fill="#f5f0e430"
      >
        index.tsx
      </text>
      {/* Sidebar */}
      <rect x="46" y="50" width="34" height="241" fill="#0c1408" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x="55"
          y={65 + i * 30}
          width="16"
          height="16"
          rx="3"
          fill={i === 0 ? "#a8c06025" : "#a8c06010"}
        />
      ))}
      {/* Line numbers */}
      {codeLines.map((_, i) => (
        <text
          key={i}
          x="90"
          y={72 + i * 14.5}
          fontFamily="'Space Mono',monospace"
          fontSize="7.5"
          fill="#a8c06030"
        >
          {String(i + 1).padStart(2, " ")}
        </text>
      ))}
      {/* Code lines */}
      {codeLines.map((line, i) => (
        <text
          key={i}
          x="108"
          y={72 + i * 14.5}
          fontFamily="'Space Mono',monospace"
          fontSize="7.5"
          fill={line.color}
          opacity={0.9}
        >
          {line.text}
        </text>
      ))}
      {/* Blinking cursor */}
      <rect
        x="108"
        y="268"
        width="5"
        height="9"
        fill="#a8c060"
        className="laptop-cursor"
      />
      {/* Status bar */}
      <rect x="46" y="273" width="428" height="18" fill="#0a1006" />
      <circle cx="60" cy="282" r="4" fill="#a8c06060" />
      <text
        x="70"
        y="285"
        fontFamily="'Space Mono',monospace"
        fontSize="6"
        fill="#a8c06050"
      >
        main
      </text>
      <text
        x="420"
        y="285"
        fontFamily="'Space Mono',monospace"
        fontSize="6"
        fill="#a8c06040"
      >
        UTF-8
      </text>
      {/* Camera */}
      <circle
        cx="260"
        cy="17"
        r="3.5"
        fill="#1a2010"
        stroke="#a8c06020"
        strokeWidth="1"
      />
      <circle cx="260" cy="17" r="1.5" fill="#a8c06030" />
      {/* Base */}
      <rect
        x="8"
        y="305"
        width="504"
        height="24"
        rx="4"
        ry="4"
        fill="url(#baseGrad)"
        stroke="#a8c06020"
        strokeWidth="1"
      />
      <rect x="30" y="303" width="460" height="4" rx="2" fill="#1a2010" />
      {/* Trackpad */}
      <rect
        x="195"
        y="312"
        width="130"
        height="10"
        rx="3"
        ry="3"
        fill="#1a2010"
        stroke="#a8c06015"
        strokeWidth="1"
      />
      {/* Glass shine */}
      <path
        d="M 60 28 Q 140 24 200 60 L 60 60 Z"
        fill="white"
        opacity="0.015"
      />
      {/* ── Thin white outline — traces the actual laptop silhouette ── */}
      <rect
        x="30"
        y="10"
        width="460"
        height="295"
        rx="14"
        ry="14"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
      />
      <rect
        x="8"
        y="305"
        width="504"
        height="24"
        rx="4"
        ry="4"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ─── Floating badges ──────────────────────────────────────────────────────────
function LaptopBadges() {
  return (
    <>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "14%",
          right: "-6%",
          background: "#1c2410",
          border: "1px solid #a8c06040",
          borderRadius: 12,
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 12px 36px rgba(0,0,0,0.5), 0 0 0 1px #a8c06018",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#a8c060",
            boxShadow: "0 0 8px #a8c060",
          }}
        />
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "#f5f0e4",
            whiteSpace: "nowrap",
          }}
        >
          24 TOOLS
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          position: "absolute",
          top: "8%",
          left: "-5%",
          background: "#0d1508",
          border: "1px solid #10b98135",
          borderRadius: 10,
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 7,
          boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#10b981",
            boxShadow: "0 0 6px #10b981",
          }}
        />
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 9,
            letterSpacing: "0.12em",
            color: "#10b981cc",
            whiteSpace: "nowrap",
          }}
        >
          PROD READY
        </span>
      </motion.div>
    </>
  );
}

// ─── Logo Pill ────────────────────────────────────────────────────────────────
function LogoPill({ item, groupColor, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: "clamp(10px,1.8vw,20px) clamp(6px,1.2vw,14px)",
        background: hovered ? groupColor + "0c" : "#fff",
        border: hovered
          ? `1px solid ${groupColor}45`
          : "1px solid rgba(42,48,24,0.08)",
        borderRadius: 10,
        cursor: "default",
        boxShadow: hovered ? `0 6px 20px ${groupColor}18` : "none",
        transform: hovered
          ? "translateY(-4px) scale(1.04)"
          : "translateY(0) scale(1)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <img
        src={item.icon}
        alt={item.name}
        style={{
          width: "clamp(22px,2.6vw,32px)",
          height: "clamp(22px,2.6vw,32px)",
          objectFit: "contain",
          transform: hovered
            ? "rotate(-6deg) scale(1.12)"
            : "rotate(0) scale(1)",
          transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <div
        style={{
          display: "none",
          width: 32,
          height: 32,
          alignItems: "center",
          justifyContent: "center",
          background: groupColor + "20",
          borderRadius: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 13,
            color: groupColor,
          }}
        >
          {item.name[0]}
        </span>
      </div>
      <span
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: "clamp(6px,0.8vw,9px)",
          letterSpacing: "0.12em",
          color: hovered ? groupColor : "rgba(42,48,24,0.45)",
          textAlign: "center",
          transition: "color 0.25s",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
        }}
      >
        {item.name}
      </span>
    </motion.div>
  );
}

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    dur: 4 + Math.random() * 6,
    delay: Math.random() * 4,
  }));
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -24, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#a8c060",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function StackSection() {
  const secRef = useRef();
  const headerRef = useRef();

  // Scroll progress across the whole section
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start end", "end start"],
  });

  // Raw transform value — laptop travels from 0% → 62% as section scrolls through
  const rawY = useTransform(scrollYProgress, [0, 0.85], ["0%", "62%"]);

  // ── SMOOTH SPRING ──
  // Feed the raw string value into a spring with gentle physics.
  // stiffness + damping combo gives a slow, buttery glide with no jank.
  const laptopY = useSpring(rawY, {
    stiffness: 40, // low = slow to start / slow to stop
    damping: 18, // smooths out oscillation
    restDelta: 0.001,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stack-label",
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
        ".stack-heading-line",
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
        ".stack-para",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".stack-group-header",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stack-logo-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".stack-group-line",
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stack-logo-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={secRef}
      style={{ background: "#1c2410", position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "rgba(245,240,228,0.06)",
        }}
      />
      <Particles />

      {/* ── LAPTOP RAIL: absolute, full height, right side ── */}
      <div className="laptop-rail" aria-hidden="true">
        <motion.div
          className="laptop-float"
          style={{ y: laptopY }}
          initial={{ opacity: 0, scale: 0.86, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <LaptopMockup />
          <LaptopBadges />
        </motion.div>
      </div>

      {/* ── HEADER ── */}
      <div
        ref={headerRef}
        style={{
          padding:
            "clamp(48px,8vh,120px) clamp(20px,6vw,72px) clamp(32px,5vh,64px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="stack-label"
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 10,
            letterSpacing: "0.4em",
            color: "rgba(245,240,228,0.25)",
            marginBottom: 20,
          }}
        >
          03 / Stack
        </div>

        {/* Left half only — laptop sits in the right half via the rail */}
        <div className="stack-header-left">
          <h2
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(2.8rem,7vw,7rem)",
              color: "#f5f0e4",
              letterSpacing: "0.03em",
              lineHeight: 0.95,
              marginBottom: 0,
              overflow: "hidden",
            }}
          >
            <div
              className="stack-heading-line"
              style={{ display: "block", overflow: "hidden" }}
            >
              BUILT WITH
            </div>
            <div
              className="stack-heading-line"
              style={{ display: "block", overflow: "hidden" }}
            >
              <span style={{ color: "#a8c060" }}>INTENTION.</span>
            </div>
          </h2>
          <p
            className="stack-para"
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(13px,1.3vw,15px)",
              color: "rgba(245,240,228,0.45)",
              maxWidth: 340,
              lineHeight: 1.75,
              marginTop: 24,
            }}
          >
            Technologies I reach for daily — from pixel-perfect UIs to
            enterprise-grade backends.
          </p>
        </div>
      </div>

      {/* ── LIGHT LOGO GRID ── */}
      <div
        className="stack-logo-grid"
        style={{
          background: "#f5f0e4",
          borderTop: "1px solid rgba(42,48,24,0.08)",
        }}
      >
        <div style={{ padding: "clamp(40px,7vh,100px) clamp(20px,6vw,72px)" }}>
          {/* Header — left half only, laptop drifts in on the right */}
          <div className="stack-light-header">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(1.8rem,4vw,3.5rem)",
                color: "#1c2410",
                letterSpacing: "0.03em",
                lineHeight: 1,
              }}
            >
              EVERY TOOL,
              <br />
              <span style={{ color: "#4a6020" }}>EVERY LAYER.</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "clamp(12px,1.3vw,14px)",
                color: "rgba(42,48,24,0.5)",
                maxWidth: 300,
                lineHeight: 1.7,
                marginTop: 12,
              }}
            >
              The full picture — from UI components to cloud infrastructure.
            </motion.p>
          </div>

          {/* Tool groups */}
          <div style={{ marginTop: "clamp(28px,5vh,64px)" }}>
            {stackGroups.map((group, gi) => (
              <div
                key={group.label}
                style={{
                  marginBottom:
                    gi < stackGroups.length - 1 ? "clamp(28px,5vh,56px)" : 0,
                }}
              >
                <div
                  className="stack-group-header"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: gi * 0.5,
                    }}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: group.accent,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 10,
                      letterSpacing: "0.35em",
                      color: group.accent,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {group.label.toUpperCase()}
                  </span>
                  <div
                    className="stack-group-line"
                    style={{
                      flex: 1,
                      height: 1,
                      background: group.accent + "25",
                    }}
                  />
                </div>
                <div className="stack-pill-grid">
                  {group.items.map((item, ii) => (
                    <LogoPill
                      key={item.name}
                      item={item}
                      groupColor={group.accent}
                      index={ii + gi * 9}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ── Laptop rail: sits on right half, full section height ── */
        .laptop-rail {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 48%;
          pointer-events: none;
          z-index: 20;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(20px, 5vw, 60px);
          box-sizing: border-box;
        }
        .laptop-float {
          width: 100%;
          position: relative;
        }

        /* ── Header left column: only takes left half ── */
        .stack-header-left {
          width: 48%;
          display: flex;
          flex-direction: column;
        }

        /* ── Light section header: left half only ── */
        .stack-light-header {
          width: 48%;
        }

        .stack-pill-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
          gap: 10px;
        }

        /* Blinking cursor */
        .laptop-cursor {
          animation: blink 1.1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .laptop-rail { display: none; }
          .stack-header-left { width: 100%; }
          .stack-light-header { width: 100%; }
          .stack-pill-grid {
            grid-template-columns: repeat(auto-fill, minmax(76px, 1fr));
          }
        }
        @media (max-width: 540px) {
          .stack-pill-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}

// src/components/stack/StackSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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

// ─── Stack Group Card ─────────────────────────────────────────────────────────
function StackGroupCard({ group, index }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        background: "#111806",
        border: `1px solid ${hovered ? group.accent + "40" : "rgba(245,240,228,0.07)"}`,
        padding: "clamp(18px,2.5vw,28px)",
        cursor: "default",
        transition: "border-color 0.35s, box-shadow 0.35s",
        boxShadow: hovered
          ? `0 20px 56px ${group.accent}14, 0 0 0 1px ${group.accent}18`
          : "0 4px 24px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {/* Subtle glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: hovered
            ? `radial-gradient(ellipse at 20% 0%, ${group.accent}0e 0%, transparent 60%)`
            : "none",
          transition: "background 0.5s",
        }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              flexShrink: 0,
              background: group.accentDim,
              border: `1px solid ${group.accent}45`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: hovered ? `0 0 16px ${group.accent}30` : "none",
              transition: "box-shadow 0.35s",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                letterSpacing: "0.05em",
                color: group.accent,
                fontWeight: 700,
              }}
            >
              {group.number}
            </span>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(1rem,2.2vw,1.45rem)",
                color: "#f5f0e4",
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              {group.label.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "clamp(7px,0.9vw,9px)",
                letterSpacing: "0.18em",
                color: `${group.accent}80`,
                marginTop: 4,
              }}
            >
              {group.tagline}
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: `${group.accent}70`,
            background: group.accentDim,
            border: `1px solid ${group.accent}25`,
            borderRadius: 20,
            padding: "3px 10px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {group.items.length} tools
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, ${group.accent}35, transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.35s",
          position: "relative",
        }}
      />

      {/* Icon grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(52px, 1fr))",
          gap: 8,
          position: "relative",
        }}
      >
        {group.items.map((item, i) => (
          <ToolIcon
            key={item.name}
            item={item}
            accent={group.accent}
            index={i}
            inView={inView}
            cardIndex={index}
          />
        ))}
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${group.accent}, transparent)`,
          opacity: hovered ? 0.6 : 0.15,
          transition: "opacity 0.35s",
        }}
      />
    </motion.div>
  );
}

// ─── Tool icon tile ───────────────────────────────────────────────────────────
function ToolIcon({ item, accent, index, inView, cardIndex }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.35,
        delay: cardIndex * 0.1 + index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={item.name}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "10px 6px",
        borderRadius: 8,
        background: hovered ? `${accent}14` : "rgba(245,240,228,0.04)",
        border: `1px solid ${hovered ? accent + "35" : "rgba(245,240,228,0.07)"}`,
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "default",
      }}
    >
      <img
        src={item.icon}
        alt={item.name}
        style={{
          width: 26,
          height: 26,
          objectFit: "contain",
          filter: hovered ? "brightness(1.1)" : "brightness(0.85)",
          transition: "filter 0.25s",
        }}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <div
        style={{
          display: "none",
          width: 26,
          height: 26,
          alignItems: "center",
          justifyContent: "center",
          background: accent + "20",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 13,
            color: accent,
          }}
        >
          {item.name[0]}
        </span>
      </div>
      <span
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: "clamp(6px,0.7vw,8px)",
          letterSpacing: "0.1em",
          color: hovered ? accent : "rgba(245,240,228,0.35)",
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

// ─── Logo pill (light section) ────────────────────────────────────────────────
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

// ─── Floating particles ───────────────────────────────────────────────────────
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

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function StackSection() {
  const secRef = useRef();
  const headerRef = useRef();

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
        <div className="stack-header-inner">
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
              maxWidth: 320,
              lineHeight: 1.75,
            }}
          >
            Technologies I reach for daily — from pixel-perfect UIs to
            enterprise-grade backends.
          </p>
        </div>
      </div>

      {/* ── STACK GROUP CARDS ── */}
      <div
        style={{
          padding: "0 clamp(20px,6vw,72px) clamp(48px,7vh,96px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: "clamp(24px,4vh,48px)",
          }}
        >
          <div
            style={{ flex: 1, height: 1, background: "rgba(245,240,228,0.08)" }}
          />
          <span
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 8,
              letterSpacing: "0.4em",
              color: "rgba(245,240,228,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            EXPERTISE AREAS
          </span>
          <div
            style={{ flex: 1, height: 1, background: "rgba(245,240,228,0.08)" }}
          />
        </div>

        <div className="stack-cards-grid">
          {stackGroups.map((g, i) => (
            <StackGroupCard key={g.label} group={g} index={i} />
          ))}
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
          <div className="stack-logo-grid-header">
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
              }}
            >
              The full picture — from UI components to cloud infrastructure.
            </motion.p>
          </div>

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

      <style>{`
        .stack-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(12px, 2vw, 20px);
        }
        .stack-header-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 32px;
        }
        .stack-logo-grid-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: clamp(28px, 5vh, 64px);
          flex-wrap: wrap;
          gap: 20px;
        }
        .stack-pill-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
          gap: 10px;
        }
        @media (max-width: 900px) {
          .stack-cards-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .stack-header-inner {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .stack-header-inner p {
            text-align: left !important;
            max-width: 100% !important;
          }
          .stack-logo-grid-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .stack-logo-grid-header p {
            max-width: 100% !important;
          }
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

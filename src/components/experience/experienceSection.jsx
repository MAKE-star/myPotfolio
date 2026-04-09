// src/components/experience/ExperienceSection.jsx
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: "4+", label: "Years in Production" },
  { number: "99.8%", label: "Uptime Delivered" },
  { number: "$50M+", label: "Daily Operations Managed" },
  { number: "3", label: "Countries Shipped To" },
];

export default function ExperienceSection() {
  const sectionRef = useRef();
  const labelRef = useRef();
  const headingRef = useRef();
  const roleRef = useRef();
  const dividerRef = useRef();
  const rightRef = useRef();
  const btnRef = useRef();
  const statsRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.55 },
      );

      const split = new SplitType(headingRef.current, { types: "lines" });
      split.lines.forEach((ln) => {
        const wrap = document.createElement("div");
        wrap.style.overflow = "hidden";
        ln.parentNode.insertBefore(wrap, ln);
        wrap.appendChild(ln);
      });
      tl.fromTo(
        split.lines,
        { y: "108%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.9, stagger: 0.07 },
        "-=0.25",
      );

      tl.fromTo(
        roleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4",
      );

      tl.fromTo(
        dividerRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.7, ease: "power2.inOut" },
        "-=0.5",
      );

      tl.fromTo(
        rightRef.current,
        { opacity: 0, x: 32 },
        { opacity: 1, x: 0, duration: 0.65 },
        "-=0.55",
      );

      tl.fromTo(
        statsRefs.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        "-=0.4",
      );

      tl.fromTo(
        btnRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45 },
        "-=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        background: "#050a05",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "clamp(72px,10vh,120px) clamp(24px,7vw,96px)",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(168,192,96,0.022) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(168,192,96,0.022) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        className="exp-grid"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1200,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        {/* ── LEFT ── */}
        <div style={{ paddingRight: "clamp(24px,4vw,64px)" }}>
          <span
            ref={labelRef}
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "clamp(10px,1.2vw,11px)",
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "rgba(168,192,96,0.55)",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: "clamp(16px,3vh,28px)",
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "rgba(168,192,96,0.35)",
                display: "inline-block",
              }}
            />
            03 / Experience
          </span>

          <h2
            ref={headingRef}
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3.5rem,9vw,8rem)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
              color: "#f5f0e4",
              margin: 0,
              marginBottom: "clamp(20px,3vh,32px)",
            }}
          >
            SOFTWARE
            <br />
            <span style={{ color: "#a8c060" }}>ENGINEER.</span>
            <br />
            BUILDER.
          </h2>


        </div>

        {/* ── DIVIDER ── */}
        <div
          ref={dividerRef}
          style={{
            width: 1,
            height: "clamp(280px,40vh,480px)",
            background:
              "linear-gradient(to bottom, transparent, rgba(168,192,96,0.3), transparent)",
            margin: "0 clamp(20px,4vw,56px)",
            flexShrink: 0,
          }}
        />

        {/* ── RIGHT ── */}
        <div
          ref={rightRef}
          style={{
            paddingLeft: "clamp(0px,1vw,16px)",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              ref={(el) => (statsRefs.current[i] = el)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                padding: "clamp(14px,2.2vh,22px) 0",
                borderBottom:
                  i < STATS.length - 1
                    ? "1px solid rgba(168,192,96,0.1)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: "clamp(2.2rem,4.5vw,4rem)",
                  lineHeight: 0.9,
                  color: "#a8c060",
                  letterSpacing: "0.02em",
                }}
              >
                {s.number}
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "clamp(8px,0.9vw,9px)",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "rgba(245,240,228,0.38)",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}

          {/* CV Button */}
          <div
            ref={btnRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              paddingTop: "clamp(16px,2.5vh,28px)",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/cv.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "clamp(11px,1.5vw,14px) clamp(24px,3vw,34px)",
                borderRadius: 100,
                background: "#a8c060",
                color: "#1c2410",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "clamp(12px,1.3vw,13px)",
                fontWeight: 800,
                letterSpacing: "0.04em",
                textDecoration: "none",
                transition: "background 0.2s, transform 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#bcd470";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#a8c060";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#1c2410",
                }}
              />
              Download CV
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#1c2410",
                }}
              />
            </a>
            <span
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "clamp(8px,0.9vw,9px)",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "rgba(168,192,96,0.3)",
              }}
            >
              PDF · 2025
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes xpPulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:0.45;transform:scale(1.5)}
        }
        @media (max-width: 768px) {
          .exp-grid {
            display: flex !important;
            flex-direction: column !important;
          }
          .exp-grid > div:nth-child(2) {
            display: none !important;
          }
          .exp-grid > div:first-child {
            padding-right: 0 !important;
            margin-bottom: 36px;
          }
          .exp-grid > div:last-child {
            padding-left: 0 !important;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

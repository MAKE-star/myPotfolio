import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { education, awards } from "../../data/experience";

gsap.registerPlugin(ScrollTrigger);

// Removed "Experience" from tabs list
const TABS = ["Education", "Awards"];

function SimpleRow({ year, title, note }) {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(168,192,96,0.1)",
        padding: "clamp(16px,2.5vh,24px) 0",
        display: "grid",
        gridTemplateColumns: "clamp(80px,10vw,120px) 1fr",
        gap: "clamp(12px,2vw,28px)",
        alignItems: "start",
      }}
    >
      <span
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: "clamp(8px,0.85vw,10px)",
          letterSpacing: "0.15em",
          color: "rgba(168,192,96,0.45)",
          paddingTop: 3,
        }}
      >
        {year}
      </span>
      <div>
        <div
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(1.1rem,2vw,1.65rem)",
            letterSpacing: "0.04em",
            color: "#f5f0e4",
            lineHeight: 1,
            marginBottom: note ? 5 : 0,
          }}
        >
          {title}
        </div>
        {note && (
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(11px,1.05vw,13px)",
              color: "rgba(245,240,228,0.38)",
            }}
          >
            {note}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const tabsRef = useRef(null);
  const listRef = useRef(null);
  
  // State defaults to 0, which maps to "Education" now
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !labelRef.current ||
      !headingRef.current ||
      !tabsRef.current ||
      !listRef.current
    ) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(labelRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 });
      tl.fromTo(headingRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75 }, "-=0.2");
      tl.fromTo(tabsRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 }, "-=0.35");
      tl.fromTo(listRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [activeTab]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        background: "#050a05",
        padding: "clamp(80px,12vh,140px) clamp(24px,7vw,96px)",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* grid bg */}
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

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto" }}>

        {/* section label */}
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
          03 / Background
        </span>

        {/* heading */}
        <h2
          ref={headingRef}
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(3.2rem,8vw,7rem)",
            lineHeight: 0.9,
            letterSpacing: "0.02em",
            color: "#f5f0e4",
            margin: 0,
            marginBottom: "clamp(36px,6vh,60px)",
          }}
        >
          CREDENTIALS &
          <br />
          <span style={{ color: "#a8c060" }}>ACCOLADES.</span>
        </h2>

        {/* tabs */}
        <div
          ref={tabsRef}
          style={{
            display: "flex",
            gap: 4,
            borderBottom: "1px solid rgba(168,192,96,0.1)",
          }}
        >
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === i ? "2px solid #a8c060" : "2px solid transparent",
                padding: "10px 20px",
                cursor: "pointer",
                fontFamily: "'Space Mono',monospace",
                fontSize: "clamp(9px,0.95vw,11px)",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: activeTab === i ? "#a8c060" : "rgba(245,240,228,0.32)",
                transition: "color 0.2s, border-color 0.2s",
                marginBottom: -1,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* list */}
        <div ref={listRef}>
          {activeTab === 0 && (
            <div>
              {education.map((item) => (
                <SimpleRow key={item.id} year={item.year} title={item.title} note={item.note} />
              ))}
              <div style={{ borderTop: "1px solid rgba(168,192,96,0.1)" }} />
            </div>
          )}
          {activeTab === 1 && (
            <div>
              {awards.map((item, i) => (
                <SimpleRow key={i} year={item.year} title={item.title} note={item.note} />
              ))}
              <div style={{ borderTop: "1px solid rgba(168,192,96,0.1)" }} />
            </div>
          )}
        </div>

        {/* CV download */}
        <div
          style={{
            marginTop: "clamp(32px,5vh,56px)",
            display: "flex",
            alignItems: "center",
            gap: 14,
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
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1c2410" }} />
            Download CV
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1c2410" }} />
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
            PDF · 2026
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #experience [style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
// src/components/about/AboutSection.jsx

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import ContactPopup from "../contact/ContactPopup";

gsap.registerPlugin(ScrollTrigger);

// ── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: "5+",   label: "Years of production experience" },
  { value: "15+",  label: "Projects shipped" },
  { value: "4.85", label: "Strong Hire assessment score" },
  { value: "∞",    label: "Lines of code written" },
];

// ── Data rows ────────────────────────────────────────────────────────────────
const dataRows = [
  { key: "STATUS",    val: "Available for work",                   green: true  },
  { key: "SPECIALTY", val: "Full Stack Engineering",               green: false },
  { key: "STACK",     val: "Java · JS · React · Node · Spring",   green: false },
  { key: "BASE",      val: "Lagos, Nigeria",                       green: false },
];

// ── Contact options ──────────────────────────────────────────────────────────
const CONTACTS = [
  {
    id: "email",
    label: "Send an Email",
    sub: "adeoyemayopoelijah@gmail.com",
    href: "mailto:adeoyemayopoelijah@gmail.com",
    accent: "#39ff6a",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp Me",
    sub: "+234 905 236 8651",
    href: "https://wa.me/2349052368651",
    accent: "#25d366",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    sub: "linkedin.com/in/mayopo-adeoye",
    href: "https://www.linkedin.com/in/mayopo-adeoye/",
    accent: "#0077b5",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

// ── Socials ──────────────────────────────────────────────────────────────────
const socials = [
  { label: "GitHub",    href: "https://github.com/MAKE-star",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/mayopo-adeoye",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: "Twitter/X", href: "https://x.com/MAKE_D_Great",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M4 20L20 4"/></svg> },
  { label: "WhatsApp",  href: "https://wa.me/2349052368651",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> },
  { label: "Instagram", href: "https://www.instagram.com/make_d_great/",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
];

// ── Credentials ──────────────────────────────────────────────────────────────
const institutions = [
  {
    id: "hackerrank-node",
    name: "HackerRank Certified",
    shortName: "HR",
    initials: "HR",
    credential: "Node.js Intermediate · Apr 2026 · ID: B689497C829E",
    url: "https://www.hackerrank.com/certificates/B689497C829E",
    bg: "#1ba94c",
    border: "#39ff6a",
    color: "#39ff6a",
    imgSrc: "/nodejs.jpeg",
    tag: "VERIFIED",
  },
  {
    id: "github-campus",
    name: "GitHub Campus Expert",
    shortName: "GH",
    initials: "GH",
    credential: "DevSprint 2.0 · DSA · IEEE UNILAG × GitHub",
    url: "https://github.com/MAKE-star",
    bg: "#24292e",
    border: "#6e40c9",
    color: "#a78bfa",
    imgSrc: "/githubdsa.jpeg",
    tag: "VERIFIED",
  },
  {
    id: "testgorilla-se",
    name: "TestGorilla Top Scorer",
    shortName: "TG",
    initials: "TG",
    credential: "94th percentile · UPSKILL 3.0 Software Engineering · Aug 2025",
    url: "#",
    bg: "#25123e",
    border: "#e11d48",
    color: "#fb7185",
    tag: "VERIFIED",
    isPdf: true, // Marked to specify that it handles a document viewer container
    pdfSrc: "/testgorilla-assessment.pdf"
  },
  {
    id: "iymc-math",
    name: "IYMC Silver Award",
    shortName: "IY",
    initials: "IY",
    credential: "Top 7% · International Youth Math Challenge · 65+ countries",
    url: "#",
    bg: "#1a1a2e",
    border: "#d4a843",
    color: "#d4a843",
    imgSrc: null,
    tag: "AWARD",
  },
];

// ── Number matrix generator (James's signature left-panel effect) ─────────────
function NumberMatrix() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let cols, rows, drops;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols  = Math.floor(canvas.width / 38);
      rows  = Math.floor(canvas.height / 22);
      drops = Array(cols).fill(0).map(() => Math.random() * rows);
    };
    resize();

    const NUMS = "0123456789";
    let frame = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(5,10,5,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "13px 'JetBrains Mono', monospace";
      frame++;

      drops.forEach((y, i) => {
        const num = NUMS[Math.floor(Math.random() * NUMS.length)];
        const x   = i * 38 + 6;
        const yPx = y * 22;

        ctx.fillStyle = `rgba(57,255,106,${0.55 + Math.random() * 0.2})`;
        ctx.fillText(num, x, yPx);

        if (frame % 3 === 0) {
          drops[i] = y > rows + Math.random() * 8 ? 0 : y + 1;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: 0,
      }}
    />
  );
}

// ── Social icon ───────────────────────────────────────────────────────────────
function SocialIcon({ s, light = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      title={s.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 36, height: 36, borderRadius: "50%",
        border: `1px solid ${hovered ? "rgba(57,255,106,0.5)" : "rgba(57,255,106,0.15)"}`,
        background: hovered ? "rgba(57,255,106,0.1)" : "transparent",
        color: hovered ? "#39ff6a" : "rgba(255,255,255,0.4)",
        textDecoration: "none",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        flexShrink: 0,
      }}
    >
      {s.icon}
    </a>
  );
}

// ── Credential card (Refactored to handle inline layout expand for images and PDFs) ──
function CredentialCard({ inst, isExpanded, onToggle }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr,  setImgErr]  = useState(false);

  const handleClick = (e) => {
    // If it's a PDF document or an image row layout, toggle inline display
    if (inst.isPdf || (inst.imgSrc && !imgErr)) {
      e.preventDefault();
      onToggle();
    }
  };

  const interactive = inst.isPdf || (inst.imgSrc && !imgErr);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <a
        href={inst.url}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          padding: "14px 18px",
          background: (hovered || isExpanded) ? "rgba(57,255,106,0.05)" : "rgba(57,255,106,0.02)",
          border: `1px solid ${(hovered || isExpanded) ? "rgba(57,255,106,0.2)" : "rgba(57,255,106,0.08)"}`,
          borderLeft: `3px solid ${inst.border}`,
          textDecoration: "none",
          transition: "background 0.2s, border-color 0.2s",
          position: "relative",
          cursor: interactive ? "pointer" : "default"
        }}
      >
        {/* Tag badge */}
        <span style={{
          position: "absolute", top: 8, right: 10,
          fontFamily: "var(--font-mono)",
          fontSize: 7, letterSpacing: ".16em",
          color: inst.color, border: `1px solid ${inst.border}`,
          padding: "1px 5px", opacity: 0.7,
        }}>{inst.tag}</span>

        {/* Logo / cert thumbnail */}
        <div style={{
          width: 40, height: 40, borderRadius: 4,
          background: inst.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", flexShrink: 0,
          border: `1.5px solid ${inst.border}33`,
        }}>
          {inst.imgSrc && !imgErr ? (
            <img
              src={inst.imgSrc}
              alt={inst.name}
              onError={() => setImgErr(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span style={{
              fontFamily: "var(--font-mono)", fontWeight: 700,
              fontSize: 11, color: inst.color,
            }}>{inst.initials}</span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingRight: 60 }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "clamp(11px,1.1vw,13px)",
            color: "var(--clr-text-primary)",
            lineHeight: 1.2,
          }}>{inst.name}</span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(8px,0.8vw,9px)",
            color: inst.color,
            letterSpacing: ".08em",
            opacity: 0.8,
          }}>{inst.credential}</span>
          
          {interactive && (
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "7px",
              color: "var(--clr-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginTop: 2
            }}>
              {isExpanded ? "▲ Click to collapse" : "▼ Click to expand document verification"}
            </span>
          )}
        </div>
      </a>

      {/* Inline Layout Accordion Container */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: "hidden",
              background: "rgba(5, 10, 5, 0.6)",
              borderLeft: `3px solid ${inst.border}`,
              borderRight: "1px solid rgba(57,255,106,0.08)",
              borderBottom: "1px solid rgba(57,255,106,0.08)",
            }}
          >
            <div style={{ padding: "12px 18px" }}>
              {inst.isPdf ? (
                /* Dynamic Inline PDF Engine Interface */
                <div className="w-full h-[500px] mt-2 rounded-lg overflow-hidden border border-zinc-800">
                  <iframe
                    src={`${inst.pdfSrc}#view=FitH`}
                    title="TestGorilla Assessment PDF"
                    className="w-full h-full"
                    frameBorder="0"
                    style={{ width: "100%", height: "500px", border: "none" }}
                  />
                </div>
              ) : (
                /* Fallback Image Render */
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img 
                    src={inst.imgSrc} 
                    alt={`${inst.name} Expanded Verification`} 
                    style={{
                      width: "100%",
                      maxHeight: "450px",
                      objectFit: "contain",
                      border: "1px solid rgba(57,255,106,0.15)",
                      background: "#000"
                    }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Inline contact card ───────────────────────────────────────────────────────
function InlineContactCard({ c, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={c.href}
      target={c.id === "email" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32, scale: 0.94 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.94 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", gap: 12,
        padding: "20px 18px",
        background: hovered ? `${c.accent}22` : "rgba(57,255,106,0.04)",
        border: `1px solid ${hovered ? c.accent + "66" : "rgba(57,255,106,0.12)"}`,
        borderBottom: `3px solid ${c.accent}`,
        textDecoration: "none",
        transition: "background 0.25s, border-color 0.25s, transform 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        flex: 1, minWidth: 0, cursor: "pointer",
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        background: `${c.accent}14`,
        border: `1px solid ${c.accent}33`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: c.accent, flexShrink: 0,
      }}>{c.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(11px,1vw,13px)", fontWeight: 700,
          color: "var(--clr-text-primary)", lineHeight: 1.2, marginBottom: 4,
        }}>{c.label}</div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(8px,0.7vw,9px)",
          color: "var(--clr-text-muted)", letterSpacing: ".04em",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{c.sub}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c.accent}
        strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, flexShrink: 0 }}>
        <path d="M7 17L17 7M7 7h10v10"/>
      </svg>
    </motion.a>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AboutSection({ videeSrc }) {
  const secRef     = useRef();
  const imgRef     = useRef();
  const rightRef   = useRef();
  const headingRef = useRef();
  const labelRef   = useRef();
  const paraRef    = useRef();
  const quoteRef   = useRef();

  const [hoveredStat, setHoveredStat] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [inlineOpen,  setInlineOpen]  = useState(false);
  const [cvHovered,   setCvHovered]   = useState(false);
  const [cvDownloading, setCvDownloading] = useState(false);
  
  // Track which credential index is currently expanded inline
  const [expandedCertId, setExpandedCertId] = useState(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 200, damping: 20 });
  const springY = useSpring(my, { stiffness: 200, damping: 20 });

  const handleDownloadCV = () => {
    setCvDownloading(true);
    const link = document.createElement("a");
    link.href = "/Mayopo_Adeoye_CV.pdf";
    link.download = "Mayopo_Adeoye_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setCvDownloading(false), 1800);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(labelRef.current, { opacity: 0, x: -20 }, {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: secRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        });
        gsap.fromTo(".about-img-wrap", { clipPath: "inset(100% 0 0 0)" }, {
          clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.inOut",
          scrollTrigger: { trigger: secRef.current, start: "top 75%", toggleActions: "play none none none" },
        });
        gsap.to(imgRef.current, {
          yPercent: -12, ease: "none",
          scrollTrigger: { trigger: secRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
        gsap.fromTo(".about-name-overlay", { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4,
          scrollTrigger: { trigger: secRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        });
        const heading = headingRef.current;
        if (heading) {
          const split = new SplitType(heading, { types: "lines" });
          gsap.fromTo(split.lines, { y: "110%", opacity: 0 }, {
            y: "0%", opacity: 1, duration: 0.9, stagger: 0.12, ease: "power4.out",
            scrollTrigger: { trigger: heading, start: "top 80%", toggleActions: "play none none reverse" },
          });
        }
        gsap.fromTo(paraRef.current, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: paraRef.current, start: "top 82%", toggleActions: "play none none reverse" },
        });
        gsap.fromTo(".about-row", { opacity: 0, x: 40 }, {
          opacity: 1, x: 0, duration: 0.55, stagger: 0.09, ease: "power3.out",
          scrollTrigger: { trigger: rightRef.current, start: "top 72%", toggleActions: "play none none reverse" },
        });
        gsap.fromTo(".about-stat", { opacity: 0, y: 36, scale: 0.92 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".about-stats-grid", start: "top 80%", toggleActions: "play none none reverse" },
        });
        gsap.fromTo(".credentials-block", { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: ".credentials-block", start: "top 82%", toggleActions: "play none none reverse" },
        });
        gsap.fromTo(quoteRef.current, { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        });
      }, secRef);
      return () => ctx.revert();
    }, 650);
    return () => clearTimeout(timer);
  }, []);

  const handleMagnet = (e, strength = 0.4) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    my.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const resetMagnet = () => { mx.set(0); my.set(0); };

  const handleGetInTouch = () => {
    if (window.innerWidth >= 900) {
      setInlineOpen(v => !v);
    } else {
      setContactOpen(true);
    }
  };

  const toggleCredentialExpand = (id) => {
    setExpandedCertId(prev => prev === id ? null : id);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

        @keyframes pulse-dot    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.5)} }
        @keyframes cv-bounce    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(3px)} }
        @keyframes about-scanline { from{transform:translateX(-100%)} to{transform:translateX(200%)} }

        .about-row { transition: background 0.25s, padding-left 0.25s; }
        .about-row:hover { background: rgba(57,255,106,0.04); padding-left: 10px; }
        .about-row:hover .about-row-val { color: #39ff6a !important; }

        .about-stat { transition: background 0.3s; cursor: default; }
        .about-stat:hover .about-stat-value { color: #39ff6a !important; transition: color 0.25s; }

        .about-cta::after { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(57,255,106,0.15),transparent);
          transition:left 0.5s ease; }
        .about-cta { position:relative; overflow:hidden; }
        .about-cta:hover::after { left:150%; }

        .heading-overflow { overflow: hidden; }
        .cv-dl-icon { animation: cv-bounce 0.9s ease-in-out infinite; }

        .about-split-grid { display:grid; grid-template-columns:1fr 1fr; min-height:80vh; }
        .about-stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }

        .about-quote-inner { display:flex; align-items:center; gap:clamp(32px,5vw,64px); width:100%; }
        .about-quote-left  { flex-shrink:0; display:flex; flex-direction:column; gap:clamp(16px,2vw,20px); }
        .about-quote-right { flex:1; display:flex; gap:12px; align-items:stretch; min-width:0; }

        .cta-btn-row { display:flex; align-items:center; gap:12px; flex-wrap:wrap; }

        @media (max-width: 900px) {
          .about-split-grid  { grid-template-columns:1fr !important; }
          .about-img-col     { height:72vw !important; min-height:300px !important; }
          .about-stats-grid  { grid-template-columns:repeat(2,1fr) !important; }
          .about-quote-inner { flex-direction:column !important; align-items:flex-start !important; gap:24px !important; }
          .about-quote-right { display:none !important; }
        }
      `}</style>

      <section id="about" ref={secRef} style={{ background: "var(--clr-bg)", position: "relative" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"rgba(57,255,106,0.08)" }} />

        <div style={{ padding:"14px clamp(20px,6vw,72px) 0" }}>
          <span ref={labelRef} style={{
            fontFamily:"var(--font-mono)", fontSize:"clamp(10px,1.2vw,12px)",
            fontWeight:700, letterSpacing:"0.3em", color:"var(--clr-text-muted)",
            display:"inline-block", textTransform:"uppercase",
          }}>
            ❯ 01 / About
          </span>
        </div>

        <div className="about-split-grid" style={{
          borderBottom:"1px solid rgba(57,255,106,0.08)",
          overflow:"hidden", position:"relative",
        }}>

          <div className="about-img-wrap about-img-col" style={{
            position:"relative", overflow:"hidden",
            background:"#050a05",
            minHeight:"clamp(300px,60vh,100%)",
          }}>
            <NumberMatrix />

            <video
              autoPlay muted loop playsInline preload="none"
              onError={e => e.target.style.display="none"}
              style={{
                position:"absolute", inset:0,
                width:"100%", height:"100%",
                objectFit:"cover",
                mixBlendMode:"screen",
                opacity:0.18,
                zIndex:1,
                pointerEvents:"none",
              }}
            >
              <source src="/bg-video.webm" type="video/webm" />
              <source src="/bg-video.mp4"  type="video/mp4"  />
            </video>

            <div ref={imgRef} style={{
              position:"absolute",
              bottom:0,
              left:"50%",
              transform:"translateX(-50%)",
              width:"clamp(200px, 68%, 340px)",
              height:"92%",
              willChange:"transform",
              zIndex:2,
            }}>
              <img
                src="/mypng.png"
                alt="Mayopo Adeoye"
                onError={e => { e.target.style.display="none"; }}
                style={{
                  width:"100%", height:"100%",
                  objectFit:"cover",
                  objectPosition:"center top",
                  display:"block",
                  filter:"saturate(0.6) brightness(0.82) contrast(1.05)",
                  WebkitMaskImage:"linear-gradient(to bottom, transparent 0%, black 10%, black 78%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                  WebkitMaskComposite:"destination-in",
                  maskImage:"linear-gradient(to bottom, transparent 0%, black 10%, black 78%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                  maskComposite:"intersect",
                }}
              />
              <div style={{
                position:"absolute", inset:0, pointerEvents:"none",
                background:"rgba(57,255,106,0.06)",
                mixBlendMode:"overlay",
              }} />
            </div>

            <div style={{
              position:"absolute", inset:0, zIndex:3, pointerEvents:"none",
              background:`
                radial-gradient(ellipse 80% 90% at 50% 50%,
                  transparent 30%,
                  rgba(5,10,5,0.55) 70%,
                  rgba(5,10,5,0.92) 100%
                )
              `,
            }} />

            <div style={{
              position:"absolute", inset:0, zIndex:4, pointerEvents:"none",
              background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.05) 3px,rgba(0,0,0,0.05) 4px)",
            }} />

            {[
              { top:16, left:16, content:"┌" },
              { top:16, right:16, content:"┐" },
              { bottom:80, left:16, content:"└" },
              { bottom:80, right:16, content:"┘" },
            ].map((c, i) => (
              <span key={i} aria-hidden="true" style={{
                position:"absolute", ...c, content:undefined,
                fontFamily:"var(--font-mono)", fontSize:"1.1rem",
                color:"var(--clr-accent)", opacity:0.3,
                lineHeight:1, zIndex:5, userSelect:"none",
              }}>{c.content}</span>
            ))}

            <div className="about-name-overlay" style={{
              position:"absolute", bottom:0, left:0, right:0, zIndex:6,
              padding:"clamp(20px,4vw,48px)",
              background:"linear-gradient(0deg,rgba(5,10,5,0.97) 0%,rgba(5,10,5,0.7) 55%,transparent 100%)",
            }}>
              <div style={{
                fontFamily:"var(--font-mono)", fontSize:"0.75rem",
                color:"var(--clr-accent)", opacity:0.45, marginBottom:"0.4rem",
              }}>┌─</div>
              <div style={{
                fontFamily:"var(--font-sans)", fontWeight:800,
                fontSize:"clamp(2rem,5vw,4.5rem)", color:"var(--clr-text-primary)",
                lineHeight:0.95, letterSpacing:"-0.02em",
              }}>
                Mayopo<br />Adeoye
              </div>
              <div style={{
                fontFamily:"var(--font-mono)", fontSize:"clamp(9px,1vw,11px)",
                fontWeight:700, letterSpacing:"0.3em",
                color:"var(--clr-accent)", marginTop:8, opacity:0.75,
              }}>
                SOFTWARE ENGINEER
              </div>
              <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
                {socials.map(s => <SocialIcon key={s.label} s={s} light />)}
              </div>
            </div>
          </div>

          <div ref={rightRef} style={{
            padding:"clamp(28px,5vw,80px)",
            display:"flex", flexDirection:"column",
            justifyContent:"space-between",
            gap:"clamp(20px,3vw,32px)",
            background:"var(--clr-bg)",
          }}>
            <div>
              <div className="heading-overflow">
                <h2 ref={headingRef} style={{
                  fontFamily:"var(--font-sans)", fontWeight:800,
                  fontSize:"clamp(1.8rem,5vw,5rem)",
                  color:"var(--clr-text-primary)",
                  lineHeight:0.95, letterSpacing:"-0.02em", marginBottom:20,
                }}>
                  I DON'T JUST WRITE CODE<br />
                  <span style={{ color:"var(--clr-accent)" }}>I ENGINEER EXPERIENCES.</span>
                </h2>
              </div>

              <p ref={paraRef} style={{
                fontFamily:"var(--font-sans)", fontSize:"clamp(14px,1.4vw,16px)",
                fontWeight:500, color:"var(--clr-text-secondary)",
                lineHeight:1.8, maxWidth:480,
              }}>
                From real-time FX trading platforms to payment engines scoring{" "}
                <span style={{ color:"var(--clr-accent)", fontWeight:700 }}>4.85/5.00</span> — I build
                software that works at the speed of business. 5+ years engineering production
                systems for live banking clients. Based in Lagos, Nigeria — working globally.
              </p>
            </div>

            {/* Credentials Block Container */}
            <div className="credentials-block" style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{
                fontFamily:"var(--font-mono)", fontSize:"clamp(8px,0.85vw,9px)",
                fontWeight:700, letterSpacing:"0.35em",
                color:"var(--clr-text-muted)", marginBottom:4, textTransform:"uppercase",
              }}>
                ❯ Credentials
              </div>
              {institutions.map(inst => (
                <CredentialCard 
                  key={inst.id} 
                  inst={inst} 
                  isExpanded={expandedCertId === inst.id}
                  onToggle={() => toggleCredentialExpand(inst.id)}
                />
              ))}
            </div>

            <div className="credentials-block" style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <div style={{
                fontFamily:"var(--font-mono)", fontSize:"clamp(10px,1vw,12px)",
                fontWeight:700, letterSpacing:"0.35em",
                color:"var(--clr-text-secondary)", textTransform:"uppercase",
              }}>
                ❯ Find me on
              </div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {socials.map(s => <SocialIcon key={s.label} s={s} />)}
              </div>
            </div>

            <div>
              {dataRows.map(r => (
                <div key={r.key} className="about-row" style={{
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  padding:"clamp(12px,1.5vw,16px) 0",
                  position:"relative", borderRadius:2, gap:12,
                }}>
                  <div style={{
                    position:"absolute", bottom:0, left:0, right:0, height:1,
                    background:"rgba(57,255,106,0.07)",
                  }} />
                  <span style={{
                    fontFamily:"var(--font-mono)", fontSize:"clamp(10px,0.9vw,12px)",
                    fontWeight:700, letterSpacing:"0.25em",
                    color:"var(--clr-text-muted)", flexShrink:0,
                  }}>{r.key}</span>
                  <span className="about-row-val" style={{
                    fontFamily:"var(--font-mono)", fontSize:"clamp(11px,1.1vw,13px)",
                    fontWeight:700,
                    color: r.green ? "var(--clr-accent)" : "var(--clr-text-primary)",
                    letterSpacing: r.green ? "0.08em" : 0,
                    transition:"color 0.25s", textAlign:"right",
                  }}>
                    {r.green && (
                      <span style={{
                        display:"inline-block", width:7, height:7, borderRadius:"50%",
                        background:"var(--clr-accent)", marginRight:8,
                        animation:"pulse-dot 2s infinite",
                      }} />
                    )}
                    {r.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="about-stats-grid" style={{ borderBottom:"1px solid rgba(57,255,106,0.08)" }}>
          {stats.map((s, i) => (
            <div key={s.label} className="about-stat"
              onMouseEnter={() => setHoveredStat(i)}
              onMouseLeave={() => setHoveredStat(null)}
              style={{
                padding:"clamp(24px,5vw,64px) clamp(14px,4vw,48px)",
                borderRight: i < stats.length - 1 ? "1px solid rgba(57,255,106,0.08)" : undefined,
                position:"relative", overflow:"hidden",
              }}>
              <div style={{
                position:"absolute", inset:0,
                background:"rgba(57,255,106,0.04)",
                transform: hoveredStat === i ? "scaleY(1)" : "scaleY(0)",
                transformOrigin:"bottom",
                transition:"transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                zIndex:0,
              }} />
              <div style={{ position:"relative", zIndex:1 }}>
                <div className="about-stat-value" style={{
                  fontFamily:"var(--font-sans)", fontWeight:800,
                  fontSize:"clamp(2rem,6vw,5.5rem)",
                  color: hoveredStat === i ? "var(--clr-accent)" : "var(--clr-text-primary)",
                  lineHeight:0.9, letterSpacing:"-0.02em", marginBottom:10,
                  transition:"color 0.3s",
                }}>{s.value}</div>
                <div style={{
                  fontFamily:"var(--font-mono)", fontSize:"clamp(8px,0.8vw,10px)",
                  fontWeight:700, letterSpacing:"0.2em",
                  color: hoveredStat === i ? "var(--clr-accent)" : "var(--clr-text-muted)",
                  textTransform:"uppercase", lineHeight:1.6, transition:"color 0.3s",
                }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div ref={quoteRef} style={{
          background:"var(--clr-surface)",
          padding:"clamp(40px,6vw,80px) clamp(24px,6vw,72px)",
          position:"relative", overflow:"hidden",
          borderTop:"1px solid rgba(57,255,106,0.08)",
        }}>
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            backgroundImage:"linear-gradient(rgba(57,255,106,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,106,0.025) 1px,transparent 1px)",
            backgroundSize:"48px 48px",
          }} />

          <div style={{
            position:"absolute", top:0, left:0, right:0, height:1,
            background:"linear-gradient(90deg,transparent,rgba(57,255,106,0.35),transparent)",
            zIndex:1,
          }} />

          <div className="about-quote-inner" style={{ position:"relative", zIndex:2 }}>
            <div className="about-quote-left">
              <p style={{
                fontFamily:"var(--font-sans)", fontWeight:800,
                fontSize:"clamp(1.6rem,3.5vw,3rem)",
                color:"var(--clr-text-primary)",
                letterSpacing:"-0.01em", lineHeight:1.1, margin:0,
              }}>
                AVAILABLE FOR FULL-TIME<br />
                <span style={{ color:"var(--clr-accent)" }}>ROLES, FREELANCE & COLLABS.</span>
              </p>

              <div className="cta-btn-row">
                <motion.button
                  onClick={handleGetInTouch}
                  className="about-cta"
                  style={{
                    display:"inline-flex", alignItems:"center", gap:10,
                    padding:"clamp(11px,1.4vw,13px) clamp(22px,2.5vw,30px)",
                    borderRadius:0,
                    background: inlineOpen ? "transparent" : "var(--clr-accent)",
                    border:"1px solid var(--clr-accent)",
                    color: inlineOpen ? "var(--clr-accent)" : "#050a05",
                    fontFamily:"var(--font-mono)", fontSize:"clamp(11px,1vw,13px)",
                    fontWeight:700, letterSpacing:".1em", textTransform:"uppercase",
                    cursor:"pointer", flexShrink:0,
                    transition:"background 0.3s, color 0.3s",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onMouseMove={handleMagnet}
                  onMouseLeave={resetMagnet}
                >
                  <span style={{ width:5, height:5, borderRadius:"50%", background:"currentColor" }} />
                  {inlineOpen ? "Close" : "Get in touch"}
                  <span style={{ width:5, height:5, borderRadius:"50%", background:"currentColor" }} />
                </motion.button>

                <motion.button
                  onClick={handleDownloadCV}
                  onMouseEnter={() => setCvHovered(true)}
                  onMouseLeave={() => setCvHovered(false)}
                  style={{
                    display:"inline-flex", alignItems:"center", gap:9,
                    padding:"clamp(11px,1.4vw,13px) clamp(18px,2vw,26px)",
                    borderRadius:0,
                    background: cvHovered ? "rgba(57,255,106,0.06)" : "transparent",
                    border:`1px solid ${cvHovered ? "rgba(57,255,106,0.5)" : "rgba(57,255,106,0.2)"}`,
                    color: cvHovered ? "var(--clr-accent)" : "var(--clr-text-secondary)",
                    fontFamily:"var(--font-mono)", fontSize:"clamp(11px,1vw,13px)",
                    fontWeight:700, letterSpacing:".1em", textTransform:"uppercase",
                    cursor:"pointer", flexShrink:0,
                    transition:"background 0.3s, border-color 0.3s, color 0.3s",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className={cvDownloading ? "cv-dl-icon" : ""} style={{ display:"flex", alignItems:"center", color:"inherit" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v13M5 14l7 7 7-7"/><path d="M3 21h18"/>
                    </svg>
                  </span>
                  {cvDownloading ? "Downloading…" : "⤓ CV"}
                </motion.button>
              </div>
            </div>

            <div className="about-quote-right">
              <AnimatePresence>
                {inlineOpen && CONTACTS.map((c, i) => (
                  <InlineContactCard key={c.id} c={c} index={i} visible={inlineOpen} />
                ))}
              </AnimatePresence>
              {!inlineOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ display:"flex", alignItems:"center", gap:12, opacity:0.15 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      flex:1, height:90,
                      border:"1px dashed rgba(57,255,106,0.2)",
                      background:"rgba(57,255,106,0.02)",
                    }} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <ContactPopup open={contactOpen} onClose={() => setContactOpen(false)} />
      </section>
    </>
  );
}
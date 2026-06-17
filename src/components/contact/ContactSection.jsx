// src/components/contact/ContactSection.jsx
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ContactPopup from "./ContactPopup";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  ["GitHub", "https://github.com/MAKE-star"],
  ["LinkedIn", "https://www.linkedin.com/in/mayopo-adeoye/"],
  ["Email", "mailto:adeoyemayopoelijah@gmail.com"],
];

// ── Download CV icon ──────────────────────────────────────────────────────────
const DownloadIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v13M5 14l7 7 7-7" />
    <path d="M3 21h18" />
  </svg>
);

export function ContactSection() {
  const secRef = useRef();
  const hRef = useRef();
  const glowRef = useRef();
  const [ctaHover, setCtaHover] = useState(false);
  const [cvHovered, setCvHovered] = useState(false);
  const [cvDownloading, setCvDownloading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [popupOpen, setPopupOpen] = useState(false);

  // Magnetic CTA
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 180, damping: 18 });
  const springY = useSpring(my, { stiffness: 180, damping: 18 });

  // Magnetic CV button (separate spring)
  const cvMx = useMotionValue(0);
  const cvMy = useMotionValue(0);
  const cvSpringX = useSpring(cvMx, { stiffness: 180, damping: 18 });
  const cvSpringY = useSpring(cvMy, { stiffness: 180, damping: 18 });

  // ── Download CV handler ───────────────────────────────────────────────────
  const handleDownloadCV = () => {
    setCvDownloading(true);
    const link = document.createElement("a");
    link.href = "/Mayopo.pdf";
    link.download = "Mayopo_Adeoye_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setCvDownloading(false), 1800);
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      const rect = secRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    secRef.current?.addEventListener("mousemove", onMouseMove);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-label",
        { opacity: 0, y: -16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: secRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        hRef.current,
        { scale: 0.65, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: secRef.current,
            start: "top 70%",
            end: "top 20%",
            scrub: 1.4,
          },
        },
      );
      gsap.to(glowRef.current, {
        scale: 1.3,
        opacity: 0.5,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.fromTo(
        ".contact-cta-group",
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: secRef.current,
            start: "top 55%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".contact-social-link",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-socials",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".contact-footer-text",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact-footer",
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        },
      );
      gsap.fromTo(
        ".contact-word",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: hRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, secRef);

    return () => {
      ctx.revert();
      secRef.current?.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const handleMagnet = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const resetMagnet = () => {
    mx.set(0);
    my.set(0);
  };

  const handleCvMagnet = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    cvMx.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    cvMy.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const resetCvMagnet = () => {
    cvMx.set(0);
    cvMy.set(0);
  };

  return (
    <>
      <style>{`
        @keyframes cv-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(3px)} }
        .cv-dl-icon { animation: cv-bounce 0.9s ease-in-out infinite; }

        /* CTA button group: side by side, wraps on small screens */
        .contact-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 56px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 480px) {
          .contact-cta-group { flex-direction: column; gap: 12px; }
        }
      `}</style>

      <section
        id="contact"
        ref={secRef}
        style={{
          minHeight: "100vh",
          background: "#050a05", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(80px,12vh,130px) clamp(24px,6vw,72px)",
          position: "relative",
          textAlign: "center",
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
            background: "rgba(57,255,106,0.08)", 
          }}
        />

        {/* Mouse-tracking ambient glow */}
        <div
          style={{
            position: "absolute",
            top: mousePos.y - 300,
            left: mousePos.x - 300,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(57,255,106,0.06) 0%,transparent 65%)", 
            pointerEvents: "none",
            transition: "top 0.8s ease, left 0.8s ease",
          }}
        />

        {/* Static pulsing glow */}
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(57,255,106,0.04) 0%,transparent 60%)", 
            pointerEvents: "none",
          }}
        />

        {/* Decorative rings */}
        {[300, 500, 700].map((size, i) => (
          <motion.div
            key={size}
            animate={{ scale: [1, 1.05, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: size,
              height: size,
              borderRadius: "50%",
              border: "1px solid rgba(57,255,106,0.08)", 
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Section label */}
        <div
          className="contact-label"
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 10,
            letterSpacing: "0.4em",
            color: "rgba(57,255,106,0.45)", 
            marginBottom: 48,
            position: "relative",
            zIndex: 1,
          }}
        >
          05 / Contact
        </div>

        {/* Main heading */}
        <div
          ref={hRef}
          style={{
            marginBottom: 40,
            willChange: "transform,opacity",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontSize: "clamp(3.5rem,9vw,8rem)",
              color: "#f5f0e4",
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: 32,
              overflow: "hidden",
            }}
          >
            {["Let's", "build", "something"].map((word, wi) => (
              <span key={wi} style={{ display: "block", overflow: "hidden" }}>
                <span
                  className="contact-word"
                  style={{ display: "inline-block" }}
                >
                  {wi === 2 ? <>{word} </> : word}
                </span>
              </span>
            ))}
            <span style={{ display: "block", overflow: "hidden" }}>
              <span
                className="contact-word"
                style={{
                  display: "inline-block",
                  color: "#39ff6a", 
                  fontStyle: "italic",
                }}
              >
                great.
              </span>
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 16,
              color: "rgba(245,240,228,0.45)",
              maxWidth: 440,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Have a project in mind? Looking for a collaborator? My inbox is
            always open.
          </motion.p>
        </div>

        {/* ── CTA BUTTON GROUP ── */}
        <div className="contact-cta-group">
          {/* Get in touch */}
          <motion.button
            type="button"
            onClick={() => setPopupOpen(true)}
            onMouseMove={handleMagnet}
            onMouseLeave={() => {
              resetMagnet();
              setCtaHover(false);
            }}
            onMouseEnter={() => setCtaHover(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 40px",
              borderRadius: 100,
              background: ctaHover ? "rgba(57,255,106,0.85)" : "#39ff6a", 
              border: "1px solid #39ff6a",
              color: "#050a05", 
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: ".02em",
              cursor: "pointer",
              x: springX,
              y: springY,
              position: "relative",
              overflow: "hidden",
              transition: "background 0.3s",
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* Shimmer sweep */}
            <motion.div
              animate={ctaHover ? { x: ["-100%", "200%"] } : { x: "-100%" }}
              transition={{ duration: 0.6, ease: "linear" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "50%",
                height: "100%",
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#050a05",
                flexShrink: 0,
              }}
            />
            Get in touch
            <motion.span
              animate={{ rotate: ctaHover ? 360 : 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#050a05",
                flexShrink: 0,
                display: "block",
              }}
            />
          </motion.button>

          {/* ── Download CV ── */}
          <motion.button
            type="button"
            onClick={handleDownloadCV}
            onMouseEnter={() => setCvHovered(true)}
            onMouseLeave={() => {
              setCvHovered(false);
              resetCvMagnet();
            }}
            onMouseMove={handleCvMagnet}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "16px 32px",
              borderRadius: 100,
              background: cvHovered ? "rgba(57,255,106,0.1)" : "transparent",
              border: `1px solid rgba(57,255,106,${cvHovered ? "0.7" : "0.3"})`, 
              color: cvHovered ? "#39ff6a" : "rgba(245,240,228,0.65)",
              fontFamily: "'Cabinet Grotesk',sans-serif",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: ".02em",
              cursor: "pointer",
              x: cvSpringX,
              y: cvSpringY,
              position: "relative",
              overflow: "hidden",
              transition: "background 0.3s, border-color 0.3s, color 0.3s",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span
              className={cvDownloading ? "cv-dl-icon" : ""}
              style={{
                display: "flex",
                alignItems: "center",
                color: "inherit",
              }}
            >
              <DownloadIcon />
            </span>
            {cvDownloading ? "Downloading…" : "Download CV"}
          </motion.button>
        </div>

        {/* Social links */}
        <div
          className="contact-socials"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(24px,5vw,56px)",
            marginBottom: 80,
            position: "relative",
            zIndex: 1,
          }}
        >
          {socialLinks.map(([l, h]) => (
            <SocialLink key={l} label={l} href={h} />
          ))}
        </div>

        {/* Footer */}
        <div
          className="contact-footer"
          style={{
            position: "absolute",
            bottom: 28,
            left: "clamp(24px,6vw,72px)",
            right: "clamp(24px,6vw,72px)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {[
            "© 2026 MAYOPO ADEOYE",
            "BUILT WITH REACT + GSAP + THREE.JS",
            "LAGOS, NIGERIA",
          ].map((t) => (
            <span
              key={t}
              className="contact-footer-text"
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "clamp(8px,1.5vw,10px)",
                color: "rgba(57,255,106,0.2)", 
                letterSpacing: "0.3em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {popupOpen && (
          <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function SocialLink({ label, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-social-link"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Space Mono',monospace",
        fontSize: "clamp(13px,1.8vw,15px)",
        color: hovered ? "#39ff6a" : "rgba(245,240,228,0.55)", 
        letterSpacing: "0.22em",
        textDecoration: "none",
        transition: "color 0.25s",
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        position: "relative",
        padding: "4px 0",
      }}
    >
      <motion.span
        animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
        transition={{ duration: 0.25 }}
        style={{ fontSize: "clamp(13px,1.8vw,15px)" }}
      >
        ↗
      </motion.span>
      {label.toUpperCase()}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 1,
          width: hovered ? "100%" : "0%",
          background: "#39ff6a", 
          transition: "width 0.3s ease",
        }}
      />
    </motion.a>
  );
}

export default ContactSection;
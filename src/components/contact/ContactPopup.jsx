// src/components/contact/ContactPopup.jsx
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONTACTS = [
  {
    id: "email",
    label: "Send an Email",
    sub: "jamesasuelimen77@gmail.com",
    href: "mailto:jamesasuelimen77@gmail.com",
    accent: "#a8c060",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp Me",
    sub: "+234 814 218 6524",
    href: "https://wa.me/2348142186524",
    accent: "#25d366",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: "call",
    label: "Direct Call",
    sub: "+234 814 218 6524",
    href: "tel:+2348142186524",
    accent: "#d4a843",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
      </svg>
    ),
  },
];

export default function ContactPopup({ open, onClose }) {
  // close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(10,15,5,0.82)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 900,
              cursor: "pointer",
            }}
          />

          {/* ── Panel wrapper — flex-centered on desktop, bottom-anchored on mobile ── */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 901,
              display: "flex",
              alignItems: "center" /* vertically center on desktop */,
              justifyContent: "center",
              pointerEvents: "none",
              /* On mobile screens the panel sticks to bottom */
              /* We override this via a <style> tag below */
            }}
          >
            {/* Inject one-off responsive rule without needing a CSS file */}
            <style>{`
              @media (max-width: 639px) {
                .cp-wrapper {
                  align-items: flex-end !important;
                }
                .cp-panel {
                  border-radius: 20px 20px 0 0 !important;
                  border-bottom: none !important;
                  max-width: 100% !important;
                  width: 100% !important;
                }
              }
              @media (min-width: 640px) {
                .cp-panel {
                  border-radius: 20px !important;
                }
              }
            `}</style>

            <motion.div
              className="cp-wrapper"
              key="panel-outer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              <motion.div
                className="cp-panel"
                key="panel"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  pointerEvents: "auto",
                  width: "100%",
                  maxWidth: 480,
                  background: "#1c2410",
                  /* border applies on desktop; mobile overrides border-bottom via CSS */
                  border: "1px solid rgba(168,192,96,0.2)",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow:
                    "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(168,192,96,0.08)",
                  /* margin so it doesn't hug screen edges on mid-size screens */
                  margin: "0 16px",
                }}
              >
                {/* African pattern strip */}
                <svg
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    height: 48,
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                  viewBox="0 0 520 48"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline
                    points="0,8 17,2 34,8 51,2 68,8 85,2 102,8 119,2 136,8 153,2 170,8 187,2 204,8 221,2 238,8 255,2 272,8 289,2 306,8 323,2 340,8 357,2 374,8 391,2 408,8 425,2 442,8 459,2 476,8 493,2 510,8 520,6"
                    stroke="#a8c060"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.18"
                  />
                  <line
                    x1="0"
                    y1="16"
                    x2="520"
                    y2="16"
                    stroke="#d4a843"
                    strokeWidth="0.6"
                    opacity="0.12"
                  />
                </svg>

                {/* Header */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "28px 28px 0",
                  }}
                >
                  {/* Drag handle — shown on mobile only via CSS */}
                  <div
                    style={{
                      width: 36,
                      height: 4,
                      borderRadius: 2,
                      background: "rgba(168,192,96,0.25)",
                      margin: "0 auto 20px",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "'Space Mono',monospace",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.3em",
                          color: "rgba(168,192,96,0.6)",
                          margin: "0 0 6px",
                          textTransform: "uppercase",
                        }}
                      >
                        Let's connect
                      </p>
                      <h3
                        style={{
                          fontFamily: "'Bebas Neue',sans-serif",
                          fontSize: "clamp(1.6rem,5vw,2.2rem)",
                          color: "#f5f0e4",
                          letterSpacing: "0.04em",
                          lineHeight: 1,
                          margin: 0,
                        }}
                      >
                        GET IN TOUCH
                      </h3>
                    </div>

                    {/* Close button */}
                    <button
                      onClick={onClose}
                      style={{
                        background: "rgba(245,240,228,0.06)",
                        border: "1px solid rgba(245,240,228,0.12)",
                        borderRadius: "50%",
                        width: 36,
                        height: 36,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "rgba(245,240,228,0.5)",
                        flexShrink: 0,
                        transition: "background 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(245,240,228,0.12)";
                        e.currentTarget.style.color = "#f5f0e4";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(245,240,228,0.06)";
                        e.currentTarget.style.color = "rgba(245,240,228,0.5)";
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: 14,
                      color: "rgba(245,240,228,0.45)",
                      margin: "10px 0 24px",
                      lineHeight: 1.6,
                    }}
                  >
                    Pick your preferred channel — I'll respond within 24 hours.
                  </p>

                  <div
                    style={{
                      height: 1,
                      background: "rgba(168,192,96,0.1)",
                      marginBottom: 20,
                    }}
                  />
                </div>

                {/* Contact options */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "0 20px 28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {CONTACTS.map((c, i) => (
                    <motion.a
                      key={c.id}
                      href={c.href}
                      target={c.id === "email" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.15 + i * 0.07,
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "16px 20px",
                        background: "rgba(245,240,228,0.04)",
                        border: `1px solid rgba(245,240,228,0.08)`,
                        borderLeft: `3px solid ${c.accent}`,
                        borderRadius: 12,
                        textDecoration: "none",
                        transition: "background 0.2s, transform 0.2s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${c.accent}12`;
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(245,240,228,0.04)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      {/* Icon circle */}
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: `${c.accent}18`,
                          border: `1px solid ${c.accent}33`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: c.accent,
                          flexShrink: 0,
                        }}
                      >
                        {c.icon}
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 15,
                            fontWeight: 800,
                            color: "#f5f0e4",
                            lineHeight: 1.2,
                            marginBottom: 3,
                          }}
                        >
                          {c.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Space Mono',monospace",
                            fontSize: 11,
                            color: "rgba(245,240,228,0.4)",
                            letterSpacing: "0.05em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {c.sub}
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={c.accent}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, opacity: 0.7 }}
                      >
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </motion.a>
                  ))}
                </div>

                {/* Footer note */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "0 28px 28px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: 10,
                      color: "rgba(245,240,228,0.2)",
                      letterSpacing: "0.2em",
                    }}
                  >
                    © 2026 JAMES OLUWALEKE
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

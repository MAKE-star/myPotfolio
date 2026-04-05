// src/components/projects/ProjectsSection.jsx
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { projects, getAccent } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger);

// ─── Stack chip colour map ────────────────────────────────────────────────────
const STACK_COLORS = {
  react: { bg: "#0ea5e920", border: "#0ea5e9", text: "#0ea5e9" },
  next: { bg: "#ffffff15", border: "#e2e8f0", text: "#94a3b8" },
  typescript: { bg: "#3178c620", border: "#3178c6", text: "#3178c6" },
  javascript: { bg: "#f7df1e20", border: "#f7df1e", text: "#b8a900" },
  tailwind: { bg: "#06b6d420", border: "#06b6d4", text: "#06b6d4" },
  mui: { bg: "#0081cb20", border: "#0081cb", text: "#0081cb" },
  java: { bg: "#f8961e20", border: "#f8961e", text: "#f8961e" },
  spring: { bg: "#6db33f20", border: "#6db33f", text: "#6db33f" },
  node: { bg: "#68a06320", border: "#68a063", text: "#68a063" },
  chrome: { bg: "#ea433520", border: "#ea4335", text: "#ea4335" },
};

function getStackChipStyle(token) {
  const t = token.toLowerCase();
  if (t.includes("react")) return STACK_COLORS.react;
  if (t.includes("next")) return STACK_COLORS.next;
  if (t.includes("typescript") || t === "tsx") return STACK_COLORS.typescript;
  if (t.includes("javascript")) return STACK_COLORS.javascript;
  if (t.includes("tailwind")) return STACK_COLORS.tailwind;
  if (t.includes("mui")) return STACK_COLORS.mui;
  if (t.includes("java spring") || t.includes("spring"))
    return STACK_COLORS.spring;
  if (t === "java") return STACK_COLORS.java;
  if (t.includes("node")) return STACK_COLORS.node;
  if (t.includes("chrome")) return STACK_COLORS.chrome;
  return {
    bg: "rgba(42,48,24,0.08)",
    border: "rgba(42,48,24,0.25)",
    text: "#2a3018",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Terminal
// ─────────────────────────────────────────────────────────────────────────────
const BOOT_LINES = [
  "$ initializing portfolio.sh v2.0.4...",
  "$ loading project registry... [OK]",
  "$ mounting asset pipeline... [OK]",
  '$ type "help" for available commands.',
  "",
];

const HELP_OUTPUT = [
  "  available commands:",
  "  ─────────────────────────────────────────",
  "  list              list all projects",
  "  open <id>         view project details",
  "  clear             clear terminal",
  "  help              show this message",
];

function terminalListOutput(arr) {
  const lines = ["  projects:", "  ─────────────────────────────────────────"];
  arr.forEach((p) =>
    lines.push(
      `  [${String(p.id).padStart(2, "0")}]  ${p.title.padEnd(28, " ")}  ${p.stack || ""}`,
    ),
  );
  return lines;
}

function terminalDetailOutput(p) {
  if (!p) return ["  error: project not found. try: open 01", ""];
  return [
    `  ┌──────────────────────────────────────────┐`,
    `  │  ${p.title}`,
    `  └──────────────────────────────────────────┘`,
    `  client   ${p.client || "—"}`,
    `  role     ${p.role || "—"}`,
    `  year     ${p.year || "—"}`,
    `  stack    ${p.stack || "—"}`,
    `  status   ${p.status === "live" ? "live ↗  " + (p.url || "") : "in development"}`,
    ``,
    `  ${p.description || "No description available."}`,
    ``,
    ...(p.githubUrl ? [`  github   ${p.githubUrl}`] : []),
    ``,
  ];
}

function useTypewriter(lines, delayBetween = 18, onDone) {
  const [output, setOutput] = useState([]);
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    setOutput([]);
    let lineIdx = 0,
      charIdx = 0,
      timer;
    function tick() {
      if (!isMounted.current) return;
      if (lineIdx >= lines.length) {
        onDone?.();
        return;
      }
      const line = lines[lineIdx];
      if (charIdx <= line.length) {
        setOutput((prev) => {
          const n = [...prev];
          n[lineIdx] = line.slice(0, charIdx);
          return n;
        });
        charIdx++;
        timer = setTimeout(tick, delayBetween);
      } else {
        lineIdx++;
        charIdx = 0;
        timer = setTimeout(tick, 60);
      }
    }
    timer = setTimeout(tick, 200);
    return () => {
      isMounted.current = false;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("|")]);
  return output;
}

function TerminalLine({ text, isNew, accent }) {
  const isCommand = text?.startsWith("$ ");
  const isPrompt = text?.startsWith("> ");
  const color = isCommand
    ? "#a8c060"
    : isPrompt
      ? accent || "#a8c060"
      : "rgba(245,240,228,0.8)";
  return (
    <div
      style={{
        fontFamily: "'Space Mono',monospace",
        fontSize: "clamp(11px,2.5vw,13px)",
        lineHeight: 1.75,
        color,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        fontWeight: isCommand || isPrompt ? 700 : 500,
        animation: isNew ? "termFadeIn 0.15s ease" : "none",
      }}
    >
      {text}
    </div>
  );
}

function Terminal() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [bootDone, setBootDone] = useState(false);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const bottomRef = useRef();
  const inputRef = useRef();
  const terminalBodyRef = useRef();
  const bootLines = useTypewriter(BOOT_LINES, 12, () => setBootDone(true));

  const historyLenRef = useRef(0);
  useEffect(() => {
    if (history.length > historyLenRef.current) {
      historyLenRef.current = history.length;
      if (terminalBodyRef.current)
        terminalBodyRef.current.scrollTop =
          terminalBodyRef.current.scrollHeight;
    }
  }, [history]);
  useEffect(() => {
    if (bootLines.length > 0 && terminalBodyRef.current)
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
  }, [bootLines]);
  useEffect(() => {
    if (bootDone) inputRef.current?.focus();
  }, [bootDone]);

  const pushLines = useCallback((lines) => {
    setHistory((prev) => [
      ...prev,
      ...lines.map((text) => ({ text, isNew: true })),
    ]);
  }, []);

  const runCommand = useCallback(
    (raw) => {
      const cmd = raw.trim().toLowerCase();
      pushLines([`> ${raw.trim()}`]);
      setCmdHistory((h) => [raw.trim(), ...h]);
      setCmdIdx(-1);
      if (!cmd) {
        pushLines([""]);
        return;
      }
      if (cmd === "clear") {
        setHistory([]);
        return;
      }
      if (cmd === "help") {
        pushLines(HELP_OUTPUT);
        return;
      }
      if (cmd === "list") {
        pushLines(terminalListOutput(projects));
        return;
      }
      if (cmd.startsWith("open ")) {
        const idArg = cmd.slice(5).trim().replace(/^0+/, "") || "0";
        pushLines(
          terminalDetailOutput(projects.find((x) => String(x.id) === idArg)),
        );
        return;
      }
      pushLines([
        `  command not found: ${raw.trim()}`,
        `  try "help" to see available commands.`,
        "",
      ]);
    },
    [pushLines],
  );

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(n);
      setInput(cmdHistory[n] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = Math.max(cmdIdx - 1, -1);
      setCmdIdx(n);
      setInput(n === -1 ? "" : cmdHistory[n] || "");
    }
  };

  return (
    <div
      style={{
        background: "#1a1f0e",
        minHeight: "clamp(380px,45vh,600px)",
        padding: "clamp(14px,2.5vw,28px) clamp(16px,3vw,36px)",
        fontFamily: "'Space Mono',monospace",
        display: "flex",
        flexDirection: "column",
        cursor: "text",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={terminalBodyRef} style={{ flex: 1, overflow: "auto" }}>
        {bootLines.map((line, i) => (
          <TerminalLine key={`boot-${i}`} text={line} />
        ))}
        {bootDone &&
          history.map((h, i) => (
            <TerminalLine key={`h-${i}`} text={h.text} isNew={h.isNew} />
          ))}
        {bootDone && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 4,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "clamp(11px,2.5vw,13px)",
                color: "#a8c060",
                flexShrink: 0,
                fontWeight: 700,
              }}
            >
              &gt;
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "'Space Mono',monospace",
                fontSize: "clamp(11px,2.5vw,13px)",
                color: "rgba(245,240,228,0.9)",
                fontWeight: 600,
                flex: 1,
                caretColor: "#a8c060",
                minWidth: 0,
              }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
            />
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <style>{`@keyframes termFadeIn { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Animated side graphic
// ─────────────────────────────────────────────────────────────────────────────
function ProjectSideGraphic({ accent, index, open }) {
  const rings = [84, 60, 36];
  return (
    <div
      style={{
        position: "relative",
        width: "clamp(60px,8vw,100px)",
        height: "clamp(60px,8vw,100px)",
        flexShrink: 0,
      }}
    >
      {rings.map((size, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${size * 0.75}px`,
            height: `${size * 0.75}px`,
            borderRadius: "50%",
            border: `1px solid ${accent}${open ? "55" : "22"}`,
            transform: "translate(-50%,-50%)",
            transition: `border-color 0.4s ease ${i * 0.06}s`,
            animation: open
              ? `ringPulse${i} 2.4s ease-in-out ${i * 0.3}s infinite`
              : "none",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: accent,
          transform: "translate(-50%,-50%)",
          opacity: open ? 1 : 0.3,
          boxShadow: open ? `0 0 12px ${accent}` : "none",
          transition: "opacity 0.3s, box-shadow 0.3s",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: -18,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Space Mono',monospace",
          fontSize: "clamp(7px,1.2vw,8px)",
          fontWeight: 700,
          letterSpacing: "0.3em",
          color: `${accent}88`,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Meta label + value
// ─────────────────────────────────────────────────────────────────────────────
function MetaItem({ label, value, accent }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <span
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: "clamp(8px,1.2vw,9px)",
          fontWeight: 700,
          letterSpacing: "0.28em",
          color: accent,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "clamp(13px,1.5vw,15px)",
          fontWeight: 800,
          color: "#1c2410",
          lineHeight: 1.4,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT ROW
// ─────────────────────────────────────────────────────────────────────────────
function ProjectRow({ project, index, open = false, onToggle = () => {} }) {
  const expandRef = useRef();
  const accent = getAccent(project.id);

  const stackTokens = (project.stack || "")
    .split(/[·,]/)
    .map((s) => s.trim())
    .filter(Boolean);

  useEffect(() => {
    const el = expandRef.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.45, ease: "power3.inOut" },
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.inOut",
      });
    }
  }, [open]);

  return (
    <div style={{ borderBottom: "1px solid rgba(42,48,24,0.1)" }}>
      {/* ── INDEX ROW ── */}
      <div
        onClick={onToggle}
        className="proj-row-header"
        style={{
          display: "grid",
          gridTemplateColumns: "clamp(40px,5vw,80px) 1fr auto",
          alignItems: "center",
          padding: "clamp(16px,2.5vw,28px) clamp(16px,5vw,64px)",
          gap: "clamp(10px,2vw,16px)",
          background: open ? "#ede8d6" : "#f5f0e4",
          transition: "background 0.25s",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(1.6rem,4vw,3rem)",
            color: open ? accent : "rgba(42,48,24,0.18)",
            lineHeight: 1,
            transition: "color 0.3s",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <div
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(1.2rem,3.5vw,2.8rem)",
              color: "#1c2410",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "clamp(11px,1.2vw,12px)",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "rgba(42,48,24,0.65)",
              marginTop: 5,
            }}
          >
            {project.role?.toUpperCase() || "ENGINEER"}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "clamp(10px,2vw,20px)",
          }}
        >
          <div
            className="proj-row-tags"
            style={{
              display: "flex",
              gap: 7,
              flexWrap: "wrap",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.3s, transform 0.3s",
            }}
          >
            {(project.tags || []).slice(0, 2).map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "clamp(8px,1.1vw,10px)",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: accent,
                  padding: "4px 12px",
                  border: `1px solid ${accent}55`,
                  borderRadius: 100,
                  whiteSpace: "nowrap",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "clamp(12px,1.2vw,13px)",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "rgba(42,48,24,0.7)",
              }}
            >
              {project.year || "—"}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 5,
                marginTop: 4,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: project.status === "live" ? "#10b981" : accent,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "clamp(7px,1vw,8px)",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "rgba(42,48,24,0.45)",
                }}
              >
                {project.status === "live" ? "LIVE" : "IN DEV"}
              </span>
            </div>
          </div>
          <ProjectSideGraphic accent={accent} index={index} open={open} />
        </div>
      </div>

      {/* ── EXPAND PANEL ── */}
      <div
        ref={expandRef}
        style={{
          height: 0,
          overflow: "hidden",
          background: "#ede8d6",
          borderTop: open ? `1px solid ${accent}22` : "none",
        }}
      >
        {/* 
            NEW LAYOUT: 3 columns
            [image] | [description + meta] | [stack chips + tags + links]
          */}
        <div
          className="prow-expand-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "clamp(160px,22vw,300px) 1fr clamp(180px,24vw,320px)",
            gap: "clamp(16px,3vw,40px)",
            padding: "clamp(16px,3vw,40px) clamp(16px,5vw,64px)",
            alignItems: "start",
          }}
        >
          {/* ── COL 1: Image ── */}
          <div
            style={{
              borderRadius: 8,
              overflow: "hidden",
              aspectRatio: "16/9",
              background: project.color || "#1c2410",
              position: "relative",
            }}
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(145deg,${project.color || "#1c2410"},#0a0f05)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(245,240,228,0.2)",
                    letterSpacing: "0.3em",
                  }}
                >
                  NO IMAGE
                </span>
              </div>
            )}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg,transparent,${accent},transparent)`,
              }}
            />
          </div>

          {/* ── COL 2: Description + Meta ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              paddingTop: 4,
            }}
          >
            <div style={{ width: 32, height: 2, background: accent }} />

            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "clamp(13px,1.4vw,16px)",
                fontWeight: 700,
                color: "#2a3018",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {project.description ||
                "A production-grade application built with modern technologies."}
            </p>

            {/* meta grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px 16px",
                paddingTop: 4,
                borderTop: "1px solid rgba(42,48,24,0.08)",
              }}
            >
              <MetaItem label="Client" value={project.client} accent={accent} />
              <MetaItem label="Role" value={project.role} accent={accent} />
              <MetaItem label="Year" value={project.year} accent={accent} />
            </div>

            {/* links */}
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                paddingTop: 4,
              }}
            >
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "clamp(9px,1.1vw,10px)",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "#1c2410",
                    padding: "9px 22px",
                    border: "1px solid rgba(42,48,24,0.35)",
                    borderRadius: 100,
                    textDecoration: "none",
                    transition: "background 0.2s,border-color 0.2s,color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = accent;
                    e.currentTarget.style.borderColor = accent;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(42,48,24,0.35)";
                    e.currentTarget.style.color = "#1c2410";
                  }}
                >
                  VISIT ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "clamp(9px,1.1vw,10px)",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "rgba(42,48,24,0.55)",
                    padding: "9px 22px",
                    border: "1px solid rgba(42,48,24,0.2)",
                    borderRadius: 100,
                    textDecoration: "none",
                    transition: "color 0.2s,border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#1c2410";
                    e.currentTarget.style.borderColor = "rgba(42,48,24,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(42,48,24,0.55)";
                    e.currentTarget.style.borderColor = "rgba(42,48,24,0.2)";
                  }}
                >
                  GITHUB ↗
                </a>
              )}
              {!project.url && !project.githubUrl && (
                <span
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "clamp(8px,1vw,9px)",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    color: "rgba(42,48,24,0.4)",
                  }}
                >
                  COMING SOON
                </span>
              )}
            </div>
          </div>

          {/* ── COL 3: Stack chips + Tags ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              paddingTop: 4,
              borderLeft: `1px solid rgba(42,48,24,0.08)`,
              paddingLeft: "clamp(16px,2.5vw,32px)",
            }}
          >
            {/* Stack label */}
            <div>
              <span
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "clamp(8px,1vw,9px)",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  color: accent,
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 10,
                }}
              >
                Tech Stack
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {stackTokens.map((t) => {
                  const s = getStackChipStyle(t);
                  return (
                    <span
                      key={t}
                      style={{
                        fontFamily: "'Space Mono',monospace",
                        fontSize: "clamp(9px,1.1vw,10px)",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: s.text,
                        padding: "6px 14px",
                        background: s.bg,
                        border: `1px solid ${s.border}`,
                        borderRadius: 100,
                      }}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Tags label */}
            {(project.tags || []).length > 0 && (
              <div>
                <span
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "clamp(8px,1vw,9px)",
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    color: "rgba(42,48,24,0.45)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 10,
                  }}
                >
                  Features
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {(project.tags || []).map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "'Space Mono',monospace",
                        fontSize: "clamp(9px,1.1vw,10px)",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: "#2a3018",
                        padding: "5px 13px",
                        border: "1px solid rgba(42,48,24,0.3)",
                        borderRadius: 100,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Status badge */}
            <div style={{ marginTop: "auto", paddingTop: 8 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: 100,
                  background:
                    project.status === "live"
                      ? "rgba(16,185,129,0.1)"
                      : `${accent}12`,
                  border: `1px solid ${project.status === "live" ? "rgba(16,185,129,0.3)" : accent + "33"}`,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: project.status === "live" ? "#10b981" : accent,
                    display: "inline-block",
                    boxShadow: `0 0 6px ${project.status === "live" ? "#10b981" : accent}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "clamp(8px,1vw,9px)",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: project.status === "live" ? "#10b981" : accent,
                  }}
                >
                  {project.status === "live"
                    ? "LIVE IN PRODUCTION"
                    : "IN DEVELOPMENT"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
          @keyframes ringPulse0 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.08)} }
          @keyframes ringPulse1 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.12)} }
          @keyframes ringPulse2 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.16)} }
        `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE TOGGLE
// ─────────────────────────────────────────────────────────────────────────────
function ModeToggle({ mode, setMode }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 16,
        zIndex: 50,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <div
        style={{
          pointerEvents: "all",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(20,26,12,0.92)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(168,192,96,0.22)",
          borderRadius: 100,
          padding: "6px 6px 6px clamp(12px,3vw,20px)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(168,192,96,0.08) inset",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <span
          className="toggle-label"
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "clamp(8px,1.5vw,10px)",
            fontWeight: 700,
            letterSpacing: "0.28em",
            color: "rgba(168,192,96,0.45)",
            paddingRight: 10,
            borderRight: "1px solid rgba(168,192,96,0.15)",
            whiteSpace: "nowrap",
          }}
        >
          02 / PROJECTS
        </span>
        {["DEV", "VIEW"].map((m) => {
          const active = mode === m;
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "clamp(10px,1.5vw,11px)",
                fontWeight: active ? 800 : 600,
                letterSpacing: "0.22em",
                padding: "9px clamp(14px,2.5vw,26px)",
                borderRadius: 100,
                border: "none",
                cursor: "pointer",
                background: active ? "#a8c060" : "transparent",
                color: active ? "#1c2410" : "rgba(168,192,96,0.55)",
                transition: "background 0.2s,color 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {m}
            </button>
          );
        })}
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: mode === "DEV" ? "#a8c060" : "#10b981",
            display: "inline-block",
            marginLeft: 4,
            marginRight: 6,
            boxShadow: `0 0 7px ${mode === "DEV" ? "#a8c060" : "#10b981"}88`,
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [mode, setMode] = useState("VIEW");
  const [openId, setOpenId] = useState(null);
  const handleRowClick = (id) => setOpenId((prev) => (prev === id ? null : id));
  const secRef = useRef();
  const labelRef = useRef();
  const headingRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: secRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, { types: "lines" });
        gsap.fromTo(
          split.lines,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
      gsap.fromTo(
        ".proj-sec-sub",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: secRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mode === "VIEW")
      requestAnimationFrame(() =>
        requestAnimationFrame(() => ScrollTrigger.refresh()),
      );
  }, [mode]);

  return (
    <section
      id="projects"
      ref={secRef}
      style={{ background: "#f5f0e4", position: "relative" }}
    >
      <div style={{ height: 1, background: "rgba(42,48,24,0.1)" }} />

      {/* ── HEADER ── */}
      <div
        style={{
          padding:
            "clamp(40px,8vh,96px) clamp(20px,6vw,72px) clamp(28px,5vh,64px)",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "clamp(13px,1.8vw,15px)",
            fontWeight: 700,
            letterSpacing: "0.25em",
            color: "rgba(42,48,24,0.75)",
            display: "inline-block",
            marginBottom: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          02 / Projects
        </span>
        <div
          style={{ overflow: "hidden", marginBottom: 20, whiteSpace: "nowrap" }}
        >
          <h2
            ref={headingRef}
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(2.4rem,9vw,7rem)",
              color: "#1c2410",
              lineHeight: 0.95,
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            SELECTED <span style={{ color: "#4a6020" }}>WORK.</span>
          </h2>
        </div>
        <div
          className="proj-sec-sub"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "clamp(16px,3vw,24px)",
            paddingTop: "clamp(16px,3vw,24px)",
            borderTop: "1px solid rgba(42,48,24,0.1)",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "clamp(15px,1.6vw,17px)",
              fontWeight: 600,
              color: "rgba(42,48,24,0.85)",
              lineHeight: 1.75,
              maxWidth: 440,
              margin: 0,
            }}
          >
            End-to-end products built for real businesses — fintech platforms,
            browser tools, e-commerce ecosystems. Each one shipped and owned.
          </p>
        </div>
      </div>

      {/* MODE TOGGLE */}
      <ModeToggle mode={mode} setMode={setMode} />

      <div
        style={{ position: "relative", minHeight: mode === "DEV" ? "auto" : 0 }}
      >
        {/* DEV panel */}
        <div
          style={{
            opacity: mode === "DEV" ? 1 : 0,
            visibility: mode === "DEV" ? "visible" : "hidden",
            pointerEvents: mode === "DEV" ? "all" : "none",
            transition: "opacity 0.4s ease,visibility 0.4s ease",
            position: mode === "DEV" ? "relative" : "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: mode === "DEV" ? 1 : 0,
          }}
        >
          <div
            style={{
              background: "#0a0f05",
              padding: "clamp(24px,5vw,64px) clamp(16px,5vw,56px)",
            }}
          >
            <div
              style={{
                maxWidth: 860,
                margin: "0 auto",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.75),0 0 0 1px rgba(255,255,255,0.06)",
                background: "#1a1f0e",
              }}
            >
              <div
                style={{
                  background: "#252b18",
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                  gap: 8,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  position: "relative",
                }}
              >
                {["#ff5f57", "#ffbd2e", "#28c840"].map((c, i) => (
                  <span
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: c,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                ))}
                <span
                  className="term-title"
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "clamp(9px,1.3vw,11px)",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "rgba(168,192,96,0.45)",
                    whiteSpace: "nowrap",
                  }}
                >
                  king@portfolio — /projects
                </span>
              </div>
              <Terminal />
            </div>
          </div>
        </div>

        {/* VIEW panel */}
        <div
          style={{
            opacity: mode === "VIEW" ? 1 : 0,
            visibility: mode === "VIEW" ? "visible" : "hidden",
            pointerEvents: mode === "VIEW" ? "all" : "none",
            transition: "opacity 0.4s ease,visibility 0.4s ease",
            position: mode === "VIEW" ? "relative" : "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: mode === "VIEW" ? 1 : 0,
          }}
        >
          <div style={{ borderTop: "1px solid rgba(42,48,24,0.1)" }}>
            {projects.map((p, i) => (
              <ProjectRow
                key={p.id}
                project={p}
                index={i}
                open={openId === p.id}
                onToggle={() => handleRowClick(p.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM STRIP ── */}
      <div
        style={{
          background: "#1c2410",
          padding: "clamp(28px,6vw,80px) clamp(20px,6vw,72px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(20px,4vw,28px)",
          flexWrap: "wrap",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
          }}
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 680 240"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <style>{`
                @keyframes bs-march  { from{stroke-dashoffset:0} to{stroke-dashoffset:-80} }
                @keyframes bs-march2 { from{stroke-dashoffset:0} to{stroke-dashoffset:80}  }
                @keyframes bs-pulse  { 0%,100%{opacity:.03} 50%{opacity:.07} }
                @keyframes bs-pulse2 { 0%,100%{opacity:.02} 50%{opacity:.05} }
                @keyframes bs-pulse3 { 0%,100%{opacity:.025} 50%{opacity:.06} }
                .bm1{stroke-dasharray:40 40;animation:bs-march  7s linear infinite}
                .bm2{stroke-dasharray:40 40;animation:bs-march2 7s linear infinite}
                .bp1{animation:bs-pulse  6s ease-in-out infinite}
                .bp2{animation:bs-pulse2 8s ease-in-out infinite 2s}
                .bp3{animation:bs-pulse3 7s ease-in-out infinite 4s}
              `}</style>
          </defs>
          <g stroke="#a8c060" strokeWidth="0.35" fill="none" opacity="0.025">
            {[40, 80, 120, 160, 200].map((y) => (
              <line key={y} x1="0" y1={y} x2="680" y2={y} />
            ))}
            {[68, 136, 204, 272, 340, 408, 476, 544, 612].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="240" />
            ))}
          </g>
          <polyline
            className="bp1"
            points="0,8 17,2 34,8 51,2 68,8 85,2 102,8 119,2 136,8 153,2 170,8 187,2 204,8 221,2 238,8 255,2 272,8 289,2 306,8 323,2 340,8 357,2 374,8 391,2 408,8 425,2 442,8 459,2 476,8 493,2 510,8 527,2 544,8 561,2 578,8 595,2 612,8 629,2 646,8 663,2 680,8"
            stroke="#a8c060"
            strokeWidth="1.1"
            fill="none"
          />
          <polyline
            className="bp1"
            points="0,232 17,238 34,232 51,238 68,232 85,238 102,232 119,238 136,232 153,238 170,232 187,238 204,232 221,238 238,232 255,238 272,232 289,238 306,232 323,238 340,232 357,238 374,232 391,238 408,232 425,238 442,232 459,238 476,232 493,238 510,232 527,238 544,232 561,238 578,232 595,238 612,232 629,238 646,232 663,238 680,232"
            stroke="#a8c060"
            strokeWidth="1.1"
            fill="none"
          />
          <polyline
            className="bm1"
            points="0,120 28,100 56,120 84,100 112,120 140,100 168,120 196,100 224,120 252,100 280,120 308,100 336,120 364,100 392,120 420,100 448,120 476,100 504,120 532,100 560,120 588,100 616,120 644,100 672,120 680,120"
            stroke="#a8c060"
            strokeWidth="1.2"
            fill="none"
            opacity="0.18"
          />
          <polyline
            className="bm2"
            points="0,120 28,140 56,120 84,140 112,120 140,140 168,120 196,140 224,120 252,140 280,120 308,140 336,120 364,140 392,120 420,140 448,120 476,140 504,120 532,140 560,120 588,140 616,120 644,140 672,120 680,120"
            stroke="#d4a843"
            strokeWidth="1.2"
            fill="none"
            opacity="0.14"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(168,192,96,0.4),transparent)",
            zIndex: 1,
          }}
        />
        <p
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(1.3rem,4vw,3rem)",
            color: "#f5f0e4",
            letterSpacing: "0.04em",
            maxWidth: 700,
            lineHeight: 1.15,
            margin: 0,
            position: "relative",
            zIndex: 2,
          }}
        >
          MORE WORK AVAILABLE ON REQUEST.
        </p>
        <a
          href="https://github.com/jamesking77-create/"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "clamp(10px,1.5vw,12px) clamp(20px,3vw,28px)",
            borderRadius: 100,
            background: "#a8c060",
            border: "1px solid #a8c060",
            color: "#1c2410",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "clamp(12px,1.4vw,13px)",
            fontWeight: 800,
            letterSpacing: ".04em",
            textDecoration: "none",
            flexShrink: 0,
            whiteSpace: "nowrap",
            transition: "background 0.2s",
            position: "relative",
            zIndex: 2,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#bcd470")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#a8c060")}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#1c2410",
            }}
          />
          View GitHub
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#1c2410",
            }}
          />
        </a>
      </div>

      <style>{`
          @media (max-width: 768px) {
            .prow-expand-grid {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 520px) {
            .proj-row-tags { display: none !important; }
            .toggle-label { display: none !important; }
          }
          @media (max-width: 420px) {
            .term-title { display: none; }
          }
        `}</style>
    </section>
  );
}

export default ProjectsSection;

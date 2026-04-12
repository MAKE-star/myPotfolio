// src/components/stack/StackSection.jsx
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const ic = (path) => `${CDN}/${path}`;

// Custom SVG icons for tools not on devicon
const AnthropicIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-3.654 0H6.57L0 20h3.603l1.388-3.483h6.397L9.995 13.01H6.16l2.013-5.052 1.998 5.052h1.972L13.827 3.52z"
      fill="#c96442"
    />
  </svg>
);

const NetlifyIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.934 8.519a1.044 1.044 0 0 1 .303.23l2.349-1.045-2.192-2.193-.46 3.008zM7.656 11.796a1.06 1.06 0 0 1-.574-.748H3.716l3.345 3.345.595-2.597zm-.528-1.907a1.045 1.045 0 0 1 .545-.644l.215-2.78L5.578 8.28 7.128 9.89zm1.073-1.092c.224-.188.495-.308.784-.341l1.932-5.2H8.233L7.2 8.797zm7.054 8.507a2.21 2.21 0 0 0 .27-.27l-1.177-1.177-.148.838 1.055.609zm2.374-3.09a2.138 2.138 0 0 0-.42-.517l-.9 4.068 1.32-3.551zM12.082 3.01L10.33 7.716l2.117 2.117L14.54 8.75l-.91-5.74H12.07zm-.946 6.95L9.03 7.855a1.06 1.06 0 0 1-.59.456l-.217 2.806c.22.013.43.082.61.2l2.303-1.357zm.558.884l-2.33 1.373c.005.042.01.084.01.127 0 .306-.124.582-.324.782l1.21 3.26.93.537 1.957-5.272-.193-.194-.259-.192a1.044 1.044 0 0 1-1.001-.42zm-1.54 2.463a1.045 1.045 0 0 1-.77.332c-.053 0-.105-.004-.157-.012l-.58 2.534 1.765 1.766.923-.533-1.18-4.087zm4.21.5l-2.038 5.488 5.357-3.092.492-2.225-3.43-.172h-.38zm3.58.516l.306-1.385-2.23-1.287a1.06 1.06 0 0 1-.42.616l-.495 2.232 2.84.143v-.3zm-7.71-3.523a1.045 1.045 0 0 1-.158-.547l-2.295-2.295-1.61 1.61 2.43 2.43 1.632-.745v-.453zm9.944 3.988L16.442 9.252a1.044 1.044 0 0 1-.754.335c-.128 0-.25-.023-.363-.065l-2.102 1.24.196.196c.198.2.32.474.32.776 0 .043-.003.085-.008.127l2.23 1.286.006-.027 2.169 1.25zm1.336-.774l-.88-4.792-2.354 1.047c.006.06.01.12.01.18 0 .146-.03.285-.082.412l3.306 3.153zm-3.762-5.944l.467-3.056L14.814 3h-1.108l.92 5.82 1.222-.734zM21.74 15.6l-5.344 3.083-.592 2.678L24 17.018l-2.26-1.418zm-12.55 5.877l.663-2.898-1.773-1.773-4.89 2.823 5.318 2.082.682-.234zM3 10.05v3.847l1.992-1.993L3 10.05zm8.487 10.588l-.686.235-.037.162L12.59 22h1.21l-2.314-1.362zm9.082-11.053l.884 4.814.487-.28V10.05l-1.37 4.535zm-4.741 8.69l-5.403-3.117-1.63.745.195.674-1.03 4.5 3.444-1.985 4.424-1.816zm-9.647-8.218L4.827 8.703 3 10.05l3.181 3.832 2.37-1.083-.37-1.742z"
      fill="#00c7b7"
    />
  </svg>
);

const CloudflareIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.608 15.774l.055-.19-.808-.452h-9.04v2.592h9.79l-.003-.003c-.003.003.006-.034.006-.034v.003c.195-.63.195-1.28 0-1.916zm1.543-3.577c-.217-.748-.748-1.373-1.468-1.714l-.13-.063-.033-.136C16.2 8.563 14.677 7.5 12.948 7.5c-1.214 0-2.337.554-3.091 1.52l-.087.11H9.6c-1.555 0-2.82 1.265-2.82 2.82v.007c0 .04.002.08.004.12l.01.175-.173.02c-.97.112-1.71.93-1.71 1.91 0 1.065.863 1.93 1.928 1.93h11.22c.936 0 1.76-.591 2.054-1.47l.005-.014c.19-.574.18-1.196-.02-1.76l.053.02z"
      fill="#F6821F"
    />
    <path
      d="M17.563 13.572l-.146-.017c-.023 0-.046-.003-.07-.003-.028 0-.056.003-.084.006l-.025.003c-.24.026-.462.12-.655.266-.023.018-.046.035-.067.054-.017.015-.034.03-.05.046-.098.1-.177.21-.232.334a1.22 1.22 0 0 0-.104.49v.12c.01.25.086.48.215.676.016.024.033.047.05.07.078.105.17.2.274.28.024.016.048.03.072.044.15.086.322.136.505.136h3.12c.546 0 1.04-.226 1.4-.59.18-.18.322-.393.42-.63.098-.234.148-.49.148-.757 0-.53-.213-1.01-.558-1.363-.348-.35-.83-.567-1.363-.567h-.016c-.015-.31-.076-.61-.178-.892a2.978 2.978 0 0 0-.504-.86 2.97 2.97 0 0 0-.784-.646 2.93 2.93 0 0 0-1.01-.317c-.107-.013-.213-.02-.32-.02-.46 0-.896.132-1.265.36a2.58 2.58 0 0 0-.657.59c.282-.063.578-.094.88-.094.51 0 .998.1 1.447.285.447.185.85.455 1.18.793.33.338.59.74.763 1.186.087.22.15.45.188.684z"
      fill="#FBAD41"
    />
  </svg>
);

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
      { name: "Netlify", icon: null, CustomIcon: NetlifyIcon },
      { name: "Cloudflare", icon: null, CustomIcon: CloudflareIcon },
    ],
  },
  {
    label: "AI & Deployment",
    accent: "#c96442",
    accentDim: "#c9644222",
    tagline: "Intelligence & delivery",
    number: "04",
    items: [
      // AI models — custom inline SVG icons
      { name: "Claude", icon: null, CustomIcon: AnthropicIcon },
      { name: "Claude Sonnet", icon: null, CustomIcon: AnthropicIcon },
      { name: "Claude Opus", icon: null, CustomIcon: AnthropicIcon },
      // Deployment & domain

      {
        name: "Namecheap",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Namecheap_logo.svg/320px-Namecheap_logo.svg.png",
        isLogo: true,
      },
      {
        name: "GoDaddy",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/GoDaddy_Logo_2020.svg/320px-GoDaddy_Logo_2020.svg.png",
        isLogo: true,
      },
      { name: "Google Domains", icon: ic("google/google-original.svg") },
      { name: "Gmail SMTP", icon: ic("google/google-original.svg") },
      { name: "Chrome Ext. API", icon: ic("chrome/chrome-original.svg") },
      {
        name: "SendGrid",
        icon: "https://sendgrid.com/wp-content/themes/sgdotcom/pages/resource/brand/2016/SendGrid-Logomark.png",
        isLogo: true,
      },
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
    { text: "  ai: ['Claude'],", color: "#c96442" },
    { text: "}", color: "#f5f0e4" },
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
      <rect
        x="108"
        y="268"
        width="5"
        height="9"
        fill="#a8c060"
        className="laptop-cursor"
      />
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
      <circle
        cx="260"
        cy="17"
        r="3.5"
        fill="#1a2010"
        stroke="#a8c06020"
        strokeWidth="1"
      />
      <circle cx="260" cy="17" r="1.5" fill="#a8c06030" />
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
      <path
        d="M 60 28 Q 140 24 200 60 L 60 60 Z"
        fill="white"
        opacity="0.015"
      />
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
          32 TOOLS
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
      {/* Custom SVG icon component */}
      {item.CustomIcon ? (
        <div
          style={{
            width: "clamp(22px,2.6vw,32px)",
            height: "clamp(22px,2.6vw,32px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hovered
              ? "rotate(-6deg) scale(1.12)"
              : "rotate(0) scale(1)",
            transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <item.CustomIcon />
        </div>
      ) : item.isLogo ? (
        /* Wordmark logos — render in a contained box */
        <div
          style={{
            width: "clamp(22px,2.6vw,32px)",
            height: "clamp(22px,2.6vw,32px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hovered
              ? "rotate(-6deg) scale(1.12)"
              : "rotate(0) scale(1)",
            transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <img
            src={item.icon}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
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
        </div>
      ) : (
        <>
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
        </>
      )}
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
  const laptopWrapRef = useRef();

  // ── FIXED SCROLL APPROACH ────────────────────────────────────────────────
  // Instead of animating y% (which causes jumpy behaviour because the section
  // height keeps changing), we track the section's scroll progress and map it
  // to a pixel-based translateY that moves the laptop gently downward.
  // The key changes vs. the old version:
  //   1. offset "start start" → "end end" so progress covers the full section
  //   2. output range is in pixels, not percentages (avoids layout recalc jank)
  //   3. Spring stiffness is very low (18) and mass=1 for a heavy, slow glide

  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ["start start", "end end"],
  });

  // Map 0→1 scroll progress to 0px→320px downward travel
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 320]);

  // Very gentle spring — low stiffness, higher damping = no bounce, just smooth lag
  const laptopY = useSpring(rawY, {
    stiffness: 18,
    damping: 14,
    mass: 1,
    restDelta: 0.5,
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

      {/* ── LAPTOP RAIL ── */}
      <div className="laptop-rail" aria-hidden="true">
        <motion.div
          ref={laptopWrapRef}
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
        .laptop-rail {
          position: absolute;
          top: 0; bottom: 0; right: 0;
          width: 48%;
          pointer-events: none;
          z-index: 20;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(20px, 5vw, 60px);
          box-sizing: border-box;
          /* Prevent the spring from pushing outside the section */
          overflow: hidden;
        }
        .laptop-float {
          width: 100%;
          position: relative;
          /* will-change: transform helps the browser paint this on its own layer */
          will-change: transform;
        }
        .stack-header-left { width: 48%; display: flex; flex-direction: column; }
        .stack-light-header { width: 48%; }
        .stack-pill-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
          gap: 10px;
        }
        .laptop-cursor { animation: blink 1.1s steps(1) infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        @media (max-width: 900px) {
          .laptop-rail { display: none; }
          .stack-header-left { width: 100%; }
          .stack-light-header { width: 100%; }
          .stack-pill-grid { grid-template-columns: repeat(auto-fill, minmax(76px, 1fr)); }
        }
        @media (max-width: 540px) {
          .stack-pill-grid { grid-template-columns: repeat(4, 1fr); gap: 8px; }
        }
      `}</style>
    </section>
  );
}

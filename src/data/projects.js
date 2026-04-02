// src/data/projects.js
import bimeHero from "../assets/bime.png";
import planning from "../assets/planning.jpg";
import falcon from "../assets/treasury.jpg";
import fluid from "../assets/fluid2.jpg";
import ibloomHero from "../assets/decoration.jpg";
import bimelogo from "../assets/bimelogo.svg";
import falconlogo from "../assets/falconlogo.svg";
import retailfxlogo from "../assets/retailfxlogo.png";
import retailfx from "../assets/retailfx.png";
import ibloomlogo from "../assets/ibloomlogo.svg";

const DISPLACEMENT = fluid;

// ─── Accent palette — cycles for any id beyond what's hardcoded ───────────────
export const PROJECT_ACCENTS = {
  1: "#10b981", // emerald   — Bime
  2: "#7c3aed", // violet    — Falcon Treasury
  3: "#f59e0b", // amber     — Falcon Investor Portal
  4: "#e11d48", // rose      — Retail & Corporate FX
  5: "#a855f7", // purple    — iBloom Public
  6: "#3b82f6", // blue      — iBloom Admin
};

const ACCENT_CYCLE = [
  "#10b981",
  "#7c3aed",
  "#f59e0b",
  "#e11d48",
  "#a855f7",
  "#3b82f6",
  "#ec4899",
  "#06b6d4",
];

/** Returns an accent for any project id, cycling if needed */
export function getAccent(id) {
  return PROJECT_ACCENTS[id] ?? ACCENT_CYCLE[(id - 1) % ACCENT_CYCLE.length];
}

export const projects = [
  // ── 01 ────────────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Bime",
    stack: "Java Spring Boot · JavaScript · Chrome Extension API",
    url: null,
    githubUrl: null,
    image: bimelogo,
    logoImage: bimeHero,
    displacementImage: bimelogo,
    client: "Personal Project",
    role: "Lead Software Engineer",
    year: "2025",
    tags: ["Chrome Extension", "Java", "Spring Boot", "Productivity"],
    description:
      "Browser productivity extension that tracks time spent across websites, enforces custom blocklists, and runs structured focus sessions — turning the browser into a distraction-free work environment.",
    color: "#0d4f3c",
    accent: "#10b981",
    status: "in-dev",
    highlights: [
      "Time tracking across domains",
      "Blocklist & distraction filtering",
      "Focus session mode",
      "Stats dashboard",
    ],
  },

  // ── 02 ────────────────────────────────────────────────────────────────────
  {
    id: 2,
    title: "Falcon Treasury",
    stack: "React · TypeScript · MUI · Tailwind · Java Spring Boot",
    url: null,
    githubUrl: null,
    image: falconlogo,
    logoImage: falcon,
    displacementImage: falconlogo,
    client: "Aristack Solutions Limited",
    role: "Lead Frontend Engineer",
    year: "2025",
    tags: ["Fintech", "React", "TypeScript", "MUI", "Enterprise"],
    description:
      "Enterprise treasury management suite built for financial institutions across Africa — covering ALM, back office, FX trading, fixed income, money markets, position management, and real-time market data feeds. Currently live for multiple institutions.",
    color: "#1a0a3d",
    accent: "#7c3aed",
    status: "live",
    highlights: [
      "Multi asset-class trade management (FX, Fixed Income, MM)",
      "Real-time market data ticker",
      "ALM & position management",
      "Pending approvals & workflow engine",
      "Role-based access control",
      "Ref. & static data configuration",
    ],
  },

  // ── 03 ────────────────────────────────────────────────────────────────────
  {
    id: 3,
    title: "Falcon — Investor Portal",
    stack:
      "Next.js · TypeScript · Tailwind CSS · Java Spring Boot (Falcon API)",
    url: null,
    githubUrl: null,
    image: falconlogo,
    logoImage: falcon,
    displacementImage: falconlogo,
    client: "Aristack Solutions Limited",
    role: "Lead Software Engineer",
    year: "2025–2026",
    tags: ["Next.js", "TypeScript", "Fintech", "SSR", "Investor Portal"],
    description:
      "Client-facing Next.js investor portal that interfaces with the Falcon Treasury suite — allowing users under a legal entity to securely view their profile, portfolio positions, and investment performance data via Falcon's API layer.",
    color: "#0a1628",
    accent: "#f59e0b",
    status: "in-dev",
    highlights: [
      "SSR + SSG via Next.js App Router",
      "Portfolio & investment overview",
      "User profile management",
      "Falcon API integration (third-party)",
      "Legal entity scoping",
    ],
  },

  // ── 04 ────────────────────────────────────────────────────────────────────
  {
    id: 4,
    title: "Retail & Corporate FX",
    stack: "React · TypeScript · MUI · Tailwind · Java Spring Boot",
    url: null,
    githubUrl: null,
    image: retailfx ,
    logoImage: retailfxlogo,
    displacementImage: falconlogo,
    client: "Aristack Solutions Limited",
    role: "Lead Full Stack Engineer",
    year: "2024",
    tags: ["Fintech", "FX", "React", "TypeScript", "Enterprise"],
    description:
      "Dedicated FX trading platform built for financial institutions — handling retail and corporate foreign exchange operations with real-time rate management, trade execution, and multi-currency portfolio tracking. Live in production.",
    color: "#1a0a14",
    accent: "#e11d48",
    status: "live",
    highlights: [
      "Retail & corporate FX trade execution",
      "Real-time rate management",
      "Multi-currency portfolio tracking",
      "Trade blotter & reporting",
      "Role-based access control",
    ],
  },

  // ── 05 ────────────────────────────────────────────────────────────────────
  {
    id: 5,
    title: "iBloom — Public Site",
    stack: "React · Node.js · Tailwind CSS",
    url: "https://ibloomrentals.com",
    githubUrl: null,
    image: ibloomlogo,
    logoImage: ibloomHero,
    displacementImage: ibloomlogo,
    client: "iBloom Decor Rentals",
    role: "Lead Full Stack Engineer",
    year: "2025",
    tags: ["React", "Node.js", "E-commerce", "Bookings"],
    description:
      "Full-stack e-commerce platform for a high-end Lagos Island decor rental company — featuring product catalogue browsing, event booking flows, cart system, and real-time quote generation. Live in production.",
    color: "#2d1a4d",
    accent: "#a855f7",
    status: "live",
    highlights: [
      "Product catalogue & galleries",
      "Event booking flow",
      "Cart system",
      "Real-time quote generation",
    ],
  },

  // ── 06 ────────────────────────────────────────────────────────────────────
  {
    id: 6,
    title: "iBloom — Admin",
    stack: "React · Node.js · Tailwind CSS",
    url: null,
    githubUrl: null,
    image: ibloomlogo,
    logoImage: planning,
    displacementImage: ibloomlogo,
    client: "iBloom Decor Rentals",
    role: "Lead Full Stack Engineer",
    year: "2025",
    tags: ["React", "Dashboard", "Real-time", "Admin"],
    description:
      "Internal operations platform for iBloom — giving staff full control over bookings, calendar scheduling, cart and order management, real-time messaging with clients, and live notifications. Live in production.",
    color: "#0d2d1a",
    accent: "#3b82f6",
    status: "live",
    highlights: [
      "Event booking management",
      "Calendar tracking",
      "Cart & order system",
      "Real-time client messaging",
      "Live notification system",
    ],
  },
];

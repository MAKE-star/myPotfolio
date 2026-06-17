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
import duduplugs from "../assets/duduplugs.png";
import scholist from "../assets/scholist.png";
import relayswap from "../assets/relayswap.png";
import chronos from "../assets/chronos.png";
import emaildelete from "../assets/emaildelete.png";

const DISPLACEMENT = fluid;

// ─── Accent palette — cycles for any id beyond what's hardcoded ───────────────
export const PROJECT_ACCENTS = {
  2: "#7c3aed", // violet    — Falcon Treasury
  3: "#f59e0b", // amber     — Falcon Investor Portal
  4: "#e11d48", // rose      — Retail & Corporate FX
  5: "#a855f7", // purple    — iBloom Public
  6: "#3b82f6", // blue      — iBloom Admin
  7: "#00f0ff", // cyan      — DuduPlugs
  8: "#ec4899", // pink      — Scholist
  9: "#06b6d4", // sky       — Chronos
  10: "#f97316", // orange   — Relayswap DEX
  11: "#10b981", // emerald  — Gmail Bulk Cleaner
};

const ACCENT_CYCLE = [
  "#7c3aed",
  "#f59e0b",
  "#e11d48",
  "#a855f7",
  "#3b82f6",
  "#00f0ff",
  "#ec4899",
  "#06b6d4",
  "#f97316",
  "#10b981"
];

/** Returns an accent for any project id, cycling if needed */
export function getAccent(id) {
  return PROJECT_ACCENTS[id] ?? ACCENT_CYCLE[(id - 1) % ACCENT_CYCLE.length];
}

export const projects = [
  // ── 02 (Falcon Treasury) ──────────────────────────────────────────────────
  {
    id: 2,
    title: "Falcon Treasury",
    stack: "React · TypeScript · MUI · Tailwind · Java Spring Boot · Playwright",
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
      "Enterprise treasury management suite built for financial institutions across Africa — covering ALM, back office, FX trading, fixed income, money markets, position management, and real-time market data feeds. Rigorously validated via automated trade workflow testing packages.",
    color: "#1a0a3d",
    accent: "#7c3aed",
    status: "live",
    highlights: [
      "Multi asset-class trade management (FX, Fixed Income, MM)",
      "Real-time market data ticker",
      "ALM & position management",
      "Automated dashboard task management tracking",
      "Role-based access control",
      "Ref. & static data configuration",
    ],
  },

  // ── 03 (Falcon Investor Portal) ───────────────────────────────────────────
  {
    id: 3,
    title: "Falcon — Investor Portal",
    stack: "Next.js · TypeScript · Tailwind CSS · Java Spring Boot (Falcon API)",
    url: null,
    githubUrl: null,
    image: falconlogo,
    logoImage: falcon,
    displacementImage: falconlogo,
    client: "Aristack Solutions Limited",
    role: "Lead Software Engineer",
    year: "2026",
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
      "Falcon API external trade creation mapping",
      "Legal entity scoping",
    ],
  },

  // ── 04 (Retail & Corporate FX) ────────────────────────────────────────────
  {
    id: 4,
    title: "Retail & Corporate FX",
    stack: "React · TypeScript · MUI · Tailwind · Java Spring Boot",
    url: null,
    githubUrl: null,
    image: retailfx,
    logoImage: retailfxlogo,
    displacementImage: falconlogo,
    client: "Aristack Solutions Limited",
    role: "Lead Full Stack Engineer",
    year: "2023",
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

  // ── 05 (iBloom Public) ────────────────────────────────────────────────────
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

  // ── 06 (iBloom Admin) ─────────────────────────────────────────────────────
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

  // ── 07 (DuduPlugs) ────────────────────────────────────────────────────────
  {
    id: 7,
    title: "DuduPlugs",
    stack: "React · React Native · Node.js · WebSockets",
    url: "https://www.duduplugs.com/",
    githubUrl: null,
    image: duduplugs, 
    logoImage: fluid,   
    displacementImage: DISPLACEMENT,
    client: "DuduPlugs Network",
    role: "Full Stack & Mobile Engineer",
    year: "2026",
    tags: ["Social Ecosystem", "Marketplace Hub", "Web & Mobile", "Real-time"],
    description:
      "A high-fidelity social community network and digital marketplace application allowing creators and businesses to share updates, discover specialized content channels, post time-sensitive stories, and interact on an expansive dark-themed interface.",
    color: "#070904",
    accent: "#00f0ff",
    status: "live",
    highlights: [
      "Dynamic multi-channel discovery and 'Feed' timelines",
      "Interactive social media stories engine",
      "Cross-platform Web & Mobile architecture parity",
      "E-commerce peer-to-peer Marketplace engine",
      "Real-time messaging, comments, and profile connectivity",
    ],
  },

  // ── 08 (Scholist) ─────────────────────────────────────────────────────────
  {
    id: 8,
    title: "Scholist",
    stack: "React · JavaScript · Node.js · MongoDB",
    url: "https://scholistapp.com/",
    githubUrl: null,
    image: scholist,
    logoImage: planning,
    displacementImage: DISPLACEMENT,
    client: "Independent / Open Source",
    role: "Lead Full Stack Engineer",
    year: "2024",
    tags: ["Scholarship Management", "Workflow Automation", "DB Pipelines"],
    description:
      "A specialized portal optimized for secure scholarship processing, managing creation submission pipelines, tracking eligibility variables, and ensuring clean dataset syncs to the backend cluster.",
    color: "#2b0a1a",
    accent: "#ec4899",
    status: "in-dev",
    highlights: [
      "Scholarship creation handler pipelines",
      "Automated criterion matching algorithms",
      "Strict ESLint production configurations",
      "MongoDB database pipeline integration",
    ],
  },

  // ── 09 (Chronos) ──────────────────────────────────────────────────────────
  {
    id: 9,
    title: "Chronos",
    stack: "NestJS · TypeScript · PostgreSQL · Quasar · Capacitor",
    url: null,
    githubUrl: null,
    image: chronos,
    logoImage: falcon,
    displacementImage: DISPLACEMENT,
    client: "Internal Production",
    role: "Fullstack Architect",
    year: "2025",
    tags: ["Order Management", "Native Shells", "Webhooks"],
    description:
      "Multi-product internal distribution ecosystem built to process heavy payload messaging queues, coordinate multi-tenant ordering architectures, and sync notification streams directly onto native wrapper mobile layouts.",
    color: "#05161a",
    accent: "#06b6d4",
    status: "live",
    highlights: [
      "Multi-tenant order management routing",
      "Native device integration using Capacitor shells",
      "Programmatic webhook notification layers",
      "High-throughput transactional PostgreSQL schemas",
    ],
  },

  // ── 10 (Relayswap DEX) ─────────────────────────────────────────────────────
  {
    id: 10,
    title: "Relayswap DEX",
    stack: "React · Next.js · Solidity · Ethers.js",
    url: null,
    githubUrl: null,
    image: relayswap,
    logoImage: bimeHero,
    displacementImage: DISPLACEMENT,
    client: "Web3 Protocol Initiative",
    role: "Smart Contract & UI Developer",
    year: "2024",
    tags: ["Liquidity Pools", "AMM Architectures", "Web3"],
    description:
      "A decentralized liquidity and atomic asset-swapping dashboard engineered to provide immediate liquidity pool interaction and gas-optimized crypto trading layers via Web3 wallets.",
    color: "#211505",
    accent: "#f97316",
    status: "live",
    highlights: [
      "Automated Market Maker (AMM) transaction layers",
      "Atomic non-custodial wallet routing configurations",
      "Real-time token exchange calculations",
      "Secure custom Solidity smart contract bindings",
    ],
  },

  // ── 11 (Gmail Bulk Cleaner) ───────────────────────────────────────────────
  {
    id: 11,
    title: "Gmail Bulk Cleaner",
    stack: "JavaScript · Node.js · OAuth2 · Google API",
    url: null,
    githubUrl: null,
    image: emaildelete,
    logoImage: planning,
    displacementImage: DISPLACEMENT,
    client: "Open Source Utility",
    role: "Automation Engineer",
    year: "2024",
    tags: ["Scripting Tools", "Batch Optimization", "API Automation"],
    description:
      "A script utility optimized to safely fetch user-approved Google workspace authorization tokens and process high-speed batch deletions across heavily overloaded inbox categories.",
    color: "#0a261d",
    accent: "#10b981",
    status: "live",
    highlights: [
      "Secure Google OAuth2 credential pipelines",
      "Batch data category sorting configurations",
      "High-frequency asynchronous deletion loops",
      "Terminal-based execution logging analytics",
    ],
  },
];
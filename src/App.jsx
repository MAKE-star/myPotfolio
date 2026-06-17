// src/App.jsx
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import CustomCursor from "./components/cursor/CustomCursor";
import HeroSection from "./components/hero/HeroSection";
import AboutSection from "./components/about/AboutSection";
import ProjectsSection from "./components/projects/ProjectsSection";
import StackSection from "./components/stack/StackSection";
import CollabSection from "./components/collabs/CollabSection";
import ContactSection from "./components/contact/ContactSection";
import Loaderss from "./components/loader/loaderss";
import StickyNav from "./components/nav/StickyNav";
import ExperienceSection from "./components/experience/experienceSection";

gsap.registerPlugin(ScrollTrigger);

// ── Prevent browser from restoring mid-page scroll position on reload ──
if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });
}

// Background video source string configuration
const BG_VIDEO_SRC = "https://assets.mixkit.co/videos/preview/mixkit-matrix-style-code-running-on-a-screen-43224-large.mp4";

function preloadVideo(src, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, timeoutMs);
    const video = document.createElement("video");
    video.src = src;
    video.preload = "auto";

    video.oncanplaythrough = () => {
      clearTimeout(timer);
      resolve();
    };
    video.onerror = () => {
      clearTimeout(timer);
      resolve();
    };
  });
}

export default function App() {
  const [assetsReady, setAssetsReady] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  // ── Asset preloading effect ──────────────────────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    Promise.all([
      preloadImage("/mayopo.jpg"),
      preloadVideo(BG_VIDEO_SRC, 5000),
    ]).then(() => setAssetsReady(true));
  }, []);

  // ── Once loader animation finishes: reset scroll + refresh triggers ─
  useEffect(() => {
    if (!loaderDone) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    requestAnimationFrame(() =>
      requestAnimationFrame(() => ScrollTrigger.refresh()),
    );
  }, [loaderDone]);

  // ── Kill all scroll triggers on unmount ────────────────────────────
  useEffect(() => () => ScrollTrigger.getAll().forEach((t) => t.kill()), []);

  return (
    <>
      {!loaderDone && (
        <Loaderss ready={assetsReady} onComplete={() => setLoaderDone(true)} />
      )}

      {/* Nav lives outside <main> so it's never clipped or scrolled away */}
      <StickyNav hidden={!loaderDone} />

      <main
        className="bg-[#050a05] text-white overflow-x-hidden"
        style={{
          // Snaps into active layout instantly layout-wise, preventing color flashes
          display: loaderDone ? "block" : "none",
          pointerEvents: loaderDone ? "all" : "none",
        }}
      >
        <CustomCursor />
        <HeroSection />
        <AboutSection videeSrc={BG_VIDEO_SRC} />
        <ProjectsSection />
        <ExperienceSection />
        <StackSection />
        <CollabSection />
        <ContactSection />
      </main>
    </>
  );
}
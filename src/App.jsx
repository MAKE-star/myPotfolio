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

function preloadVideo(src, timeoutMs = 5000) {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, timeoutMs);
    const vid = document.createElement("video");
    vid.muted = true;
    vid.preload = "auto";
    vid.oncanplaythrough = () => {
      clearTimeout(timer);
      resolve();
    };
    vid.onerror = () => {
      clearTimeout(timer);
      resolve();
    };
    vid.src = src;
    vid.load();
  });
}

export const BG_VIDEO_SRC = "/bg-video.mp4";

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [assetsReady, setAssetsReady] = useState(false);

  // ── Scroll to top + kick off preloads immediately ──────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    Promise.all([
      preloadImage("/james.jpg"),
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

      <main
        className="bg-[#050a05] text-white overflow-x-hidden"
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: "opacity 0.6s ease 0.15s",
          pointerEvents: loaderDone ? "all" : "none",
        }}
      >
        <CustomCursor />
        <HeroSection />
        <AboutSection videeSrc={BG_VIDEO_SRC} />
        <ProjectsSection />
        <StackSection />
        <CollabSection />
        <ContactSection />
      </main>
    </>
  );
}

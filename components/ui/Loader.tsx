"use client";
import { useEffect, useRef, useState } from "react";
import { useSectionStore } from "@/hooks/useSection";

const MESSAGES = [
  "INITIALIZING SCENE...",
  "LOADING SHADERS...",
  "BUILDING GEOMETRY...",
  "SPAWNING PARTICLES...",
  "CALIBRATING CAMERA...",
  "READY",
];

export function Loader() {
  const [progress, setProgress]  = useState(0);
  const [msgIndex, setMsgIndex]  = useState(0);
  const [hidden,   setHidden]    = useState(false);
  const setIntro = useSectionStore((s) => s.setIntro);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + Math.random() * 12 + 4, 100);
        const newMsgIdx = Math.floor((next / 100) * MESSAGES.length);
        if (newMsgIdx < MESSAGES.length) setMsgIndex(newMsgIdx);
        if (next >= 100 && intervalRef.current) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            setHidden(true);
            setIntro(true);
          }, 400);
        }
        return next;
      });
    }, 55);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [setIntro]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "#000810",
        transition: "opacity 0.8s ease",
        opacity: progress >= 100 ? 0 : 1,
      }}
    >
      {/* Scan line */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,209,0.015) 3px, rgba(0,255,209,0.015) 6px)",
        }}
      />

      {/* Logo */}
      <div
        className="font-display font-black text-3xl tracking-[0.35em] mb-10 animate-pulse-glow"
        style={{ color: "#00FFD1" }}
      >
        MIMIS<span style={{ color: "#FF00A8" }}>.</span>DEV
      </div>

      {/* Progress bar */}
      <div
        className="w-[220px] h-[2px] rounded mb-4"
        style={{ background: "#0a1e2e" }}
      >
        <div
          className="h-full rounded transition-[width] duration-75 ease-linear"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #FF00A8, #00FFD1)",
          }}
        />
      </div>

      {/* Message */}
      <div className="font-mono text-[9px] tracking-[0.28em]" style={{ color: "#00FFD1" }}>
        {MESSAGES[msgIndex]}
      </div>

      {/* Percentage */}
      <div className="font-mono text-[11px] mt-2" style={{ color: "#00FFD188" }}>
        {Math.floor(progress)}%
      </div>
    </div>
  );
}

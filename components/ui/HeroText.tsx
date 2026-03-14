"use client";
import { useSectionStore } from "@/hooks/useSection";

export function HeroText() {
  const activeSection  = useSectionStore((s) => s.activeSection);
  const introComplete  = useSectionStore((s) => s.introComplete);

  return (
    <div
      className="fixed left-1/2 z-50 pointer-events-none text-center"
      style={{
        bottom: "34%",
        transform: "translateX(-50%)",
        opacity: activeSection ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Role */}
      <div
        className="font-mono text-[9px] tracking-[0.4em] mb-[10px] animate-fade-up"
        style={{ color: "#00FFD1", animationDelay: "0.1s" }}
      >
        FULL-STACK DEVELOPER
      </div>

      {/* Name */}
      <div
        className="font-display font-black leading-[1.05] tracking-[0.08em] animate-fade-up"
        style={{
          fontSize: "clamp(30px, 5.5vw, 54px)",
          color: "#fff",
          textShadow: "0 0 40px rgba(0,255,209,0.22)",
          animationDelay: "0.22s",
        }}
      >
        YASSINE
        <br />
        <span style={{ color: "#00FFD1" }}>MIMIS</span>
      </div>

      {/* Tagline */}
      <div
        className="font-mono text-[10px] mt-3 tracking-[0.18em] animate-fade-up"
        style={{ color: "#2a5566", animationDelay: "0.38s" }}
      >
        Building digital worlds, one commit at a time.
      </div>

      {/* Hint */}
      <div
        className="font-mono text-[8px] mt-4 tracking-[0.22em] animate-fade-up"
        style={{ color: "#00FFD1", animationDelay: "0.55s" }}
      >
        ↓ CLICK THE ORBS TO EXPLORE
      </div>
    </div>
  );
}

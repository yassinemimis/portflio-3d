"use client";
import { useSectionStore, SectionId } from "@/hooks/useSection";

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "about",    label: "ABOUT"    },
  { id: "skills",   label: "SKILLS"   },
  { id: "projects", label: "PROJECTS" },
  { id: "contact",  label: "CONTACT"  },
];

const SECTION_BADGES: Record<string, string> = {
  about:    "◈ ABOUT",
  skills:   "◆ SKILLS",
  projects: "◉ PROJECTS",
  contact:  "◎ CONTACT",
};

export function HUD() {
  const activeSection = useSectionStore((s) => s.activeSection);
  const setSection    = useSectionStore((s) => s.setSection);

  return (
    <>
      {/* ── Top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-[18px]"
        style={{ background: "linear-gradient(to bottom, rgba(0,8,20,.92) 0%, transparent 100%)" }}
      >
        {/* Logo */}
        <div className="font-display font-black text-[15px] tracking-[0.35em]" style={{ color: "#00FFD1" }}>
          MIMIS<span style={{ color: "#FF00A8" }}>.</span>DEV
        </div>

        {/* Nav */}
        <nav className="flex gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSection(isActive ? null : item.id)}
                className="font-mono text-[10px] tracking-[0.22em] bg-transparent border-none cursor-pointer transition-all duration-200 pb-[3px]"
                style={{
                  color: isActive ? "#00FFD1" : "#2a5566",
                  borderBottom: isActive ? "1px solid #00FFD1" : "1px solid transparent",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Section badge ── */}
      <div
        className="fixed top-[68px] left-10 z-50 font-mono text-[9px] tracking-[0.25em] transition-colors duration-300"
        style={{ color: activeSection ? "#00FFD1" : "#00FFD1" }}
      >
        {activeSection ? SECTION_BADGES[activeSection] : "◈ HOME"}
      </div>

      {/* ── Bottom status bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex justify-between px-10 py-3 font-mono text-[8px] tracking-[0.2em]"
        style={{
          background: "linear-gradient(to top, rgba(0,8,20,.85) 0%, transparent 100%)",
          color: "#00FFD1",
        }}
      >
        <span>🖱 DRAG TO ROTATE · SCROLL TO ZOOM · CLICK ORBS TO EXPLORE</span>
        <span>THREE.JS · R3F · NEXT.JS 14</span>
      </div>
    </>
  );
}

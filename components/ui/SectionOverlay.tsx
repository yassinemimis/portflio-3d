"use client";
import { useEffect, useRef, useState } from "react";
import { useSectionStore } from "@/hooks/useSection";
import { PORTFOLIO_DATA } from "@/data/portfolio";

/* ── primitives ── */
function SectionTitle({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h2 className="font-display font-bold tracking-[0.15em] mb-5 text-[20px]"
      style={{ color, textShadow: `0 0 22px ${color}` }}>
      {children}
    </h2>
  );
}

function Tag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className="rounded px-[10px] py-[3px] text-[9px] tracking-[0.14em]"
      style={{ background: `${color}12`, border: `1px solid ${color}44`, color }}>
      {children}
    </span>
  );
}

/* ── About ── */
function AboutPanel() {
  const { about } = PORTFOLIO_DATA;
  return (
    <div>
      <SectionTitle color="#00FFD1">About Me</SectionTitle>
      <p className="font-mono text-[12px] leading-[1.88] mb-6 whitespace-pre-line" style={{ opacity: 0.78 }}>
        {about}
      </p>
      <div className="text-[9px] tracking-[0.2em] mb-3" style={{ color: "#2a5566" }}>CURRENT STACK</div>
      <div className="flex flex-wrap gap-2">
        {["React", "Next.js", "Three.js", "Node.js", "TypeScript", "Python"].map(tag => (
          <Tag key={tag} color="#00FFD1">{tag}</Tag>
        ))}
      </div>
    </div>
  );
}

/* ── Skills ── */
function SkillsPanel() {
  const { skills } = PORTFOLIO_DATA;
  const barsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => {
      barsRef.current?.querySelectorAll<HTMLElement>("[data-level]").forEach(el => {
        el.style.width = el.dataset.level + "%";
      });
    }, 150);
    return () => clearTimeout(t);
  }, []);
  return (
    <div>
      <SectionTitle color="#61DAFB">Skills</SectionTitle>
      <div ref={barsRef}>
        {skills.map(({ name, level, color }) => (
          <div key={name} className="mb-[15px]">
            <div className="flex justify-between font-mono text-[10px] tracking-[0.12em] mb-[5px]">
              <span style={{ color: "#cde" }}>{name}</span>
              <span style={{ color }}>{level}%</span>
            </div>
            <div className="h-[3px] rounded" style={{ background: "#0a1e2e" }}>
              <div data-level={level} className="h-full rounded transition-[width] duration-[900ms] ease-out"
                style={{ width: "0%", background: `linear-gradient(90deg,${color}70,${color})`, boxShadow: `0 0 8px ${color}` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Experience ── */
function ExperiencePanel() {
  const { experiences } = PORTFOLIO_DATA;
  const [active, setActive] = useState<string>(experiences[0].id);
  const exp = experiences.find(e => e.id === active)!;

  return (
    <div>
      <SectionTitle color="#A78BFA">Experience</SectionTitle>

      {/* timeline tabs */}
      <div className="flex flex-col gap-[2px] mb-6">
        {experiences.map(e => (
          <button
            key={e.id}
            onClick={() => setActive(e.id)}
            className="text-left px-3 py-[10px] font-mono text-[10px] tracking-[0.1em] transition-all duration-200 rounded-sm cursor-pointer"
            style={{
              background: active === e.id ? `${e.color}14` : "transparent",
              borderLeft: `2px solid ${active === e.id ? e.color : "#0f2a38"}`,
              color: active === e.id ? e.color : "#3a6070",
            }}
          >
            <div style={{ color: active === e.id ? "#fff" : "#3a6070", fontSize: "11px", marginBottom: "2px" }}>
              {e.position}
            </div>
            <div style={{ opacity: 0.6, fontSize: "9px" }}>{e.company} · {e.period}</div>
          </button>
        ))}
      </div>

      {/* active detail */}
      <div style={{
        background: `${exp.color}08`,
        border: `1px solid ${exp.color}22`,
        borderRadius: "8px",
        padding: "16px",
      }}>
        {/* header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="font-mono text-[13px] font-bold" style={{ color: "#fff" }}>{exp.position}</div>
            <div className="font-mono text-[10px] mt-1" style={{ color: exp.color }}>{exp.company}</div>
          </div>
          <span className="font-mono text-[8px] px-2 py-1 rounded"
            style={{ background: `${exp.color}20`, border: `1px solid ${exp.color}44`, color: exp.color }}>
            {exp.type}
          </span>
        </div>

        {/* meta */}
        <div className="flex gap-3 mb-4 font-mono text-[9px]" style={{ color: "#3a6070" }}>
          <span>📍 {exp.location}</span>
          <span>🗓 {exp.period}</span>
        </div>

        {/* description */}
        <p className="font-mono text-[11px] leading-[1.75] mb-4" style={{ opacity: 0.72 }}>
          {exp.description}
        </p>

        {/* achievements */}
        <div className="text-[9px] tracking-[0.18em] mb-2" style={{ color: "#2a5566" }}>
          KEY ACHIEVEMENTS
        </div>
        <ul className="mb-4">
          {exp.achievements.map((a, i) => (
            <li key={i} className="font-mono text-[10px] leading-[1.7] flex gap-2"
              style={{ color: "#7a9aaa" }}>
              <span style={{ color: exp.color, flexShrink: 0 }}>›</span>
              {a}
            </li>
          ))}
        </ul>

        {/* tech */}
        <div className="flex flex-wrap gap-[6px]">
          {exp.technologies.map(t => (
            <Tag key={t} color={exp.color}>{t}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Contact ── */
function ContactPanel() {
  const { contact } = PORTFOLIO_DATA;
  const links = [
    { label: "Email",     value: contact.email,       href: `mailto:${contact.email}`, color: "#FFD43B" },
    { label: "GitHub",    value: "yassinemimis",       href: contact.github,            color: "#00FFD1" },
    { label: "Portfolio", value: "mimis-one.vercel",   href: contact.portfolio,         color: "#61DAFB" },
    { label: "LinkedIn",  value: "yassinemimis",       href: contact.linkedin,          color: "#61DAFB" },
  ];
  return (
    <div>
      <SectionTitle color="#FFD43B">Contact</SectionTitle>
      <p className="font-mono text-[12px] leading-[1.8] mb-6" style={{ opacity: 0.72 }}>
        Let&apos;s build something remarkable together.<br />
        Every great project starts with a conversation.
      </p>
      {links.map(({ label, value, href, color }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
          className="flex justify-between items-center py-[13px] font-mono text-[11px] tracking-[0.12em] no-underline transition-opacity duration-200 hover:opacity-70"
          style={{ color: "#cde", borderBottom: "1px solid #091f2c" }}>
          <span style={{ color: "#2a5566" }}>{label}</span>
          <span style={{ color }}>{value} →</span>
        </a>
      ))}
    </div>
  );
}

/* ── Container ── */
const PANEL_MAP: Record<string, React.ReactNode> = {
  about:      <AboutPanel />,
  skills:     <SkillsPanel />,
  experience: <ExperiencePanel />,
  contact:    <ContactPanel />,
};

export function SectionOverlay() {
  const activeSection = useSectionStore(s => s.activeSection);
  const setSection    = useSectionStore(s => s.setSection);
  const show = !!activeSection && activeSection !== "projects";

  return (
    <div
      className="fixed top-0 bottom-0 z-[200] overflow-y-auto"
      style={{
        right: show ? "0" : "-430px",
        width: "400px",
        background: "rgba(2,9,20,0.94)",
        borderLeft: "1px solid #082535",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        padding: "80px 32px 40px",
        fontFamily: "'Share Tech Mono', monospace",
        color: "#9ab",
        transition: "right 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
    >
      <button
        onClick={() => setSection(null)}
        className="absolute top-[22px] right-[22px] bg-transparent font-mono text-[10px] tracking-[0.1em] cursor-pointer transition-colors duration-200 hover:text-[#00FFD1]"
        style={{ border: "1px solid #0f2a38", color: "#3a6a7a", padding: "5px 13px" }}
      >
        ✕ CLOSE
      </button>

      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,209,0.3) 2px,rgba(0,255,209,0.3) 4px)" }} />

      {show && PANEL_MAP[activeSection!]}
    </div>
  );
}
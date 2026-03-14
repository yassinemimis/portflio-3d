"use client";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  useAnimationFrame,
  AnimatePresence,
  wrap,
  LayoutGroup,
} from "framer-motion";
import { useSectionStore } from "@/hooks/useSection";

const PROJECTS = [
  {
    id: "p1", title: "Mimis Portfolio",
    description: "3D interactive portfolio built with React Three Fiber & GSAP.",
    tech: ["Next.js", "Three.js", "GSAP"], color: "#00FFD1",
    link: "https://mimis-one.vercel.app", year: "2024",
  },
  {
    id: "p2", title: "Collab Board",
    description: "Real-time collaborative whiteboard via WebSockets and CRDT.",
    tech: ["React", "Socket.io", "Node.js"], color: "#61DAFB",
    link: "#", year: "2024",
  },
  {
    id: "p3", title: "AI Reviewer",
    description: "AI-powered code review platform with LLM integration.",
    tech: ["Python", "FastAPI", "React"], color: "#FF6B6B",
    link: "#", year: "2023",
  },
  {
    id: "p4", title: "DataPulse",
    description: "Real-time analytics dashboard with live WebSocket charts.",
    tech: ["React", "D3.js", "Node.js"], color: "#FFD43B",
    link: "#", year: "2023",
  },
  {
    id: "p5", title: "AuthKit",
    description: "Drop-in auth SDK with OAuth2, JWT and biometrics support.",
    tech: ["TypeScript", "JWT", "OAuth2"], color: "#FF00A8",
    link: "#", year: "2023",
  },
];

const CARD_W = 300;
const CARD_GAP = 24;
const TOTAL_W = (CARD_W + CARD_GAP) * PROJECTS.length;

/* ── single card ── */
function Card({
  project,
  baseX,
  onOpen
}: {
  project: typeof PROJECTS[0];
  baseX: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const { color, title, description, tech, link, year } = project;

  return (
<motion.div
  layoutId={`card-${project.id}`}
  onClick={onOpen}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        rotateY: hovered ? 0 : -8,
        rotateX: hovered ? 0 : 4,
        translateZ: hovered ? 60 : 0,
        translateY: hovered ? -12 : 0,
        scale: hovered ? 1.04 : 1,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{
        position: "absolute",
        left: baseX,
        top: 0,
        width: CARD_W,
        transformStyle: "preserve-3d",
        cursor: "pointer",
      }}
    >
      <div style={{
        background: "rgba(2,10,22,0.92)",
        border: `1px solid ${hovered ? color + "bb" : color + "33"}`,
        borderRadius: "12px",
        padding: "24px",
        height: "320px",
        fontFamily: "'Share Tech Mono', monospace",
        backdropFilter: "blur(20px)",
        boxShadow: hovered
          ? `0 0 50px ${color}44, 0 30px 60px rgba(0,0,0,0.5)`
          : `0 0 20px ${color}11, 0 10px 30px rgba(0,0,0,0.4)`,
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* scan lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
          background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,209,1) 2px,rgba(0,255,209,1) 4px)",
        }} />

        {/* corner marks */}
        {[["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]].map(([v, h]) => (
          <div key={v + h} style={{
            position: "absolute", [v]: 8, [h]: 8, width: 14, height: 14,
            borderTop: v === "top" ? `1.5px solid ${color}` : "none",
            borderBottom: v === "bottom" ? `1.5px solid ${color}` : "none",
            borderLeft: h === "left" ? `1.5px solid ${color}` : "none",
            borderRight: h === "right" ? `1.5px solid ${color}` : "none",
          }} />
        ))}

        {/* year */}
        <div style={{ color: color + "88", fontSize: "9px", letterSpacing: "0.3em", marginBottom: "auto" }}>
          {year}
        </div>

        {/* title */}
        <div style={{
          fontSize: "20px", fontWeight: "900", color: "#fff",
          fontFamily: "'Orbitron',sans-serif", letterSpacing: "0.04em",
          marginBottom: "12px", lineHeight: 1.2,
          textShadow: hovered ? `0 0 30px ${color}` : "none",
          transition: "text-shadow 0.35s",
        }}>
          {title}
        </div>

        {/* desc */}
        <div style={{ fontSize: "11px", lineHeight: "1.7", color: "#7a9aaa", marginBottom: "16px", flexGrow: 1 }}>
          {description}
        </div>

        {/* tech tags */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "18px" }}>
          {tech.map(t => (
            <span key={t} style={{
              background: `${color}14`, border: `1px solid ${color}44`,
              borderRadius: "4px", padding: "3px 8px",
              fontSize: "8px", color, letterSpacing: "0.12em",
            }}>{t}</span>
          ))}
        </div>

        {/* cta */}
        {link !== "#" ? (
          <a href={link} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              color, fontSize: "9px", letterSpacing: "0.18em",
              textDecoration: "none", border: `1px solid ${color}`,
              padding: "6px 14px", borderRadius: "4px",
              display: "inline-block", width: "fit-content",
              background: hovered ? `${color}18` : "transparent",
              transition: "background 0.25s",
            }}
          >VIEW PROJECT →</a>
        ) : (
          <span style={{
            color: "#2a5566", fontSize: "9px", letterSpacing: "0.18em",
            border: "1px solid #1a3040", padding: "6px 14px",
            borderRadius: "4px", display: "inline-block", width: "fit-content",
          }}>IN PROGRESS</span>
        )}
      </div>
    </motion.div>
  );
}

/* ── carousel track ── */
function CarouselTrack({ onOpen, isPaused  }: { onOpen: (p: typeof PROJECTS[0]) => void, isPaused: boolean }) {
  const baseX = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const velocity = useVelocity(scrollY);

  // spring smoothing on velocity
  const smoothV = useSpring(velocity, { damping: 50, stiffness: 400 });

  // map velocity → extra speed boost
  const velocityFactor = useTransform(smoothV, [-3000, 0, 3000], [-2, 0, 2]);

  const directionRef = useRef(1);
  const xRef = useRef(0);

  useAnimationFrame((_, delta) => {
     if (isPaused) return;
    // auto scroll speed (px/frame)
    const AUTO = 0.6;
    const boost = velocityFactor.get();
    xRef.current -= (AUTO + boost * AUTO) * directionRef.current;

    // wrap infinitely
    const wrapped = wrap(-TOTAL_W, 0, xRef.current);
    baseX.set(wrapped);
  });

  // drag to scroll
  const handleWheel = (e: React.WheelEvent) => {
    scrollY.set(scrollY.get() + e.deltaY);
    xRef.current -= e.deltaY * 0.5;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    xRef.current += e.movementX * 1.5;
  };

  return (
    <div
      onWheel={handleWheel}
      onPointerMove={handlePointerMove}
      style={{
        width: "100%", height: "340px",
        position: "relative", overflow: "hidden",
        cursor: "grab",
        perspective: "1200px",
      }}
    >
      <motion.div
        style={{
          x: baseX,
          position: "absolute",
          top: 0,
          width: TOTAL_W * 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          transformStyle: "preserve-3d",
        }}
      >
        {/* render 2× for seamless loop */}
        {[...PROJECTS, ...PROJECTS].map((p, i) => (
         <Card
  key={`${p.id}-${i}`}
  project={p}
  baseX={i * (CARD_W + CARD_GAP)}
  onOpen={() => onOpen(p)}
/>
        ))}
      </motion.div>
    </div>
  );
}

/* ── main overlay ── */
export function ProjectsOverlay() {
  const activeSection = useSectionStore(s => s.activeSection);
  const setSection = useSectionStore(s => s.setSection);
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  if (activeSection !== "projects") return null;

  return ( 
        <LayoutGroup>
     <>
    <div style={{
      position: "fixed", inset: 0, zIndex: 150,
      display: "flex", flexDirection: "column",
      justifyContent: "center",
      background: "rgba(0,8,16,0.88)",
      backdropFilter: "blur(4px)",
      animation: "fadeIn 0.5s ease both",
    }}>

      {/* BACK BUTTON */}
      <motion.button
        onClick={() => setSection(null)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "absolute",
          top: 30,
          left: 40,
          background: "rgba(0,0,0,0.4)",
          border: "1px solid #00FFD1",
          color: "#00FFD1",
          padding: "8px 16px",
          fontSize: "10px",
          letterSpacing: "0.2em",
          fontFamily: "'Share Tech Mono', monospace",
          borderRadius: "6px",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 20px rgba(0,255,209,0.2)",
        }}
      >
        ← BACK
      </motion.button>

      {/* header */}
      <div style={{
        padding: "0 48px 32px",
        fontFamily: "'Share Tech Mono',monospace",
      }}>
        <div style={{ fontSize: "9px", color: "#FF6B6B", letterSpacing: "0.35em", marginBottom: "8px" }}>
          ◉ PROJECTS
        </div>
        <div style={{
          fontSize: "clamp(28px,4vw,44px)",
          fontFamily: "'Orbitron',sans-serif",
          fontWeight: "900", color: "#fff",
          letterSpacing: "0.06em",
          textShadow: "0 0 40px rgba(0,255,209,0.2)",
        }}>
          SELECTED<br /><span style={{ color: "#00FFD1" }}>WORK</span>
        </div>
      </div>

      {/* carousel */}
      <div style={{ padding: "0 48px" }}>
        <CarouselTrack onOpen={(p) => { setSelectedProject(p); setIsPaused(true); }} isPaused={isPaused} />
      </div>

      {/* hint */}
      <div style={{
        padding: "20px 48px 0",
        fontSize: "8px", color: "#00FFD1",
        fontFamily: "'Share Tech Mono',monospace",
        letterSpacing: "0.22em",
        display: "flex", gap: "32px",
      }}>
        <span>← DRAG TO NAVIGATE →</span>
        <span>SCROLL TO ACCELERATE</span>
      </div>
    </div>
<AnimatePresence>
{selectedProject && (
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
style={{
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(8px)",
  zIndex: 300
}}
  onClick={() => { setSelectedProject(null); setIsPaused(false); }}

>

<motion.div
layoutId={`card-${selectedProject.id}`}
onClick={(e)=>e.stopPropagation()}
style={{
  width: "720px",
  transformStyle:"preserve-3d",
}}
>

<div style={{
  background: "rgba(2,10,22,0.95)",
  border:`1px solid ${selectedProject.color}88`,
  borderRadius:"16px",
  padding:"36px",
  fontFamily:"'Share Tech Mono', monospace",
  backdropFilter:"blur(20px)",
  boxShadow:`0 0 80px ${selectedProject.color}44`,
  position:"relative",
  overflow:"hidden",
  display:"flex",
  flexDirection:"column"
}}>

{/* scan lines */}
<div style={{
position:"absolute",
inset:0,
pointerEvents:"none",
opacity:0.03,
background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,209,1) 2px,rgba(0,255,209,1) 4px)"
}}/>

{/* corner marks */}
{[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h])=>(
<div key={v+h} style={{
position:"absolute",
[v]:12,
[h]:12,
width:18,
height:18,
borderTop:v==="top"?`2px solid ${selectedProject.color}`:"none",
borderBottom:v==="bottom"?`2px solid ${selectedProject.color}`:"none",
borderLeft:h==="left"?`2px solid ${selectedProject.color}`:"none",
borderRight:h==="right"?`2px solid ${selectedProject.color}`:"none",
}}/>
))}

{/* title */}
<h2 style={{
fontFamily:"'Orbitron', sans-serif",
fontSize:"32px",
color:"#fff",
marginBottom:"16px",
letterSpacing:"0.04em",
textShadow:`0 0 30px ${selectedProject.color}`
}}>
{selectedProject.title}
</h2>

{/* description */}
<p style={{
color:"#7a9aaa",
lineHeight:"1.7",
marginBottom:"24px",
fontSize:"13px"
}}>
{selectedProject.description}
</p>

{/* tech */}
<div style={{
display:"flex",
gap:"8px",
flexWrap:"wrap",
marginBottom:"28px"
}}>
{selectedProject.tech.map(t=>(
<span key={t} style={{
background:`${selectedProject.color}14`,
border:`1px solid ${selectedProject.color}44`,
borderRadius:"4px",
padding:"4px 10px",
fontSize:"10px",
color:selectedProject.color,
letterSpacing:"0.12em"
}}>
{t}
</span>
))}
</div>

{/* button */}
{selectedProject.link !== "#" && (
<a
href={selectedProject.link}
target="_blank"
onClick={(e)=>e.stopPropagation()}
style={{
color:selectedProject.color,
border:`1px solid ${selectedProject.color}`,
padding:"8px 20px",
textDecoration:"none",
fontSize:"11px",
letterSpacing:"0.18em",
width:"fit-content",
background:`${selectedProject.color}18`
}}
>
OPEN PROJECT →
</a>
)}

</div>
</motion.div>
</motion.div>
)}
</AnimatePresence>
</>
 </LayoutGroup>
  );
}
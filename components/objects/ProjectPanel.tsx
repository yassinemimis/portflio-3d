"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { Project } from "@/data/portfolio";

interface ProjectPanelProps {
  project: Project;
  index: number;
}

export function ProjectPanel({ project, index }: ProjectPanelProps) {
  const group = useRef<THREE.Group>(null!);
  const { position, title, description, tech, color, link } = project;

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y =
      position[1] + Math.sin(t * 0.6 + index * 1.4) * 0.15;
    group.current.rotation.y = Math.sin(t * 0.2 + index) * 0.05;
  });

  return (
    <group ref={group} position={position} scale={0.5}>
      <mesh>
        <planeGeometry args={[2.5, 1.6]} />
        <meshStandardMaterial
          color="#020c18"
          emissive={color}
          emissiveIntensity={0.07}
          transparent
          opacity={0.88}
          roughness={0.1}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <Html
        transform
        occlude="blending"
        style={{ width: "290px", pointerEvents: "auto" }}
        position={[0, 0, 0.01]}
      >
        <div style={{
          background: "rgba(2,12,26,0.95)",
          border: `1px solid ${color}55`,
          borderRadius: "8px",
          padding: "14px 16px",
          fontFamily: "'Share Tech Mono', monospace",
          color: "#cde",
          backdropFilter: "blur(14px)",
          boxShadow: `0 0 24px ${color}22`,
          position: "relative",
        }}>
          {/* Corner accents */}
          {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
            <div key={v+h} style={{
              position:"absolute", [v]:0, [h]:0,
              width:12, height:12,
              borderTop:    v==="top"    ? `1px solid ${color}` : "none",
              borderBottom: v==="bottom" ? `1px solid ${color}` : "none",
              borderLeft:   h==="left"   ? `1px solid ${color}` : "none",
              borderRight:  h==="right"  ? `1px solid ${color}` : "none",
            }}/>
          ))}

          <div style={{ color, fontSize:"9px", letterSpacing:"0.2em", marginBottom:"6px", opacity:0.8 }}>
            PROJECT_0{index + 1}
          </div>

          <div style={{
            fontSize:"14px", fontWeight:"700", color:"#fff",
            marginBottom:"6px", fontFamily:"'Orbitron',sans-serif",
            letterSpacing:"0.04em",
          }}>
            {title}
          </div>

          <div style={{ fontSize:"10px", lineHeight:"1.6", opacity:0.7, marginBottom:"10px" }}>
            {description}
          </div>

          <div style={{ display:"flex", gap:"5px", flexWrap:"wrap", marginBottom:"12px" }}>
            {tech.map((t) => (
              <span key={t} style={{
                background:`${color}18`, border:`1px solid ${color}44`,
                borderRadius:"3px", padding:"2px 6px",
                fontSize:"8px", color, letterSpacing:"0.1em",
              }}>{t}</span>
            ))}
          </div>

          {link !== "#" ? (
            <a href={link} target="_blank" rel="noopener noreferrer" style={{
              color, fontSize:"9px", letterSpacing:"0.14em",
              textDecoration:"none", border:`1px solid ${color}`,
              padding:"4px 10px", borderRadius:"3px", display:"inline-block",
            }}>VIEW PROJECT →</a>
          ) : (
            <span style={{
              color:"#2a5566", fontSize:"9px", letterSpacing:"0.14em",
              border:"1px solid #1a3040", padding:"4px 10px",
              borderRadius:"3px", display:"inline-block",
            }}>IN PROGRESS</span>
          )}
        </div>
      </Html>
    </group>
  );
}
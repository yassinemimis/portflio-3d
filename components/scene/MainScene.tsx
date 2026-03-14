"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { CameraRig }     from "./CameraRig";
import { Lighting }      from "./Lighting";
import { Particles }     from "./Particles";
import { FloorGrid }     from "./Grid";
import { HeroObject }    from "@/components/objects/HeroObject";
import { SectionOrbs }   from "@/components/objects/SectionOrb";
import { ProjectPanel }  from "@/components/objects/ProjectPanel";
import { MouseEnergy }   from "@/components/scene/MouseEnergy";
import { useSectionStore } from "@/hooks/useSection";
import { PORTFOLIO_DATA }  from "@/data/portfolio";

function SceneContent() {
  const activeSection = useSectionStore((s) => s.activeSection);

  return (
    <>
      <CameraRig />
      <Lighting />
      <Particles count={1600} />
      <FloorGrid />
      <HeroObject />
      <SectionOrbs />
      <MouseEnergy />

      {activeSection === "projects" &&
        PORTFOLIO_DATA.projects.map((project, i) => (
          <ProjectPanel key={project.id} project={project} index={i} />
        ))}

      <fogExp2 attach="fog" color="#000810" density={0.025} />
    </>
  );
}

export function MainScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.8, 9.2], fov: 62, near: 0.1, far: 120 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      style={{ background: "#000810" }}
      dpr={[1, 2]}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
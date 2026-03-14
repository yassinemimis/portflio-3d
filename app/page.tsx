import dynamic from "next/dynamic";
import { Loader }          from "@/components/ui/Loader";
import { HUD }             from "@/components/ui/HUD";
import { HeroText }        from "@/components/ui/HeroText";
import { SectionOverlay }  from "@/components/ui/SectionOverlay";
import { ProjectsOverlay } from "@/components/ui/ProjectsOverlay";
import { CustomCursor }    from "@/components/ui/CustomCursor";

const MainScene = dynamic(
  () => import("@/components/scene/MainScene").then((m) => m.MainScene),
  { ssr: false }
);

export default function Home() {
  return (
    <main
      className="w-screen h-screen overflow-hidden relative"
      style={{ background: "#000810", cursor: "none" }}
    >
      <CustomCursor />
      <Loader />

      <div className="absolute inset-0 z-0">
        <MainScene />
      </div>

      <HeroText />
      <HUD />
      <SectionOverlay />
      <ProjectsOverlay />

      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,8,16,0.65) 100%)",
        }}
      />
    </main>
  );
}
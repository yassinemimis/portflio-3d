"use client";
import { useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { CAM_PRESETS } from "@/data/portfolio";
import { useSectionStore } from "@/hooks/useSection";

export function CameraRig() {
  const { camera } = useThree();
  const activeSection = useSectionStore((s) => s.activeSection);
  const controlsRef = useRef<any>(null!);

  const camTarget = useRef(new THREE.Vector3(0, 1.8, 9.2));
  const camLookAt = useRef(new THREE.Vector3(0, 0.2, 0));
  const tempVec   = useRef(new THREE.Vector3());
  const isTransitioning = useRef(false);
  const transitionTimer = useRef(0);

  useEffect(() => {
    const key    = activeSection ?? "home";
    const preset = CAM_PRESETS[key] ?? CAM_PRESETS.home;
    camTarget.current.set(...preset.pos);
    camLookAt.current.set(...preset.at);
    isTransitioning.current = true;
    transitionTimer.current = 0;
    // temporarily disable orbit controls during section transition
    if (controlsRef.current) controlsRef.current.enabled = false;
  }, [activeSection]);

  useFrame(({ mouse, clock }, delta) => {
    transitionTimer.current += delta;

    if (isTransitioning.current) {
      const sway = 0;
      tempVec.current.set(camTarget.current.x, camTarget.current.y, camTarget.current.z);
      camera.position.lerp(tempVec.current, 0.055);
      camera.lookAt(camLookAt.current);

      // re-enable orbit after transition completes (~1.5s)
      if (transitionTimer.current > 1.5) {
        isTransitioning.current = false;
        if (controlsRef.current) {
          controlsRef.current.enabled = true;
          controlsRef.current.target.copy(camLookAt.current);
          controlsRef.current.update();
        }
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      enableRotate={true}
      minDistance={3}
      maxDistance={18}
      maxPolarAngle={Math.PI * 0.72}
      minPolarAngle={Math.PI * 0.18}
      rotateSpeed={0.55}
      zoomSpeed={0.7}
      dampingFactor={0.08}
      enableDamping={true}
      makeDefault={false}
    />
  );
}

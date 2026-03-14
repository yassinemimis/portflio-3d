"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Lighting() {
  const light1 = useRef<THREE.PointLight>(null!);
  const light2 = useRef<THREE.PointLight>(null!);
  const light3 = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.38) * 7;
      light1.current.position.z = Math.cos(t * 0.38) * 7;
      light1.current.intensity  = 1.8 + Math.sin(t * 1.4) * 0.5;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.27) * 6;
      light2.current.position.z = Math.sin(t * 0.27) * 6;
      light2.current.intensity  = 1.4 + Math.sin(t * 0.9 + 2) * 0.4;
    }
    if (light3.current) {
      light3.current.position.x = Math.sin(t * 0.5 + 1) * 5;
      light3.current.position.y = 3 + Math.sin(t * 0.3) * 2;
      light3.current.intensity  = 0.8 + Math.sin(t * 1.2 + 1) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight ref={light1} color="#00FFD1" intensity={2.0} distance={26} position={[4,3,2]}  />
      <pointLight ref={light2} color="#FF00A8" intensity={1.5} distance={22} position={[-4,2,-2]} />
      <pointLight ref={light3} color="#61DAFB" intensity={0.9} distance={18} position={[0,5,0]}  />
      <directionalLight color="#ffffff" intensity={0.2} position={[0,8,-5]} />
      <hemisphereLight args={["#001830","#000000",0.5]} />
    </>
  );
}

"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Particles({ count = 1800 }: { count?: number }) {
  const mesh  = useRef<THREE.Points>(null!);
  const mesh2 = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos  = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 8 + Math.random() * 18;
      pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      pos[i*3+2] = r * Math.cos(phi);

      if (Math.random() < 0.6) {
        cols[i*3]=0;   cols[i*3+1]=1;    cols[i*3+2]=0.82; // cyan
      } else if (Math.random() < 0.7) {
        cols[i*3]=1;   cols[i*3+1]=0;    cols[i*3+2]=0.66; // magenta
      } else {
        cols[i*3]=0.38; cols[i*3+1]=0.85; cols[i*3+2]=0.98; // blue
      }
    }
    return [pos, cols];
  }, [count]);

  // inner bright ring of particles
  const ringPos = useMemo(() => {
    const RING = 200;
    const pos = new Float32Array(RING * 3);
    for (let i = 0; i < RING; i++) {
      const a = (i / RING) * Math.PI * 2;
      const r = 3.5 + Math.random() * 0.5;
      pos[i*3]   = Math.cos(a) * r;
      pos[i*3+1] = (Math.random() - 0.5) * 0.4;
      pos[i*3+2] = Math.sin(a) * r;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current)  mesh.current.rotation.y  = t * 0.012;
    if (mesh2.current) mesh2.current.rotation.y = -t * 0.08;
  });

  return (
    <>
      {/* Far particle cloud */}
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
        </bufferGeometry>
        <pointsMaterial size={0.042} vertexColors transparent opacity={0.55} sizeAttenuation depthWrite={false} />
      </points>

      {/* Inner orbit ring particles */}
      <points ref={mesh2}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ringPos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.055} color="#00FFD1" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
      </points>
    </>
  );
}

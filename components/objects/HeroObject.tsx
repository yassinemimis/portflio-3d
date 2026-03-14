"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";



/* ══════════════════════════════════════════
   PLASMA RING — حلقة تنبض وتتوهج
══════════════════════════════════════════ */
function PlasmaRing({
  radius,
  color,
  speed,
  tilt,
}: {
  radius: number;
  color: string;
  speed: number;
  tilt: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * speed;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 1.2 + Math.sin(t * 3.5 + radius) * 0.6;
    const s = 1 + Math.sin(t * 2.2 + radius) * 0.04;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.018, 16, 120]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.4}
        roughness={0}
        metalness={1}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

/* ══════════════════════════════════════════
   ENERGY BURST — موجة تتمدد للخارج
══════════════════════════════════════════ */
function EnergyBurst({ color, delay }: { color: string; delay: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() + delay) % 2.5;
    const p = t / 2.5;
    ref.current.scale.setScalar(0.5 + p * 4.5);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.5;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.8, 0.022, 8, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

/* ══════════════════════════════════════════
   FLOATING PLASMA DEBRIS — حطام بلازما
══════════════════════════════════════════ */
function PlasmaDebris({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  const debris = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const r = 1.8 + Math.random() * 0.8;
      return {
        position: [
          Math.cos(angle) * r,
          (Math.random() - 0.5) * 1.2,
          Math.sin(angle) * r,
        ] as [number, number, number],
        scale: 0.04 + Math.random() * 0.06,
        speed: 0.3 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      };
    }), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const d = debris[i];
      child.position.y = d.position[1] + Math.sin(t * d.speed + d.phase) * 0.3;
      child.rotation.x = t * d.speed;
      child.rotation.z = t * d.speed * 0.7;
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = 0.8 + Math.sin(t * 3 + d.phase) * 0.5;
    });
    groupRef.current.rotation.y = t * 0.2;
  });

  return (
    <group ref={groupRef}>
      {debris.map((d, i) => (
        <mesh key={i} position={d.position} scale={d.scale}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.0}
            roughness={0}
            metalness={1}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ══════════════════════════════════════════
   CORE PLASMA SPHERE
══════════════════════════════════════════ */
function PlasmaCore() {
  const coreRef  = useRef<THREE.Mesh>(null!);
  const core2Ref = useRef<THREE.Mesh>(null!);
  const glowRef  = useRef<THREE.Mesh>(null!);
  const glow2Ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // outer distort shell
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.22;
      coreRef.current.rotation.x = Math.sin(t * 0.18) * 0.15;
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.6 + Math.sin(t * 2.8) * 0.2;
    }

    // inner bright core
    if (core2Ref.current) {
      core2Ref.current.rotation.y = -t * 0.4;
      const s = 1 + Math.sin(t * 3.5) * 0.08;
      core2Ref.current.scale.setScalar(s);
      const mat = core2Ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.5 + Math.sin(t * 4) * 0.8;
    }

    // outer glow halos
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 1.2) * 0.06;
      glowRef.current.scale.setScalar(s);
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + Math.sin(t * 1.2) * 0.03;
    }
    if (glow2Ref.current) {
      const s = 1 + Math.sin(t * 0.8 + 1) * 0.08;
      glow2Ref.current.scale.setScalar(s);
      const mat = glow2Ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.04 + Math.sin(t * 0.8) * 0.02;
    }
  });

  return (
    <>
      {/* outer plasma shell */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.0, 128, 128]} />
        <MeshDistortMaterial
          color="#ff4400"
          emissive="#ff6600"
          emissiveIntensity={0.7}
          distort={0.55}
          speed={4.5}
          roughness={0.0}
          metalness={0.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* inner bright core */}
      <mesh ref={core2Ref}>
        <sphereGeometry args={[0.52, 64, 64]} />
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#00ccff"
          emissiveIntensity={2.8}
          distort={0.3}
          speed={6}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* very bright center point */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={5}
          roughness={0}
          metalness={1}
        />
      </mesh>

      {/* glow halos */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={glow2Ref}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

/* ══════════════════════════════════════════
   MAIN HERO OBJECT
══════════════════════════════════════════ */
export function HeroObject() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock, mouse }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // subtle mouse parallax
    groupRef.current.rotation.y +=
      (mouse.x * 0.15 - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x +=
      (-mouse.y * 0.1 - groupRef.current.rotation.x) * 0.02;

    // slow global drift
    groupRef.current.position.y =
      0.3 + Math.sin(t * 0.5) * 0.12;
  });

  return (
    <group ref={groupRef} position={[0, 0.3, 0]}>

      {/* ── dense sparkle aura ── */}
      <Sparkles count={80}  scale={5}   size={1.6} speed={0.6} opacity={0.5} color="#ff6600" />
      <Sparkles count={50}  scale={3.5} size={1.0} speed={1.0} opacity={0.4} color="#00ccff" />
      <Sparkles count={30}  scale={2.2} size={0.7} speed={1.5} opacity={0.6} color="#ffffff" />

      {/* ── plasma core ── */}
      <PlasmaCore />

      {/* ── orbital plasma rings ── */}
      <PlasmaRing radius={1.55} color="#ff3300" speed={0.22}  tilt={[Math.PI/2.1, 0, 0]} />
      <PlasmaRing radius={1.85} color="#ff6600" speed={-0.18} tilt={[Math.PI/2, 0, Math.PI/3]} />
      <PlasmaRing radius={2.15} color="#00ccff" speed={0.14}  tilt={[Math.PI/3, Math.PI/5, 0]} />
      <PlasmaRing radius={2.45} color="#ff00aa" speed={-0.1}  tilt={[Math.PI/4, 0, Math.PI/2]} />


      {/* ── energy bursts ── */}
      <EnergyBurst color="#ff4400" delay={0}    />
      <EnergyBurst color="#00ccff" delay={0.83} />
      <EnergyBurst color="#ff00aa" delay={1.66} />

      {/* ── floating plasma debris ── */}
      <PlasmaDebris color="#ff6600" />

    </group>
  );
}
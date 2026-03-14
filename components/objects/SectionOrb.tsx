"use client";
import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { ORB_CONFIG } from "@/data/portfolio";
import { useSectionStore, SectionId } from "@/hooks/useSection";

/* ══════════════════════════════════════════
   INNER CRYSTAL SHARDS — tiny octahedra
   floating freely inside the nebula sphere
══════════════════════════════════════════ */
function CrystalShards({ color, count = 9 }: { color: string; count?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  const shards = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 0.52,
        (Math.random() - 0.5) * 0.52,
        (Math.random() - 0.5) * 0.52,
      ] as [number, number, number],
      scale:    0.028 + Math.random() * 0.042,
      speed:    0.4   + Math.random() * 1.2,
      phase:    Math.random() * Math.PI * 2,
      axis:     new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize(),
    })), [count]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const s = shards[i];
      // orbit + spin
      child.position.x = s.position[0] + Math.sin(t * s.speed + s.phase) * 0.1;
      child.position.y = s.position[1] + Math.cos(t * s.speed * 0.7 + s.phase) * 0.1;
      child.position.z = s.position[2] + Math.sin(t * s.speed * 0.9 + s.phase + 1) * 0.1;
      child.rotateOnAxis(s.axis, 0.02 * s.speed);
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={color}
            emissiveIntensity={1.8}
            roughness={0}
            metalness={1}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ══════════════════════════════════════════
   NEBULA DUST — tiny point cloud inside
══════════════════════════════════════════ */
function NebulaDust({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null!);
  const COUNT = 60;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = Math.random() * 0.38;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.22;
  });

  const col = new THREE.Color(color);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color={col}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ══════════════════════════════════════════
   SHOCKWAVE RING — pulses out on click
══════════════════════════════════════════ */
function ShockwaveRing({ color, trigger }: { color: string; trigger: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const startTime = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    if (trigger === 0) return;

    if (startTime.current === null) startTime.current = clock.getElapsedTime();
    const elapsed = clock.getElapsedTime() - startTime.current;
    const duration = 0.7;

    if (elapsed > duration) {
      ref.current.visible = false;
      startTime.current = null;
      return;
    }

    ref.current.visible = true;
    const p = elapsed / duration;
    ref.current.scale.setScalar(1 + p * 3.5);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.8;
  });

  // reset when trigger changes
  useFrame(() => {
    if (trigger > 0 && startTime.current === null) {
      startTime.current = null; // will be set next frame
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} visible={false}>
      <torusGeometry args={[0.5, 0.015, 8, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0} />
    </mesh>
  );
}

/* ══════════════════════════════════════════
   SINGLE NEBULA ORB
══════════════════════════════════════════ */
function NebulaOrb({
  id, label, position, color, icon,
}: {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
  icon: string;
}) {
  const groupRef   = useRef<THREE.Group>(null!);
  const outerRef   = useRef<THREE.Mesh>(null!);
  const innerRef   = useRef<THREE.Mesh>(null!);
  const halo1Ref   = useRef<THREE.Mesh>(null!);
  const halo2Ref   = useRef<THREE.Mesh>(null!);
  const ringRef    = useRef<THREE.Mesh>(null!);

  const setSection    = useSectionStore((s) => s.setSection);
  const activeSection = useSectionStore((s) => s.activeSection);
  const [hovered,  setHovered]  = useState(false);
  const [clickTick, setClickTick] = useState(0);
  const isActive = activeSection === id;

  // shake on click
  const shakeRef = useRef({ active: false, t: 0 });

  const handleClick = () => {
    setSection((isActive ? null : id) as SectionId);
    setClickTick(c => c + 1);
    shakeRef.current = { active: true, t: 0 };
  };

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // float
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.85 + position[0]) * 0.22;

    // shake
    if (shakeRef.current.active) {
      shakeRef.current.t += delta;
      const shake = Math.sin(shakeRef.current.t * 40) *
                    Math.max(0, 0.12 - shakeRef.current.t * 0.5);
      groupRef.current.position.x = position[0] + shake;
      if (shakeRef.current.t > 0.35) {
        shakeRef.current.active = false;
        groupRef.current.position.x = position[0];
      }
    }

    // outer nebula shell rotation
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.14;
      outerRef.current.rotation.x = Math.sin(t * 0.18) * 0.2;
      const mat = outerRef.current.material as THREE.MeshStandardMaterial;
      const tgt = (hovered || isActive) ? 0.9 : 0.38;
      mat.opacity += (tgt - mat.opacity) * 0.06;
      mat.emissiveIntensity += ((hovered || isActive ? 1.2 : 0.4) - mat.emissiveIntensity) * 0.06;
    }

    // inner distort core
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.3;
      const mat = innerRef.current.material as THREE.MeshStandardMaterial;
      const tgt = 0.6 + Math.sin(t * 2.4) * 0.2;
      mat.emissiveIntensity += (tgt - mat.emissiveIntensity) * 0.08;
    }

    // halos breathe
    if (halo1Ref.current) {
      const s = 1 + Math.sin(t * 1.1) * 0.05;
      halo1Ref.current.scale.setScalar(s);
      const mat = halo1Ref.current.material as THREE.MeshBasicMaterial;
      const tgt = (hovered || isActive) ? 0.18 : 0.06;
      mat.opacity += (tgt - mat.opacity) * 0.05;
    }
    if (halo2Ref.current) {
      const s = 1 + Math.sin(t * 0.7 + 1) * 0.07;
      halo2Ref.current.scale.setScalar(s);
    }

    // orbit ring
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
      ringRef.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.25) * 0.15;
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      const tgt = (hovered || isActive) ? 1.6 : 0.5;
      mat.emissiveIntensity += (tgt - mat.emissiveIntensity) * 0.06;
      const otgt = (hovered || isActive) ? 0.9 : 0.3;
      mat.opacity += (otgt - mat.opacity) * 0.06;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "crosshair";
      }}
    >
      {/* ── outer nebula shell (translucent) ── */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[0.48, 64, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.0}
          metalness={0.1}
          transparent
          opacity={0.38}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── inner distorted core ── */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.26, 32, 32]} />
        <MeshDistortMaterial
          color="#020d1a"
          emissive={color}
          emissiveIntensity={0.6}
          distort={0.45}
          speed={3.5}
          roughness={0.0}
          metalness={1.0}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* ── crystal shards floating inside ── */}
      <CrystalShards color={color} count={10} />

      {/* ── nebula dust cloud ── */}
      <NebulaDust color={color} />

      {/* ── sparkles on hover / active ── */}
      {(hovered || isActive) && (
        <Sparkles
          count={22}
          scale={1.1}
          size={0.9}
          speed={0.5}
          opacity={0.65}
          color={color}
        />
      )}

      {/* ── outer glow halo 1 ── */}
      <mesh ref={halo1Ref}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── outer glow halo 2 (larger, dimmer) ── */}
      <mesh ref={halo2Ref}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.025}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── orbit ring ── */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[0.66, 0.012, 8, 80]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0}
          metalness={1}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* ── shockwave on click ── */}
      <ShockwaveRing color={color} trigger={clickTick} />

      {/* ── label ── */}
      <Html center distanceFactor={6} style={{ pointerEvents: "none" }}>
        <div style={{
          color: isActive || hovered ? "#ffffff" : color,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "11px",
          fontWeight: "700",
          letterSpacing: "0.16em",
          textShadow: `0 0 16px ${color}, 0 0 32px ${color}66`,
          textAlign: "center",
          userSelect: "none",
          transform: "translateY(40px)",
          transition: "color 0.25s",
          whiteSpace: "nowrap",
        }}>
          <div style={{
            fontSize: "18px",
            marginBottom: "4px",
            filter: `drop-shadow(0 0 8px ${color})`,
          }}>
            {icon}
          </div>
          {label}
        </div>
      </Html>
    </group>
  );
}

/* ══════════════════════════════════════════
   EXPORT
══════════════════════════════════════════ */
export function SectionOrbs() {
  return (
    <group>
      {ORB_CONFIG.map((cfg) => (
        <NebulaOrb key={cfg.id} {...cfg} />
      ))}
    </group>
  );
}
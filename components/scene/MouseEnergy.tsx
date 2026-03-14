"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
function lerpV3(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  a.x += (b.x - a.x) * t;
  a.y += (b.y - a.y) * t;
  a.z += (b.z - a.z) * t;
}

/* ═══════════════════════════════════════════════
   1. ATTRACTED PARTICLES
   300 points that get pulled toward the mouse
═══════════════════════════════════════════════ */
function AttractedParticles({ mouseWorld }: { mouseWorld: THREE.Vector3 }) {
  const ref = useRef<THREE.Points>(null!);
  const COUNT = 300;

  const { positions, velocities, origins } = useMemo(() => {
    const positions  = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const origins    = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const r     = 3 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i*3]   = origins[i*3]   = x;
      positions[i*3+1] = origins[i*3+1] = y;
      positions[i*3+2] = origins[i*3+2] = z;
    }
    return { positions, velocities, origins };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    const mx = mouseWorld.x, my = mouseWorld.y, mz = mouseWorld.z;
    const ATTRACT = 0.012;
    const RETURN  = 0.008;
    const DAMPING = 0.88;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const px = pos.getX(i), py = pos.getY(i), pz = pos.getZ(i);

      const dx = mx - px, dy = my - py, dz = mz - pz;
      const dist2 = dx*dx + dy*dy + dz*dz;
      const dist  = Math.sqrt(dist2) + 0.001;

      // attract if within 4 units
      if (dist < 4) {
        const force = ATTRACT * (1 - dist / 4);
        velocities[i3]   += dx / dist * force;
        velocities[i3+1] += dy / dist * force;
        velocities[i3+2] += dz / dist * force;
      }

      // spring back to origin
      velocities[i3]   += (origins[i3]   - px) * RETURN;
      velocities[i3+1] += (origins[i3+1] - py) * RETURN;
      velocities[i3+2] += (origins[i3+2] - pz) * RETURN;

      // damping
      velocities[i3]   *= DAMPING;
      velocities[i3+1] *= DAMPING;
      velocities[i3+2] *= DAMPING;

      pos.setXYZ(i, px + velocities[i3], py + velocities[i3+1], pz + velocities[i3+2]);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#00FFD1"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════
   2. RIPPLE RINGS
   Expanding torus rings emitted at mouse position
═══════════════════════════════════════════════ */
const RIPPLE_COUNT = 5;

function RippleRings({ mouseWorld }: { mouseWorld: THREE.Vector3 }) {
  const ringsRef = useRef<THREE.Mesh[]>([]);
  const states   = useRef(
    Array.from({ length: RIPPLE_COUNT }, (_, i) => ({
      active: false, t: (i / RIPPLE_COUNT) * 2.2,
      ox: 0, oy: 0, oz: 0,
    }))
  );
  const lastEmit = useRef(0);

  useFrame(({ clock }) => {
    const now = clock.getElapsedTime();

    // emit a new ripple every 0.38s
    if (now - lastEmit.current > 0.38) {
      const slot = states.current.findIndex(s => !s.active);
      if (slot !== -1) {
        states.current[slot].active = true;
        states.current[slot].t = 0;
        states.current[slot].ox = mouseWorld.x;
        states.current[slot].oy = mouseWorld.y;
        states.current[slot].oz = mouseWorld.z;
      }
      lastEmit.current = now;
    }

    states.current.forEach((s, i) => {
      const mesh = ringsRef.current[i];
      if (!mesh) return;

      if (!s.active) { mesh.visible = false; return; }

      s.t += 0.03;
      const p = Math.min(s.t, 1);
      mesh.visible = true;
      mesh.position.set(s.ox, s.oy, s.oz);
      mesh.scale.setScalar(0.2 + p * 3.5);
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - p) * 0.55;

      if (p >= 1) s.active = false;
    });
  });

  return (
    <>
      {Array.from({ length: RIPPLE_COUNT }, (_, i) => (
        <mesh
          key={i}
          ref={el => { if (el) ringsRef.current[i] = el; }}
          rotation={[Math.PI / 2, 0, 0]}
          visible={false}
        >
          <torusGeometry args={[0.5, 0.012, 8, 64]} />
          <meshBasicMaterial color="#00FFD1" transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}


/* ═══════════════════════════════════════════════
   4. MOUSE CURSOR GLOW
   Small bright sphere at mouse position
═══════════════════════════════════════════════ */
function MouseGlow({ mouseWorld }: { mouseWorld: THREE.Vector3 }) {
  const ref   = useRef<THREE.Mesh>(null!);
  const pos   = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!ref.current) return;
    lerpV3(pos.current, mouseWorld, 0.12);
    ref.current.position.copy(pos.current);
    const t = performance.now() * 0.001;
    const s = 0.9 + Math.sin(t * 4) * 0.15;
    ref.current.scale.setScalar(s);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.18 + Math.sin(t * 3) * 0.06;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.22, 16, 16]} />
      <meshBasicMaterial color="#00FFD1" transparent opacity={0.18} depthWrite={false} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   MAIN — projects mouse world coords from camera
═══════════════════════════════════════════════ */
export function MouseEnergy() {
  const { camera, size } = useThree();
  const mouseWorld = useRef(new THREE.Vector3(0, 0, 2));
  const ndcMouse   = useRef(new THREE.Vector2(0, 0));

  // listen to raw mousemove
  useFrame(({ pointer }) => {
    ndcMouse.current.set(pointer.x, pointer.y);

    // unproject to world at z=2 plane
    const vec = new THREE.Vector3(pointer.x, pointer.y, 0.5);
    vec.unproject(camera);
    const dir = vec.sub(camera.position).normalize();
    const dist = (2 - camera.position.z) / dir.z;
    mouseWorld.current.copy(camera.position).addScaledVector(dir, dist < 0 ? -dist : dist);
    // clamp so it stays in scene
    mouseWorld.current.x = THREE.MathUtils.clamp(mouseWorld.current.x, -9, 9);
    mouseWorld.current.y = THREE.MathUtils.clamp(mouseWorld.current.y, -5, 5);
    mouseWorld.current.z = THREE.MathUtils.clamp(mouseWorld.current.z, -2, 4);
  });

  return (
    <group>
      <MouseGlow        mouseWorld={mouseWorld.current} />
      <AttractedParticles mouseWorld={mouseWorld.current} />
      <RippleRings      mouseWorld={mouseWorld.current} />

    </group>
  );
}
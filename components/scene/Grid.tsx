"use client";
import * as THREE from "three";
import { useRef } from "react";

export function FloorGrid() {
  // Two layered GridHelpers for depth
  return (
    <>
      <gridHelper
        args={[80, 80, "#003344", "#001e2e"]}
        position={[0, -2.1, 0]}
      />
      <gridHelper
        args={[80, 160, "#001520", "#001520"]}
        position={[0, -2.09, 0]}
      />
    </>
  );
}

"use client";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  const mouse   = useRef({ x: 0, y: 0 });
  const haloPos = useRef({ x: 0, y: 0 });
  const raf     = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    // halo lerps behind
    const tick = () => {
      haloPos.current.x += (mouse.current.x - haloPos.current.x) * 0.1;
      haloPos.current.y += (mouse.current.y - haloPos.current.y) * 0.1;

      if (haloRef.current) {
        haloRef.current.style.transform =
          `translate(${haloPos.current.x}px, ${haloPos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* ── dot ── */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "6px", height: "6px",
          marginLeft: "-3px", marginTop: "-3px",
          borderRadius: "50%",
          background: "#00FFD1",
          boxShadow: "0 0 8px #00FFD1, 0 0 16px #00FFD1",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />

      {/* ── halo (lags behind) ── */}
      <div
        ref={haloRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "36px", height: "36px",
          marginLeft: "-18px", marginTop: "-18px",
          borderRadius: "50%",
          border: "1px solid #00FFD1",
          boxShadow: "0 0 12px #00FFD144, inset 0 0 8px #00FFD111",
          background: "radial-gradient(circle, #00FFD108 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
        }}
      />
    </>
  );
}
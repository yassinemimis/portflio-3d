"use client";
import { create } from "zustand";

export type SectionId = "about" | "skills" | "experience" | "projects" | "contact" | null;

interface SectionStore {
  activeSection: SectionId;
  hoveredOrb: string | null;
  introComplete: boolean;
  setSection: (s: SectionId) => void;
  setHovered: (h: string | null) => void;
  setIntro: (v: boolean) => void;
}

export const useSectionStore = create<SectionStore>((set) => ({
  activeSection: null,
  hoveredOrb: null,
  introComplete: false,
  setSection: (s) => set({ activeSection: s }),
  setHovered: (h) => set({ hoveredOrb: h }),
  setIntro: (v) => set({ introComplete: v }),
}));
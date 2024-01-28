import {
  TFrameMaterial,
  TFrameShape,
  TGender,
  TLensType,
} from "../types/eyeglass.type";

export const FRAMEMATERIALS: TFrameMaterial[] = [
  "metal",
  "plastic",
  "acetate",
  "stainless-steel",
  "wood",
  "mixed-materials",
  "other",
] as const;

export const FRAMESHAPES: TFrameShape[] = [
  "round",
  "oval",
  "square",
  "rectangle",
  "wayfarer",
  "cat-eye",
  "aviator",
  "butterfly",
  "round cat eye",
  "semi-rimless",
  "full rimless",
  "browline",
  "clubmaster",
  "windsor",
  "d-frame",
  "pilot",
  "octagon",
  "hexagon",
  "heart",
  "pantoscopic",
  "zyl",
  "wraparound",
  "other",
] as const;

export const LENSTYPES: TLensType[] = [
  "single-vision",
  "bifocal",
  "trifocal",
  "progressive",
  "digital",
  "multifocal",
  "polarized",
  "photochromic",
  "blue-cut",
  "scratch-resistant",
  "anti-reflective",
  "uv-protective",
] as const;

export const GENDERS: TGender[] = ["men", "women", "unisex"] as const;

export type TFrameMaterial =
  | "metal"
  | "plastic"
  | "acetate"
  | "stainless-steel"
  | "wood"
  | "mixed-materials"
  | "other";

export type TFrameShape =
  | "round"
  | "oval"
  | "square"
  | "rectangle"
  | "wayfarer"
  | "cat-eye"
  | "aviator"
  | "butterfly"
  | "round cat eye"
  | "semi-rimless"
  | "full rimless"
  | "browline"
  | "clubmaster"
  | "windsor"
  | "d-frame"
  | "pilot"
  | "octagon"
  | "hexagon"
  | "heart"
  | "pantoscopic"
  | "zyl"
  | "wraparound"
  | "other";

export type TLensType =
  | "single-vision"
  | "bifocal"
  | "trifocal"
  | "progressive"
  | "digital"
  | "multifocal"
  | "polarized"
  | "photochromic"
  | "blue-cut"
  | "scratch-resistant"
  | "anti-reflective"
  | "uv-protective";

export type TGender = "men" | "women" | "unisex";

export type TOtherRelevantAttributes = Record<
  string,
  string | number | boolean
>;

export type TEyeglass = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  frameMaterial: TFrameMaterial;
  frameShape: TFrameShape;
  lensType: TLensType;
  brand: string;
  gender: TGender;
  color: string;
  image: string;
  otherRelevantAttributes: TOtherRelevantAttributes;
  isDeleted: boolean;
};

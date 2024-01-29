export * from "./sale.utils";

/* ---------- String Capitalization ---------- */
export const capitalizeString = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

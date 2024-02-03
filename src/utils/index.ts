import { TOtherRelevantAttributes } from "../types/eyeglass.type";

export * from "./sale.utils";

/* ---------- String Capitalization ---------- */
export const capitalizeString = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/* --------------> Format Other Relevant Attribute <--------------- */
export const formatOtherRelevantAttributes = (inputValue: string) => {
  const otherRelevantAttributes: TOtherRelevantAttributes = {};
  try {
    inputValue
      .split(",")
      .map((eachAttribute: string) => eachAttribute.split(":"))
      .forEach(([key, value]) => {
        const formattedKey = key.trim();
        let formattedValue: any = value.trim();

        if (!isNaN(formattedValue)) {
          formattedValue = Number(formattedValue);
        } else if (formattedValue === "true" || formattedValue === "false") {
          formattedValue = formattedValue === "true" ? true : false;
        }

        otherRelevantAttributes[formattedKey] = formattedValue;
      });
    return otherRelevantAttributes;
  } catch (error) {
    return null;
  }
};

/* --------------> Convert Other Relevant Attribute Into String  <--------------- */
export const convertOtherAttributesIntoString = (
  otherRelevantAttributes: TOtherRelevantAttributes
) => {
  const entries = Object.entries(otherRelevantAttributes);
  return entries.map(([key, value]) => `${key}:${value}`).join(", ");
};

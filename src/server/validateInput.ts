import mongoose from "mongoose";

export function isFilledString(value: unknown): boolean {
  return typeof value === "string" && value.trim() !== "";
}

export function isPositiveNumber(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export function isDatabaseId(value: unknown): boolean {
  return typeof value === "string" && mongoose.isObjectIdOrHexString(value);
}

import sharp from "sharp";
import { ColorTriplet } from "../types.js";
import { sharpHandler } from "./sharp.js";

export async function anyHandler(inputImage: Buffer): Promise<ColorTriplet[][]> {
  return sharpHandler(sharp(inputImage));
}

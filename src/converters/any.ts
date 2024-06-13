import sharp from "sharp";
import { ColorTriplet } from "../types";
import { sharpHandler } from "./sharp";

export async function anyHandler(inputImage: Buffer): Promise<ColorTriplet[][]> {
  return sharpHandler(sharp(inputImage));
}

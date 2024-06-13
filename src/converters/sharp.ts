import type { Sharp } from "sharp";
import { ColorTriplet } from "../types";

export async function sharpHandler(sharpInstance: Sharp): Promise<ColorTriplet[][]> {
  const { data, info } = await sharpInstance
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const rgbArray: ColorTriplet[][] = [];

  for (let y = 0; y < height; y++) {
    const row: ColorTriplet[] = [];
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      row.push([r, g, b]);
    }
    rgbArray.push(row);
  }

  return rgbArray;
}

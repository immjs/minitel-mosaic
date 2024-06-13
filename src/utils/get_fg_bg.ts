import { ColorTriplet } from "../types";
import { computeEuclidianDistance } from "./utils";

export function getFgBg(colors: ColorTriplet[], pixels: ColorTriplet[]) {
  let leastSum = Infinity;
  let mostEfficient: [ColorTriplet, ColorTriplet] | null = null;
  let actualConversionTable: Record<string, boolean> | null = null;
  for (let color1Idx = 0; color1Idx < colors.length; color1Idx += 1) {
    for (let color2Idx = color1Idx + 1; color2Idx < colors.length; color2Idx += 1) {
      const bf: [ColorTriplet, ColorTriplet] = [colors[color1Idx], colors[color2Idx]];
      let sum = 0;
      const conversionTable: Record<string, boolean> = {};
      for (let pixel of pixels) {
        const pixelCloseness = bf.map((v) => computeEuclidianDistance(pixel, v));
        const closest = Math.min(...pixelCloseness);
        sum += closest;
        const fgOrBg = pixelCloseness.indexOf(closest);
        conversionTable[pixel.join()] = Boolean(fgOrBg);
      }
      if (sum < leastSum) {
        leastSum = sum;
        mostEfficient = bf;
        actualConversionTable = conversionTable
      }
    }
  }
  return { bgFg: mostEfficient!, pixelsAsSg: pixels.map((v) => actualConversionTable![v.join()]) };
}

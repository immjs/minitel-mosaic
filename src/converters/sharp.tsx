import type { Sharp } from "sharp";
import { ColorTriplet } from "../types.js";
import { ReactNode, useContext, useState } from "react";
import sharp from "sharp";
import { toRichCharGrid } from "../utils/to_richchargrid.js";
import { minitelContext } from "minitel-react";

export async function SharpImg({ path, defaultComponent: DefaultComponent }: { path: string | Buffer, defaultComponent: () => ReactNode }) {
  const [result, setResult] = useState<ColorTriplet[][] | null>(null);
  const minitel = useContext(minitelContext);

  function resize([height, width]: [number, number]) {
    (async function () {
      const intermediaryStep1 = await sharpHandler(sharp(path).resize(width, height));
      setResult(intermediaryStep1);
    })();
  }

  return result
    ? <mt-disp onResize={resize} grid={toRichCharGrid(result, minitel.colors as ColorTriplet[])} />
    : <mt-cont onResize={resize}><DefaultComponent /></mt-cont>;
}

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

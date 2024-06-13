import { MinitelObject } from "minitel-standalone/dist/abstract/minitelobject";
import { RichCharGrid } from "minitel-standalone/dist/richchargrid";
import { MinitelObjectAttributes } from "minitel-standalone/dist/types";
import { getFgBg } from "../utils/get_fg_bg";
import { ColorTriplet } from "../types";
import { sgToAscii } from "../utils/sg_to_ascii";
import { RichChar } from "minitel-standalone/dist/richchar";

export interface ImageAttributes extends MinitelObjectAttributes {
  imageData: number[][][] | null;
}

export class Image extends MinitelObject<ImageAttributes> {
  static defaultAttributes: ImageAttributes = {
    ...(MinitelObject.defaultAttributes),
    imageData: null,
  };
  defaultAttributes: ImageAttributes = Image.defaultAttributes;
  render(attributes: ImageAttributes, inheritMe: Partial<MinitelObjectAttributes>) {
    const img = attributes.imageData;
    if (img == null) {
      return new RichCharGrid();
    }
    const clusters: ColorTriplet[][] = [];
    // Step 1. Cluster
    for (let y = 0; y < img.length; y += 3) {
      for (let x = 0; x < img[0].length; x += 2) {
        const cluster: ColorTriplet[] = [];
        for (let i = 0; i < 6; i += 1) {
          const newX = x + (i % 2);
          const newY = y + Math.floor(i / 2);

          cluster.push(img[newY][newX] as ColorTriplet);
        }
        clusters.push(cluster);
      }
    }
    
    // Step 2. Collect the best fg/bg pairs
    const fgBgPairs = clusters.map((cluster) => getFgBg(this.minitel.colors as ColorTriplet[], cluster));

    const lookupMap: Record<string, number> = {};

    for (let idx in this.minitel.colors) {
      lookupMap[this.minitel.colors[idx].join()] = +idx;
    }

    const result = new RichCharGrid();
    
    let weAt = 0;
    for (let y = 0; y < img.length; y += 3) {
      let currLine = new RichCharGrid();
      for (let x = 0; x < img[0].length; x += 2) {
        const { pixelsAsSg, bgFg: [bg, fg] } = fgBgPairs[weAt];
        const richChar = new RichChar(sgToAscii(pixelsAsSg), { charset: 1, fg: lookupMap[fg.join()], bg: lookupMap[bg.join()] });
        currLine.mergeX(new RichCharGrid([[richChar]]), 'end');
        weAt += 1;
      }
      result.mergeY(currLine, 'end');
    }
    return result;
  }
}

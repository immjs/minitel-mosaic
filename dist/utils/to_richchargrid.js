import { RichCharGrid } from "minitel-standalone/dist/richchargrid.js";
import { getFgBg } from "./get_fg_bg.js";
import { sgToAscii } from "./sg_to_ascii.js";
import { RichChar } from "minitel-standalone/dist/richchar.js";
export function toRichCharGrid(img, colors) {
    if (img == null) {
        return new RichCharGrid();
    }
    const clusters = [];
    // Step 1. Cluster
    for (let y = 0; y < img.length; y += 3) {
        for (let x = 0; x < img[0].length; x += 2) {
            const cluster = [];
            for (let i = 0; i < 6; i += 1) {
                const newX = x + (i % 2);
                const newY = y + Math.floor(i / 2);
                cluster.push(img[Math.min(newY, img.length - 1)][Math.min(newX, img[0].length - 1)]);
            }
            clusters.push(cluster);
        }
    }
    // Step 2. Collect the best fg/bg pairs
    const fgBgPairs = clusters.map((cluster) => getFgBg(colors, cluster));
    const lookupMap = {};
    for (let idx in colors) {
        lookupMap[colors[idx].join()] = +idx;
    }
    const result = new RichCharGrid();
    let weAt = 0;
    for (let y = 0; y < img.length; y += 3) {
        let currLine = new RichCharGrid();
        for (let x = 0; x < img[0].length; x += 2) {
            const { pixelsAsSg, bgFg: [bg, fg] } = fgBgPairs[weAt];
            const chr = sgToAscii(pixelsAsSg);
            const richChar = new RichChar(chr, { charset: 1, fg: lookupMap[fg.join()], bg: lookupMap[bg.join()] });
            currLine.mergeX(new RichCharGrid([[richChar]]), 'end');
            weAt += 1;
        }
        result.mergeY(currLine, 'end');
    }
    return result;
}

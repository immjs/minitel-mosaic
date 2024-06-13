"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFgBg = void 0;
const utils_1 = require("./utils");
function getFgBg(colors, pixels) {
    let leastSum = Infinity;
    let mostEfficient = null;
    let actualConversionTable = null;
    for (let color1Idx = 0; color1Idx < colors.length; color1Idx += 1) {
        for (let color2Idx = color1Idx + 1; color2Idx < colors.length; color2Idx += 1) {
            const bf = [colors[color1Idx], colors[color2Idx]];
            let sum = 0;
            const conversionTable = {};
            for (let pixel of pixels) {
                const pixelCloseness = bf.map((v) => (0, utils_1.computeEuclidianDistance)(pixel, v));
                const closest = Math.min(...pixelCloseness);
                sum += closest;
                const fgOrBg = pixelCloseness.indexOf(closest);
                conversionTable[pixel.join()] = Boolean(fgOrBg);
            }
            if (sum < leastSum) {
                leastSum = sum;
                mostEfficient = bf;
                actualConversionTable = conversionTable;
            }
        }
    }
    return { bgFg: mostEfficient, pixelsAsSg: pixels.map((v) => actualConversionTable[v.join()]) };
}
exports.getFgBg = getFgBg;

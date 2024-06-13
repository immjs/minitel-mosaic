"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharpHandler = void 0;
async function sharpHandler(sharpInstance) {
    const { data, info } = await sharpInstance
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    const rgbArray = [];
    for (let y = 0; y < height; y++) {
        const row = [];
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
exports.sharpHandler = sharpHandler;

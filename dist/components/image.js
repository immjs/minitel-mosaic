"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const minitelobject_1 = require("minitel-standalone/dist/abstract/minitelobject");
const richchargrid_1 = require("minitel-standalone/dist/richchargrid");
const get_fg_bg_1 = require("../utils/get_fg_bg");
const sg_to_ascii_1 = require("../utils/sg_to_ascii");
const richchar_1 = require("minitel-standalone/dist/richchar");
class Image extends minitelobject_1.MinitelObject {
    constructor() {
        super(...arguments);
        this.defaultAttributes = Image.defaultAttributes;
    }
    render(attributes, inheritMe) {
        const img = attributes.imageData;
        if (img == null) {
            return new richchargrid_1.RichCharGrid();
        }
        const clusters = [];
        // Step 1. Cluster
        for (let y = 0; y < img.length; y += 3) {
            for (let x = 0; x < img[0].length; x += 2) {
                const cluster = [];
                for (let i = 0; i < 6; i += 1) {
                    const newX = x + (i % 2);
                    const newY = y + Math.floor(i / 2);
                    cluster.push(img[newY][newX]);
                }
                clusters.push(cluster);
            }
        }
        // Step 2. Collect the best fg/bg pairs
        const fgBgPairs = clusters.map((cluster) => (0, get_fg_bg_1.getFgBg)(this.minitel.colors, cluster));
        const lookupMap = {};
        for (let idx in this.minitel.colors) {
            lookupMap[this.minitel.colors[idx].join()] = +idx;
        }
        const result = new richchargrid_1.RichCharGrid();
        let weAt = 0;
        for (let y = 0; y < img.length; y += 3) {
            let currLine = new richchargrid_1.RichCharGrid();
            for (let x = 0; x < img[0].length; x += 2) {
                const { pixelsAsSg, bgFg: [bg, fg] } = fgBgPairs[weAt];
                const richChar = new richchar_1.RichChar((0, sg_to_ascii_1.sgToAscii)(pixelsAsSg), { charset: 1, fg: lookupMap[fg.join()], bg: lookupMap[bg.join()] });
                currLine.mergeX(new richchargrid_1.RichCharGrid([[richChar]]), 'end');
                weAt += 1;
            }
            result.mergeY(currLine, 'end');
        }
        return result;
    }
}
exports.Image = Image;
Image.defaultAttributes = {
    ...(minitelobject_1.MinitelObject.defaultAttributes),
    imageData: null,
};

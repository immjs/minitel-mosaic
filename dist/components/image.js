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
    getDimensions(attributes, inheritMe) {
        return { width: Math.ceil((attributes.imageData?.[0].length || 0) / 3), height: Math.ceil((attributes.imageData?.length || 0) / 2) };
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
                    cluster.push(img[Math.min(newY, img.length - 1)][Math.min(newX, img[0].length - 1)]);
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
                const chr = (0, sg_to_ascii_1.sgToAscii)(pixelsAsSg);
                const richChar = new richchar_1.RichChar(chr, { charset: 1, fg: lookupMap[fg.join()], bg: lookupMap[bg.join()] });
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

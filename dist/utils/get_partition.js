"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartition = void 0;
const utils_1 = require("./utils");
function getPartition(partition, pixels) {
    const result = [];
    for (let pixelIdx in pixels) {
        let smallestDistance = Infinity;
        let closestColor = -1;
        for (let colorIdx in partition) {
            const distance = (0, utils_1.computeEuclidianDistance)(pixels[pixelIdx], partition[colorIdx]);
            if (smallestDistance > distance) {
                smallestDistance = distance;
                closestColor = +colorIdx;
            }
            result[pixelIdx] = closestColor;
        }
    }
    return result;
}
exports.getPartition = getPartition;

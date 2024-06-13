"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeEuclidianDistance = void 0;
function computeEuclidianDistance([x1, y1, z1], [x2, y2, z2]) {
    return Math.hypot(x1 - x2, y1 - y2, z1 - z2);
}
exports.computeEuclidianDistance = computeEuclidianDistance;

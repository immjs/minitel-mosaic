"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sgToAscii = void 0;
function sgToAscii(sg) {
    let result = 32;
    result += +sg[0];
    result += 2 * (+sg[1]);
    result += 4 * (+sg[2]);
    result += 8 * (+sg[3]);
    result += 16 * (+sg[4]);
    result += 64 * (+sg[5]);
    if (result === 127) {
        result = 95;
    }
    return String.fromCharCode(result);
}
exports.sgToAscii = sgToAscii;

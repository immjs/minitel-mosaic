"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyHandler = void 0;
const sharp_1 = __importDefault(require("sharp"));
const sharp_2 = require("./sharp");
async function anyHandler(inputImage) {
    return (0, sharp_2.sharpHandler)((0, sharp_1.default)(inputImage));
}
exports.anyHandler = anyHandler;

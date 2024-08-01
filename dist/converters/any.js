import sharp from "sharp";
import { sharpHandler } from "./sharp.js";
export async function anyHandler(inputImage) {
    return sharpHandler(sharp(inputImage));
}

import type { Sharp } from "sharp";
import { ColorTriplet } from "../types.js";
export declare function sharpHandler(sharpInstance: Sharp): Promise<ColorTriplet[][]>;

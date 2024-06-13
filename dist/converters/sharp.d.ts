import type { Sharp } from "sharp";
import { ColorTriplet } from "../types";
export declare function sharpHandler(sharpInstance: Sharp): Promise<ColorTriplet[][]>;

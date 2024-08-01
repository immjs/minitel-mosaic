import { ColorTriplet } from "../types.js";
export declare function getFgBg(colors: ColorTriplet[], pixels: ColorTriplet[]): {
    bgFg: [ColorTriplet, ColorTriplet];
    pixelsAsSg: boolean[];
};

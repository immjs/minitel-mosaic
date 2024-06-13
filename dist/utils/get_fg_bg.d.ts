import { ColorTriplet } from "../types";
export declare function getFgBg(colors: ColorTriplet[], pixels: ColorTriplet[]): {
    bgFg: [ColorTriplet, ColorTriplet];
    pixelsAsSg: boolean[];
};

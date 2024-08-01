import { MinitelObject } from "minitel-standalone/dist/abstract/minitelobject.js";
import { RichCharGrid } from "minitel-standalone/dist/richchargrid.js";
import { MinitelObjectAttributes } from "minitel-standalone/dist/types.js";
export interface ImageAttributes extends MinitelObjectAttributes {
    imageData: number[][][] | null;
}
export declare class Image extends MinitelObject<ImageAttributes> {
    static defaultAttributes: ImageAttributes;
    defaultAttributes: ImageAttributes;
    getDimensions(attributes: ImageAttributes, inheritMe: Partial<ImageAttributes>): {
        width: number;
        height: number;
    };
    render(attributes: ImageAttributes, inheritMe: Partial<MinitelObjectAttributes>): RichCharGrid;
}

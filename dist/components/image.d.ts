import { MinitelObject } from "minitel-standalone/dist/abstract/minitelobject";
import { RichCharGrid } from "minitel-standalone/dist/richchargrid";
import { MinitelObjectAttributes } from "minitel-standalone/dist/types";
export interface ImageAttributes extends MinitelObjectAttributes {
    imageData: number[][][] | null;
}
export declare class Image extends MinitelObject<ImageAttributes> {
    static defaultAttributes: ImageAttributes;
    defaultAttributes: ImageAttributes;
    render(attributes: ImageAttributes, inheritMe: Partial<MinitelObjectAttributes>): RichCharGrid;
}

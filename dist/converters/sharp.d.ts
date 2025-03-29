/// <reference types="node" resolution-mode="require"/>
import type { Sharp } from "sharp";
import { ColorTriplet } from "../types.js";
import { ReactNode } from "react";
export declare function SharpImg({ path, defaultComponent: DefaultComponent }: {
    path: string | Buffer;
    defaultComponent: () => ReactNode;
}): Promise<import("react/jsx-runtime").JSX.Element>;
export declare function sharpHandler(sharpInstance: Sharp): Promise<ColorTriplet[][]>;

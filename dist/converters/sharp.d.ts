/// <reference types="node" resolution-mode="require"/>
import type { Sharp } from "sharp";
import { ColorTriplet } from "../types.js";
import { ReactNode } from "react";
import { MinitelObjectAttributes } from "minitel-standalone/dist/types.js";
export declare function SharpImg({ path, defaultComponent: DefaultComponent, ...props }: {
    path: string | Buffer;
    defaultComponent: () => ReactNode;
} & Partial<MinitelObjectAttributes>): import("react/jsx-runtime").JSX.Element;
export declare function sharpHandler(sharpInstance: Sharp): Promise<ColorTriplet[][]>;

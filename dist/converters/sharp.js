import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useState } from "react";
import sharp from "sharp";
import { toRichCharGrid } from "../utils/to_richchargrid.js";
import { minitelContext } from "minitel-react";
export async function SharpImg({ path, defaultComponent: DefaultComponent, ...props }) {
    const [result, setResult] = useState(null);
    const minitel = useContext(minitelContext);
    function resize([height, width]) {
        (async function () {
            const intermediaryStep1 = await sharpHandler(sharp(path).resize(width, height));
            setResult(intermediaryStep1);
        })();
    }
    return result
        ? _jsx("mt-disp", { onResize: resize, grid: toRichCharGrid(result, minitel.colors) })
        : _jsx("mt-cont", { onResize: resize, children: _jsx(DefaultComponent, {}) });
}
export async function sharpHandler(sharpInstance) {
    const { data, info } = await sharpInstance
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;
    const rgbArray = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * channels;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            row.push([r, g, b]);
        }
        rgbArray.push(row);
    }
    return rgbArray;
}

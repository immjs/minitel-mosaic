import { ColorTriplet } from "../types.js";

export function computeEuclidianDistance([x1, y1, z1]: ColorTriplet, [x2, y2, z2]: ColorTriplet) {
  return Math.hypot(x1-x2, y1-y2, z1-z2);
}

export function computeEuclidianDistance([x1, y1, z1], [x2, y2, z2]) {
    return Math.hypot(x1 - x2, y1 - y2, z1 - z2);
}

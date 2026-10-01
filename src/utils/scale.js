/**
 * Maps a data x-value to a horizontal pixel position on the canvas.
 * Degenerate range (minX === maxX) short-circuits to the midpoint — otherwise
 * `(x - minX) / (maxX - minX)` divides by zero and renders NaN silently.
 * @param {number} x - The data x-value.
 * @param {number} minX - Smallest x in the dataset.
 * @param {number} maxX - Largest x in the dataset.
 * @param {number} width - Canvas width in pixels.
 * @param {number} padding - Padding in pixels on each side.
 * @returns {number} The pixel x-coordinate.
 */
export const toPixelX = (x, minX, maxX, width, padding) =>
  maxX === minX
    ? width / 2
    : padding + ((x - minX) / (maxX - minX)) * (width - 2 * padding)

/**
 * Maps a data y-value to a vertical pixel position.
 * Canvas Y grows downward, but "higher value = higher up" is what readers expect,
 * so this flips with `height - padding - ...`.
 * Degenerate range (minY === maxY) short-circuits to the midpoint for the same
 * reason as toPixelX.
 * @param {number} y - The data y-value.
 * @param {number} minY - Smallest y in the dataset.
 * @param {number} maxY - Largest y in the dataset.
 * @param {number} height - Canvas height in pixels.
 * @param {number} padding - Padding in pixels on each side.
 * @returns {number} The pixel y-coordinate.
 */
export const toPixelY = (y, minY, maxY, height, padding) =>
  maxY === minY
    ? height / 2
    : height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding)

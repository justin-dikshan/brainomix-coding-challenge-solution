/**
 * Maps a data x-value to a horizontal pixel position on the canvas.
 * @param {number} x - The data x-value.
 * @param {number} minX - Smallest x in the dataset.
 * @param {number} maxX - Largest x in the dataset.
 * @param {number} W - Canvas width in pixels.
 * @param {number} pad - Padding in pixels on each side.
 * @returns {number} The pixel x-coordinate.
 */
export const toPx = (x, minX, maxX, W, pad) =>
  maxX === minX ? W / 2 : pad + ((x - minX) / (maxX - minX)) * (W - 2 * pad)

/**
 * Maps a data y-value to a vertical pixel position (flipped: higher values sit higher up).
 * @param {number} y - The data y-value.
 * @param {number} minY - Smallest y in the dataset.
 * @param {number} maxY - Largest y in the dataset.
 * @param {number} H - Canvas height in pixels.
 * @param {number} pad - Padding in pixels on each side.
 * @returns {number} The pixel y-coordinate.
 */
export const toPy = (y, minY, maxY, H, pad) =>
  maxY === minY ? H / 2 : H - pad - ((y - minY) / (maxY - minY)) * (H - 2 * pad)

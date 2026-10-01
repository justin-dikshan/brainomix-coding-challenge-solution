/**
 * Computes the min and max x/y across all points of all series.
 * Returns undefined for an empty input so callers can short-circuit before drawing.
 * @param {Array} items - The array of series (each with a `points` array).
 * @returns {{minX: number, maxX: number, minY: number, maxY: number} | undefined}
 */
export function computeMinMax(items = []) {
  if (!items.length) return
  // guard every item against missing `points`, no crash on malformed input
  const allPoints = items.flatMap((item) => item.points ?? [])
  // guard the all-empty-points case, no ±Infinity bounds silently drawn
  if (!allPoints.length) return
  const minX = Math.min(...allPoints.map((point) => point.x))
  const maxX = Math.max(...allPoints.map((point) => point.x))
  const minY = Math.min(...allPoints.map((point) => point.y))
  const maxY = Math.max(...allPoints.map((point) => point.y))
  return { minX, maxX, minY, maxY }
}

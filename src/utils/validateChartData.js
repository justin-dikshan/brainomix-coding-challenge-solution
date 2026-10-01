/**
 * Returns true when `json` matches the chart data shape:
 * an `items` array where every item has a `points` array of {x: number, y: number}.
 * Checked at the fetch boundary so the chart components can trust their inputs.
 * @param {unknown} json - Parsed response body to validate.
 * @returns {boolean}
 */
export function isValidChartData(json) {
  // short-circuits left-to-right: bail on the cheapest check first (items is an array)
  // before walking every point. optional chaining handles null/undefined payloads.
  return (
    Array.isArray(json?.items) &&
    json.items.every((i) => Array.isArray(i?.points) && i.points.every(isValidPoint))
  )
}

/**
 * True when `point` has numeric x and y coordinates.
 * Non-numeric values would silently produce NaN pixels and render a blank chart,
 * so we reject them here instead.
 * @param {unknown} point - Candidate point to check.
 * @returns {boolean}
 */
const isValidPoint = (point) =>
  typeof point?.x === 'number' && typeof point?.y === 'number'

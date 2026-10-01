# notes

## decisions

- redux for the theme toggle, nothing else needs global state.
- one custom hook (`useChartData`) that handles fetch, abort and validation.
- anything pure (scale math, bounds, validation) lives in `utils/` so I can test it on its own.
- min/max is computed from the data, not hardcoded, so a different endpoint still works.
- sort points by x before drawing in case the next endpoint sends them unordered.
- responsive layout. the chart follows its parent with `ResizeObserver`. under 640px the sidebar becomes a horizontal bar via a media query.

## things I considered and skipped

- `StatusBanner` as its own file. only one caller for now so I kept it inline.
- axis labels and ticks. brief says optional, left them out and can be done as improvements later.
- legend click-to-toggle.

## things I changed or removed

- `computeMinMax` was originally inside `Chart.jsx`. pulled it out so I could test it on its own.
- renamed `useChart.js` to `useChartData.js` so the filename matches the export.
- renamed `toPx`/`toPy` to `toPixelX`/`toPixelY` so they read without needing JSDoc.

## problems / unfamiliar bits

- canvas was blurry on retina at first. took me a bit to figure out the DPR trick (bitmap = cssSize × dpr, then scale the context so draw calls can stay in CSS units)
- chart was overflowing the card on resize. ended up being that I was observing the canvas itself instead of the parent. canvas never changes size on its own because I was setting `style.width` imperatively, so the observer never fired
- considered `window.resize` for the chart. the parent's width can change without the window resizing, so `ResizeObserver` on the parent is what redraws it

## bugs I found and fixed

- validation accepted `items: [{points: []}]` and the bounds collapsed to ±Infinity silently. added `if (!allPoints.length) return`
- used `series.name` as the React key in the legend. would break on duplicate names from a different endpoint. switched to `name-index`
- `finally { setLoading(false) }` fires on abort too. if `url` ever changes while a fetch is in-flight, the aborted request would clear loading after the new one had set it. removed `finally`, set loading explicitly on success and catch instead
- validation originally only checked arrays. a point with `x: "a"` would pass and then render nothing. tightened it to `typeof x === 'number'` so bad data throws a visible error now

## trade-offs

- height is fixed at 400px. a width-based ratio looked weird on narrow screens so I left it
- no canvas pixel tests. bounds and pixel mapping are covered in utils. the draw loop also sorts points and strokes axes, but checking pixels needs a canvas mock that is not installed..

## what I'd do with more time

- click a legend item to show/hide that series
- Add axies with labels
- split the chart effect in two so the ResizeObserver isn't rebuilt every time `data` changes
- react to DPR changes when the window moves between displays. `draw()` already reads `devicePixelRatio`, but nothing calls it unless the parent also resizes
- hoist the point sort out of the draw path (useMemo, or sort in the hook) so a window drag doesn't re-sort every frame
- persist the theme in localStorage so a refresh doesn't reset it. the `data-theme` effect would need to move to `Layout` at the same time, otherwise a restored dark theme sits in Redux while `/chart` still renders light
- pull `StatusBanner` into its own file if a second page ever needs it

## resources

- MDN for the canvas API (`moveTo`/`lineTo`, DPR trick)
- MDN for `ResizeObserver`, picked it over `window.resize` because the parent can change size without the window changing
- Redux Toolkit docs for the slice shape (always forget it)
- used AI to tighten the JSDoc and inline comments on the components and utils. 

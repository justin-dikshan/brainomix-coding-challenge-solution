import { useRef, useEffect } from 'react'
import { toPixelX, toPixelY } from '../../utils/scale'
import { computeMinMax } from '../../utils/computeMinMax'

const PADDING = 40
const DEFAULT_HEIGHT = 400

/**
 * Clears the canvas and renders the axes and each data series on top.
 * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
 * @param {Array} series - The array of series (each with color and points).
 * @param {number} width - CSS width of the canvas in pixels.
 * @param {number} height - CSS height of the canvas in pixels.
 */
function drawChart(canvas, series, width, height) {
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, width, height)
  if (!series?.length) return
  const bounds = computeMinMax(series)
  if (!bounds) return
  drawAxes(context, width, height)
  drawSeries(context, width, height, series, bounds)
}

/**
 * Draws the L-shaped chart frame: vertical Y axis on the left, horizontal X axis at the bottom.
 * @param {CanvasRenderingContext2D} context - The 2D drawing context.
 * @param {number} width - CSS width of the canvas in pixels.
 * @param {number} height - CSS height of the canvas in pixels.
 */
function drawAxes(context, width, height) {
  context.strokeStyle = '#888'
  context.lineWidth = 1
  context.beginPath()
  context.moveTo(PADDING, PADDING)
  context.lineTo(PADDING, height - PADDING)
  context.lineTo(width - PADDING, height - PADDING)
  context.stroke()
}

/**
 * Draws each series as a polyline. Points are sorted by x so unordered input still renders left-to-right.
 * @param {CanvasRenderingContext2D} context - The 2D drawing context.
 * @param {number} width - CSS width of the canvas in pixels.
 * @param {number} height - CSS height of the canvas in pixels.
 * @param {Array} series - The array of series (each with color and points).
 * @param {{minX: number, maxX: number, minY: number, maxY: number}} bounds - Data bounds across all series.
 */
function drawSeries(context, width, height, series, bounds) {
  const { minX, maxX, minY, maxY } = bounds
  for (const line of series) {
    context.beginPath()
    context.strokeStyle = line.color
    // sort defensively — the brief says a different endpoint may be used, and unsorted
    // points would draw a zig-zag line going backwards instead of a left-to-right polyline
    const sortedPoints = [...line.points].sort((a, b) => a.x - b.x)
    for (const [index, point] of sortedPoints.entries()) {
      const pixelX = toPixelX(point.x, minX, maxX, width, PADDING)
      const pixelY = toPixelY(point.y, minY, maxY, height, PADDING)
      // moveTo lifts the pen for the first point; lineTo drags it for every subsequent one
      index === 0 ? context.moveTo(pixelX, pixelY) : context.lineTo(pixelX, pixelY)
    }
    context.stroke()
  }
}

/**
 * Renders the chart on an HTML canvas: sizes the canvas to its parent (HiDPI-aware),
 * redraws on data change or container resize, and cleans up the observer on unmount.
 * @param {object} props - Component props.
 * @param {Array} props.data - The series to draw (each with color and points).
 */
export default function Chart({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    /** Sizes the canvas to its parent (HiDPI-aware) and redraws the chart. */
    const draw = () => {
      // on retina, 1 CSS pixel = 2 device pixels. Draw into a bitmap that's
      // `cssSize * dpr`, display at `cssSize`, and scale the context so drawing
      // commands can keep thinking in CSS pixels — otherwise lines look blurry.
      const devicePixelRatio = window.devicePixelRatio || 1
      const cssWidth = canvas.parentElement.clientWidth
      const cssHeight = DEFAULT_HEIGHT
      canvas.width = cssWidth * devicePixelRatio
      canvas.height = cssHeight * devicePixelRatio
      canvas.style.width = cssWidth + 'px'
      canvas.style.height = cssHeight + 'px'
      canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio)
      drawChart(canvas, data, cssWidth, cssHeight)
    }
    draw()
    // observe the parent, not the canvas itself — the canvas size is set imperatively
    // by `draw`, so observing it would never fire when the window/layout changes.
    const resizeObserver = new ResizeObserver(draw)
    resizeObserver.observe(canvas.parentElement)

    return () => resizeObserver.disconnect()
  }, [data])

  return (
    <div className="chart-container">
      <canvas ref={canvasRef} />
    </div>
  )
}

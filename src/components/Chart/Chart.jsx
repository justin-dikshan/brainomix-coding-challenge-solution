import { useRef, useEffect } from 'react'
import { toPx, toPy } from '../../utils/scale'

const PADDING = 40

/**
 * Clears the canvas and renders the axes, ticks with numeric labels, and each data line.
 * @param {HTMLCanvasElement} canvas - The canvas element to draw on.
 * @param {Array} data - The array of lines (each with color and points).
 * @param {number} WIDTH - CSS width of the canvas in pixels.
 * @param {number} HEIGHT - CSS height of the canvas in pixels.
 */
function drawChart(canvas, data, WIDTH, HEIGHT) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  if (!data?.length) return
  const { minX, maxX, minY, maxY } = computeMinMax(data)
  drawAxes(ctx, WIDTH, HEIGHT)
  drawLines(ctx, WIDTH, HEIGHT, data, minX, maxX, minY, maxY)
}

/**
 * Draws the L-shaped chart frame: vertical Y axis on the left, horizontal X axis at the bottom.
 * @param {CanvasRenderingContext2D} ctx - The 2D drawing context.
 * @param {number} WIDTH - CSS width of the canvas in pixels.
 * @param {number} HEIGHT - CSS height of the canvas in pixels.
 */
function drawAxes(ctx, WIDTH, HEIGHT) {
  ctx.strokeStyle = '#888'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(PADDING, PADDING)
  ctx.lineTo(PADDING, HEIGHT - PADDING)
  ctx.lineTo(WIDTH - PADDING, HEIGHT - PADDING)
  ctx.stroke()
}

/**
 * Draws each data series as a polyline. Points are sorted by x so unordered input still renders left-to-right.
 * @param {CanvasRenderingContext2D} ctx - The 2D drawing context.
 * @param {number} WIDTH - CSS width of the canvas in pixels.
 * @param {number} HEIGHT - CSS height of the canvas in pixels.
 * @param {Array} data - The array of lines (each with color and points).
 * @param {number} minX - Smallest x in the dataset.
 * @param {number} maxX - Largest x in the dataset.
 * @param {number} minY - Smallest y in the dataset.
 * @param {number} maxY - Largest y in the dataset.
 */
function drawLines(ctx, WIDTH, HEIGHT, data, minX, maxX, minY, maxY) {
  for (const item of data) {
    ctx.beginPath()
    ctx.strokeStyle = item.color
    const points = [...item.points].sort((a, b) => a.x - b.x)
    for (const [index, point] of points.entries()) {
      const x = toPx(point.x, minX, maxX, WIDTH, PADDING)
      const y = toPy(point.y, minY, maxY, HEIGHT, PADDING)
      index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}
/**
 * Computes the min and max x/y across all points of all lines.
 * @param {Array} items - The array of lines.
 * @returns {{minX: number, maxX: number, minY: number, maxY: number}} The data bounds.
 */
function computeMinMax(items = []) {
  if (!items.length) return
  const allPoints = items.flatMap((item) => item.points)
  const minX = Math.min(...allPoints.map((point) => point.x))
  const maxX = Math.max(...allPoints.map((point) => point.x))
  const minY = Math.min(...allPoints.map((point) => point.y))
  const maxY = Math.max(...allPoints.map((point) => point.y))
  return { minX, maxX, minY, maxY }
}

/**
 * Renders the chart on an HTML canvas: sizes the canvas to its parent (HiDPI-aware),
 * redraws on data change or container resize, and cleans up the observer on unmount.
 * @param {object} props - Component props.
 * @param {Array} props.data - The series to draw (each with color and points).
 */
export default function Chart({ data }) {
  const chartRef = useRef(null)

  useEffect(() => {
    const canvas = chartRef.current
    if (!canvas) return
    /** Sizes the canvas to its parent (HiDPI-aware) and redraws the chart. */
    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const cssWidth = canvas.parentElement.clientWidth
      const cssHeight = 400
      canvas.width = cssWidth * dpr
      canvas.height = cssHeight * dpr
      canvas.style.width = cssWidth + 'px'
      canvas.style.height = cssHeight + 'px'
      canvas.getContext('2d').scale(dpr, dpr)
      drawChart(canvas, data, cssWidth, cssHeight)
    }
    draw()
    const resizeObserver = new ResizeObserver(draw)
    resizeObserver.observe(canvas.parentElement)

    return () => resizeObserver.disconnect()
  }, [data])

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  )
}

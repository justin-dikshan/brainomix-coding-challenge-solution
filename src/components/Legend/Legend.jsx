import './legend.scss'

/**
 * Horizontal list of series names with color swatches, driven by the same data as the chart.
 * @param {object} props - Component props.
 * @param {Array} props.data - The series to list (each with name and color).
 */
export default function Legend({ data }) {
  return (
    <ul className="chart-legend">
      {data?.map((series, index) => (
        <li key={`${series?.name ?? 'series'}-${index}`}>
          <span className="swatch" style={{ background: series.color }} />
          {series.name}
        </li>
      ))}
    </ul>
  )
}
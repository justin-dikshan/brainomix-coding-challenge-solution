import Header from '../components/Header/Header'
import Chart from '../components/Chart/Chart'
import useChartData from '../hooks/useChartData'
import Legend from '../components/Legend/Legend'
/**
 * Centered status banner (e.g. Loading / Error).
 * @param {object} props - Component props.
 * @param {string} props.label - Short label shown first (e.g. "Loading", "Error").
 * @param {string} [props.detail] - Optional detail appended after ": ".
 * @param {string} props.color - CSS color for the text.
 */
const StatusBanner = ({ label, detail = '', color }) => {
  return (
    <div className="status" style={{ '--status-color': color }}>
      <h2>
        {label}
        {detail && `: ${detail}`}
      </h2>
    </div>
  )
}

/** Chart route: fetches the series and renders the canvas chart, with loading/error fallbacks. */
export default function ChartPage() {
  const { data: chartSeries, loading: isLoading, error: fetchError } = useChartData()
  return (
    <div>
      <Header>
        <h1>Chart</h1>
      </Header>
      {isLoading ? (
        <StatusBanner label="Loading..." color="var(--loading-text)" />
      ) : fetchError ? (
        <StatusBanner
          label="Error"
          color="var(--error-text)"
          detail={fetchError?.message ?? 'Error fetching Data'}
        />
      ) : (
        <>
          <Chart data={chartSeries} />
          <Legend data={chartSeries} />
        </>
      )}
    </div>
  )
}

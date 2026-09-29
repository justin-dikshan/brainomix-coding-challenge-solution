import Header from '../components/Header/Header'
import Chart from '../components/Chart/Chart'
import useChartData from '../hooks/useChart'

/**
 * Centered status banner (e.g. Loading / Error).
 * @param {object} props - Component props.
 * @param {string} props.status - Short label shown first (e.g. "Loading", "Error").
 * @param {string} [props.message] - Optional detail appended after ": ".
 * @param {string} props.color - CSS color for the text.
 */
const Status = ({ status, message = '', color }) => {
  return (
    <div className="status" style={{ '--status-color': color }}>
      <h2>
        {status}
        {message && `: ${message}`}
      </h2>
    </div>
  )
}

/** Chart route: fetches the series and renders the canvas chart, with loading/error fallbacks. */
export default function ChartPage() {
  const { data, loading, error } = useChartData()
  return (
    <div>
      <Header>
        <h1>Chart</h1>
      </Header>
      {loading ? (
        <Status status={'Loading....'} color={'var(--loading-text)'} />
      ) : error ? (
        <Status
          status={'Error'}
          color={'var(--error-text)'}
          message={error?.message ?? 'Error fetching Data'}
        />
      ) : (
        <Chart data={data} />
      )}
    </div>
  )
}

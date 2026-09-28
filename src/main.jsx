import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Layout from './components/Layout'
import ChartPage from './pages/ChartPage'
import SettingsPage from './pages/SettingsPage'

/**
 * Application shell with routes for the chart and settings pages.
 * @returns {JSX.Element}
 */
export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/chart" />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/*" element={<Navigate to="/chart" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

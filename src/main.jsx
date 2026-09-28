import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Layout from './components/Layout/Layout'
import ChartPage from './pages/ChartPage'
import SettingsPage from './pages/SettingsPage'

/** `/` and anything we don't recognise both go to the chart. */
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

import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../store/settingsSlice'
/**
 * Settings page.
 * @returns {JSX.Element}
 */
export default function SettingsPage() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.appSettings.theme)
  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }
  return (
    <div>
      <h1>SettingsPage</h1>
      <button onClick={handleThemeToggle}>Toggle Theme</button>
      <p>Current Theme: {theme}</p>
    </div>
  )
}

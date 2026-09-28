import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../store/settingsSlice'
import { useEffect } from 'react'
import Button from '../components/Buttons/Button'
import Header from '../components/Header/Header'
import SettingsLineItem from '../components/SettingsLineItem/SettingsLineItem'
/** Theme is stored in Redux and copied onto `<html data-theme>` so the CSS variables follow it. */
export default function SettingsPage() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.appSettings.theme)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  /** Sends the theme toggle to the store. */
  const handleThemeToggle = () => {
    dispatch(toggleTheme())
  }
  return (
    <div>
      <Header>
        <h1>Settings</h1>
      </Header>
      <SettingsLineItem
        title="Theme"
        value={<Button onClick={handleThemeToggle}>{theme === 'light' ? 'Dark' : 'Light'}</Button>}
      />
    </div>
  )
}

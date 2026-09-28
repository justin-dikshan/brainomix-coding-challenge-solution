import { NavLink } from 'react-router'
import './navigation.scss'

/** Chart and settings links. Active route picks up `.active` from NavLink. */
export default function Navigation() {
  return (
    <div className="navigation">
      <NavLink to="/chart">CHART</NavLink>
      <NavLink to="/settings">SETTINGS</NavLink>
    </div>
  )
}

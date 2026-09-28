import { Outlet, NavLink } from 'react-router'
import Navigation from '../Navigation/Navigation'
import './layout.scss'
/** Sidebar on the left, the matched route in the outlet. */
const Layout = () => {
  return (
    <div className="layout">
      <div className="left-sidebar">
        <Navigation />
      </div>
      <div className="right-content">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

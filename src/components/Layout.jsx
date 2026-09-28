import { Outlet } from 'react-router'
/**
 * Layout component
 * @returns {JSX.Element}
 */
export default function Layout() {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  )
}

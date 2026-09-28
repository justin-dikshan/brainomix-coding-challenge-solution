import './header.scss'

/**
 * Page title slot. Pass the heading as children.
 * @param {object} root0 Props.
 * @param {import('react').ReactNode} root0.children Heading or other title content.
 */
export default function Header({ children }) {
  return <div className="header">{children}</div>
}

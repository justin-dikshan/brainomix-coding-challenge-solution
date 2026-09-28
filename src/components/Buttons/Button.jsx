import './button.scss'

/**
 * Primary button. The click handler is optional.
 * @param {object} root0 Props.
 * @param {import('react').ReactNode} root0.children What the button shows.
 * @param {() => void} [root0.onClick] Runs on click. No-op if omitted.
 */
export default function Button({ children, onClick = () => {} }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

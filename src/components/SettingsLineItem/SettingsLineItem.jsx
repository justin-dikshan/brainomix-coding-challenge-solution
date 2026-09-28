import './lineItem.scss'

/**
 * One settings row: label on the left, control on the right.
 * @param {object} root0 Props.
 * @param {string} root0.title Label for the row.
 * @param {import('react').ReactNode} root0.value Control or text shown beside the label.
 */
export default function SettingsLineItem({ title, value }) {
  return (
    <div className="settings-line-item">
      <div>
        <h3>{title}</h3>
      </div>
      <div>
        <p>{value}</p>
      </div>
    </div>
  )
}

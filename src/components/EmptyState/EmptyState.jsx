import Icon from '../Icon/Icon.jsx'
import './EmptyState.css'

export default function EmptyState({ icon = 'inbox', title, description, action }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state__icon" aria-hidden="true">
        <Icon name={icon} size={24} />
      </span>
      <h3 className="empty-state__title">{title}</h3>
      {description && <p className="empty-state__description">{description}</p>}
      {action && (
        <button type="button" className="btn btn--ghost empty-state__action" onClick={action.onClick}>
          {action.icon && <Icon name={action.icon} size={16} />}
          {action.label}
        </button>
      )}
    </div>
  )
}

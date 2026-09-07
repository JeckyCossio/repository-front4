import { getPriorityLabel } from '../../utils/priority.js'
import './PriorityBadge.css'

export default function PriorityBadge({ priority }) {
  return (
    <span className={`priority-badge priority-badge--${priority}`}>
      <span className="priority-badge__dot" aria-hidden="true" />
      <span className="visually-hidden">Prioridade </span>
      {getPriorityLabel(priority)}
    </span>
  )
}

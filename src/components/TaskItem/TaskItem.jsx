import { useState } from 'react'
import Icon from '../Icon/Icon.jsx'
import PriorityBadge from '../PriorityBadge/PriorityBadge.jsx'
import { formatDate, getDueStatus } from '../../utils/date.js'
import './TaskItem.css'

/*
 * Card de uma tarefa. Recebe a tarefa e três callbacks do App (via TaskList):
 * onToggle (concluir), onEdit (editar) e onRemove (remover).
 */
export default function TaskItem({ task, onToggle, onEdit, onRemove }) {
  // React Hook `useState`: controla a confirmação inline de remoção deste card.
  const [isConfirmingRemove, setIsConfirmingRemove] = useState(false)

  const dueStatus = getDueStatus(task.dueDate, task.completed)
  const checkboxId = `task-${task.id}`

  const classNames = [
    'task',
    task.completed ? 'task--completed' : '',
    dueStatus?.key === 'overdue' ? 'task--overdue' : '',
  ].join(' ')

  return (
    <li className={classNames}>
      <div className="task__check">
        <input
          id={checkboxId}
          type="checkbox"
          className="task__checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)} // callback: avisa o App para inverter `completed`
        />
        <label htmlFor={checkboxId} className="task__checkmark">
          <Icon name="check" size={14} />
          <span className="visually-hidden">
            {task.completed ? 'Marcar como pendente: ' : 'Marcar como concluída: '}
            {task.title}
          </span>
        </label>
      </div>

      <div className="task__body">
        <div className="task__header">
          <h3 className="task__title">{task.title}</h3>
          <PriorityBadge priority={task.priority} />
        </div>

        {task.description && <p className="task__description">{task.description}</p>}

        <div className="task__meta">
          <span className="task__date">
            <Icon name="calendar" size={15} />
            <time dateTime={task.dueDate}>{formatDate(task.dueDate)}</time>
          </span>

          {task.completed && (
            <span className="task__status task__status--done">
              <Icon name="check" size={14} />
              Concluída
            </span>
          )}

          {dueStatus && (
            <span className={`task__status task__status--${dueStatus.key}`}>
              {dueStatus.key === 'overdue' && <Icon name="alert" size={14} />}
              {dueStatus.label}
            </span>
          )}
        </div>
      </div>

      <div className="task__actions">
        {isConfirmingRemove ? (
          <div className="task__confirm" role="group" aria-label="Confirmar remoção">
            <span className="task__confirm-label">Remover?</span>
            <button
              type="button"
              className="btn btn--danger btn--sm"
              onClick={() => onRemove(task.id)} // callback: o App remove a tarefa da lista
            >
              Sim
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => setIsConfirmingRemove(false)}
            >
              Não
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              className="icon-btn"
              onClick={() => onEdit(task)} // callback: o App abre o formulário em modo edição
              aria-label={`Editar ${task.title}`}
              title="Editar"
            >
              <Icon name="edit" size={18} />
            </button>
            <button
              type="button"
              className="icon-btn icon-btn--danger"
              onClick={() => setIsConfirmingRemove(true)}
              aria-label={`Remover ${task.title}`}
              title="Remover"
            >
              <Icon name="trash" size={18} />
            </button>
          </>
        )}
      </div>
    </li>
  )
}

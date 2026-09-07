import TaskItem from '../TaskItem/TaskItem.jsx'
import TaskForm from '../TaskForm/TaskForm.jsx'
import EmptyState from '../EmptyState/EmptyState.jsx'
import './TaskList.css'

/*
 * Lista de tarefas. Recebe as tarefas já filtradas pelo App e repassa os callbacks
 * (onToggle, onEdit, onRemove) para cada card. A tarefa em edição aparece como formulário
 * no lugar do próprio card. Sem nada a mostrar, exibe um estado vazio adequado ao contexto.
 */
export default function TaskList({
  tasks,
  totalTasks,
  filter,
  search,
  isCreating,
  editingTask,
  onToggle,
  onEdit,
  onSubmitEdit,
  onCancelEdit,
  onRemove,
  onClearSearch,
  onStartCreate,
}) {
  if (tasks.length === 0) {
    if (isCreating) return null
    return (
      <EmptyMessage
        totalTasks={totalTasks}
        filter={filter}
        search={search}
        onClearSearch={onClearSearch}
        onStartCreate={onStartCreate}
      />
    )
  }

  return (
    <ul className="task-list" aria-label="Tarefas">
      {/* Método de array `map`: transforma cada objeto de tarefa em um componente <TaskItem>
          (ou em um <TaskForm>, quando é a tarefa em edição). A `key` (id único) permite ao
          React identificar cada card entre renderizações. */}
      {tasks.map((task) =>
        editingTask && editingTask.id === task.id ? (
          <li key={task.id}>
            <TaskForm editingTask={task} onSubmit={onSubmitEdit} onCancel={onCancelEdit} />
          </li>
        ) : (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ),
      )}
    </ul>
  )
}

function EmptyMessage({ totalTasks, filter, search, onClearSearch, onStartCreate }) {
  if (totalTasks === 0) {
    return (
      <EmptyState
        icon="inbox"
        title="Nenhuma tarefa ainda"
        description="Cadastre a primeira tarefa e ela aparecerá aqui, salva automaticamente no seu navegador."
        action={{ label: 'Nova tarefa', icon: 'plus', onClick: onStartCreate }}
      />
    )
  }

  if (search.trim()) {
    return (
      <EmptyState
        icon="search"
        title={`Nada encontrado para “${search.trim()}”`}
        description="Tente outro termo ou limpe a busca para ver todas as tarefas."
        action={{ label: 'Limpar busca', icon: 'close', onClick: onClearSearch }}
      />
    )
  }

  if (filter === 'pending') {
    return (
      <EmptyState
        icon="check"
        title="Tudo concluído!"
        description="Nenhuma tarefa pendente no momento. Bom trabalho."
      />
    )
  }

  return (
    <EmptyState
      icon="inbox"
      title="Nenhuma tarefa concluída"
      description="Marque uma tarefa como concluída e ela aparecerá aqui."
    />
  )
}

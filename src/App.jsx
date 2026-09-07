import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header.jsx'
import TaskFilters from './components/TaskFilters/TaskFilters.jsx'
import TaskForm from './components/TaskForm/TaskForm.jsx'
import TaskList from './components/TaskList/TaskList.jsx'
import { useTasks } from './hooks/useTasks.js'
import { taskMatchesSearch } from './utils/text.js'

/*
 * Componente raiz do ConsultingTask's.
 * Guarda o estado global (tarefas, filtro, busca, formulário aberto, tarefa em edição)
 * e distribui, via props, os callbacks que os componentes filhos chamam quando o usuário interage.
 */
export default function App() {
  // Hook customizado: devolve a lista persistida no localStorage e as funções que a alteram.
  const { tasks, addTask, updateTask, toggleTask, removeTask } = useTasks()

  // React Hook `useState`: filtro rápido ativo ('all' | 'pending' | 'completed').
  const [filter, setFilter] = useState('all')

  // React Hook `useState`: texto digitado na busca.
  const [search, setSearch] = useState('')

  // React Hook `useState`: se o formulário de nova tarefa está aberto no topo da lista.
  const [isCreating, setIsCreating] = useState(false)

  // React Hook `useState`: tarefa em edição (null = nenhuma). O card dela vira o formulário.
  const [editingTask, setEditingTask] = useState(null)

  // Método de array `filter`: contadores exibidos no cabeçalho e nos botões de filtro.
  const counts = {
    all: tasks.length,
    pending: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  }

  // Método de array `filter` (duas vezes, encadeado):
  // 1) mantém só as tarefas do filtro rápido escolhido;
  // 2) dentre essas, mantém só as que combinam com a busca.
  const visibleTasks = tasks
    .filter((task) => {
      if (filter === 'pending') return !task.completed
      if (filter === 'completed') return task.completed
      return true
    })
    .filter((task) => taskMatchesSearch(task, search))

  // ---- Callbacks passados aos componentes filhos ----

  // Callback do botão "Nova tarefa" do estado vazio: abre o formulário de cadastro.
  function handleStartCreate() {
    setIsCreating(true)
    setEditingTask(null)
  }

  // Callback do botão "Nova tarefa" do cabeçalho: abre ou fecha o formulário de cadastro.
  function handleToggleCreate() {
    if (isCreating) setIsCreating(false)
    else handleStartCreate()
  }

  // Callback do TaskForm ao cadastrar: adiciona a tarefa e fecha o formulário.
  // Se o filtro "Concluídas" esconderia a tarefa nova, volta para "Todas".
  function handleCreateTask(data) {
    addTask(data)
    setIsCreating(false)
    if (filter === 'completed') setFilter('all')
  }

  // Callback do TaskItem ao clicar em "Editar": o card da tarefa vira o formulário.
  function handleStartEdit(task) {
    setEditingTask(task)
    setIsCreating(false)
  }

  // Callback do TaskForm ao salvar a edição.
  function handleUpdateTask(data) {
    updateTask(editingTask.id, data)
    setEditingTask(null)
  }

  // Callback do TaskForm ao cancelar (botão, X ou tecla Esc).
  function handleCancelForm() {
    setIsCreating(false)
    setEditingTask(null)
  }

  // Callback do TaskItem ao confirmar a remoção.
  function handleRemoveTask(id) {
    removeTask(id)
    if (editingTask && editingTask.id === id) setEditingTask(null)
  }

  return (
    <div className="app">
      <Header isCreating={isCreating} onToggleCreate={handleToggleCreate} />

      <main className="app__main">
        <section className="workspace-intro" aria-labelledby="workspace-title">
          <div>
            <p className="workspace-intro__eyebrow">VISÃO GERAL</p>
            <h1 id="workspace-title">Seu trabalho, em ordem.</h1>
            <p className="workspace-intro__lead">
              Organize entregas, acompanhe prazos e mantenha o foco no que vem a seguir.
            </p>
          </div>
          <dl className="workspace-intro__stats" aria-label="Resumo das tarefas">
            <div>
              <dt>Pendentes</dt>
              <dd>{counts.pending}</dd>
            </div>
            <div>
              <dt>Concluídas</dt>
              <dd>{counts.completed}</dd>
            </div>
          </dl>
        </section>

        <div className="workspace-panel">
          <TaskFilters
            filter={filter}
            counts={counts}
            onFilterChange={setFilter}
            search={search}
            onSearchChange={setSearch}
          />

          {isCreating && <TaskForm onSubmit={handleCreateTask} onCancel={handleCancelForm} />}

          <TaskList
            tasks={visibleTasks}
            totalTasks={tasks.length}
            filter={filter}
            search={search}
            isCreating={isCreating}
            editingTask={editingTask}
            onToggle={toggleTask}
            onEdit={handleStartEdit}
            onSubmitEdit={handleUpdateTask}
            onCancelEdit={handleCancelForm}
            onRemove={handleRemoveTask}
            onClearSearch={() => setSearch('')}
            onStartCreate={handleStartCreate}
          />
        </div>
      </main>
    </div>
  )
}

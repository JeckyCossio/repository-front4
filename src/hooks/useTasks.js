import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage.js'

// Chave usada no localStorage. Abra o DevTools → Application → Local Storage para vê-la.
export const STORAGE_KEY = 'devtask:tasks'

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/*
 * Hook customizado com toda a lógica de tarefas do ConsultingTask's.
 * Os componentes só chamam estas funções; nenhum deles mexe no array diretamente.
 *
 * Modelo de uma tarefa:
 * {
 *   id: string,               // gerado automaticamente
 *   title: string,            // nome (obrigatório)
 *   description: string,      // descrição (opcional)
 *   dueDate: 'AAAA-MM-DD',    // prazo escolhido pelo usuário (obrigatório)
 *   priority: 'low' | 'medium' | 'high',
 *   completed: boolean,
 *   createdAt: string,        // data/hora de criação em ISO, registrada automaticamente
 * }
 */
export function useTasks() {
  // Hook customizado (useState + useEffect por baixo): a lista persiste no localStorage.
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, [])

  // React Hook `useCallback`: memoriza cada função para que os componentes filhos
  // recebam sempre a mesma referência (callback estável) entre renderizações.

  // Callback de cadastro: cria a tarefa com id e data de criação e a coloca no início da lista.
  const addTask = useCallback(
    (data) => {
      const newTask = {
        id: createId(),
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority,
        completed: false,
        createdAt: new Date().toISOString(),
      }
      setTasks((previous) => [newTask, ...previous])
    },
    [setTasks],
  )

  // Callback de edição: `map` percorre a lista e substitui apenas a tarefa com o id informado.
  const updateTask = useCallback(
    (id, data) => {
      setTasks((previous) =>
        previous.map((task) => (task.id === id ? { ...task, ...data } : task)),
      )
    },
    [setTasks],
  )

  // Callback de conclusão: inverte `completed` da tarefa escolhida. As outras continuam iguais
  // e a tarefa permanece na mesma posição da lista.
  const toggleTask = useCallback(
    (id) => {
      setTasks((previous) =>
        previous.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
      )
    },
    [setTasks],
  )

  // Callback de remoção: `filter` devolve uma nova lista sem a tarefa removida.
  const removeTask = useCallback(
    (id) => {
      setTasks((previous) => previous.filter((task) => task.id !== id))
    },
    [setTasks],
  )

  return { tasks, addTask, updateTask, toggleTask, removeTask }
}

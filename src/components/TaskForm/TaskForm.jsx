import { useState, useEffect, useRef } from 'react'
import Icon from '../Icon/Icon.jsx'
import { PRIORITIES, DEFAULT_PRIORITY } from '../../utils/priority.js'
import './TaskForm.css'

const EMPTY_FORM = { title: '', description: '', dueDate: '', priority: DEFAULT_PRIORITY }

/*
 * Formulário de tarefa. Aparece no topo da lista para cadastrar (editingTask ausente)
 * ou no lugar do card para editar (editingTask = tarefa escolhida). Recebe do App os
 * callbacks onSubmit (cadastrar/salvar) e onCancel (fechar).
 */
export default function TaskForm({ editingTask = null, onSubmit, onCancel }) {
  const isEditing = editingTask !== null

  // React Hook `useState` com função inicializadora: começa com os dados da tarefa em edição
  // ou com os campos vazios (cadastro). Formulário controlado: o estado é a fonte da verdade.
  const [values, setValues] = useState(() =>
    isEditing
      ? {
          title: editingTask.title,
          description: editingTask.description,
          dueDate: editingTask.dueDate,
          priority: editingTask.priority,
        }
      : EMPTY_FORM,
  )

  // React Hook `useState`: mensagens de erro de validação, por campo.
  const [errors, setErrors] = useState({})

  // React Hook `useRef`: referência ao campo Nome, para focá-lo quando o formulário aparece.
  const titleInputRef = useRef(null)

  // React Hook `useEffect` (só na montagem): foca o Nome assim que o formulário abre.
  useEffect(() => {
    titleInputRef.current?.focus()
  }, [])

  // Callback de mudança: atualiza só o campo alterado e limpa o erro dele, se houver.
  function handleChange(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: undefined }))
    }
  }

  function validate(data) {
    const found = {}
    if (!data.title.trim()) found.title = 'Informe o nome da tarefa.'
    if (!data.dueDate) found.dueDate = 'Informe o prazo.'
    return found
  }

  function handleSubmit(event) {
    event.preventDefault()

    const found = validate(values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      if (found.title) titleInputRef.current?.focus()
      return
    }

    // Callback recebido do App via props: cadastra a tarefa nova ou salva a edição.
    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      dueDate: values.dueDate,
      priority: values.priority,
    })
  }

  // Callback de teclado: Esc fecha o formulário; Ctrl+Enter (ou Cmd+Enter) envia de qualquer campo.
  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onCancel()
    }
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      event.currentTarget.requestSubmit()
    }
  }

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      noValidate
      aria-labelledby="task-form-title"
    >
      <div className="task-form__header">
        <h2 id="task-form-title" className="task-form__title">
          {isEditing ? 'Editar tarefa' : 'Nova tarefa'}
        </h2>
        <button
          type="button"
          className="icon-btn"
          onClick={onCancel}
          aria-label="Fechar formulário"
          title="Fechar (Esc)"
        >
          <Icon name="close" size={18} />
        </button>
      </div>

      <div className="task-form__fields">
        <div className="field task-form__field--title">
          <label className="field__label" htmlFor="task-title">Nome</label>
          <input
            ref={titleInputRef}
            id="task-title"
            name="title"
            type="text"
            className="input"
            value={values.title}
            onChange={handleChange}
            placeholder="Ex.: Corrigir bug do login"
            maxLength={80}
            autoComplete="off"
            aria-invalid={errors.title ? 'true' : undefined}
            aria-describedby={errors.title ? 'task-title-error' : undefined}
          />
          {errors.title && (
            <p id="task-title-error" className="field__error" role="alert">
              <Icon name="alert" size={14} />
              {errors.title}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="task-due-date">Prazo</label>
          <input
            id="task-due-date"
            name="dueDate"
            type="date"
            className="input"
            value={values.dueDate}
            onChange={handleChange}
            aria-invalid={errors.dueDate ? 'true' : undefined}
            aria-describedby={errors.dueDate ? 'task-due-date-error' : undefined}
          />
          {errors.dueDate && (
            <p id="task-due-date-error" className="field__error" role="alert">
              <Icon name="alert" size={14} />
              {errors.dueDate}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="task-priority">Prioridade</label>
          <select
            id="task-priority"
            name="priority"
            className="input"
            value={values.priority}
            onChange={handleChange}
          >
            {/* Método de array `map`: gera uma <option> para cada nível de prioridade. */}
            {PRIORITIES.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field task-form__field--description">
          <label className="field__label" htmlFor="task-description">
            Descrição <span className="field__optional">opcional</span>
          </label>
          <textarea
            id="task-description"
            name="description"
            className="input input--textarea"
            value={values.description}
            onChange={handleChange}
            placeholder="Detalhes, links, passos para reproduzir…"
            rows={2}
            maxLength={300}
          />
        </div>
      </div>

      <div className="task-form__actions">
        <span className="task-form__hint">Ctrl + Enter salva · Esc fecha</span>
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn--primary">
          <Icon name={isEditing ? 'check' : 'plus'} size={18} />
          {isEditing ? 'Salvar alterações' : 'Adicionar tarefa'}
        </button>
      </div>
    </form>
  )
}

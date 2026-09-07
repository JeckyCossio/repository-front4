import Icon from '../Icon/Icon.jsx'
import './TaskFilters.css'

export const FILTER_OPTIONS = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'completed', label: 'Concluídas' },
]

/*
 * Barra de filtros rápidos + campo de busca por texto.
 * Não filtra nada sozinha: apenas avisa o App (via callbacks) o que o usuário escolheu.
 */
export default function TaskFilters({ filter, counts, onFilterChange, search, onSearchChange }) {
  return (
    <div className="filters">
      <div className="filters__group" role="group" aria-label="Filtrar tarefas">
        {/* Método de array `map`: gera um botão para cada opção de filtro. */}
        {FILTER_OPTIONS.map((option) => {
          const isActive = filter === option.value
          return (
            <button
              key={option.value}
              type="button"
              className={`filters__button ${isActive ? 'is-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => onFilterChange(option.value)} // callback: o App troca o filtro ativo
            >
              {option.label}
              <span className="filters__count">{counts[option.value]}</span>
            </button>
          )
        })}
      </div>

      <div className="filters__search">
        <Icon name="search" size={18} className="filters__search-icon" />
        <input
          type="search"
          className="input filters__search-input"
          placeholder="Buscar por nome ou descrição"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)} // callback: o App atualiza a busca
          aria-label="Buscar tarefa"
          autoComplete="off"
        />
        {search && (
          <button
            type="button"
            className="icon-btn filters__search-clear"
            onClick={() => onSearchChange('')}
            aria-label="Limpar busca"
            title="Limpar busca"
          >
            <Icon name="close" size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

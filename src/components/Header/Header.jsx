import Icon from '../Icon/Icon.jsx'
import './Header.css'

export default function Header({ isCreating, onToggleCreate }) {
  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__brand" href="/" aria-label="ConsultingTask's, página inicial">
          <span className="header__logo" aria-hidden="true">
            <Icon name="check" size={16} />
          </span>
          <span className="header__name">ConsultingTask's</span>
        </a>

        <button
          type="button"
          className="header__new"
          onClick={onToggleCreate} // callback recebido do App: abre/fecha o formulário de nova tarefa
          aria-expanded={isCreating}
        >
          <Icon name={isCreating ? 'close' : 'plus'} size={18} />
          <span>{isCreating ? 'Fechar' : 'Nova tarefa'}</span>
        </button>
      </div>
    </header>
  )
}

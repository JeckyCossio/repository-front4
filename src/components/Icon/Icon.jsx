import plus from '../../assets/icons/plus.svg'
import check from '../../assets/icons/check.svg'
import trash from '../../assets/icons/trash.svg'
import edit from '../../assets/icons/edit.svg'
import search from '../../assets/icons/search.svg'
import close from '../../assets/icons/close.svg'
import calendar from '../../assets/icons/calendar.svg'
import alert from '../../assets/icons/alert.svg'
import inbox from '../../assets/icons/inbox.svg'
import './Icon.css'

const ICONS = { plus, check, trash, edit, search, close, calendar, alert, inbox }

export default function Icon({ name, size = 20, className = '' }) {
  const url = `url("${ICONS[name]}")`
  return (
    <span
      className={`icon ${className}`}
      style={{ width: size, height: size, maskImage: url, WebkitMaskImage: url }}
      aria-hidden="true"
    />
  )
}

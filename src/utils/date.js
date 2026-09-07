const MS_PER_DAY = 24 * 60 * 60 * 1000

function toISODate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getTodayISO() {
  return toISODate(new Date())
}

export function parseISODate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatDate(iso) {
  if (!iso) return ''
  return parseISODate(iso).toLocaleDateString('pt-BR')
}

export function daysUntil(iso) {
  const today = parseISODate(getTodayISO())
  const target = parseISODate(iso)
  return Math.round((target - today) / MS_PER_DAY)
}

export function getDueStatus(iso, completed) {
  if (completed || !iso) return null

  const diff = daysUntil(iso)

  if (diff < 0) {
    const days = Math.abs(diff)
    return { key: 'overdue', label: days === 1 ? 'Atrasada há 1 dia' : `Atrasada há ${days} dias` }
  }
  if (diff === 0) return { key: 'today', label: 'Vence hoje' }
  if (diff === 1) return { key: 'soon', label: 'Vence amanhã' }
  if (diff <= 7) return { key: 'soon', label: `Vence em ${diff} dias` }

  return null
}

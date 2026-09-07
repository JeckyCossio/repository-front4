export function normalizeText(text = '') {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function taskMatchesSearch(task, query) {
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return true

  return (
    normalizeText(task.title).includes(normalizedQuery) ||
    normalizeText(task.description).includes(normalizedQuery)
  )
}

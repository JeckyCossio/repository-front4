export const PRIORITIES = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' },
]

export const DEFAULT_PRIORITY = 'medium'

export function getPriorityLabel(value) {
  const found = PRIORITIES.find((priority) => priority.value === value)
  return found ? found.label : getPriorityLabel(DEFAULT_PRIORITY)
}

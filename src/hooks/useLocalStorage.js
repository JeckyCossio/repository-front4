import { useState, useEffect } from 'react'

/*
 * Hook customizado: funciona como o `useState`, mas mantém o valor sincronizado
 * com o localStorage do navegador. É ele que faz as tarefas sobreviverem ao
 * recarregar a página, sem nenhum botão de "salvar".
 */
export function useLocalStorage(key, initialValue) {
  // React Hook `useState` com função inicializadora: a função roda só uma vez,
  // na montagem, lendo o que já estava salvo no localStorage. Se não houver nada
  // (primeiro acesso) usa o valor inicial.
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  // React Hook `useEffect`: executa toda vez que `key` ou `value` mudarem,
  // gravando o valor atual no localStorage. É isso que torna o salvamento automático.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }, [key, value])

  return [value, setValue]
}

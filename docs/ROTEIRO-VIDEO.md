# Roteiro do vídeo — ConsultingTask's

Duração alvo: **1m30 a 2m**. Fale pouco, mostre muito. Os tempos são sugestões.

## Preparação (antes de gravar)

- [ ] Rodar `npm run dev` e abrir o app no navegador em uma janela de ~1280px de largura.
- [ ] Deixar **4 tarefas já cadastradas** (prioridades diferentes, uma concluída, uma atrasada). Atalho: abra o DevTools (F12) → aba **Console**, cole o trecho abaixo, dê Enter e recarregue a página. Se você já mexeu nelas e quer restaurar: abra o DevTools (F12) → **Console**, execute `localStorage.removeItem('devtask:tasks')` e recarregue a página.
- [ ] Abrir o VS Code ao lado, com o explorador em `src/`.
- [ ] Deixar o DevTools em **Application → Local Storage → chave `devtask:tasks`** pronto para mostrar.
- [ ] Ter o `README.md` aberto para o fechamento.

Trecho para cadastrar tarefas de demonstração (datas relativas a hoje):

```js
const d = (n) => { const x = new Date(); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10) }
localStorage.setItem('devtask:tasks', JSON.stringify([
  { id: 't1', title: 'Corrigir bug do login', description: 'Token expira antes do refresh.', dueDate: d(1), priority: 'high', completed: false, createdAt: new Date().toISOString() },
  { id: 't2', title: 'Escrever testes do carrinho', description: 'Cobrir cupom e frete grátis.', dueDate: d(5), priority: 'medium', completed: false, createdAt: new Date().toISOString() },
  { id: 't3', title: 'Atualizar dependências', description: '', dueDate: d(-2), priority: 'low', completed: false, createdAt: new Date().toISOString() },
  { id: 't4', title: 'Revisar PR da tela de perfil', description: 'Checar acessibilidade.', dueDate: d(0), priority: 'medium', completed: true, createdAt: new Date().toISOString() },
]))
```

## Sequência de gravação

### 0:00 – 0:10 · Abertura (tela do app)

Falar: "Este é o **ConsultingTask's**, um gerenciador de tarefas para desenvolvedores feito em **React + Vite + CSS**, com persistência em **localStorage**."

Mostrar: a tela com as tarefas, apontando os contadores no topo, o selo de prioridade e o prazo (uma tarefa "Atrasada", outra "Vence amanhã").

### 0:10 – 0:50 · Funcionalidades (tela do app)

Sequência de cliques, sem parar para explicar demais:

1. **Cadastro** — clicar em **Nova tarefa** (canto superior direito): o formulário abre no topo da lista. Preencher Nome, Prazo, Prioridade e Descrição → **Adicionar tarefa**. O formulário fecha e a tarefa entra no topo; os contadores mudam. (Opcional: clicar em Adicionar com o nome vazio para mostrar a validação.)
2. **Conclusão** — marcar o checkbox de uma tarefa: título riscado, card esmaecido, contador de concluídas sobe.
3. **Filtros** — clicar em **Pendentes**, **Concluídas** e voltar para **Todas**.
4. **Busca** — digitar parte do nome de uma tarefa (ex.: "login"); digitar algo sem resultado para mostrar o estado vazio; limpar.
5. **Edição** — clicar no lápis de uma tarefa: o próprio card vira o formulário "Editar tarefa"; trocar a prioridade → **Salvar alterações**.
6. **Remoção** — clicar na lixeira → aparece "Remover? Sim / Não" no próprio card → **Sim**.

### 0:50 – 1:00 · Persistência (tela do app)

Falar: "Tudo é salvo automaticamente no localStorage." Mostrar o DevTools em Application → Local Storage → `devtask:tasks` e recarregar a página (F5): as tarefas continuam lá.

### 1:00 – 1:15 · Estrutura de pastas (VS Code)

Expandir `src/` e apontar rapidamente:

- `components/` — um componente por pasta, cada um com seu CSS (`Header`, `TaskForm`, `TaskFilters`, `TaskList`, `TaskItem`, `PriorityBadge`, `EmptyState`, `Icon`).
- `assets/icons/` — os ícones em arquivos `.svg`.
- `hooks/` — `useLocalStorage` e `useTasks`.
- `utils/` — funções puras: datas, prioridade, texto da busca.
- `styles/` — tokens de design, estilos globais e controles.

### 1:15 – 1:50 · Principais trechos de código (VS Code)

Abrir os arquivos nesta ordem, ~8 segundos cada, lendo o comentário destacado:

| Conceito | Arquivo | O que mostrar |
|---|---|---|
| **Hooks + localStorage** | `src/hooks/useLocalStorage.js` | `useState` com função inicializadora lê o que está salvo; `useEffect` grava a cada mudança. |
| **Hook customizado + callbacks** | `src/hooks/useTasks.js` | `useCallback` em `addTask`, `updateTask`, `toggleTask`, `removeTask`; `map` na edição e `filter` na remoção. |
| **`filter` + callbacks** | `src/App.jsx` | `counts` e `visibleTasks` com `filter`; funções `handleSubmitTask`, `handleStartEdit`, `handleRemoveTask` passadas por props. |
| **`map`** | `src/components/TaskList/TaskList.jsx` | `tasks.map(...)` gera um `<TaskItem>` por tarefa, com `key`. |
| **Callback invocado** | `src/components/TaskItem/TaskItem.jsx` | `onToggle(task.id)`, `onEdit(task)` e `onRemove(task.id)` chamados nos eventos do card. |

### 1:50 – 2:00 · Fechamento (README / GitHub)

Mostrar o `README.md` (integrantes, RMs, link) e a lista de commits semânticos no GitHub.

## Checklist do vídeo

Antes de encerrar a gravação, confirmar que apareceu na tela:

- [ ] Sistema funcionando (abertura)
- [ ] Cadastro de tarefa (nome, data, descrição, prioridade)
- [ ] Marcar como concluída
- [ ] Remover tarefa
- [ ] Filtros: Todas / Pendentes / Concluídas
- [ ] Busca por texto *(extra)*
- [ ] Edição de tarefa *(extra)*
- [ ] Persistência em localStorage (DevTools + reload)
- [ ] Estrutura de pastas
- [ ] Código: React Hooks
- [ ] Código: localStorage
- [ ] Código: `filter`
- [ ] Código: `map`
- [ ] Código: callbacks
- [ ] README com integrantes, RMs e link do repositório
- [ ] Commits semânticos visíveis no GitHub

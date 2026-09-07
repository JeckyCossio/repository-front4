# Guia de commits — ConsultingTask's

Oito commits semânticos (o professor exige entre 6 e 10), para você executar manualmente. Cada commit agrupa os arquivos na ordem em que foram desenvolvidos e indica o trecho mais importante que ele introduz (útil para citar no vídeo).

> **Observação:** todos os arquivos já estão na versão final. O `App.jsx` (commit 4) importa componentes dos commits 5 a 7, então os commits intermediários não rodam sozinhos. Isso não afeta a avaliação do histórico — os commits representam a ordem lógica do desenvolvimento.

## Antes de começar

Preencha nome, RM e link do repositório no `README.md`. Depois:

```bash
git init
git branch -M main
```

Se quiser conferir o que cada commit vai incluir antes de confirmar: `git status`.

---

## 1 · `chore: inicializa projeto React com Vite`

Estrutura mínima do projeto: dependências, configuração do Vite, HTML de entrada e ponto de montagem do React.

```bash
git add .gitignore package.json package-lock.json vite.config.js index.html public/favicon.svg src/main.jsx
git commit -m "chore: inicializa projeto React com Vite"
```

Trecho principal — `src/main.jsx`:

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## 2 · `feat: adiciona tokens de design, fonte local e estilos globais`

Sistema visual: variáveis CSS (cores, espaçamento, tipografia), Montserrat servida localmente, reset, controles compartilhados, os ícones em arquivos `.svg` e o componente `Icon` que os exibe.

```bash
git add public/fonts src/styles src/assets src/components/Icon
git commit -m "feat: adiciona tokens de design, fonte local e estilos globais"
```

Trecho principal — `src/styles/global.css`:

```css
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

## 3 · `feat: cria hooks de tarefas com persistência em localStorage`

Modelo de dados e lógica: `useLocalStorage` (useState + useEffect) e `useTasks` (add, update, toggle, remove), mais utilitários de data e prioridade.

```bash
git add src/hooks src/utils/priority.js src/utils/date.js
git commit -m "feat: cria hooks de tarefas com persistência em localStorage"
```

Trecho principal — `src/hooks/useLocalStorage.js`:

```js
// React Hook `useEffect`: executa toda vez que `key` ou `value` mudarem,
// gravando o valor atual no localStorage. É isso que torna o salvamento automático.
useEffect(() => {
  window.localStorage.setItem(key, JSON.stringify(value))
}, [key, value])
```

## 4 · `feat: adiciona layout base com cabeçalho e contadores`

Casca da aplicação: cabeçalho com marca, contadores e botão "Nova tarefa", layout em coluna única e o `App` que guarda o estado global e distribui os callbacks.

```bash
git add src/App.jsx src/App.css src/components/Header
git commit -m "feat: adiciona layout base com cabeçalho e contadores"
```

Trecho principal — `src/App.jsx`:

```js
// Método de array `filter`: contadores exibidos no cabeçalho e nos botões de filtro.
const counts = {
  all: tasks.length,
  pending: tasks.filter((task) => !task.completed).length,
  completed: tasks.filter((task) => task.completed).length,
}
```

## 5 · `feat: implementa cadastro e edição de tarefas com formulário validado`

Formulário controlado com nome, prazo, prioridade e descrição; validação de campos obrigatórios; abre no topo da lista ao clicar em "Nova tarefa" e, na edição, no lugar do card. Atalhos Esc e Ctrl+Enter.

```bash
git add src/components/TaskForm
git commit -m "feat: implementa cadastro e edição de tarefas com formulário validado"
```

Trecho principal — `src/components/TaskForm/TaskForm.jsx`:

```js
// Callback recebido do App via props: cadastra uma tarefa nova ou salva a edição.
onSubmit({
  title: values.title.trim(),
  description: values.description.trim(),
  dueDate: values.dueDate,
  priority: values.priority,
})
```

## 6 · `feat: adiciona lista de tarefas com concluir, remover e prioridade`

Lista renderizada com `map`, card com checkbox acessível, selo de prioridade, situação do prazo e confirmação inline de remoção.

```bash
git add src/components/TaskList src/components/TaskItem src/components/PriorityBadge
git commit -m "feat: adiciona lista de tarefas com concluir, remover e prioridade"
```

Trecho principal — `src/components/TaskList/TaskList.jsx`:

```jsx
{/* Método de array `map`: transforma cada objeto de tarefa em um componente <TaskItem>. */}
{tasks.map((task) => (
  <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onRemove={onRemove} />
))}
```

## 7 · `feat: adiciona filtros rápidos, busca por texto e estados vazios`

Filtros Todas / Pendentes / Concluídas, busca sem diferenciar acentos e as mensagens de estado vazio (sem tarefas, sem resultado de filtro, sem resultado de busca).

```bash
git add src/components/TaskFilters src/components/EmptyState src/utils/text.js
git commit -m "feat: adiciona filtros rápidos, busca por texto e estados vazios"
```

Trecho principal — `src/App.jsx`:

```js
// Método de array `filter` (duas vezes, encadeado):
const visibleTasks = tasks
  .filter((task) => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })
  .filter((task) => taskMatchesSearch(task, search))
```

## 8 · `docs: adiciona README, roteiro do vídeo e contexto do produto`

Documentação da entrega: README com integrantes, RMs e link; roteiro do vídeo; este guia; screenshots; contexto do produto.

```bash
git add README.md docs PRODUCT.md
git commit -m "docs: adiciona README, roteiro do vídeo e contexto do produto"
```

---

## Conferência final

```bash
git status          # não deve sobrar nada fora de node_modules/ e dist/ (ignorados)
git log --oneline   # deve listar os 8 commits acima
```

Depois, crie o repositório no GitHub e publique:

```bash
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

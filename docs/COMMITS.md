# Guia de commits — ConsultingTask's

Oito commits semânticos (a entrega exige entre 6 e 10), organizados na ordem lógica de construção do projeto. A divisão abaixo permite distribuir os commits entre os integrantes para que todos tenham uma contribuição identificável no histórico.

> **Regra desta divisão:** cada arquivo é adicionado por inteiro em um único commit. Não use `git add -p` e não divida trechos de um mesmo arquivo entre pessoas. Como os arquivos já estão em sua versão final, alguns commits intermediários representam etapas lógicas e a aplicação só fica completa após o commit 8.

## Antes de começar

Preencha nome, RM e link do repositório no `README.md`. Se o repositório ainda não tiver sido iniciado, execute:

```bash
git init
git branch -M main
```

Antes de cada commit, use `git status` para confirmar que somente os arquivos indicados foram preparados.

---

## 1 · `chore: configura projeto React com Vite`

Cria a base do projeto: dependências, configuração do Vite, HTML de entrada, favicon e regras de arquivos ignorados. Neste momento ainda não entram componentes nem estilos.

**Responsável sugerido:** Integrante 1

**Arquivos que esta pessoa deve adicionar:**

- `.gitignore`
- `index.html`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `public/favicon.svg`

Depois de conferir essa lista, execute:

```bash
git add .gitignore index.html package.json package-lock.json vite.config.js public/favicon.svg
git commit -m "chore: configura projeto React com Vite"
```

Trecho principal — `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## 2 · `feat: implementa modelo e persistência de tarefas`

Adiciona primeiro a camada de lógica: persistência no `localStorage`, operações de criação, atualização, conclusão e remoção, além das regras de data, prioridade e normalização da busca.

**Responsável sugerido:** Integrante 2

**Arquivos que esta pessoa deve adicionar:**

- `src/hooks/useLocalStorage.js`
- `src/hooks/useTasks.js`
- `src/utils/date.js`
- `src/utils/priority.js`
- `src/utils/text.js`

Depois de conferir essa lista, execute:

```bash
git add src/hooks/useLocalStorage.js src/hooks/useTasks.js src/utils/date.js src/utils/priority.js src/utils/text.js
git commit -m "feat: implementa modelo e persistência de tarefas"
```

Trecho principal — `src/hooks/useLocalStorage.js`:

```js
useEffect(() => {
  window.localStorage.setItem(key, JSON.stringify(value))
}, [key, value])
```

## 3 · `feat: adiciona ícones e indicador de prioridade`

Cria os recursos visuais reutilizáveis usados pelos demais componentes: arquivos SVG, componente de ícone e selo de prioridade. Os estilos desses elementos serão adicionados somente no último commit.

**Responsável sugerido:** Integrante 3

**Arquivos que esta pessoa deve adicionar:**

- `src/assets/icons/alert.svg`
- `src/assets/icons/calendar.svg`
- `src/assets/icons/check.svg`
- `src/assets/icons/close.svg`
- `src/assets/icons/edit.svg`
- `src/assets/icons/inbox.svg`
- `src/assets/icons/plus.svg`
- `src/assets/icons/search.svg`
- `src/assets/icons/trash.svg`
- `src/components/Icon/Icon.jsx`
- `src/components/PriorityBadge/PriorityBadge.jsx`

Depois de conferir essa lista, execute:

```bash
git add src/assets/icons/alert.svg src/assets/icons/calendar.svg src/assets/icons/check.svg src/assets/icons/close.svg src/assets/icons/edit.svg src/assets/icons/inbox.svg src/assets/icons/plus.svg src/assets/icons/search.svg src/assets/icons/trash.svg src/components/Icon/Icon.jsx src/components/PriorityBadge/PriorityBadge.jsx
git commit -m "feat: adiciona ícones e indicador de prioridade"
```

Trecho principal — `src/components/Icon/Icon.jsx`:

```js
const ICONS = { plus, check, trash, edit, search, close, calendar, alert, inbox }
```

## 4 · `feat: cria cabeçalho e formulário de tarefas`

Adiciona o cabeçalho da aplicação e o formulário controlado de cadastro e edição, com validação dos campos obrigatórios e atalhos de teclado.

**Responsável sugerido:** Integrante 4

**Arquivos que esta pessoa deve adicionar:**

- `src/components/Header/Header.jsx`
- `src/components/TaskForm/TaskForm.jsx`

Depois de conferir essa lista, execute:

```bash
git add src/components/Header/Header.jsx src/components/TaskForm/TaskForm.jsx
git commit -m "feat: cria cabeçalho e formulário de tarefas"
```

Trecho principal — `src/components/TaskForm/TaskForm.jsx`:

```js
onSubmit({
  title: values.title.trim(),
  description: values.description.trim(),
  dueDate: values.dueDate,
  priority: values.priority,
})
```

## 5 · `feat: implementa listagem e ações das tarefas`

Monta a área de conteúdo com lista, card de tarefa e estados vazios. Inclui conclusão, edição, situação do prazo e confirmação de remoção.

**Responsável sugerido:** Integrante 5

**Arquivos que esta pessoa deve adicionar:**

- `src/components/EmptyState/EmptyState.jsx`
- `src/components/TaskItem/TaskItem.jsx`
- `src/components/TaskList/TaskList.jsx`

Depois de conferir essa lista, execute:

```bash
git add src/components/EmptyState/EmptyState.jsx src/components/TaskItem/TaskItem.jsx src/components/TaskList/TaskList.jsx
git commit -m "feat: implementa listagem e ações das tarefas"
```

Trecho principal — `src/components/TaskList/TaskList.jsx`:

```jsx
{tasks.map((task) => (
  <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onRemove={onRemove} />
))}
```

## 6 · `feat: integra filtros, busca e fluxo principal da aplicação`

Adiciona os filtros e a busca, conecta todos os componentes e hooks no `App` e cria o ponto de montagem do React. Os contadores de tarefas ficam na visão geral do `App`, enquanto o `Header` mantém a marca e o botão de nova tarefa.

**Responsável sugerido:** Integrante 6

**Arquivos que esta pessoa deve adicionar:**

- `src/components/TaskFilters/TaskFilters.jsx`
- `src/App.jsx`
- `src/main.jsx`

Depois de conferir essa lista, execute:

```bash
git add src/components/TaskFilters/TaskFilters.jsx src/App.jsx src/main.jsx
git commit -m "feat: integra filtros, busca e fluxo principal da aplicação"
```

Trecho principal — `src/App.jsx`:

```js
const visibleTasks = tasks
  .filter((task) => {
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })
  .filter((task) => taskMatchesSearch(task, search))
```

## 7 · `docs: documenta projeto e roteiro de apresentação`

Registra informações da entrega, integrantes, instruções de execução, contexto do produto, roteiro do vídeo e este guia de commits.

**Responsável sugerido:** Integrante 7

**Arquivos que esta pessoa deve adicionar:**

- `README.md`
- `PRODUCT.md`
- `docs/ROTEIRO-VIDEO.md`
- `docs/COMMITS.md`

Depois de conferir essa lista, execute:

```bash
git add README.md PRODUCT.md docs/ROTEIRO-VIDEO.md docs/COMMITS.md
git commit -m "docs: documenta projeto e roteiro de apresentação"
```

## 8 · `style: finaliza identidade visual e responsividade`

Aplica por último toda a apresentação visual: fonte local, tokens, estilos globais, controles compartilhados, layout da aplicação e estilos de cada componente. Assim, os arquivos CSS não aparecem antes da estrutura e das funcionalidades que estilizam.

**Responsável sugerido:** Integrante 8

**Arquivos que esta pessoa deve adicionar:**

- `public/fonts/Montserrat-Variable.woff2`
- `public/fonts/OFL.txt`
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/controls.css`
- `src/App.css`
- `src/components/EmptyState/EmptyState.css`
- `src/components/Header/Header.css`
- `src/components/Icon/Icon.css`
- `src/components/PriorityBadge/PriorityBadge.css`
- `src/components/TaskFilters/TaskFilters.css`
- `src/components/TaskForm/TaskForm.css`
- `src/components/TaskItem/TaskItem.css`
- `src/components/TaskList/TaskList.css`

Depois de conferir essa lista, execute:

```bash
git add public/fonts/Montserrat-Variable.woff2 public/fonts/OFL.txt src/styles/tokens.css src/styles/global.css src/styles/controls.css src/App.css src/components/EmptyState/EmptyState.css src/components/Header/Header.css src/components/Icon/Icon.css src/components/PriorityBadge/PriorityBadge.css src/components/TaskFilters/TaskFilters.css src/components/TaskForm/TaskForm.css src/components/TaskItem/TaskItem.css src/components/TaskList/TaskList.css
git commit -m "style: finaliza identidade visual e responsividade"
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

---

## Conferência final

```bash
git status
git log --oneline --reverse
npm run build
```

O `git status` não deve mostrar arquivos do projeto sem commit; `node_modules/` e `dist/` permanecem ignorados. O log deve exibir os oito commits na ordem acima e o build deve terminar sem erros.

Depois, crie o repositório no GitHub e publique:

```bash
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

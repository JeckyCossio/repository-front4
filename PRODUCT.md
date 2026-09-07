# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite + JavaScript + CSS próprio (sem Tailwind/Bootstrap), persistência em localStorage. Sem backend, banco ou autenticação. Definido pelo enunciado do Checkpoint 4 e confirmado pelo usuário.

## Users

Desenvolvedores (estudantes e profissionais) organizando o próprio trabalho diário: bugs, features, estudos, entregas. Usam no desktop durante o trabalho e no celular para conferir o que falta. Avaliadores secundários: o professor da disciplina de Frontend (FIAP, Engenharia de Software), que avalia código, estrutura e requisitos via vídeo curto e repositório GitHub.

## Product Purpose

ConsultingTask's é um gerenciador de tarefas com cara de produto real, feito para desenvolvedores. Permite cadastrar tarefas (nome, prazo, descrição, prioridade), concluir, remover, editar, filtrar (todas / pendentes / concluídas) e buscar. Tudo salvo automaticamente no navegador. Sucesso: o usuário entende o estado do seu trabalho em segundos e o professor reconhece um projeto organizado, componentizado e que cumpre 100% dos requisitos.

## Positioning

Não é uma to-do genérica de faculdade: é um pequeno dashboard de trabalho para dev, com prioridade e prazo legíveis de relance, estados claros e responsividade real, mantendo a implementação simples o bastante para ser explicada em um vídeo curto.

## Operating Context

- Projeto acadêmico: Checkpoint 4, disciplina Frontend, FIAP.
- Entrega: repositório GitHub público com README (RM e nome dos integrantes, link do repo), 6 a 10 commits semânticos, vídeo curto mostrando o sistema, a estrutura de pastas e trechos de código.
- Interface e comentários de código em português (pt-BR). Identificadores de código em inglês.

## Capabilities and Constraints

Requisitos obrigatórios do professor:
- Cadastro de tarefa com nome, data, descrição e nível de prioridade.
- Marcar como concluída; remover.
- Filtros rápidos: Todas, Pendentes, Concluídas.
- Persistência automática em localStorage.
- Comentários explicativos nos trechos que usam React Hooks, filter, map e callbacks.
- React + Vite + CSS; estrutura de pastas organizada; README com RM/nomes/link; commits semânticos (mín. 6, máx. 10).

Melhorias de produto confirmadas (extras, não requisitos):
- Editar tarefa existente.
- Busca por texto (nome/descrição), combinada com os filtros rápidos.

Decisões confirmadas:
- "Data" = prazo/data de entrega escolhido pelo usuário; o sistema também registra a data de criação automaticamente. Permite destacar tarefas atrasadas.
- Prioridade em três níveis: baixa, média, alta.
- Sem tema claro/escuro alternável; sem ordenação configurável (fora do escopo por decisão do usuário).
- Sem bibliotecas além de React/Vite. Sem frameworks CSS.
- Sem testes automatizados (não são requisito do checkpoint; decisão do usuário).
- Ao concluir uma tarefa ela permanece na posição atual da lista: apenas muda o estado visual (título riscado, opacidade reduzida) e atualiza os contadores. Não reordenar.
- Layout em coluna única em todos os tamanhos de tela (decisão do usuário). O formulário de nova tarefa não fica sempre visível: abre sob demanda no topo da lista pelo botão "Nova tarefa" (cabeçalho e estado vazio). A edição acontece no lugar do próprio card. Sem modal. Sem tarefas de exemplo no primeiro acesso (o usuário pediu para remover).

Terminologia: tarefa, prazo, prioridade (baixa/média/alta), pendente, concluída, atrasada.

## Brand Commitments

Nome provisório: ConsultingTask's. Deve transmitir organização, produtividade e desenvolvimento de software. Moderno, limpo e profissional, sem excesso de efeitos. Sem visual de "projeto simples de faculdade".

Fonte principal da interface: Inter com fallback para a pilha nativa do sistema. Detalhes de dados e contadores usam Geist Mono com fallback monoespaçado. A interface segue uma linguagem clara e densa inspirada em documentação para desenvolvedores.

Paleta atual: canvas branco/cinza muito claro, texto quase preto, superfícies planas com hairlines e acento mint reservado para foco e conclusão. O topo usa um gradiente atmosférico azul-céu para creme; CTAs principais são pretos e em formato pill. Prioridades continuam diferenciadas por azul, âmbar e vermelho.

## Evidence on Hand

Nenhum asset (logo, ilustração, dados reais). A pasta do projeto continha apenas três arquivos vazios em src/. Não inventar depoimentos, métricas ou integrações.

## Product Principles

1. Cumprir o Checkpoint 4 por completo antes de qualquer extra.
2. Cada componente deve ser explicável em uma frase para o professor.
3. Prioridade, prazo e estado precisam ser lidos de relance, sem abrir a tarefa.
4. Feedback visual em toda interação; nenhum estado vazio sem orientação.
5. Funciona igualmente bem no celular e no desktop.

## Accessibility & Inclusion

Acessibilidade razoável: labels reais nos campos, foco visível, contraste adequado, botões com nome acessível, estado de concluída não comunicado apenas por cor. Sem padrão formal exigido.

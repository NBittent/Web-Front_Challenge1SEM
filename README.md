# Care Plus — Jornada Gamificada do Cuidado Contínuo

> Plataforma web gamificada voltada para saúde preventiva, desenvolvida com React + Vite e persistência local.

---

## 📌 Visão Geral

O **Care Plus** é uma aplicação que transforma hábitos de saúde em uma jornada motivadora e contínua. O usuário acompanha indicadores simulados de saúde, completa missões, acumula XP, mantém streaks e desbloqueia conquistas.

A proposta do projeto é entregar uma experiência interativa que incentive a adoção de rotinas saudáveis com elementos de gamificação.

---

## 🚀 Tecnologias Utilizadas

- React com Vite
- JavaScript (ES6+)
- HTML5 / CSS3
- Tailwind CSS
- LocalStorage
- React Hooks (`useState`, `useEffect`)
- JSON local para dados simulados

---

## 🧠 Funcionalidades Principais

### 🎮 Gamificação

- XP (Experience Points)
- Progressão de nível
- Missões interativas com conclusão por botão
- Ranking dinâmico (leaderboard)
- Badges e conquistas desbloqueáveis

### 🔥 Streak (Consistência Diária)

- Controle de dias consecutivos de uso
- Registro da última atividade
- Incremento automático de streak
- Reset em caso de inatividade

### ❤️ Health Score (Simulação de Saúde)

- BPM (Batimentos por minuto)
- SpO2 (Saturação de oxigênio)
- Feedback visual por status de saúde:
  - 🟢 Verde: saudável
  - 🟡 Amarelo: atenção
  - 🔴 Vermelho: risco

### 📊 Dashboard Dinâmico

- Atualização automática de métricas com `setInterval`
- Interface adaptativa conforme o estado de saúde
- Visualização clara de progresso e desempenho

### 👤 Perfil do Usuário

- XP acumulado
- Nível atual
- Streak de uso contínuo
- Badges conquistadas
- Resumo do progresso

### 🏆 Sistema de Conquistas

Exemplos implementados:

- **First Step** → primeira missão concluída
- **Consistency** → streak de 3 dias
- **Health Guardian** → health score alto contínuo

---

## 💾 Persistência de Dados

A aplicação armazena dados no **LocalStorage** para manter o progresso entre sessões:

- XP persistente após recarregar a página
- Streak mantido entre acessos
- Progresso de missões e badges
- Leaderboard simulado

---

## 🧭 Fluxo da Aplicação

1. **Dashboard**
   - Exibe métricas de saúde simuladas e status geral
2. **Missões**
   - Lista de tarefas gamificadas com filtro e conclusão
3. **Perfil**
   - Resumo de progresso, badges e histórico
4. **Recompensas**
   - Leaderboard, catálogo de recompensas e conquistas

---

## 📦 Como executar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador.

---

## 📦 Build para produção

```bash
npm run build
npm run preview
```

---

## 🏗️ Estrutura do projeto

```
src/
├── data/
│   └── db.json              # Dados simulados: missões, badges, recompensas, leaderboard
├── hooks/
│   └── useCarePlus.js       # Hook customizado com lógica de negócio e persistência
├── components/
│   ├── Toast.jsx            # Notificações flutuantes
│   └── ModalBadge.jsx       # Modal para badges desbloqueadas
├── pages/
│   ├── Dashboard.jsx        # Métricas de saúde, XP e streak
│   ├── Missoes.jsx          # Lista de missões gamificadas
│   ├── Perfil.jsx           # Perfil do usuário e conquistas
│   └── Recompensas.jsx      # Leaderboard e catálogo de recompensas
├── App.jsx                  # Roteamento e estado global
├── main.jsx                 # Entrada da aplicação
└── index.css                # Estilos customizados e Tailwind
```

---

## ✅ Requisitos atendidos

| Requisito                        | Como foi implementado                                    |
|----------------------------------|----------------------------------------------------------|
| React + Vite                     | Projeto criado com Vite e React                          |
| Componentes reutilizáveis        | Cards, modais, toasts e páginas organizadas               |
| Comunicação pai → filho          | Props entre `App.jsx` e páginas                         |
| LocalStorage                     | Persistência automática em `useCarePlus`                |
| Desestruturação ES6              | Uso de spread, destructuring, maps e filters             |
| Dados simulados em JSON local    | `db.json` importado como fonte de conteúdo              |
| Tailwind CSS                     | Estilo construído com classes utilitárias                |
| Responsividade                   | Layouts adaptativos para diferentes tamanhos de tela     |
| Eventos React                    | `onClick`, `onChange` e controle de formulários          |

---

## 👥 Integrantes

- RM568108 – Nicolas Tanajura
- RM567396 – Pedro Chiarantano
- RM568059 – Gabriel Cutrim

---

## 🏫 FIAP — 1º ano Engenharia de Software | Challenge Care Plus 2025

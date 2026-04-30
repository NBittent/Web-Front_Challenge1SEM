# Care Plus App — Web Development | Sprint 2

## Descrição
Aplicação React + Vite para a plataforma gamificada Care Plus.
Exibe métricas de saúde em tempo real (simuladas), missões diárias interativas
e ranking semanal, com persistência via localStorage.

---

## Tecnologias

- React 18
- Vite 5
- JavaScript (ES2022+)
- CSS3 (Grid, Flexbox, Custom Properties)

---

## Estrutura de Componentes

```
App.jsx (pai)
├── Header.jsx          → recebe userName, totalPoints, level via props
├── HealthMetrics.jsx   → recebe objeto metrics via props
├── MissionCard.jsx     → recebe mission e callback onToggle via props
├── Leaderboard.jsx     → recebe currentPoints e userName via props
└── Footer.jsx
```

## Funcionalidades

- Missões gamificadas com pontuação acumulativa
- Persistência de estado entre sessões via localStorage
- Desestruturação de objetos e arrays
- Comunicação pai → filho via props
- Leaderboard com ordenação dinâmica
- Layout responsivo (Desktop, Tablet e Mobile)

---

## Como Executar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Acessar no navegador
http://localhost:5173
```

## Build para Produção

```bash
npm run build
npm run preview
```

---

## Integrantes

| Nome Completo    | RM     |
|------------------|--------|
| Nicolas Tanajura | 568108 |
| Pedro Chiarantano| 567396 |
| Gabriel Cutrim   | 568059 |


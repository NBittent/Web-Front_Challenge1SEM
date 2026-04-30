# 🩺 Care Plus – Jornada Gamificada do Cuidado Contínuo

## 📌 Visão Geral

O **Care Plus** é uma plataforma web desenvolvida como parte do Challenge acadêmico de Engenharia de Software, com foco em **gamificação da saúde preventiva**.

A aplicação simula uma jornada de cuidado contínuo onde o usuário realiza missões diárias, acumula pontos de experiência (XP), mantém streaks de atividade e acompanha indicadores de saúde simulados em tempo real.

O objetivo é transformar hábitos de saúde em uma experiência interativa, motivadora e contínua.

---

## Integrantes
- RM568108 – Nicolas Tanajura 
- RM567396 – Pedro Chiarantano 
- RM568059 – Gabriel Cutrim

---

## 🚀 Tecnologias Utilizadas

- React (Vite)
- JavaScript (ES6+)
- HTML5 / CSS3
- LocalStorage
- React Hooks (useState, useEffect)
- CSS puro
- Simulação de dados em tempo real

---

## 🧠 Funcionalidades do Sistema

### 🎮 Gamificação

- Sistema de XP (Experience Points)
- Sistema de Level (progressão por experiência)
- Missões interativas com conclusão via botão
- Leaderboard dinâmica (ranking simulado)
- Sistema de badges/conquistas
- Desbloqueios por progresso

---

### 🔥 Streak (Consistência Diária)

- Controle de dias consecutivos de uso
- Registro da última atividade
- Incremento automático de streak
- Reset em caso de inatividade

---

### ❤️ Health Score (Simulação de Saúde)

Sistema de saúde baseado em dados simulados:

- BPM (Batimentos por minuto)
- SpO2 (Saturação de oxigênio)

**Classificação:**
- 🟢 Verde: saudável
- 🟡 Amarelo: atenção
- 🔴 Vermelho: risco

---

### 📊 Dashboard Dinâmico

- Simulação de BPM e SpO2 em tempo real
- Atualização automática com `setInterval`
- Interface adaptativa baseada no estado de saúde
- Visualização clara do progresso

---

### 👤 Perfil do Usuário

- XP total
- Level atual
- Streak de dias ativos
- Badges conquistadas
- Health Score atual
- Resumo de progresso

---

### 🏆 Sistema de Conquistas

Exemplos:

- **First Step** → primeira missão concluída  
- **Consistency** → streak de 3 dias  
- **Health Guardian** → health score alto contínuo  

---

### 💾 Persistência de Dados

Todos os dados são armazenados no **LocalStorage**:

- XP não é perdido ao atualizar a página
- Streak é mantido
- Progresso contínuo
- Leaderboard persistente

---

## 🧭 Fluxo da Aplicação

1. **Home**
   - Introdução ao Care Plus

2. **Dashboard**
   - Dados de saúde simulados

3. **Missões**
   - Sistema de tarefas gamificadas

4. **Perfil**
   - Progresso do usuário

---

## 🎯 Objetivo do Projeto

O Care Plus incentiva hábitos saudáveis através de:

- Gamificação
- Recompensas digitais
- Feedback contínuo
- Simulação de dados de saúde

---


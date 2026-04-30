import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MissionCard from "./components/MissionCard";
import HealthMetrics from "./components/HealthMetrics";
import Leaderboard from "./components/Leaderboard";
import missionsData from "./data/missions";

export default function App() {
  // ── Estado principal: missões e pontuação ──────────────────────────────
  const [missions, setMissions] = useState(() => {
    // Recupera estado salvo no localStorage (persistência entre sessões)
    const saved = localStorage.getItem("careplus_missions");
    return saved ? JSON.parse(saved) : missionsData;
  });

  const [totalPoints, setTotalPoints] = useState(() => {
    return Number(localStorage.getItem("careplus_points")) || 0;
  });

  const [userName] = useState(() => {
    return localStorage.getItem("careplus_user") || "Usuário Care Plus";
  });

  // ── Persiste no localStorage sempre que missões ou pontos mudam ────────
  useEffect(() => {
    localStorage.setItem("careplus_missions", JSON.stringify(missions));
    localStorage.setItem("careplus_points", String(totalPoints));
  }, [missions, totalPoints]);

  // ── Conclui ou desfaz uma missão ──────────────────────────────────────
  function handleToggleMission(id) {
    setMissions(prev =>
      prev.map(m => {
        if (m.id !== id) return m;
        const nowCompleted = !m.completed;
        setTotalPoints(pts => nowCompleted ? pts + m.points : pts - m.points);
        return { ...m, completed: nowCompleted };
      })
    );
  }

  // ── Reinicia todas as missões ──────────────────────────────────────────
  function handleReset() {
    setMissions(missionsData.map(m => ({ ...m, completed: false })));
    setTotalPoints(0);
    localStorage.removeItem("careplus_missions");
    localStorage.removeItem("careplus_points");
  }

  // ── Métricas simuladas (virão do ESP32 via MQTT na Sprint 3) ──────────
  const metrics = {
    heartRate:   72,
    spo2:        98,
    temperature: 36.5,
    steps:       3847,
  };

  const completedCount = missions.filter(m => m.completed).length;
  const level = Math.floor(totalPoints / 200) + 1;

  return (
    <div className="app-wrapper">
      {/* Cabeçalho recebe dados do usuário via props (pai → filho) */}
      <Header userName={userName} totalPoints={totalPoints} level={level} />

      <main className="main-content">
        {/* Métricas do wearable — pai envia dados como props para o filho */}
        <HealthMetrics metrics={metrics} />

        {/* Seção de missões gamificadas */}
        <section className="missions-section">
          <div className="section-header">
            <h2>Missões do Dia</h2>
            <span className="badge">{completedCount}/{missions.length} concluídas</span>
          </div>

          <div className="missions-grid">
            {missions.map(mission => (
              <MissionCard
                key={mission.id}
                mission={mission}
                onToggle={handleToggleMission}
              />
            ))}
          </div>

          <button className="reset-btn" onClick={handleReset}>
            Reiniciar Missões
          </button>
        </section>

        {/* Leaderboard com dados simulados */}
        <Leaderboard currentPoints={totalPoints} userName={userName} />
      </main>

      <Footer />
    </div>
  );
}

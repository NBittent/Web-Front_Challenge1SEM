import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MissionCard from "./components/MissionCard";
import HealthMetrics from "./components/HealthMetrics";
import Leaderboard from "./components/Leaderboard";
import ProfilePage from "./components/ProfilePage";
import missionsData from "./data/missions";

const defaultLeaderboard = [
  { name: "Ana S.", points: 520 },
  { name: "Carlos M.", points: 440 },
  { name: "Beatriz L.", points: 380 },
  { name: "Rodrigo P.", points: 310 },
];

const badgeLabels = {
  consistency: "Herói da Consistência",
  level3: "Escalador de Níveis",
  missionMaster: "Missões Dominadas",
};

function formatLocalDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function isYesterday(dateString) {
  if (!dateString) return false;
  const current = new Date();
  const yesterday = new Date(current);
  yesterday.setDate(current.getDate() - 1);
  return formatLocalDate(new Date(dateString)) === formatLocalDate(yesterday);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getHealthScore(heartRate, spo2) {
  let score = 100;
  if (heartRate < 60) score -= (60 - heartRate) * 1.5;
  if (heartRate > 100) score -= (heartRate - 100) * 1.2;
  if (spo2 < 95) score -= (95 - spo2) * 4;
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getHealthState(score) {
  if (score >= 80) return "good";
  if (score >= 60) return "warning";
  return "critical";
}

export default function App() {
  // ── Estado principal: missões e pontuação ──────────────────────────────
  const [missions, setMissions] = useState(() => {
    const saved = localStorage.getItem("careplus_missions");
    return saved ? JSON.parse(saved) : missionsData;
  });

  const [totalPoints, setTotalPoints] = useState(() => {
    return Number(localStorage.getItem("careplus_points")) || 0;
  });

  const [userName] = useState(() => {
    return localStorage.getItem("careplus_user") || "Usuário Care Plus";
  });
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [streakCount, setStreakCount] = useState(() => {
    return Number(localStorage.getItem("careplus_streakCount")) || 0;
  });
  const [lastActiveDate, setLastActiveDate] = useState(() => {
    return localStorage.getItem("careplus_lastActiveDate") || null;
  });
  const [badges, setBadges] = useState(() => {
    const saved = localStorage.getItem("careplus_badges");
    const parsed = saved ? JSON.parse(saved) : [];
    // Garantir que não há duplicatas no estado inicial
    return [...new Set(parsed)];
  });
  const [leaderboard, setLeaderboard] = useState(() => {
    const saved = localStorage.getItem("careplus_leaderboard");
    const base = saved ? JSON.parse(saved) : defaultLeaderboard;
    return [
      ...base.filter((player) => player.name !== userName),
      { name: userName, points: Number(localStorage.getItem("careplus_points")) || 0 },
    ];
  });
  const [metrics, setMetrics] = useState({
    heartRate: 72,
    spo2: 98,
    temperature: 36.5,
    steps: 3847,
  });
  const [toasts, setToasts] = useState([]);
  const prevLevel = useRef(Math.floor((Number(localStorage.getItem("careplus_points")) || 0) / 200) + 1);

  const healthScore = getHealthScore(metrics.heartRate, metrics.spo2);
  const healthStatus = getHealthState(healthScore);
  const completedCount = missions.filter(m => m.completed).length;
  const level = Math.floor(totalPoints / 200) + 1;

  const addToast = (message, type = "info") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts(prev => prev.filter((toast) => toast.id !== id));
    }, 2800);
  };

  const updateLastActivity = () => {
    const today = formatLocalDate(new Date());
    if (lastActiveDate === today) return;

    const nextStreak = isYesterday(lastActiveDate) ? streakCount + 1 : 1;
    setStreakCount(nextStreak);
    setLastActiveDate(today);

    if (lastActiveDate && isYesterday(lastActiveDate)) {
      addToast(`Streak atualizado: ${nextStreak} dias!`, "success");
    }

    if (lastActiveDate && !isYesterday(lastActiveDate)) {
      addToast("Streak reiniciado! Vamos de novo 👍", "warning");
    }
  };

  useEffect(() => {
    localStorage.setItem("careplus_missions", JSON.stringify(missions));
    localStorage.setItem("careplus_points", String(totalPoints));
    localStorage.setItem("careplus_streakCount", String(streakCount));

    if (lastActiveDate) {
      localStorage.setItem("careplus_lastActiveDate", lastActiveDate);
    } else {
      localStorage.removeItem("careplus_lastActiveDate");
    }

    localStorage.setItem("careplus_badges", JSON.stringify(badges));
    localStorage.setItem("careplus_leaderboard", JSON.stringify(leaderboard));
  }, [missions, totalPoints, streakCount, lastActiveDate, badges, leaderboard]);

  useEffect(() => {
    setLeaderboard((prev) => {
      const others = prev.filter((player) => player.name !== userName);
      return [...others, { name: userName, points: totalPoints }];
    });
  }, [totalPoints, userName]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const nextHeartRate = clamp(prev.heartRate + Math.floor(Math.random() * 5 - 2), 55, 105);
        const nextSpO2 = clamp(prev.spo2 + Math.floor(Math.random() * 3 - 1), 92, 100);
        const nextTemperature = clamp(prev.temperature + (Math.random() * 0.2 - 0.1), 36, 37.5);
        const nextSteps = prev.steps + Math.floor(Math.random() * 30);

        return {
          ...prev,
          heartRate: nextHeartRate,
          spo2: nextSpO2,
          temperature: Number(nextTemperature.toFixed(1)),
          steps: nextSteps,
        };
      });
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unlocked = [];
    if (streakCount >= 3 && !badges.includes("consistency")) unlocked.push("consistency");
    if (level >= 3 && !badges.includes("level3")) unlocked.push("level3");
    if (completedCount >= 5 && !badges.includes("missionMaster")) unlocked.push("missionMaster");

    if (unlocked.length) {
      setBadges((prev) => {
        const newBadges = [...prev];
        unlocked.forEach((badge) => {
          if (!newBadges.includes(badge)) {
            newBadges.push(badge);
          }
        });
        return newBadges;
      });
      unlocked.forEach((key) => {
        addToast(`Badge desbloqueado: ${badgeLabels[key]}`, "success");
      });
    }
  }, [level, completedCount, streakCount, badges]);

  function handleToggleMission(id) {
    const mission = missions.find((mission) => mission.id === id);
    if (!mission) return;

    const nowCompleted = !mission.completed;
    setMissions((prev) =>
      prev.map((m) => (m.id !== id ? m : { ...m, completed: nowCompleted }))
    );
    setTotalPoints((pts) => pts + (nowCompleted ? mission.points : -mission.points));

    if (nowCompleted) {
      addToast(`+${mission.points} XP ganho`, "success");
      updateLastActivity();
    }
  }

  // ── Reinicia todas as missões ──────────────────────────────────────────
  function handleReset() {
    setMissions(missionsData.map((m) => ({ ...m, completed: false })));
    setTotalPoints(0);
    setStreakCount(0);
    setLastActiveDate(null);
    localStorage.removeItem("careplus_missions");
    localStorage.removeItem("careplus_points");
    localStorage.removeItem("careplus_streakCount");
    localStorage.removeItem("careplus_lastActiveDate");
  }

  function handleChangePage(page) {
    setCurrentPage(page);
  }

  return (
    <div className="app-wrapper">
      {/* Cabeçalho recebe dados do usuário via props (pai → filho) */}
      <Header
        userName={userName}
        totalPoints={totalPoints}
        level={level}
        streakCount={streakCount}
        onProfileClick={() => handleChangePage("profile")}
      />

      <main className="main-content">
        <div className="toast-shell">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast toast-${toast.type}`}>
              {toast.message}
            </div>
          ))}
        </div>

        {currentPage === "profile" ? (
          <ProfilePage
            userName={userName}
            totalPoints={totalPoints}
            level={level}
            completedCount={completedCount}
            missionsCount={missions.length}
            metrics={metrics}
            streakCount={streakCount}
            badges={badges}
            healthScore={healthScore}
            healthStatus={healthStatus}
            lastActiveDate={lastActiveDate}
            onBack={() => handleChangePage("dashboard")}
          />
        ) : (
          <>
            {/* Métricas do wearable — pai envia dados como props para o filho */}
            <HealthMetrics metrics={metrics} healthScore={healthScore} healthStatus={healthStatus} />

            {/* Seção de missões gamificadas */}
            <section className="missions-section">
              <div className="section-header">
                <h2>Missões do Dia</h2>
                <span className="badge">{completedCount}/{missions.length} concluídas</span>
              </div>

              <div className="missions-grid">
                {missions.map((mission) => (
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
            <Leaderboard players={leaderboard} userName={userName} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

import { useMemo, useEffect } from "react";
import HealthInsights from "../components/HealthInsights";

export default function Dashboard({ careplus, goTo }) {
  const { state, xpProgress, healthLatest, syncDevices } = careplus;

  useEffect(() => {
    const interval = setInterval(() => {
      syncDevices();
    }, 5000);
    return () => clearInterval(interval);
  }, [syncDevices]);

  const progress = xpProgress();
  const xpAtual = state.xp;
  const nivel = state.level;
  const health = useMemo(
    () => ({
      bpm: healthLatest.bpm,
      spo2: healthLatest.spo2,
      steps: healthLatest.steps,
      score: healthLatest.score,
    }),
    [healthLatest]
  );

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Saudação */}
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          Bem-vinda de volta
        </p>
        <h1 className="text-2xl font-extrabold text-gray-900 mt-0.5">
          Olá, Mariana 👋
        </h1>
      </div>

      {/* Card XP */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-green-200 text-xs font-medium">Nível atual</p>
            <p className="text-3xl font-extrabold">Nível {nivel}</p>
          </div>
          <div className="text-right">
            <p className="text-green-200 text-xs font-medium">XP Total</p>
            <p className="text-3xl font-extrabold">{xpAtual}</p>
          </div>
        </div>
        <div className="bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-white rounded-full h-2 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-green-200 text-xs">{(nivel - 1) * 100} XP</span>
          <span className="text-white text-xs font-semibold">
            {progress}% → Nível {nivel + 1}
          </span>
          <span className="text-green-200 text-xs">{nivel * 100} XP</span>
        </div>
      </div>

      {/* Métricas de saúde */}
      <div className="grid gap-5">
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Saúde em tempo real
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              emoji="❤️"
              valor={health.bpm}
              label="BPM"
              status={health.bpm >= 60 && health.bpm <= 100 ? "Normal" : "Ativo"}
              statusColor={health.bpm >= 60 && health.bpm <= 100 ? "green" : "amber"}
            />
            <MetricCard
              emoji="🫁"
              valor={health.spo2}
              label="SpO2 %"
              status={health.spo2 >= 95 ? "Ótimo" : "Atenção"}
              statusColor={health.spo2 >= 95 ? "green" : "red"}
            />
            <MetricCard
              emoji="👟"
              valor={health.steps.toLocaleString()}
              label="Passos"
              status={health.steps >= 5000 ? "Meta" : "Abaixo"}
              statusColor={health.steps >= 5000 ? "green" : "amber"}
            />
            <MetricCard
              emoji="💚"
              valor={`${health.score}%`}
              label="Health Score"
              status={health.score > 85 ? "Excelente" : "Bom"}
              statusColor={health.score > 85 ? "green" : "amber"}
            />
          </div>
        </div>

        <HealthInsights health={health} />
      </div>

      {/* Health Score */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm
                      flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-0.5">Health Score</p>
          <p className="text-4xl font-extrabold text-green-600">{health.score}</p>
          <p className="text-xs text-green-600 font-semibold mt-0.5">↑ +5 desde ontem</p>
        </div>
        <ScoreRing value={health.score} />
      </div>

      {/* Streak */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-700">🔥 Streak desta semana</p>
          <span className="text-green-600 font-bold text-sm">{state.streak} dias</span>
        </div>
        <div className="flex justify-between">
          {["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"].map((dia, i) => (
            <div key={dia} className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center
                              text-xs font-bold transition
                              ${i < state.streak
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-300"}`}>
                {dia[0]}
              </div>
              <span className="text-xs text-gray-400">{dia}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA missão */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-4
                      flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">
            Próxima missão
          </p>
          <p className="font-semibold text-gray-800 text-sm">Caminhar 5.000 passos</p>
          <p className="text-xs text-gray-500 mt-0.5">+30 XP ao completar</p>
        </div>
        <button
          onClick={() => goTo("missoes")}
          className="bg-green-600 text-white text-xs font-bold px-4 py-2
                     rounded-xl hover:bg-green-700 transition active:scale-95"
        >
          Ver todas
        </button>
      </div>
    </div>
  );
}

// ── Sub-componentes ────────────────────────────────────────────
function MetricCard({ emoji, valor, label, status, statusColor }) {
  const colors = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    red:   "bg-red-100 text-red-700",
  };
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm
                    hover:-translate-y-0.5 transition">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{emoji}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[statusColor]}`}>
          {status}
        </span>
      </div>
      <p className="text-3xl font-extrabold text-gray-900">{valor}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}

function ScoreRing({ value }) {
  return (
    <div className="w-20 h-20 relative">
      <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#dcfce7" strokeWidth="3" />
        <circle
          cx="18" cy="18" r="15.9" fill="none"
          stroke="#16a34a" strokeWidth="3"
          strokeDasharray={`${value} ${100 - value}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center
                       text-sm font-bold text-green-700">
        {value}%
      </span>
    </div>
  );
}

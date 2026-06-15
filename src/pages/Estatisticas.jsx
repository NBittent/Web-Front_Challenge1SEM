import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { formatDateLabel, getWeekLabel } from "../utils/date";

export default function Estatisticas({ careplus }) {
  const { state, activityHistory, healthHistory, statistics } = careplus;

  const xpData = useMemo(
    () =>
      activityHistory
        .slice(-14)
        .map((item) => ({ date: formatDateLabel(item.date), xp: item.xp })),
    [activityHistory]
  );

  const healthData = useMemo(
    () =>
      healthHistory
        .slice(-14)
        .map((item) => ({ date: formatDateLabel(item.date), score: item.score })),
    [healthHistory]
  );

  const weeklyMissions = useMemo(() => {
    const groups = {};
    activityHistory.forEach((item) => {
      const week = getWeekLabel(item.date);
      groups[week] = (groups[week] || 0) + item.missions;
    });
    return Object.entries(groups)
      .map(([week, missions]) => ({ week, missions }))
      .slice(-4);
  }, [activityHistory]);

  const summary = {
    xpTotal: statistics?.xpTotal ?? state.xp,
    xpLast7Days:
      statistics?.xpLast7Days ?? activityHistory.slice(-7).reduce((sum, item) => sum + item.xp, 0),
    totalMissionsCompleted:
      statistics?.totalMissionsCompleted ?? state.missoesConcluidas.length,
    badgesUnlocked:
      statistics?.badgesUnlocked ?? state.badgesDesbloqueados.length,
    highestStreak:
      statistics?.highestStreak ?? state.streak,
    rewardsRedeemed:
      statistics?.rewardsRedeemed ?? state.recompensasResgatadas.length,
    currentLevel: statistics?.currentLevel ?? state.level,
  };

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Estatísticas</h1>
          <p className="text-sm text-gray-400">Visão completa do seu progresso e saúde.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "XP Total", value: summary.xpTotal },
          { label: "XP últimos 7 dias", value: summary.xpLast7Days },
          { label: "Missões concluídas", value: summary.totalMissionsCompleted },
          { label: "Badges desbloqueadas", value: summary.badgesUnlocked },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-400">{item.label}</p>
            <p className="mt-3 text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4">
        <section className="rounded-3xl bg-white border border-gray-100 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">Evolução de XP</p>
              <p className="text-lg font-bold text-gray-900">XP diário</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={xpData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" tickLine={false} />
                <YAxis stroke="#9ca3af" tickLine={false} />
                <Tooltip formatter={(value) => [`${value} XP`, "XP"]} />
                <Line type="monotone" dataKey="xp" stroke="#16a34a" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl bg-white border border-gray-100 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">Evolução do Health Score</p>
              <p className="text-lg font-bold text-gray-900">Health Score diário</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#9ca3af" tickLine={false} />
                <YAxis stroke="#9ca3af" tickLine={false} domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, "Health Score"]} />
                <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl bg-white border border-gray-100 p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400">Missões por semana</p>
              <p className="text-lg font-bold text-gray-900">Resumo semanal</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyMissions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#9ca3af" tickLine={false} />
                <YAxis stroke="#9ca3af" tickLine={false} />
                <Tooltip formatter={(value) => [value, "Missões"]} />
                <Bar dataKey="missions" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Maior streak", value: summary.highestStreak, unit: "dias" },
          { label: "Recompensas", value: summary.rewardsRedeemed, unit: "resgatadas" },
          { label: "Nível atual", value: summary.currentLevel },
          { label: "Badge final", value: `${summary.badgesUnlocked}` },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-400">{card.label}</p>
            <p className="mt-3 text-2xl font-bold text-gray-900">
              {card.value} {card.unit ?? ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

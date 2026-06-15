import { useMemo } from "react";
import { formatDateLabel, formatFullDate } from "../utils/date";

export default function Calendario({ careplus }) {
  const history = useMemo(
    () => [...careplus.activityHistory].sort((a, b) => a.date.localeCompare(b.date)),
    [careplus.activityHistory]
  );

  const completedDays = history.filter((item) => item.missions > 0).length;
  const totalXp = history.reduce((sum, item) => sum + item.xp, 0);

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Calendário de Atividades</h1>
          <p className="text-sm text-gray-400">Últimos 30 dias de missões e ganho de XP.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-400">Dias com atividade</p>
            <p className="text-2xl font-bold text-green-600">{completedDays}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-400">XP acumulado</p>
            <p className="text-2xl font-bold text-gray-900">{totalXp}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-gray-400">Média diária</p>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(totalXp / history.length)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {history.map((day) => {
          const active = day.missions > 0;
          return (
            <div
              key={day.date}
              title={`${formatFullDate(day.date)}\nMissões: ${day.missions}\nXP ganho: ${day.xp}`}
              className={`h-16 rounded-2xl p-2 text-[10px] text-center transition
                ${active
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
            >
              <span className="block font-bold">{formatDateLabel(day.date)}</span>
              <span className="mt-1 block leading-tight">
                {active ? `${day.missions} missões` : "Sem atividade"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useMemo } from "react";

export default function HealthInsights({ health }) {
  const { bpm, spo2, steps, score } = health;

  const insights = useMemo(() => {
    const list = [];

    if (bpm >= 60 && bpm <= 100) {
      list.push("Seu ritmo cardíaco está saudável.");
    }

    if (spo2 < 95) {
      list.push("Atenção à sua oxigenação.");
    }

    if (steps < 5000) {
      list.push("Você está abaixo da meta recomendada de passos.");
    }

    if (score > 85) {
      list.push("Excelente trabalho mantendo hábitos saudáveis.");
    }

    if (list.length === 0) {
      list.push("Continue acompanhando suas métricas para manter o progresso.");
    }

    return list.slice(0, 3);
  }, [bpm, spo2, steps, score]);

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-bold text-gray-700">Health Insights</p>
          <p className="text-xs text-gray-400">Recomendações automáticas</p>
        </div>
        <span className="text-xs text-green-600 font-semibold">Atualizado</span>
      </div>
      <div className="space-y-2">
        {insights.map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-green-50 px-3 py-3 text-sm text-gray-700"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

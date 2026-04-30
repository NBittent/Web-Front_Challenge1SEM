// Componente filho — recebe métricas do ESP32 via props do componente pai
export default function HealthMetrics({ metrics, healthScore, healthStatus }) {
  const { heartRate, spo2, temperature, steps } = metrics;

  const items = [
    { icon: "❤️",  label: "Freq. Cardíaca", value: `${heartRate} bpm`,           status: heartRate <= 100 && heartRate >= 60 ? "ok" : "alert"    },
    { icon: "🫁",  label: "SpO2",           value: `${spo2}%`,                   status: spo2 >= 95 ? "ok" : "alert"         },
    { icon: "🌡️", label: "Temperatura",    value: `${temperature} °C`,           status: temperature <= 37.5 ? "ok" : "alert"},
    { icon: "👟",  label: "Passos",         value: steps.toLocaleString("pt-BR"), status: steps >= 5000 ? "ok" : "progress"   },
  ];

  return (
    <section className="metrics-section">
      <h2>Métricas em Tempo Real</h2>
      <div className="metrics-grid">
        {items.map(({ icon, label, value, status }) => (
          <div key={label} className={`metric-card metric-${status}`}>
            <span className="metric-icon">{icon}</span>
            <span className="metric-label">{label}</span>
            <span className="metric-value">{value}</span>
          </div>
        ))}
        <div className={`metric-card metric-health metric-${healthStatus}`}>
          <span className="metric-icon">✨</span>
          <span className="metric-label">Health Score</span>
          <span className="metric-value">{healthScore}</span>
          <span className="metric-small">{healthStatus === "good" ? "Ótimo" : healthStatus === "warning" ? "Atenção" : "Crítico"}</span>
        </div>
      </div>
    </section>
  );
}

// Componente filho — card de missão individual
// Recebe dados e callback do componente pai (App.jsx)
export default function MissionCard({ mission, onToggle }) {
  const { id, title, points, category, completed } = mission;

  const categoryColors = {
    atividade: "#4CAF50",
    saude:     "#2196F3",
    habito:    "#FF9800",
    nutricao:  "#9C27B0",
  };

  return (
    <div className={`mission-card ${completed ? "mission-done" : ""}`}>
      <div
        className="mission-category"
        style={{ backgroundColor: categoryColors[category] || "#607D8B" }}
      >
        {category}
      </div>
      <div className="mission-body">
        <p className="mission-title">{title}</p>
        <span className="mission-points">+{points} pts</span>
      </div>
      <button
        className={`mission-btn ${completed ? "btn-undo" : "btn-complete"}`}
        onClick={() => onToggle(id)}
      >
        {completed ? "✓ Concluída" : "Completar"}
      </button>
    </div>
  );
}

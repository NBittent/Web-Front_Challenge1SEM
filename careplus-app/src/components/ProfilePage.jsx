export default function ProfilePage({ userName, totalPoints, level, completedCount, missionsCount, metrics, onBack }) {
  return (
    <section className="profile-page">
      <div className="profile-page-header">
        <div className="profile-avatar">{userName.charAt(0)}</div>
        <div className="profile-user-info">
          <h2>{userName}</h2>
          <p>Seu painel pessoal de progresso e saúde.</p>
          <div className="profile-badges">
            <span className="badge">Nível {level}</span>
            <span className="badge">{totalPoints} pts</span>
            <span className="badge">{completedCount}/{missionsCount} missões</span>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <h3>Resumo da Jornada</h3>
          <ul>
            <li><strong>Pontos totais:</strong> {totalPoints}</li>
            <li><strong>Missões concluídas:</strong> {completedCount}</li>
            <li><strong>Missões ativas:</strong> {missionsCount - completedCount}</li>
            <li><strong>Nível atual:</strong> {level}</li>
          </ul>
        </div>

        <div className="profile-card">
          <h3>Métricas de Saúde</h3>
          <ul className="metrics-list">
            <li><strong>Frequência cardíaca:</strong> {metrics.heartRate} bpm</li>
            <li><strong>Oxigenação:</strong> {metrics.spo2}%</li>
            <li><strong>Temperatura:</strong> {metrics.temperature}°C</li>
            <li><strong>Passos:</strong> {metrics.steps}</li>
          </ul>
        </div>
      </div>

      <button className="back-btn" onClick={onBack}>
        Voltar ao Dashboard
      </button>
    </section>
  );
}

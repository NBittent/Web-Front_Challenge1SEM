export default function ProfilePage({ userName, totalPoints, level, completedCount, missionsCount, metrics, streakCount, badges, healthScore, healthStatus, lastActiveDate, onBack }) {
  const badgeData = {
    consistency: {
      name: "Herói da Consistência",
      icon: "🔥",
      description: "Mantenha uma streak de 3 dias consecutivos completando missões"
    },
    level3: {
      name: "Escalador de Níveis",
      icon: "🏔️",
      description: "Alcance o nível 3 através de missões concluídas"
    },
    missionMaster: {
      name: "Missões Dominadas",
      icon: "🎯",
      description: "Complete 5 missões para mostrar seu domínio"
    }
  };

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
            <span className="badge"><span className="streak-icon">🔥</span>{streakCount} dias de streak</span>
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
            <li><strong>Última atividade:</strong> {lastActiveDate || "Ainda sem registro"}</li>
          </ul>
        </div>

        <div className="profile-card">
          <h3>Saúde em destaque</h3>
          <div className={`health-summary health-${healthStatus}`}>
            <span className="health-score-value">{healthScore}</span>
            <span className="health-score-label">{healthStatus === "good" ? "Saúde Estável" : healthStatus === "warning" ? "Atenção" : "Crítico"}</span>
          </div>
          <ul className="metrics-list">
            <li><strong>Frequência cardíaca:</strong> {metrics.heartRate} bpm</li>
            <li><strong>Oxigenação:</strong> {metrics.spo2}%</li>
            <li><strong>Temperatura:</strong> {metrics.temperature}°C</li>
            <li><strong>Passos:</strong> {metrics.steps}</li>
          </ul>
        </div>
      </div>

      <div className="profile-card badge-panel">
        <h3>Badges desbloqueados</h3>
        {badges.length > 0 ? (
          <div className="badge-wrap">
            {[...new Set(badges)].map((badge) => (
              <div key={badge} className="badge-card">
                <div className="badge-icon">{badgeData[badge]?.icon || "🏆"}</div>
                <div className="badge-content">
                  <div className="badge-name">{badgeData[badge]?.name || badge}</div>
                  <div className="badge-description">{badgeData[badge]?.description || "Badge especial desbloqueado"}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Continue suas missões para ganhar badges especiais.</p>
        )}
      </div>

      <button className="back-btn" onClick={onBack}>
        Voltar ao Dashboard
      </button>
    </section>
  );
}

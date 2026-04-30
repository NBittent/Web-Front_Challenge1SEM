// Componente de cabeçalho — recebe dados do usuário via props (pai → filho)
export default function Header({ userName, totalPoints, level, streakCount, onProfileClick }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-brand">
          <span className="logo">💚</span>
          <div>
            <span className="brand-name">Care Plus</span>
            <span className="brand-tagline">Seu cuidado conectado ao dia a dia</span>
          </div>
        </div>
        <div className="header-greeting">
          <strong>Olá, {userName.split(' ')[0]}!</strong>
          <span>Pronto para mais uma rodada de bem-estar?</span>
        </div>
      </div>
      <div className="header-right">
        <div className="header-stats">
          <div className="points-badge">
            <span className="points-value">{totalPoints}</span>
            <span className="points-label">pts</span>
          </div>
          <div className="level-chip">Nível {level}</div>
          <div className="streak-chip">
            <span className="streak-icon">🔥</span>
            <span>{streakCount}</span>
          </div>
        </div>
        <button className="profile-btn" onClick={onProfileClick}>
          Ver Perfil
        </button>
      </div>
    </header>
  );
}

// Componente de cabeçalho — recebe dados do usuário via props (pai → filho)
export default function Header({ userName, totalPoints, level, onProfileClick }) {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="logo">💚</span>
        <span className="brand-name">Care Plus</span>
      </div>
      <div className="header-user">
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="user-level">Nível {level}</span>
        </div>
        <div className="points-badge">
          <span className="points-value">{totalPoints}</span>
          <span className="points-label">pts</span>
        </div>
        <button className="profile-btn" onClick={onProfileClick}>
          Perfil
        </button>
      </div>
    </header>
  );
}

// Componente de ranking semanal — dados simulados para Sprint 2
// Na Sprint 3 será alimentado pela API real
export default function Leaderboard({ currentPoints, userName }) {
  // Desestruturação de array com pontuações simuladas dos demais usuários
  const [p1, p2, p3, p4] = [520, 440, 380, 310];

  const players = [
    { name: "Ana S.",     points: p1 },
    { name: "Carlos M.",  points: p2 },
    { name: "Beatriz L.", points: p3 },
    { name: "Rodrigo P.", points: p4 },
    { name: userName,     points: currentPoints },
  ].sort((a, b) => b.points - a.points);

  return (
    <section className="leaderboard-section">
      <h2>🏆 Ranking Semanal</h2>
      <ol className="leaderboard-list">
        {players.map((player, index) => (
          <li
            key={player.name}
            className={`leaderboard-item ${player.name === userName ? "leaderboard-me" : ""}`}
          >
            <span className="rank">#{index + 1}</span>
            <span className="player-name">{player.name}</span>
            <span className="player-points">{player.points} pts</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

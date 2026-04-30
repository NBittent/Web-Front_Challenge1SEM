// Componente de ranking semanal — usa estado persistido
export default function Leaderboard({ players = [], userName }) {
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  return (
    <section className="leaderboard-section">
      <h2>🏆 Ranking Semanal</h2>
      <ol className="leaderboard-list">
        {sortedPlayers.map((player, index) => (
          <li
            key={`${player.name}-${player.points}`}
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

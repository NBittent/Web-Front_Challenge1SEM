export default function Perfil({ careplus }) {
  const { state, db } = careplus;

  return (
    <div className="animate-fade-in space-y-5">

      {/* Header do perfil */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center
                          justify-center text-2xl font-extrabold">
            MR
          </div>
          <div>
            <h1 className="text-xl font-extrabold">Mariana Costa</h1>
            <p className="text-green-200 text-sm">Plano Premium · Nível {state.level}</p>
            <p className="text-white text-xs font-semibold mt-1">
              🔥 {state.streak} dias de streak
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "XP Total",  valor: state.xp },
            { label: "Missões",   valor: state.missoesConcluidas.length },
            { label: "Badges",    valor: state.badgesDesbloqueados.length },
          ].map(({ label, valor }) => (
            <div key={label} className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-2xl font-extrabold">{valor}</p>
              <p className="text-green-200 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <section>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Badges conquistados
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {db.badges.map((b) => {
            const unlocked = state.badgesDesbloqueados.includes(b.id);
            return (
              <div
                key={b.id}
                className={`bg-white rounded-2xl p-4 border shadow-sm flex items-center
                            gap-3 transition
                            ${unlocked ? "border-green-200" : "border-gray-100 opacity-40"}`}
              >
                <span className="text-3xl">{b.emoji}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{b.nome}</p>
                  <p className="text-xs text-gray-400">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Histórico */}
      <section>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Histórico de missões
        </h2>
        {state.missoesConcluidas.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">
            Nenhuma missão concluída ainda.
          </p>
        ) : (
          <div className="space-y-2">
            {state.missoesConcluidas.map((id) => {
              const m = db.missoes.find((x) => x.id === id);
              if (!m) return null;
              return (
                <div
                  key={id}
                  className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm
                             flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{m.emoji}</span>
                    <p className="text-sm font-medium text-gray-700">{m.titulo}</p>
                  </div>
                  <span className="text-xs font-bold text-green-600">+{m.xp} XP</span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recompensas resgatadas */}
      {state.recompensasResgatadas.length > 0 && (
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Recompensas resgatadas
          </h2>
          <div className="space-y-2">
            {state.recompensasResgatadas.map((id) => {
              const r = db.recompensas.find((x) => x.id === id);
              if (!r) return null;
              return (
                <div
                  key={id}
                  className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm
                             flex items-center gap-3"
                >
                  <span className="text-xl">{r.emoji}</span>
                  <p className="text-sm font-medium text-gray-700">{r.nome}</p>
                  <span className="ml-auto text-xs text-gray-400">Resgatado ✓</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

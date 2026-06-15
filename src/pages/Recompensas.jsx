import { useState } from "react";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function Recompensas({ careplus, onResgatar }) {
  const { state, db } = careplus;
  const [confirmId, setConfirmId] = useState(null);

  const sorted = [...db.leaderboard].sort((a, b) => b.xp - a.xp);
  const pending = db.recompensas.find((r) => r.id === confirmId);

  function handleConfirm() {
    onResgatar(confirmId);
    setConfirmId(null);
  }

  return (
    <div className="animate-fade-in space-y-6">

      {/* ── Modal de confirmação ── */}
      {confirmId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center
                        bg-black/50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Confirmar Resgate</h3>
              <button
                onClick={() => setConfirmId(null)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Deseja resgatar{" "}
              <strong>"{pending?.nome}"</strong> por{" "}
              <strong>{pending?.custo} pts</strong>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600
                           text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-2.5 rounded-xl bg-green-600 text-white
                           text-sm font-bold hover:bg-green-700 transition"
              >
                Resgatar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Leaderboard ── */}
      <section>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          🏆 Ranking da semana
        </h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {sorted.map((p, i) => (
            <div
              key={p.id}
              className={`flex items-center gap-3 px-4 py-3 transition
                          ${i < sorted.length - 1 ? "border-b border-gray-50" : ""}
                          ${p.voce ? "bg-green-50" : "hover:bg-gray-50"}`}
            >
              {/* Posição */}
              <div className="w-8 text-center font-bold">
                {i < 3
                  ? <span className="text-lg">{MEDALS[i]}</span>
                  : <span className="text-sm text-gray-400">#{i + 1}</span>
                }
              </div>

              {/* Avatar + nome */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center
                            text-xs font-bold flex-shrink-0
                            ${p.voce
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"}`}
              >
                {p.avatar}
              </div>
              <p className={`flex-1 text-sm font-semibold
                             ${p.voce ? "text-green-700" : "text-gray-800"}`}>
                {p.nome} {p.voce && <span className="font-normal text-green-500">(você)</span>}
              </p>

              {/* XP */}
              <span className="text-sm font-bold text-gray-700">{p.xp} XP</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Catálogo de recompensas ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            🎁 Recompensas
          </h2>
          <span className="text-xs text-gray-500">
            Saldo:{" "}
            <span className="text-green-600 font-bold">{state.pontos} pts</span>
          </span>
        </div>

        <div className="space-y-3">
          {db.recompensas.map((r) => {
            const resgatado    = state.recompensasResgatadas.includes(r.id);
            const podeResgatar = state.pontos >= r.custo && !resgatado;

            return (
              <div
                key={r.id}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm
                           hover:-translate-y-0.5 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center
                                  justify-center text-2xl flex-shrink-0">
                    {r.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{r.nome}</p>
                    <p className="text-xs text-gray-400 mt-0.5 truncate">{r.desc}</p>
                    <p className="text-green-600 font-bold text-xs mt-1">{r.custo} pts</p>
                  </div>
                  <button
                    onClick={() => podeResgatar && setConfirmId(r.id)}
                    disabled={!podeResgatar}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition
                                ${resgatado
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : podeResgatar
                                    ? "bg-green-600 text-white hover:bg-green-700 active:scale-95"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                  >
                    {resgatado ? "Resgatado ✓" : podeResgatar ? "Resgatar" : "Sem pts"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

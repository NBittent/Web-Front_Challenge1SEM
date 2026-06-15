import { useState } from "react";

const FILTROS = [
  { id: "all",      label: "Todas"      },
  { id: "pendente", label: "Pendentes"  },
  { id: "feita",    label: "Concluídas" },
];

export default function Missoes({ careplus, onConcluirMissao }) {
  const { state, db } = careplus;
  const [filtro, setFiltro] = useState("all");

  const missoesFiltradas = db.missoes.filter((m) => {
    const feita = state.missoesConcluidas.includes(m.id);
    if (filtro === "feita")    return feita;
    if (filtro === "pendente") return !feita;
    return true;
  });

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Missões 🎯</h1>
        <p className="text-sm text-gray-400">
          {state.missoesConcluidas.length}/{db.missoes.length} concluídas
        </p>
      </div>

      {/* Barra de progresso geral */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-5">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span className="font-medium">Progresso do dia</span>
          <span className="font-bold text-green-600">
            {Math.round((state.missoesConcluidas.length / db.missoes.length) * 100)}%
          </span>
        </div>
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-green-500 rounded-full h-2 transition-all duration-700"
            style={{
              width: `${(state.missoesConcluidas.length / db.missoes.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltro(f.id)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold
                        transition
                        ${filtro === f.id
                          ? "bg-green-600 text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-green-400"
                        }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid de missões */}
      {missoesFiltradas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">🎉</p>
          <p className="text-gray-500 text-sm">
            {filtro === "pendente"
              ? "Todas as missões foram concluídas!"
              : "Nenhuma missão aqui ainda."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {missoesFiltradas.map((m) => (
            <MissaoCard
              key={m.id}
              missao={m}
              feita={state.missoesConcluidas.includes(m.id)}
              onConcluir={() => onConcluirMissao(m.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MissaoCard({ missao, feita, onConcluir }) {
  return (
    <div
      className={`rounded-2xl p-4 border shadow-sm transition hover:-translate-y-0.5
                  ${feita
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-100"}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{missao.emoji}</span>
        {feita ? (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5
                           rounded-full font-semibold">
            ✓ Feito
          </span>
        ) : (
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5
                           rounded-full font-medium">
            +{missao.xp} XP
          </span>
        )}
      </div>
      <p className="font-semibold text-sm text-gray-800 mb-3">{missao.titulo}</p>
      <button
        onClick={onConcluir}
        disabled={feita}
        className={`w-full py-2 rounded-xl text-xs font-bold transition
                    ${feita
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700 active:scale-95"
                    }`}
      >
        {feita ? "Concluída ✓" : "Concluir missão"}
      </button>
    </div>
  );
}

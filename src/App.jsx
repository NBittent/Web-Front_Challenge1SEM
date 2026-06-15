import { useState, useEffect } from "react";
import { useCarePlus } from "./hooks/useCarePlus";
import Dashboard    from "./pages/Dashboard";
import Missoes      from "./pages/Missoes";
import Perfil       from "./pages/Perfil";
import Recompensas  from "./pages/Recompensas";
import Calendario   from "./pages/Calendario";
import Estatisticas from "./pages/Estatisticas";
import Dispositivos from "./pages/Dispositivos";
import Toast        from "./components/Toast";
import ModalBadge   from "./components/ModalBadge";

// ── Ícones da nav ─────────────────────────────────────────────
const NAV = [
  { id: "dashboard",   label: "Início",      icon: "🏠" },
  { id: "missoes",     label: "Missões",     icon: "🎯" },
  { id: "perfil",      label: "Perfil",      icon: "👤" },
  { id: "recompensas", label: "Recompensas", icon: "🎁" },
  { id: "calendario",  label: "Calendário",  icon: "📅" },
  { id: "estatisticas",label: "Estatísticas",icon: "📊" },
  { id: "dispositivos",label: "Dispositivos",icon: "📡" },
];

export default function App() {
  const [page, setPage]         = useState("dashboard");
  const [toast, setToast]       = useState(null);
  const [badgeModal, setBadge]  = useState(null);
  const careplus                = useCarePlus();

  // ── Toast helper ────────────────────────────────────────
  function showToast(msg, icon = "✅") {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 3000);
  }

  // ── Concluir missão com feedback ────────────────────────
  function handleConcluirMissao(missaoId) {
    const { db, concluirMissao, checkBadges, state } = careplus;
    if (state.missoesConcluidas.includes(missaoId)) return;
    const missao = db.missoes.find((m) => m.id === missaoId);
    concluirMissao(missaoId);
    showToast(`+${missao.xp} XP — ${missao.titulo}`, "🎯");

    // Verifica badges após pequeno delay (estado já atualizado)
    setTimeout(() => {
      const novos = careplus.checkBadges();
      if (novos.length > 0) {
        setTimeout(() => setBadge(novos[0]), 400);
      }
    }, 100);
  }

  // ── Resgatar recompensa com feedback ────────────────────
  function handleResgatar(id) {
    const { db, resgatarRecompensa, state } = careplus;
    const r = db.recompensas.find((x) => x.id === id);
    if (state.pontos < r.custo || state.recompensasResgatadas.includes(id)) return;
    resgatarRecompensa(id);
    showToast(`${r.nome} resgatada! 🎁`, "✅");
  }

  const pageProps = {
    careplus,
    onConcluirMissao: handleConcluirMissao,
    onResgatar:       handleResgatar,
    showToast,
    goTo:             setPage,
    onSyncDevices:    careplus.syncDevices,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Header ─────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center">
              <span className="text-white text-xs font-black">C+</span>
            </div>
            <span className="font-bold text-gray-800 text-sm">CarePlus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center
                            text-green-700 font-bold text-xs">
              MR
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-600">Mariana</span>
          </div>
        </div>
      </header>

      {/* ── Conteúdo ───────────────────────── */}
      <main className="max-w-2xl mx-auto px-4 pt-4 pb-24">
        {page === "dashboard"    && <Dashboard    {...pageProps} />}
        {page === "missoes"      && <Missoes      {...pageProps} />}
        {page === "perfil"       && <Perfil       {...pageProps} />}
        {page === "recompensas"  && <Recompensas  {...pageProps} />}
        {page === "calendario"   && <Calendario   {...pageProps} />}
        {page === "estatisticas" && <Estatisticas {...pageProps} />}
        {page === "dispositivos" && <Dispositivos {...pageProps} />}
      </main>

      {/* ── Bottom Nav ─────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30">
        <div className="max-w-2xl mx-auto overflow-x-auto">
          <div className="grid grid-cols-7 h-16">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setPage(n.id)}
                className={`flex flex-col items-center justify-center gap-1 transition min-w-[64px]
                  ${page === n.id ? "text-green-600" : "text-gray-400 hover:text-gray-600"}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition text-lg
                  ${page === n.id ? "bg-green-50" : ""}`}>
                  {n.icon}
                </div>
                <span className="text-[10px] font-medium">{n.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Toast ──────────────────────────── */}
      {toast && <Toast msg={toast.msg} icon={toast.icon} />}

      {/* ── Modal Badge ────────────────────── */}
      {badgeModal && (
        <ModalBadge badge={badgeModal} onClose={() => setBadge(null)} />
      )}
    </div>
  );
}

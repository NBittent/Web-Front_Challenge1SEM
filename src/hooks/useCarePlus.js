import { useState, useEffect, useCallback, useMemo } from "react";
import db from "../data/db.json";
import {
  STORAGE_KEYS,
  readStorage,
  writeStorage,
  createDefaultActivityHistory,
  createDefaultHealthHistory,
  createDefaultDeviceSync,
  createDefaultStatistics,
} from "../utils/storage";

// ── Estado inicial ────────────────────────────────────────────
const INITIAL_STATE = {
  xp: 340,
  pontos: 340,
  streak: 5,
  level: 4,
  missoesConcluidas: [1, 2, 4],
  badgesDesbloqueados: [1, 2, 3],
  recompensasResgatadas: [],
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function keepRecent(list) {
  return list.slice(-30);
}

// ── Hook principal ────────────────────────────────────────────
export function useCarePlus() {
  const [state, setState] = useState(() => {
    try {
      const saved = readStorage(STORAGE_KEYS.CAREPLUS_STATE, null);
      return saved || INITIAL_STATE;
    } catch {
      return INITIAL_STATE;
    }
  });

  const [activityHistory, setActivityHistory] = useState(() => {
    return readStorage(STORAGE_KEYS.ACTIVITY_HISTORY, null) || createDefaultActivityHistory();
  });

  const [healthHistory, setHealthHistory] = useState(() => {
    return readStorage(STORAGE_KEYS.HEALTH_HISTORY, null) || createDefaultHealthHistory();
  });

  const [deviceSync, setDeviceSync] = useState(() => {
    return readStorage(STORAGE_KEYS.DEVICE_SYNC, null) || createDefaultDeviceSync();
  });

  const [statistics, setStatistics] = useState(() => {
    const persisted = readStorage(STORAGE_KEYS.STATISTICS, null);
    return persisted || createDefaultStatistics(INITIAL_STATE, activityHistory);
  });

  const healthLatest = useMemo(
    () => healthHistory[healthHistory.length - 1] || {
      bpm: 72,
      spo2: 98,
      steps: 4320,
      score: 87,
    },
    [healthHistory]
  );

  useEffect(() => {
    writeStorage(STORAGE_KEYS.CAREPLUS_STATE, state);
  }, [state]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.ACTIVITY_HISTORY, activityHistory);
  }, [activityHistory]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.HEALTH_HISTORY, healthHistory);
  }, [healthHistory]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.DEVICE_SYNC, deviceSync);
  }, [deviceSync]);

  useEffect(() => {
    setStatistics(createDefaultStatistics(state, activityHistory));
  }, [state, activityHistory]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.STATISTICS, statistics);
  }, [statistics]);

  // ── Atualiza histórico de atividade do dia ───────────────────
  const addActivityRecord = useCallback((missions, xp) => {
    setActivityHistory((prev) => {
      const today = todayKey();
      const exists = prev.find((item) => item.date === today);
      if (exists) {
        return prev.map((item) =>
          item.date === today
            ? { ...item, missions: item.missions + missions, xp: item.xp + xp }
            : item
        );
      }
      return keepRecent([...prev, { date: today, missions, xp }]);
    });
  }, []);

  // ── Concluir missão ──────────────────────────────────────
  const concluirMissao = useCallback((missaoId) => {
    setState((prev) => {
      if (prev.missoesConcluidas.includes(missaoId)) return prev;
      const missao = db.missoes.find((m) => m.id === missaoId);
      if (!missao) return prev;

      const novoXP = prev.xp + missao.xp;
      const novoPontos = prev.pontos + missao.xp;
      const novoLevel = Math.floor(novoXP / 100) + 1;
      const novoStreak = Math.min(prev.streak + 1, 7);

      addActivityRecord(1, missao.xp);

      return {
        ...prev,
        xp: novoXP,
        pontos: novoPontos,
        level: novoLevel,
        streak: novoStreak,
        missoesConcluidas: [...prev.missoesConcluidas, missaoId],
      };
    });
  }, [addActivityRecord]);

  // ── Desbloquear badge ────────────────────────────────────
  const desbloquearBadge = useCallback((badgeId) => {
    setState((prev) => {
      if (prev.badgesDesbloqueados.includes(badgeId)) return prev;
      return { ...prev, badgesDesbloqueados: [...prev.badgesDesbloqueados, badgeId] };
    });
  }, []);

  // ── Resgatar recompensa ──────────────────────────────────
  const resgatarRecompensa = useCallback((recompensaId) => {
    setState((prev) => {
      const r = db.recompensas.find((x) => x.id === recompensaId);
      if (!r || prev.pontos < r.custo || prev.recompensasResgatadas.includes(recompensaId)) {
        return prev;
      }
      return {
        ...prev,
        pontos: prev.pontos - r.custo,
        recompensasResgatadas: [...prev.recompensasResgatadas, recompensaId],
      };
    });
  }, []);

  // ── Sincronizar dispositivos ─────────────────────────────
  const syncDevices = useCallback(() => {
    const now = new Date().toISOString();
    const bpm = 62 + Math.floor(Math.random() * 18);
    const spo2 = 94 + Math.floor(Math.random() * 6);
    const steps = Math.max(1200, Math.floor(Math.random() * 9800));
    const score = Math.min(100, 60 + Math.floor(steps / 120) + Math.floor(Math.random() * 12));

    setDeviceSync((prev) => ({
      ...prev,
      smartwatch: {
        ...prev.smartwatch,
        lastSync: now,
        bpm,
        spo2,
      },
      esp32: {
        ...prev.esp32,
        lastSync: now,
      },
    }));

    setHealthHistory((prev) => {
      const today = todayKey();
      const exists = prev.find((item) => item.date === today);
      const record = { date: today, bpm, spo2, steps, score };
      if (exists) {
        return prev.map((item) => (item.date === today ? record : item));
      }
      return keepRecent([...prev, record]);
    });
  }, []);

  // ── Reset (para testes) ──────────────────────────────────
  const resetState = useCallback(() => {
    setState(INITIAL_STATE);
    setActivityHistory(createDefaultActivityHistory());
    setHealthHistory(createDefaultHealthHistory());
    setDeviceSync(createDefaultDeviceSync());
    setStatistics(createDefaultStatistics(INITIAL_STATE, activityHistory));
  }, [activityHistory]);

  // ── Checar badges automaticamente ────────────────────────
  const checkBadges = useCallback(() => {
    const novos = [];
    db.badges.forEach((b) => {
      if (state.badgesDesbloqueados.includes(b.id)) return;
      const missoesMovimento = state.missoesConcluidas.filter(
        (id) => db.missoes.find((m) => m.id === id)?.categoria === "movimento"
      ).length;
      if (
        state.xp >= b.xpMin &&
        state.streak >= b.streakMin &&
        (b.missoesMin === 0 || state.missoesConcluidas.length >= b.missoesMin ||
          missoesMovimento >= b.missoesMin)
      ) {
        novos.push(b.id);
      }
    });
    if (novos.length > 0) {
      novos.forEach((id) => desbloquearBadge(id));
      return novos.map((id) => db.badges.find((b) => b.id === id));
    }
    return [];
  }, [state, desbloquearBadge]);

  // ── XP Progress ──────────────────────────────────────────
  const xpProgress = () => {
    const base = (state.level - 1) * 100;
    const next = state.level * 100;
    return Math.round(((state.xp - base) / (next - base)) * 100);
  };

  return {
    state,
    db,
    activityHistory,
    healthHistory,
    deviceSync,
    statistics,
    healthLatest,
    concluirMissao,
    resgatarRecompensa,
    checkBadges,
    resetState,
    xpProgress,
    syncDevices,
  };
}

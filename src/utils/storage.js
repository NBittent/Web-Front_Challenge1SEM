export const STORAGE_KEYS = {
  CAREPLUS_STATE: "careplus_react_state",
  ACTIVITY_HISTORY: "activityHistory",
  HEALTH_HISTORY: "healthHistory",
  DEVICE_SYNC: "deviceSync",
  STATISTICS: "statistics",
};

function safeParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function readStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  const stored = localStorage.getItem(key);
  return stored ? safeParse(stored, fallback) : fallback;
}

export function writeStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

function formatDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function getDaysAgo(offset) {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return formatDateKey(date);
}

export function createDefaultActivityHistory() {
  return Array.from({ length: 30 }).map((_, index) => {
    const missions = index % 4 === 0 ? Math.floor(Math.random() * 2) + 1 : Math.random() > 0.55 ? Math.floor(Math.random() * 2) : 0;
    return {
      date: getDaysAgo(29 - index),
      missions,
      xp: missions * (15 + Math.floor(Math.random() * 25)),
    };
  });
}

export function createDefaultHealthHistory() {
  return Array.from({ length: 30 }).map((_, index) => {
    const bpm = 62 + Math.floor(Math.random() * 22);
    const spo2 = 95 + Math.floor(Math.random() * 4);
    const steps = 2600 + Math.floor(Math.random() * 6600);
    const score = Math.min(100, 65 + Math.floor(steps / 120) + Math.floor(Math.random() * 12));

    return {
      date: getDaysAgo(29 - index),
      bpm,
      spo2,
      steps,
      score,
    };
  });
}

export function createDefaultDeviceSync() {
  const now = new Date().toISOString();
  return {
    smartwatch: {
      model: "Smartwatch Care Plus",
      status: "Conectado",
      lastSync: now,
      bpm: 72,
      spo2: 98,
    },
    esp32: {
      model: "ESP32 Simulator",
      status: "Online",
      source: "Simulador local",
      lastSync: now,
    },
  };
}

export function createDefaultStatistics(state = null, activityHistory = []) {
  return {
    xpTotal: state?.xp ?? 340,
    xpLast7Days: activityHistory.slice(-7).reduce((sum, item) => sum + item.xp, 0),
    totalMissionsCompleted: state?.missoesConcluidas?.length ?? 3,
    badgesUnlocked: state?.badgesDesbloqueados?.length ?? 3,
    highestStreak: state?.streak ?? 5,
    rewardsRedeemed: state?.recompensasResgatadas?.length ?? 0,
    currentLevel: state?.level ?? 4,
    updatedAt: new Date().toISOString(),
  };
}

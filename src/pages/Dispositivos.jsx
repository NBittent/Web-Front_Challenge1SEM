import { useEffect } from "react";
import { formatFullDate } from "../utils/date";

export default function Dispositivos({ careplus, showToast }) {
  const { deviceSync, syncDevices } = careplus;

  useEffect(() => {
    syncDevices();
    const interval = setInterval(syncDevices, 5000);
    return () => clearInterval(interval);
  }, [syncDevices]);

  function handleSync() {
    syncDevices();
    showToast("Sincronização realizada com sucesso!", "✅");
  }

  return (
    <div className="animate-fade-in space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Dispositivos</h1>
          <p className="text-sm text-gray-400">Cards de dispositivo para futura integração com ESP32/MQTT.</p>
        </div>
        <button
          onClick={handleSync}
          className="self-start rounded-2xl bg-green-600 px-4 py-2 text-sm font-bold text-white
                     hover:bg-green-700 transition active:scale-95"
        >
          Sincronizar Agora
        </button>
      </div>

      <div className="grid gap-4">
        <DeviceCard
          title="Smartwatch Care Plus"
          status="Conectado"
          lastSync={formatFullDate(deviceSync.smartwatch.lastSync)}
          details={[
            { label: "BPM recebido", value: `${deviceSync.smartwatch.bpm} BPM` },
            { label: "SpO2 recebida", value: `${deviceSync.smartwatch.spo2}%` },
          ]}
        />

        <DeviceCard
          title="ESP32 Simulator"
          status="Online"
          lastSync={formatFullDate(deviceSync.esp32.lastSync)}
          details={[
            { label: "Fonte dos dados", value: deviceSync.esp32.source },
          ]}
        />
      </div>
    </div>
  );
}

function DeviceCard({ title, status, lastSync, details }) {
  return (
    <div className="rounded-3xl bg-white border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-bold text-gray-900">{title}</p>
          <p className="text-xs text-gray-400">Status atual do dispositivo</p>
        </div>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          {status}
        </span>
      </div>
      <div className="space-y-3">
        <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
          <p className="text-xs text-gray-400">Última sincronização</p>
          <p className="mt-1 font-medium text-gray-900">{lastSync}</p>
        </div>
        {details.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-2xl bg-gray-50 p-4 text-sm">
            <span className="text-gray-500">{item.label}</span>
            <span className="font-semibold text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

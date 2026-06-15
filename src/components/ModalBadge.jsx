export default function ModalBadge({ badge, onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-8 text-center">
        <div className="text-6xl mb-3">{badge.emoji}</div>
        <h3 className="text-xl font-bold text-green-700 mb-1">Badge Desbloqueado!</h3>
        <p className="text-gray-700 font-semibold mb-2">{badge.nome}</p>
        <p className="text-gray-500 text-sm mb-6">{badge.desc}</p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-green-600 text-white font-bold
                     hover:bg-green-700 transition"
        >
          Incrível! 🎉
        </button>
      </div>
    </div>
  );
}

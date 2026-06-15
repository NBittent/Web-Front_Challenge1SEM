export default function Toast({ msg, icon }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3
                    bg-green-700 text-white px-4 py-3 rounded-xl shadow-xl
                    max-w-xs animate-fade-in">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium">{msg}</span>
    </div>
  );
}

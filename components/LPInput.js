export default function LPInput({ label, error, ...props }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm text-[#9ca3af] mb-2">{label}</label>}
      <input
        className="w-full bg-[#1c1e25] border border-[#2a2c36] rounded px-4 py-3 text-white focus:outline-none focus:border-[#00feba] transition-colors"
        {...props}
      />
      {error && (
        <div className="mt-2 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded px-3 py-2">
          {error}
        </div>
      )}
    </div>
  )
}

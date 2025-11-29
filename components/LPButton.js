export default function LPButton({ children, loading, disabled, ...props }) {
  return (
    <button
      className="w-full bg-[#00feba] text-black font-semibold py-3 px-6 rounded hover:bg-[#00e5a8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Processing..." : children}
    </button>
  )
}

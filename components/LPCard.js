export default function LPCard({ children, title }) {
  return (
    <div className="bg-[#16171d] border border-[#2a2c36] rounded-lg p-6">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      {children}
    </div>
  )
}

"use client"

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import Link from "next/link"
import { useRouter } from "next/router"

export default function LPLayout({ children }) {
  const router = useRouter()

  const navItems = [
    { label: "Create Pool", href: "/lp-tools/create-pool" },
    { label: "Add Liquidity", href: "/lp-tools/add-liquidity" },
    { label: "Remove Liquidity", href: "/lp-tools/remove-liquidity" },
    { label: "Collect Fees", href: "/lp-tools/collect-fees" },
  ]

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <nav className="border-b border-[#2a2c36] bg-[#16171d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/lp-tools" className="text-xl font-bold">
                LP Tools
              </Link>
              <div className="hidden md:flex gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-sm ${
                      router.pathname === item.href
                        ? "text-white border-b-2 border-[#00feba]"
                        : "text-[#9ca3af] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <WalletMultiButton />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">{children}</main>
    </div>
  )
}

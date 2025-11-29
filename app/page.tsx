import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 z-50 p-2">
        <Image src="/logo.png" alt="KatushaToken" width={160} height={160} className="object-contain" />
      </header>

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <div className="text-xs text-muted-foreground">Solana</div>
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 text-balance">Liquidity Pool Operations</h2>
            <p className="text-muted-foreground text-xl">Elite tools for Raydium pool management</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Link href="/create-pool">
              <Card className="hover:border-primary hover:shadow-[0_0_20px_oklch(0.65_0.15_195/0.2)] transition-all cursor-pointer h-full group">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors text-2xl">Create Pool</CardTitle>
                  <CardDescription className="text-base">Initialize a new liquidity pool on Raydium</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground">
                    Set up a new trading pool with custom fee tiers and initial liquidity
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/add-liquidity">
              <Card className="hover:border-primary hover:shadow-[0_0_20px_oklch(0.65_0.15_195/0.2)] transition-all cursor-pointer h-full group">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors text-2xl">Add Liquidity</CardTitle>
                  <CardDescription className="text-base">Deposit tokens to an existing pool</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground">Increase pool depth and earn trading fees</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/remove-liquidity">
              <Card className="hover:border-primary hover:shadow-[0_0_20px_oklch(0.65_0.15_195/0.2)] transition-all cursor-pointer h-full group">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors text-2xl">
                    Remove Liquidity
                  </CardTitle>
                  <CardDescription className="text-base">Withdraw your tokens from a pool</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground">Redeem your LP tokens for underlying assets</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/collect-fees">
              <Card className="hover:border-primary hover:shadow-[0_0_20px_oklch(0.65_0.15_195/0.2)] transition-all cursor-pointer h-full group">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors text-2xl">Collect Fees</CardTitle>
                  <CardDescription className="text-base">Claim accumulated trading fees</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground">Harvest your earned fees from liquidity provision</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

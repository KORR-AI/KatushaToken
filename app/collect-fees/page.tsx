"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Check, Loader2, ExternalLink } from "lucide-react"

export default function CollectFeesPage() {
  const [formData, setFormData] = useState({
    poolId: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState<{ txHash: string; feesCollected?: string } | null>(null)
  const [walletConnected, setWalletConnected] = useState(false)

  const handleConnect = async () => {
    setWalletConnected(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(null)

    try {
      const response = await fetch("/api/lp/collect-fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to collect fees")
      }

      setSuccess({
        txHash: data.txHash,
        feesCollected: data.feesCollected,
      })
      setFormData({ poolId: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-8 py-8 max-w-4xl w-full">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="lg">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </Link>
        </div>

        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-3xl">Collect Fees</CardTitle>
            <CardDescription className="text-base">
              Claim your accumulated trading fees from liquidity provision
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!walletConnected ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-6 text-lg">Connect your wallet to continue</p>
                <Button onClick={handleConnect} size="lg" className="text-base px-8 py-6">
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="poolId" className="text-base">
                    Pool ID
                  </Label>
                  <Input
                    id="poolId"
                    placeholder="Enter pool ID"
                    className="h-12 text-base"
                    value={formData.poolId}
                    onChange={(e) => setFormData({ ...formData, poolId: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Enter the pool ID to collect accumulated fees</p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription className="text-base">{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-500/50 text-green-500">
                    <Check className="h-5 w-5" />
                    <AlertDescription className="ml-2 text-base">
                      Fees collected successfully!{" "}
                      {success.feesCollected && <span className="block mt-1">Amount: {success.feesCollected}</span>}
                      <a
                        href={`https://solscan.io/tx/${success.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline inline-flex items-center gap-1 mt-1"
                      >
                        View on Solscan
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full h-14 text-lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Collecting Fees...
                    </>
                  ) : (
                    "Collect Fees"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

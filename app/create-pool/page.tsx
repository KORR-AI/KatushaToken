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

export default function CreatePoolPage() {
  const [formData, setFormData] = useState({
    baseTokenMint: "",
    quoteTokenMint: "",
    baseAmount: "",
    quoteAmount: "",
    feeTier: "0.25",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState<{ txHash: string } | null>(null)
  const [walletConnected, setWalletConnected] = useState(false)

  const handleConnect = async () => {
    // Simulated wallet connection - replace with actual Solana wallet adapter
    setWalletConnected(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(null)

    try {
      const response = await fetch("/api/lp/create-pool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create pool")
      }

      setSuccess({ txHash: data.txHash })
      // Reset form
      setFormData({
        baseTokenMint: "",
        quoteTokenMint: "",
        baseAmount: "",
        quoteAmount: "",
        feeTier: "0.25",
      })
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
            <CardTitle className="text-3xl">Create Liquidity Pool</CardTitle>
            <CardDescription className="text-base">Initialize a new Raydium pool with your token pair</CardDescription>
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
                  <Label htmlFor="baseTokenMint" className="text-base">
                    Base Token Mint Address
                  </Label>
                  <Input
                    id="baseTokenMint"
                    placeholder="Enter base token mint address"
                    className="h-12 text-base"
                    value={formData.baseTokenMint}
                    onChange={(e) => setFormData({ ...formData, baseTokenMint: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="quoteTokenMint" className="text-base">
                    Quote Token Mint Address
                  </Label>
                  <Input
                    id="quoteTokenMint"
                    placeholder="Enter quote token mint address (e.g., SOL)"
                    className="h-12 text-base"
                    value={formData.quoteTokenMint}
                    onChange={(e) => setFormData({ ...formData, quoteTokenMint: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="baseAmount" className="text-base">
                      Base Token Amount
                    </Label>
                    <Input
                      id="baseAmount"
                      type="number"
                      step="any"
                      placeholder="0.00"
                      className="h-12 text-base"
                      value={formData.baseAmount}
                      onChange={(e) => setFormData({ ...formData, baseAmount: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="quoteAmount" className="text-base">
                      Quote Token Amount
                    </Label>
                    <Input
                      id="quoteAmount"
                      type="number"
                      step="any"
                      placeholder="0.00"
                      className="h-12 text-base"
                      value={formData.quoteAmount}
                      onChange={(e) => setFormData({ ...formData, quoteAmount: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="feeTier" className="text-base">
                    Fee Tier (%)
                  </Label>
                  <Input
                    id="feeTier"
                    type="number"
                    step="0.01"
                    placeholder="0.25"
                    className="h-12 text-base"
                    value={formData.feeTier}
                    onChange={(e) => setFormData({ ...formData, feeTier: e.target.value })}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Standard fee tiers: 0.01%, 0.05%, 0.25%, 1%</p>
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
                      Pool created successfully!{" "}
                      <a
                        href={`https://solscan.io/tx/${success.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline inline-flex items-center gap-1"
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
                      Creating Pool...
                    </>
                  ) : (
                    "Create Pool"
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

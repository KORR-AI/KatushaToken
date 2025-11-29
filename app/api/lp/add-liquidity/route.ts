import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { poolId, tokenAAmount, tokenBAmount, slippage } = body

    if (!poolId || !tokenAAmount || !tokenBAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // TODO: Integrate with your backend API
    const backendResponse = await fetch("YOUR_BACKEND_API_URL/add-liquidity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        poolId,
        tokenAAmount: Number.parseFloat(tokenAAmount),
        tokenBAmount: Number.parseFloat(tokenBAmount),
        slippage: Number.parseFloat(slippage),
      }),
    })

    if (!backendResponse.ok) {
      const error = await backendResponse.json()
      return NextResponse.json(
        { error: error.message || "Failed to add liquidity" },
        { status: backendResponse.status },
      )
    }

    const data = await backendResponse.json()

    return NextResponse.json({
      txHash: data.txHash || data.signature,
    })
  } catch (error) {
    console.error("[v0] Add liquidity error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

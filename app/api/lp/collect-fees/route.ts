import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { poolId } = body

    if (!poolId) {
      return NextResponse.json({ error: "Pool ID is required" }, { status: 400 })
    }

    // TODO: Integrate with your backend API
    const backendResponse = await fetch("YOUR_BACKEND_API_URL/collect-fees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ poolId }),
    })

    if (!backendResponse.ok) {
      const error = await backendResponse.json()
      return NextResponse.json({ error: error.message || "Failed to collect fees" }, { status: backendResponse.status })
    }

    const data = await backendResponse.json()

    return NextResponse.json({
      txHash: data.txHash || data.signature,
      feesCollected: data.feesCollected,
    })
  } catch (error) {
    console.error("[v0] Collect fees error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

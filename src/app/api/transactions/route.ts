// app/api/transactions/route.ts

import { NextRequest, NextResponse } from "next/server";
import { fetchTransactionsByWallet } from "../../../lib/helius";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wallet = searchParams.get("wallet");
  const days = searchParams.get("days");

  if (!wallet || !days) {
    return NextResponse.json(
      { error: "Invalid query parameters" },
      { status: 400 }
    );
  }

  try {
    const profit = await fetchTransactionsByWallet(wallet, parseInt(days));
    return NextResponse.json({ profit });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

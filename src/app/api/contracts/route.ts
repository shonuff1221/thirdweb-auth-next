// app/api/contracts/route.ts

import { NextResponse } from "next/server";
import { fetchNewContracts } from "../../../lib/helius";

export async function GET() {
  try {
    await fetchNewContracts();
    return NextResponse.json({ message: "Contracts fetched and saved." });
  } catch (error) {
    console.error("Error fetching new contracts:", error);
    return NextResponse.json(
      { error: "Failed to fetch and save contracts" },
      { status: 500 }
    );
  }
}

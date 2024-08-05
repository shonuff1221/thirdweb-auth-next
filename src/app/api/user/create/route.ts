// app/api/user/create/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createUser } from "../../../../lib/user";

export async function POST(req: NextRequest) {
  const { walletAddress } = await req.json();

  try {
    const user = await createUser(walletAddress);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 400 }
    );
  }
}

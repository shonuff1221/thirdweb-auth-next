// app/api/user/favorite/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
} from "../../../../lib/user";

export async function POST(req: NextRequest) {
  const { walletAddress, favoriteAddress } = await req.json();

  try {
    const user = await addFavorite(walletAddress, favoriteAddress);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { walletAddress, favoriteAddress } = await req.json();

  try {
    const user = await removeFavorite(walletAddress, favoriteAddress);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const walletAddress = searchParams.get("walletAddress");

  if (!walletAddress) {
    return NextResponse.json(
      { error: "Invalid query parameters" },
      { status: 400 }
    );
  }

  try {
    const favorites = await getUserFavorites(walletAddress);
    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get favorites" },
      { status: 400 }
    );
  }
}

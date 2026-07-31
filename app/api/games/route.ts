import { NextResponse } from "next/server";
import { listGames } from "@/lib/services/game.service";

export async function GET() {
  const games = await listGames();
  return NextResponse.json(games);
}

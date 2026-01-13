import { NextResponse } from "next/server";

/************************************************************
 * Use Gamma API to get the market
 * GET https://gamma-api.polymarket.com/markets/slug/will-magnus-carlsen-win-the-20252026-speed-chess-championship
 ************************************************************/

export async function GET() {
  const slug = "will-magnus-carlsen-win-the-20252026-speed-chess-championship";
  const market = await fetch(`https://gamma-api.polymarket.com/markets/slug/${slug}`);
  const marketData = await market.json();

  // console.log("Market Data:::", marketData);
  return NextResponse.json(marketData);
}
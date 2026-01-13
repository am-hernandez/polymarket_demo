import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get("walletAddress");

  const profile = await fetch(`https://gamma-api.polymarket.com/public-profile?address=${walletAddress}`);
  const profileData = await profile.json();

  // console.log("Profile Data:::", profileData);

  return NextResponse.json(profileData);
}
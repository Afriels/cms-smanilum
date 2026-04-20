import { NextResponse } from "next/server";
import { searchContent } from "@/services/content-service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  return NextResponse.json(await searchContent(q));
}

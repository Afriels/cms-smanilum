import { NextResponse } from "next/server";
import { getAdminCollections } from "@/services/content-service";
import { createCollectionHandler, deleteCollectionItem, text } from "@/lib/api-route";

export async function GET() {
  const data = await getAdminCollections();
  return NextResponse.json(data.settings);
}

export async function POST(request: Request) {
  const body = await request.json();
  return createCollectionHandler({
    table: "site_settings",
    body,
    buildPayload: (payload) => ({
      key: text(payload.key),
      value: text(payload.value),
      group_name: text(payload.group_name),
    }),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  return deleteCollectionItem("site_settings", searchParams.get("id"));
}

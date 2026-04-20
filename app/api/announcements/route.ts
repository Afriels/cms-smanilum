import { NextResponse } from "next/server";
import { getAdminCollections } from "@/services/content-service";
import { createCollectionHandler, deleteCollectionItem, normalizeCheckbox, text } from "@/lib/api-route";

export async function GET() {
  const data = await getAdminCollections();
  return NextResponse.json(data.announcements);
}

export async function POST(request: Request) {
  const body = await request.json();
  return createCollectionHandler({
    table: "announcements",
    body,
    buildPayload: (payload) => ({
      title: text(payload.title),
      content: text(payload.content),
      href: text(payload.href),
      is_published: normalizeCheckbox(payload.is_published),
      published_at: new Date().toISOString(),
    }),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  return deleteCollectionItem("announcements", searchParams.get("id"));
}

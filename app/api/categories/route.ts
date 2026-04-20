import { NextResponse } from "next/server";
import { getCategories } from "@/services/content-service";
import { createCollectionHandler, defaultSlugFromBody, deleteCollectionItem, text } from "@/lib/api-route";

export async function GET() {
  return NextResponse.json(await getCategories());
}

export async function POST(request: Request) {
  const body = await request.json();
  return createCollectionHandler({
    table: "categories",
    body,
    buildPayload: (payload) => ({
      name: text(payload.name),
      slug: defaultSlugFromBody(payload),
      description: text(payload.description),
      color: text(payload.color),
    }),
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  return deleteCollectionItem("categories", searchParams.get("id"));
}

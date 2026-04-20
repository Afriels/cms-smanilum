import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabaseServer";
import { generateSlug } from "@/lib/utils";

type PayloadBuilder = (body: Record<string, unknown>) => Record<string, unknown>;

export async function createCollectionHandler({
  table,
  body,
  buildPayload,
}: {
  table: string;
  body: Record<string, unknown>;
  buildPayload?: PayloadBuilder;
}) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      {
        success: true,
        fallback: true,
        data: {
          id: randomUUID(),
          ...body,
        },
      },
      { status: 201 },
    );
  }

  const payload = buildPayload ? buildPayload(body) : body;
  const { data, error } = await supabase.from(table).insert(payload).select("*").single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data }, { status: 201 });
}

export async function deleteCollectionItem(table: string, id: string | null) {
  if (!id) {
    return NextResponse.json({ message: "ID wajib diisi." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ success: true, fallback: true });
  }

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

export function normalizeCheckbox(value: unknown) {
  return value === true || value === "true" || value === "on";
}

export function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function defaultSlugFromBody(body: Record<string, unknown>) {
  return generateSlug(text(body.slug) || text(body.title));
}

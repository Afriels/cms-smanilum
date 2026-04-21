import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
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
  const unauthorized = await requireAdminAccess();
  if (unauthorized) return unauthorized;

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
  const id = text(body.id);

  const query = id
    ? supabase.from(table).update(payload).eq("id", id).select("*").single()
    : supabase.from(table).insert(payload).select("*").single();
  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, data }, { status: id ? 200 : 201 });
}

export async function deleteCollectionItem(
  table: string,
  id: string | null,
  options?: {
    beforeDelete?: (
      supabase: NonNullable<ReturnType<typeof createSupabaseAdminClient>>,
    ) => Promise<void>;
  },
) {
  if (!id) {
    return NextResponse.json({ message: "ID wajib diisi." }, { status: 400 });
  }

  const unauthorized = await requireAdminAccess();
  if (unauthorized) return unauthorized;

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ success: true, fallback: true });
  }

  if (options?.beforeDelete) {
    await options.beforeDelete(supabase);
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

export async function requireAdminAccess() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return null;
}

import { NextResponse } from "next/server";
import { uploadToSupabaseStorage } from "@/services/upload-service";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const bucket = String(formData.get("bucket") || "posts");
  const folder = String(formData.get("folder") || "uploads");
  const replacePath = String(formData.get("replacePath") || "");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "File wajib diisi." }, { status: 400 });
  }

  try {
    const result = await uploadToSupabaseStorage({
      file,
      bucket,
      folder,
      replacePath: replacePath || null,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Upload gagal diproses.",
      },
      { status: 400 },
    );
  }
}

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-shell py-20">
      <div className="surface-card mx-auto max-w-2xl p-10 text-center">
        <h1 className="text-3xl font-semibold text-slate-950">Terjadi kendala</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Kami belum bisa memuat halaman ini sekarang. Silakan coba lagi atau kembali ke beranda.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset}>Coba lagi</Button>
          <Button href="/" variant="secondary">
            Kembali ke beranda
          </Button>
        </div>
      </div>
    </div>
  );
}

import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <div className="container-shell py-20">
      <EmptyState
        title="404 | Halaman tidak ditemukan"
        description="Konten yang Anda cari belum tersedia atau URL sudah berubah."
        ctaHref="/"
        ctaLabel="Kembali ke beranda"
      />
    </div>
  );
}

import { createMetadata } from "@/lib/site";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata = createMetadata({
  title: "Kontak Sekolah",
  description: "Form kontak sederhana untuk pertanyaan, informasi, atau kerja sama.",
  path: "/kontak",
});

export default function ContactPage() {
  return (
    <div className="container-shell py-10">
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Kontak" }]} />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="surface-card p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
            Hubungi Sekolah
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Form ini disiapkan sebagai titik awal. Anda bisa menghubungkannya ke tabel
            `contact_messages` atau email service sesuai kebutuhan.
          </p>
        </div>
        <form className="surface-card space-y-4 p-8">
          <Input placeholder="Nama lengkap" />
          <Input type="email" placeholder="Alamat email" />
          <Input placeholder="Subjek" />
          <Textarea placeholder="Tuliskan pesan Anda" />
          <Button type="submit">Kirim pesan</Button>
        </form>
      </div>
    </div>
  );
}

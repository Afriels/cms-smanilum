import { requireAdminSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  return (
    <AdminShell
      title="Dashboard Admin"
      description="Kelola konten portal berita sekolah, pengaturan situs, dan aset media dari satu area kerja."
    >
      {children}
    </AdminShell>
  );
}

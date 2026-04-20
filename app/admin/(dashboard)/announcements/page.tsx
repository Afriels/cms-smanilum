import { ResourceManager } from "@/components/admin/resource-manager";
import { getAdminCollections } from "@/services/content-service";

export default async function AdminAnnouncementsPage() {
  const data = await getAdminCollections();

  return (
    <ResourceManager
      title="Announcements"
      endpoint="/api/announcements"
      itemLabel="Announcement"
      items={data.announcements as unknown as Record<string, unknown>[]}
      fields={[
        { name: "title", label: "Judul pengumuman" },
        { name: "content", label: "Isi", type: "textarea" },
        { name: "href", label: "Link tambahan", type: "url" },
        { name: "is_published", label: "Publish", type: "checkbox" },
      ]}
    />
  );
}

import { ResourceManager } from "@/components/admin/resource-manager";
import { getAdminCollections } from "@/services/content-service";

export default async function AdminPagesPage() {
  const data = await getAdminCollections();

  return (
    <ResourceManager
      title="Pages"
      endpoint="/api/pages"
      itemLabel="Page"
      items={data.pages as unknown as Record<string, unknown>[]}
      fields={[
        { name: "title", label: "Judul halaman" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Konten", type: "textarea" },
        { name: "is_published", label: "Publish", type: "checkbox" },
      ]}
    />
  );
}

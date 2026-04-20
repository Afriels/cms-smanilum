import { ResourceManager } from "@/components/admin/resource-manager";
import { getAdminCollections } from "@/services/content-service";

export default async function AdminGalleryPage() {
  const data = await getAdminCollections();

  return (
    <ResourceManager
      title="Gallery"
      endpoint="/api/galleries"
      itemLabel="Album"
      items={data.galleries as unknown as Record<string, unknown>[]}
      fields={[
        { name: "title", label: "Judul album" },
        { name: "description", label: "Deskripsi", type: "textarea" },
        { name: "cover_image_url", label: "Cover URL", type: "url" },
        { name: "published_at", label: "Tanggal publish", type: "datetime-local" },
      ]}
    />
  );
}

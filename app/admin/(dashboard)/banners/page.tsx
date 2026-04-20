import { ResourceManager } from "@/components/admin/resource-manager";
import { getAdminCollections } from "@/services/content-service";

export default async function AdminBannersPage() {
  const data = await getAdminCollections();

  return (
    <ResourceManager
      title="Banners"
      endpoint="/api/banners"
      itemLabel="Banner"
      items={data.banners as unknown as Record<string, unknown>[]}
      fields={[
        { name: "title", label: "Judul banner" },
        { name: "subtitle", label: "Subjudul", type: "textarea" },
        { name: "image_url", label: "Image URL", type: "url" },
        { name: "cta_label", label: "Label CTA" },
        { name: "cta_href", label: "Link CTA", type: "url" },
        { name: "is_active", label: "Aktif", type: "checkbox" },
      ]}
    />
  );
}

import { ResourceManager } from "@/components/admin/resource-manager";
import { getAdminCollections } from "@/services/content-service";

export default async function AdminCarouselPage() {
  const data = await getAdminCollections();

  return (
    <ResourceManager
      title="Carousel"
      endpoint="/api/carousel"
      itemLabel="Slide"
      items={data.carousel as unknown as Record<string, unknown>[]}
      fields={[
        { name: "title", label: "Judul slide" },
        { name: "subtitle", label: "Deskripsi", type: "textarea" },
        { name: "image_url", label: "Image URL", type: "url" },
        { name: "href", label: "Link tujuan", type: "url" },
        { name: "order_number", label: "Urutan" },
        { name: "is_active", label: "Aktif", type: "checkbox" },
      ]}
    />
  );
}

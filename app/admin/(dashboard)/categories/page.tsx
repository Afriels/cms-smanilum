import { ResourceManager } from "@/components/admin/resource-manager";
import { getAdminCollections } from "@/services/content-service";

export default async function AdminCategoriesPage() {
  const data = await getAdminCollections();

  return (
    <ResourceManager
      title="Categories"
      endpoint="/api/categories"
      itemLabel="Category"
      items={data.categories as unknown as Record<string, unknown>[]}
      fields={[
        { name: "name", label: "Nama kategori" },
        { name: "description", label: "Deskripsi", type: "textarea" },
        { name: "color", label: "Warna", type: "text" },
      ]}
    />
  );
}

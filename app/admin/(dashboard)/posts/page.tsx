import { ResourceManager } from "@/components/admin/resource-manager";
import { getAdminCollections } from "@/services/content-service";

export default async function AdminPostsPage() {
  const data = await getAdminCollections();
  return (
    <ResourceManager
      title="Posts"
      endpoint="/api/posts"
      itemLabel="Post"
      items={data.posts as unknown as Record<string, unknown>[]}
      fields={[
        { name: "title", label: "Judul" },
        { name: "excerpt", label: "Excerpt", type: "textarea" },
        { name: "content", label: "Konten", type: "textarea" },
        {
          name: "category_id",
          label: "Kategori",
          type: "select",
          options: data.categories.map((category) => ({
            label: category.name,
            value: category.id,
          })),
        },
        {
          name: "thumbnail_url",
          label: "Feature image",
          type: "image",
          bucket: "posts",
          folder: "feature-images",
          helperText: "Gambar utama post akan diunggah ke bucket `posts`.",
        },
        { name: "is_featured", label: "Featured Post", type: "checkbox" },
        { name: "is_published", label: "Publish", type: "checkbox" },
      ]}
    />
  );
}

import { ResourceManager } from "@/components/admin/resource-manager";
import { getAdminCollections } from "@/services/content-service";

export default async function AdminSettingsPage() {
  const data = await getAdminCollections();

  return (
    <ResourceManager
      title="Site Settings"
      endpoint="/api/site-settings"
      itemLabel="Setting"
      items={data.settings as unknown as Record<string, unknown>[]}
      fields={[
        { name: "key", label: "Key" },
        { name: "value", label: "Value", type: "textarea" },
        { name: "group_name", label: "Group" },
      ]}
    />
  );
}

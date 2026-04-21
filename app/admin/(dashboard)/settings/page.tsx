import { SettingsManager } from "@/components/admin/settings-manager";
import { getAdminCollections } from "@/services/content-service";

export default async function AdminSettingsPage() {
  const data = await getAdminCollections();

  return <SettingsManager settings={data.settings} />;
}

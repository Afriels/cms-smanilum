import Link from "next/link";
import { Megaphone } from "lucide-react";
import type { Announcement } from "@/types";

export function AnnouncementCard({ item }: { item: Announcement }) {
  const content = (
    <div className="surface-card flex h-full gap-4 p-5">
      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        <Megaphone className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{item.content}</p>
      </div>
    </div>
  );

  if (item.href) {
    return <Link href={item.href}>{content}</Link>;
  }

  return content;
}

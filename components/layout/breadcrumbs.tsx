import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="mb-5 flex flex-wrap items-center gap-2 overflow-hidden text-sm text-slate-500 sm:mb-6">
      {items.map((item, index) => (
        <span
          key={`${item.label}-${index}`}
          className="inline-flex min-w-0 items-center gap-2"
        >
          {item.href ? (
            <Link href={item.href} className="truncate hover:text-blue-700">
              {item.label}
            </Link>
          ) : (
            <span className="truncate font-medium text-slate-700">{item.label}</span>
          )}
          {index < items.length - 1 ? <ChevronRight className="h-4 w-4" /> : null}
        </span>
      ))}
    </nav>
  );
}

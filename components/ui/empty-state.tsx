import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="surface-card p-10 text-center">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      {ctaHref && ctaLabel ? (
        <div className="mt-6">
          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}

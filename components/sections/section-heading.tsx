import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow ? <Badge className="mb-4">{eyebrow}</Badge> : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-copy mt-3">{description}</p> : null}
    </div>
  );
}

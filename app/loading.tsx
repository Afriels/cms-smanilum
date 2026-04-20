import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-shell py-10">
      <Skeleton className="mb-6 h-64 w-full rounded-[2rem]" />
      <div className="grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}

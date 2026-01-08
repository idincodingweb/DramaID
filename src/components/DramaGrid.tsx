import { DramaCard } from "./DramaCard";
import type { Drama } from "@/lib/api";

interface DramaGridProps {
  dramas: Drama[];
}

export function DramaGrid({ dramas }: DramaGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {dramas.map((drama, index) => (
        <DramaCard key={drama.bookId} drama={drama} index={index} />
      ))}
    </div>
  );
}

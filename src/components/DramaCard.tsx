import { Link } from "react-router-dom";
import { Play, Flame } from "lucide-react";
import type { Drama } from "@/lib/api";

interface DramaCardProps {
  drama: Drama;
  index?: number;
}

export function DramaCard({ drama, index = 0 }: DramaCardProps) {
  const delay = index * 50;

  return (
    <Link
      to={`/detail/${drama.bookId}`}
      className="group relative rounded-2xl overflow-hidden card-hover animate-fade-up block"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Poster Image */}
      <div className="aspect-[3/4] relative">
        <img
          src={drama.coverWap}
          alt={drama.bookName}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />

        {/* Popular Badge */}
        {drama.corner && (
          <div className="absolute top-3 left-3">
            <span className="badge-popular px-2.5 py-1 rounded-md text-xs font-semibold text-primary-foreground">
              {drama.corner.name}
            </span>
          </div>
        )}

        {/* Hot Count */}
        {drama.rankVo?.hotCode && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
            <Flame className="w-3 h-3 text-primary" />
            <span className="text-xs font-medium">{drama.rankVo.hotCode}</span>
          </div>
        )}

        {/* Play Count & Episode Count */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-primary-foreground">
          <div className="flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-medium">{drama.chapterCount} Episode</span>
          </div>
          {drama.playCount && (
            <span className="text-xs text-primary-foreground/80">{drama.playCount} views</span>
          )}
        </div>

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
            <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
          </div>
        </div>
      </div>

      {/* Title & Tags */}
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {drama.bookName}
        </h3>
        {drama.tags && drama.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {drama.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/80 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

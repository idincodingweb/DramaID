import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  href?: string;
}

export function SectionHeader({ title, subtitle, icon: Icon, href }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
        )}
        <div>
          <h2 className="font-display font-bold text-xl md:text-2xl lg:text-3xl gradient-text">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-sm md:text-base mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {href && (
        <Link
          to={href}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Lihat Semua
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

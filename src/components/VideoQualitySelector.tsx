import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface VideoQualitySelectorProps {
  currentQuality: number;
  availableQualities: number[];
  onQualityChange: (quality: number) => void;
}

const qualityLabels: Record<number, string> = {
  360: "360p",
  480: "480p",
  540: "540p",
  720: "720p (HD)",
  1080: "1080p (Full HD)",
};

export function VideoQualitySelector({
  currentQuality,
  availableQualities,
  onQualityChange,
}: VideoQualitySelectorProps) {
  // Default qualities if none provided
  const qualities = availableQualities.length > 0 
    ? availableQualities 
    : [360, 540, 720, 1080];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">{qualityLabels[currentQuality] || `${currentQuality}p`}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {qualities.map((quality) => (
          <DropdownMenuItem
            key={quality}
            onClick={() => onQualityChange(quality)}
            className={currentQuality === quality ? "bg-primary/20 text-primary" : ""}
          >
            {qualityLabels[quality] || `${quality}p`}
            {currentQuality === quality && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

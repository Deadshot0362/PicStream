import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface MediaCardProps {
  file: {
    preview: string;
    type: "image" | "video";
    file: File;
  };
  onRemove: () => void;
}

export const MediaCard = ({ file, onRemove }: MediaCardProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="group relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 shadow-lg shadow-purple-500/5 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>

      {file.type === "image" ? (
        <div
          className={cn(
            "cursor-pointer transition-transform duration-300",
            isZoomed && "scale-[1.02]"
          )}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={file.preview}
            alt={file.file.name}
            className="w-full h-[300px] object-cover hover:brightness-110 transition-all duration-300"
          />
        </div>
      ) : (
        <video
          src={file.preview}
          controls
          className="w-full h-[300px] object-cover"
        />
      )}

      <div className="p-4 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm">
        <p className="text-sm font-medium truncate text-primary/90">{file.file.name}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {(file.file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
    </div>
  );
};
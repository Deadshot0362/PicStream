import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import heic2any from "heic2any";
import { MediaCard } from "./MediaCard";
import { Button } from "./ui/button";
import { Upload, Image as ImageIcon, Video, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
}

export const MediaGallery = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = async (file: File): Promise<MediaFile | null> => {
    try {
      if (file.type.startsWith("image/")) {
        if (file.type === "image/heic" || file.type === "image/heif") {
          const blob = await heic2any({
            blob: file,
            toType: "image/jpeg",
          });
          file = new File([blob as Blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
            type: "image/jpeg",
          });
        }
        return {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: URL.createObjectURL(file),
          type: "image",
        };
      } else if (file.type.startsWith("video/")) {
        return {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: URL.createObjectURL(file),
          type: "video",
        };
      }
      return null;
    } catch (error) {
      console.error("Error processing file:", error);
      return null;
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsProcessing(true);
    const processedFiles = await Promise.all(
      acceptedFiles.map(processFile)
    );
    setMediaFiles((prev) => [
      ...prev,
      ...processedFiles.filter((file): file is MediaFile => file !== null),
    ]);
    setIsProcessing(false);
  }, []);

  const clearFiles = () => {
    mediaFiles.forEach(file => {
      URL.revokeObjectURL(file.preview);
    });
    setMediaFiles([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".heic", ".heif"],
      "video/*": [".mp4", ".webm"],
    },
  });

  return (
    <div className="space-y-8">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-12 transition-colors duration-200 ease-in-out cursor-pointer bg-gradient-to-br from-purple-500/5 to-pink-500/5",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <div>
            <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              {isDragActive ? "Drop files here" : "Drag & drop files here"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to select files
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <ImageIcon className="h-4 w-4" />
            <span>Images</span>
            <span className="text-muted-foreground/50">•</span>
            <Video className="h-4 w-4" />
            <span>Videos</span>
          </div>
        </div>
      </div>

      {isProcessing && (
        <div className="text-center text-sm text-muted-foreground animate-pulse">
          Processing files...
        </div>
      )}

      {mediaFiles.length > 0 && (
        <div className="flex justify-end">
          <Button
            variant="destructive"
            onClick={clearFiles}
            className="group hover:scale-105 transition-transform duration-200"
          >
            <Trash2 className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            Clear All
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaFiles.map((file) => (
          <MediaCard
            key={file.id}
            file={file}
            onRemove={() => {
              URL.revokeObjectURL(file.preview);
              setMediaFiles((prev) =>
                prev.filter((f) => f.id !== file.id)
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};
import { MediaGallery } from "@/components/MediaGallery";
import { Image } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm border-b border-primary/10 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              PicStream
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">
            Transform Your Memories into Magic
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary inline-block mb-4 animate-fade-in">
              Media Gallery
            </span>
            <h2 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary animate-fade-in">
              Upload & View Media
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Drag and drop or select files to upload. Supports images (JPG, PNG, GIF, HEIC) and videos (MP4, WebM).
            </p>
          </div>
          <MediaGallery />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm border-t border-primary/10 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">PicStream</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PicStream. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
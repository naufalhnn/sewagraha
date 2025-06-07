// src/components/ui/image-preview.tsx

import { ImageIcon, ZoomIn } from 'lucide-react'; // Gunakan ikon dari lucide-react
import { useState } from 'react';

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Jika terjadi error saat memuat gambar
  if (hasError) {
    return (
      <div className={`flex aspect-video h-64 w-auto flex-col items-center justify-center rounded-lg border bg-gray-50 text-gray-500 ${className}`}>
        <ImageIcon className="h-12 w-12" />
        <p className="mt-2 text-sm">Gambar tidak dapat dimuat</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Tampilkan skeleton saat gambar sedang loading */}
      {isLoading && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center rounded-lg bg-gray-200">
          <ImageIcon className="h-12 w-12 text-gray-400" />
        </div>
      )}

      {/* Tampilan gambar utama */}
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-64 w-auto cursor-zoom-in overflow-hidden rounded-lg border"
      >
        <img
          src={src}
          alt={alt}
          className={`aspect-video h-64 w-auto object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40">
          <ZoomIn className="h-12 w-12 text-white opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </a>
    </div>
  );
};

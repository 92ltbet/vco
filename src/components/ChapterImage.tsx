'use client';

import { useState, useEffect, useRef } from 'react';

interface ChapterImageProps {
  imageUrl: string;
  alt: string;
  isEager?: boolean;
}

export default function ChapterImage({ imageUrl, alt, isEager = false }: ChapterImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    if (!isEager) {
      const currentImg = imgRef.current;
      if (currentImg) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                img.src = img.dataset.src || '';
                observer.unobserve(img);
              }
            });
          },
          { rootMargin: '50px 0px' }
        );

        observer.observe(currentImg);

        return () => {
          observer.unobserve(currentImg);
        };
      }
    }
  }, [isEager]);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  const handleError = () => {
    setIsError(true);
    
    // Thử tải lại nếu lỗi
    if (!isEager && imgRef.current) {
      const dataSrc = imgRef.current.getAttribute('data-src');
      if (dataSrc) {
        setTimeout(() => {
          if (imgRef.current) {
            imgRef.current.src = dataSrc;
          }
          setIsError(false);
        }, 1000);
      }
    }
  };
  
  if (isEager) {
    return (
      <div className="w-full mx-auto max-w-3xl">
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-auto"
          loading="eager"
          fetchPriority="high"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    );
  }
  
  return (
    <div className="w-full mx-auto max-w-3xl">
      <img
        ref={imgRef}
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" // Transparent 1x1 GIF
        data-src={imageUrl}
        alt={alt}
        className={`w-full h-auto chapter-image transition-opacity duration-300 ${isLoaded ? 'opacity-100 loaded' : 'opacity-0'}`}
        style={{ 
          backgroundColor: isLoaded ? 'transparent' : '#1f2937', 
          minHeight: isLoaded ? 'auto' : '300px' 
        }}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
} 
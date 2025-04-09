'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ComicImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function ComicImage({ src, alt, className, priority }: ComicImageProps) {
  const [imgSrc, setImgSrc] = useState(src || '/images/placeholder.jpg');
  const [errorLoaded, setErrorLoaded] = useState(false);

  // Placeholder là một hình ảnh cố định trong public folder
  const placeholderImage = '/images/placeholder.jpg';

  const handleError = () => {
    if (!errorLoaded) {
      setImgSrc(placeholderImage);
      setErrorLoaded(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt || 'Comic image'}
      fill
      className={className || 'object-cover'}
      onError={handleError}
      priority={priority}
      unoptimized={true}
    />
  );
} 
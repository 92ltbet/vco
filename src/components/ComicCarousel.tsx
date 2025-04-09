'use client';

import { Comic } from '@/types/comic';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState, useCallback } from 'react';
import { getImageUrl } from '@/lib/imageUtils';

interface ComicCarouselProps {
  comics: Comic[];
}

export default function ComicCarousel({ comics }: ComicCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  const scrollLeft = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(comics.length - 1);
    }
  };
  
  const scrollRight = useCallback(() => {
    if (carouselRef.current) {
      const newIndex = (activeIndex + 1) % comics.length;
      setActiveIndex(newIndex);
      carouselRef.current.scrollTo({
        left: newIndex * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, comics.length]);
  
  // Auto scroll effect với interval dài hơn
  useEffect(() => {
    if (isSmallScreen) {
      const interval = setInterval(() => {
        scrollRight();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isSmallScreen, scrollRight]);

  // Update scroll position when activeIndex changes
  useEffect(() => {
    if (carouselRef.current) {
      const centerPosition = activeIndex * (isSmallScreen ? 180 : 200); // Điều chỉnh theo kích thước màn hình
      
      carouselRef.current.scrollTo({
        left: centerPosition,
        behavior: 'smooth',
      });
    }
  }, [activeIndex, isSmallScreen]);

  // Update screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Safely get category name
  const getCategoryName = (comic: Comic): string => {
    try {
      if (!comic.category) return '';
      
      // Handle array case
      if (Array.isArray(comic.category) && comic.category.length > 0) {
        return comic.category[0]?.name || '';
      }
      
      // Handle object case
      // @ts-ignore
      if (comic.category.name) {
        // @ts-ignore
        return comic.category.name;
      }
      
      return '';
    } catch (error) {
      return '';
    }
  };

  // Display 5 comics at a time, centered around the active comic
  const getVisibleComics = () => {
    const totalVisible = 5;
    const halfVisible = Math.floor(totalVisible / 2);
    
    let startIdx = Math.max(0, activeIndex - halfVisible);
    let endIdx = Math.min(comics.length - 1, startIdx + totalVisible - 1);
    
    // Adjust start index if we're near the end
    if (endIdx - startIdx < totalVisible - 1 && startIdx > 0) {
      startIdx = Math.max(0, endIdx - totalVisible + 1);
    }
    
    return comics.slice(startIdx, endIdx + 1);
  };

  return (
    <div className="carousel-container relative w-full">
      {/* Main slider */}
      <div 
        ref={carouselRef}
        className="carousel-slider flex items-center justify-center overflow-x-auto snap-x snap-mandatory scrollbar-hide relative"
      >
        <div className="flex items-center justify-center mx-auto">
          {getVisibleComics().map((comic, index) => {
            const visibleComics = getVisibleComics();
            const centerIndex = Math.floor(visibleComics.length / 2);
            const isActive = index === centerIndex;
            const distanceFromCenter = Math.abs(index - centerIndex);
            
            // Điều chỉnh scale để hiển thị đầy đủ ảnh nổi bật
            const scaleValue = isActive ? 1.2 : Math.max(0.85, 1 - distanceFromCenter * 0.07);
            const opacityValue = isActive ? 1 : Math.max(0.8, 1 - distanceFromCenter * 0.06);
            
            return (
              <div 
                key={comic._id} 
                className={`carousel-slide transition-all duration-700 ease-in-out ${
                  isActive ? 'z-10' : 'z-0'
                }`}
                style={{
                  transform: `scale(${scaleValue})`,
                  opacity: opacityValue,
                  transformOrigin: 'center bottom',
                  marginLeft: isActive ? '20px' : '10px',
                  marginRight: isActive ? '20px' : '10px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setActiveIndex(comics.indexOf(comic))}
              >
                <Link href={`/truyen/${comic.slug}`} className="block group relative">
                  {/* Main Image */}
                  <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg w-[180px] h-[270px]">
                    <Image
                      src={getImageUrl(comic.thumb_url)}
                      alt={comic.name}
                      width={180}
                      height={270}
                      className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 ${isActive ? 'brightness-110' : ''}`}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                    
                    {/* Glossy finish for active comic */}
                    {isActive && (
                      <div className="absolute inset-0">
                        {/* Light reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 mix-blend-overlay"></div>
                        {/* Shine effect */}
                        <div className="shine-effect"></div>
                      </div>
                    )}
                    
                    {/* Labels */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      <span className="label-hot text-white px-2 py-1 rounded-full text-xs font-bold">
                        HOT
                      </span>
                      <span className="label-new text-white px-2 py-1 rounded-full text-xs font-bold">
                        MỚI
                      </span>
                      {comic.sub_docquyen && (
                        <span className="label-exclusive text-white px-2 py-1 rounded-full text-xs font-bold">
                          ĐỘC
                        </span>
                      )}
                    </div>
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                      <h3 className="text-sm font-bold text-white line-clamp-1">{comic.name}</h3>
                      {comic.chaptersLatest && comic.chaptersLatest.length > 0 && (
                        <p className="text-gray-200 text-xs">
                          {comic.chaptersLatest[0].chapter_name}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-r-full z-10 focus:outline-none text-sm"
      >
        ◀
      </button>
      <button 
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-l-full z-10 focus:outline-none text-sm"
      >
        ▶
      </button>
    </div>
  );
} 
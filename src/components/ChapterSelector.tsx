'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface Chapter {
  chapter_name: string;
  chapter_api_data: string;
}

interface ChapterSelectorProps {
  chapters: Chapter[];
  currentChapter: string;
  comicSlug: string;
}

export default function ChapterSelector({ chapters, currentChapter, comicSlug }: ChapterSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Tìm các chapter kế tiếp và trước đó
  const currentIndex = chapters.findIndex(chap => chap.chapter_name === currentChapter);
  const prevChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;
  const nextChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-800/90 py-2 sm:py-3 px-3 sm:px-4 border-b border-white/10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Nút chapter trước */}
          {prevChapter ? (
            <Link 
              href={`/truyen/${comicSlug}/chapter/${prevChapter.chapter_name}`}
              className="p-1.5 sm:p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
              title={`Chương trước: ${prevChapter.chapter_name}`}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          ) : (
            <button 
              disabled 
              className="p-1.5 sm:p-2 bg-gray-700/50 text-gray-500 rounded-md cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
          
          {/* Dropdown chọn chapter */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between px-3 py-1.5 sm:py-2 min-w-[130px] sm:min-w-[180px] bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors text-xs sm:text-sm"
            >
              <span className="mr-1 font-medium">Chương {currentChapter}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
            </button>
            
            {isOpen && (
              <div className="absolute z-40 top-full left-0 right-0 mt-1 max-h-[60vh] w-[280px] sm:w-[320px] overflow-y-auto bg-gray-800 rounded-md shadow-lg border border-gray-700 py-2 custom-scrollbar">
                <div className="px-2">
                  {chapters.map(chapter => (
                    <Link
                      key={chapter.chapter_api_data}
                      href={`/truyen/${comicSlug}/chapter/${chapter.chapter_name}`}
                      className={`block px-3 py-2 rounded-md text-sm ${
                        chapter.chapter_name === currentChapter
                          ? 'bg-pink-500/30 text-pink-300 font-medium'
                          : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                      } transition-colors`}
                      onClick={() => setIsOpen(false)}
                    >
                      Chương {chapter.chapter_name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Nút chapter tiếp */}
          {nextChapter ? (
            <Link 
              href={`/truyen/${comicSlug}/chapter/${nextChapter.chapter_name}`}
              className="p-1.5 sm:p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
              title={`Chương tiếp: ${nextChapter.chapter_name}`}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          ) : (
            <button 
              disabled 
              className="p-1.5 sm:p-2 bg-gray-700/50 text-gray-500 rounded-md cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 
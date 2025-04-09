'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Chapter {
  chapter_name: string;
  chapter_api_data: string;
}

interface ChapterListPopupProps {
  chapters: Chapter[];
  currentChapter: string;
  comicSlug: string;
}

export default function ChapterListPopup({ chapters, currentChapter, comicSlug }: ChapterListPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sắp xếp chapter giảm dần theo số chương
  const sortedChapters = [...chapters].sort((a, b) => {
    return parseInt(b.chapter_name) - parseInt(a.chapter_name);
  });

  return (
    <div className="relative z-20" ref={popupRef}>
      <button
        onClick={togglePopup}
        className="flex-1 sm:flex-none px-2 sm:px-4 md:px-6 py-2 md:py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-white font-medium text-center whitespace-nowrap text-sm md:text-base"
      >
        Danh sách chương
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-700">
              <h3 className="font-bold text-base md:text-lg text-white">Danh sách chương</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-3 md:p-4 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                {sortedChapters.map((chapter) => (
                  <Link
                    key={chapter.chapter_api_data}
                    href={`/truyen/${comicSlug}/chapter/${chapter.chapter_name}`}
                    className={`block p-2 rounded-lg text-center ${
                      chapter.chapter_name === currentChapter
                        ? 'bg-pink-500/30 text-pink-300 font-medium'
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
                    } transition-colors text-xs md:text-sm`}
                    onClick={() => setIsOpen(false)}
                  >
                    Chương {chapter.chapter_name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
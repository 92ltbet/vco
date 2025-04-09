'use client';

import { useState } from 'react';

export default function SortButton() {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  
  const toggleSort = () => {
    const newOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newOrder);
    
    // Lấy tất cả các chương và sắp xếp lại
    const chapterContainer = document.querySelector('.md\\:grid');
    const mobileContainer = document.querySelector('.md\\:hidden > div');
    
    if (chapterContainer) {
      const chapters = Array.from(chapterContainer.children);
      chapterContainer.innerHTML = '';
      
      // Sắp xếp mảng
      if (newOrder === 'asc') {
        chapters.reverse();
      }
      
      // Thêm lại vào container
      chapters.forEach((chapter: Element) => {
        chapterContainer.appendChild(chapter);
      });
    }
    
    if (mobileContainer) {
      const chapters = Array.from(mobileContainer.children);
      mobileContainer.innerHTML = '';
      
      // Sắp xếp mảng
      if (newOrder === 'asc') {
        chapters.reverse();
      }
      
      // Thêm lại vào container
      chapters.forEach((chapter: Element) => {
        mobileContainer.appendChild(chapter);
      });
    }
  };
  
  return (
    <button
      onClick={toggleSort}
      className="flex items-center text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full transition-colors border border-gray-700"
    >
      {sortOrder === 'desc' ? (
        <>
          <span>Mới nhất</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </>
      ) : (
        <>
          <span>Cũ nhất</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </>
      )}
    </button>
  );
} 
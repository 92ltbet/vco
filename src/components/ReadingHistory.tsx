'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Comic } from '@/types/comic';

interface ReadingHistoryItem {
  comic: Comic;
  chapter: {
    name: string;
    slug: string;
  };
  timestamp: number;
}

export default function ReadingHistory() {
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/history');
        const { data } = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching reading history:', error);
      }
    };

    fetchHistory();
  }, []);

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Lịch sử đọc</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {history.map((item) => {
          const timeAgo = Math.floor((Date.now() - item.timestamp) / 1000);
          let timeText = '';
          
          if (timeAgo < 60) {
            timeText = `${timeAgo} giây trước`;
          } else if (timeAgo < 3600) {
            timeText = `${Math.floor(timeAgo / 60)} phút trước`;
          } else if (timeAgo < 86400) {
            timeText = `${Math.floor(timeAgo / 3600)} giờ trước`;
          } else {
            timeText = `${Math.floor(timeAgo / 86400)} ngày trước`;
          }

          return (
            <Link 
              key={`${item.comic._id}-${item.chapter.slug}`}
              href={`/truyen/${item.comic.slug}/chapter/${item.chapter.slug}`}
              className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <h3 className="font-semibold mb-2 line-clamp-1">{item.comic.name}</h3>
              <p className="text-sm text-gray-400">{item.chapter.name}</p>
              <p className="text-xs text-gray-500 mt-1">{timeText}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 
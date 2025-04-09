'use client';

import { FormEvent } from 'react';

interface ChapterJumpFormProps {
  comicSlug: string;
  firstChapter: string;
  lastChapter: string;
}

export default function ChapterJumpForm({ comicSlug, firstChapter, lastChapter }: ChapterJumpFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const chapter = form.chapter.value;
    if (chapter) {
      window.location.href = `/truyen/${comicSlug}/chapter/${chapter}`;
    }
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          name="chapter"
          placeholder={`Nhập số chương (${firstChapter}-${lastChapter})`}
          className="flex-1 bg-gray-800/80 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
        >
          Đi
        </button>
      </form>
    </div>
  );
} 
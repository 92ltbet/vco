import Link from 'next/link';
import { Comic } from '@/types/comic';

interface ChapterHeaderProps {
  comic: Comic;
  currentChapter: string;
}

export default function ChapterHeader({ comic, currentChapter }: ChapterHeaderProps) {
  // Kiểm tra xem có chapter nào không
  const hasChapters = comic.chapters && comic.chapters.length > 0 && 
                      comic.chapters[0] && comic.chapters[0].server_data && 
                      comic.chapters[0].server_data.length > 0;
  
  // Tìm chapter hiện tại, trước và sau
  let currentChapterIndex = -1;
  let prevChapter = null;
  let nextChapter = null;
  
  if (hasChapters) {
    currentChapterIndex = comic.chapters[0].server_data.findIndex(
      (chapter: any) => chapter.chapter_name === currentChapter
    );
    
    if (currentChapterIndex > 0) {
      nextChapter = comic.chapters[0].server_data[currentChapterIndex - 1]; // Chapter mới hơn
    }
    
    if (currentChapterIndex < comic.chapters[0].server_data.length - 1) {
      prevChapter = comic.chapters[0].server_data[currentChapterIndex + 1]; // Chapter cũ hơn
    }
  }

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/truyen/${comic.slug}`} className="text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold">{comic.name}</h1>
              <p className="text-sm text-gray-400">Chapter {currentChapter}</p>
            </div>
          </div>
          <div className="flex items-center space-2">
            {prevChapter && (
              <Link 
                href={`/truyen/${comic.slug}/chapter/${prevChapter.chapter_name}`}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm"
              >
                Chương trước
              </Link>
            )}
            
            {nextChapter && (
              <Link 
                href={`/truyen/${comic.slug}/chapter/${nextChapter.chapter_name}`}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm"
              >
                Chương sau
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface FollowButtonProps {
  comicId: string;
  comicName: string;
  comicSlug: string;
  comicThumb: string;
  isFollowing: boolean;
}

export default function FollowButton({ 
  comicId, 
  comicName, 
  comicSlug, 
  comicThumb, 
  isFollowing, 
}: FollowButtonProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

  // Cập nhật state khi prop thay đổi
  useEffect(() => {
    setIsFollowingState(isFollowing);
  }, [isFollowing]);

  // Xử lý hiển thị popup thông báo
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  // Xử lý khi submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Lấy danh sách truyện đã theo dõi từ cookie
    const followedComics = JSON.parse(Cookies.get('followed_comics') || '[]');
    
    // Kiểm tra xem truyện đã được theo dõi chưa
    const existingIndex = followedComics.findIndex((comic: any) => comic.id === comicId);
    
    if (existingIndex === -1) {
      // Thêm truyện mới vào danh sách theo dõi
      followedComics.push({
        id: comicId,
        name: comicName,
        slug: comicSlug,
        thumb: comicThumb
      });
    } else {
      // Xóa truyện khỏi danh sách theo dõi
      followedComics.splice(existingIndex, 1);
    }
    
    // Lưu danh sách mới vào cookie
    Cookies.set('followed_comics', JSON.stringify(followedComics), {
      path: '/',
      expires: 30 // 30 ngày
    });
    
    // Hiển thị thông báo và cập nhật state
    const newFollowState = !isFollowingState;
    setIsFollowingState(newFollowState);
    showMessage(newFollowState ? `Đã theo dõi truyện ${comicName}` : `Đã bỏ theo dõi truyện ${comicName}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="hidden" name="comicId" value={comicId} />
        <input type="hidden" name="comicName" value={comicName} />
        <input type="hidden" name="comicSlug" value={comicSlug} />
        <input type="hidden" name="comicThumb" value={comicThumb} />
        <button
          type="submit"
          className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
            isFollowingState
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isFollowingState ? 'Bỏ theo dõi' : 'Theo dõi'}
        </button>
      </form>

      {/* Popup thông báo */}
      {message && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
          {message}
        </div>
      )}
    </>
  );
} 
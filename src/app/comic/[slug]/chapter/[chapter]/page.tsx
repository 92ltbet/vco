import React from 'react';
import Image from 'next/image';
import { getComicDetail, getChapterImages, getComics } from '@/lib/api';
import { ChapterImages } from '@/types/comic';
import ChapterHeader from '@/components/ChapterHeader';
import Footer from '@/components/Footer';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';

interface ChapterPageProps {
  params: {
    slug: string;
    chapter: string;
  };
}

// Thêm hàm generateStaticParams để hỗ trợ static export
export async function generateStaticParams() {
  const { data } = await getComics(1);
  
  // Chỉ lấy 5 truyện và mỗi truyện 3 chương đầu tiên để giới hạn số lượng trang static
  const staticParams = [];
  
  for (const comic of data.items.slice(0, 5)) {
    try {
      const { data: comicData } = await getComicDetail(comic.slug);
      const comicDetail = comicData.item;
      
      if (comicDetail.chapters && 
          comicDetail.chapters.length > 0 && 
          comicDetail.chapters[0].server_data) {
            
        // Lấy tối đa 3 chương đầu tiên
        const chapters = comicDetail.chapters[0].server_data.slice(0, 3);
        
        for (const chapter of chapters) {
          staticParams.push({
            slug: comic.slug,
            chapter: chapter.chapter_name
          });
        }
      }
    } catch (error) {
      console.error(`Error getting details for comic ${comic.slug}:`, error);
    }
  }
  
  return staticParams;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  // Chuyển hướng người dùng đến đường dẫn mới
  redirect(`/truyen/${params.slug}/chapter/${params.chapter}`);
} 
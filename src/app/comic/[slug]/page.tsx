import React from 'react';
import Image from 'next/image';
import { getComicDetail, getComics } from '@/lib/api';
import { Comic } from '@/types/comic';
import { redirect } from 'next/navigation';

interface ComicPageProps {
  params: {
    slug: string;
  };
}

// Thêm hàm này để Next.js biết những trang nào cần build khi export
export async function generateStaticParams() {
  const { data } = await getComics(1);
  
  return data.items.map((comic: Comic) => ({
    slug: comic.slug,
  }));
}

export default async function ComicPage({ params }: ComicPageProps) {
  // Chuyển hướng người dùng đến đường dẫn mới
  redirect(`/truyen/${params.slug}`);
} 
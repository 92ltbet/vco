import { getComicsByCategory, getCategories } from '@/lib/api';
import ComicCard from '@/components/ComicCard';
import { Suspense } from 'react';
import LoadingSection from '@/components/LoadingSection';

// Thêm hàm generateStaticParams để hỗ trợ static export
export async function generateStaticParams() {
  try {
    const { data } = await getCategories();
    return data.items.map((category: any) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for category pages:', error);
    return [];
  }
}

export default async function GenrePage({ params }: { params: { slug: string } }) {
  const { data } = await getComicsByCategory(params.slug);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 capitalize">{params.slug.replace(/-/g, ' ')}</h1>
      <Suspense fallback={<LoadingSection />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.items.map((comic: any) => (
            <ComicCard key={comic._id} comic={comic} />
          ))}
        </div>
      </Suspense>
    </div>
  );
} 
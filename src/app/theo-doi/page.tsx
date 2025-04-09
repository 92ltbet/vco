import { cookies } from 'next/headers';
import Link from 'next/link';
import ComicImage from '@/components/ComicImage';

interface FollowedComic {
  id: string;
  name: string;
  slug: string;
  thumb: string;
}

export default function FollowedPage() {
  const cookieStore = cookies();
  let followedComics: FollowedComic[] = [];
  
  try {
    const followedCookieValue = cookieStore.get('followed_comics')?.value;
    if (followedCookieValue) {
      followedComics = JSON.parse(followedCookieValue);
    }
  } catch (error) {
    console.error('Error parsing followed comics:', error);
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Truyện đang theo dõi</h1>
        
        {followedComics.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {followedComics.map((comic) => (
              <Link 
                key={comic.id} 
                href={`/truyen/${comic.slug}`}
                className="group"
              >
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                  <ComicImage
                    src={comic.thumb}
                    alt={comic.name}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {comic.name}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">Bạn chưa theo dõi truyện nào</p>
            <Link 
              href="/"
              className="inline-block px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Khám phá truyện
            </Link>
          </div>
        )}
      </div>
    </main>
  );
} 
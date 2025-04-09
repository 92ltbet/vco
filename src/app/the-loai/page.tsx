import Link from 'next/link';

async function getGenres() {
  const res = await fetch('https://otruyenapi.com/v1/api/the-loai', {
    headers: {
      'accept': 'application/json'
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch genres');
  }
  
  return res.json();
}

export default async function GenresPage() {
  const { data } = await getGenres();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Thể loại</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.items.map((genre: any) => (
          <Link 
            key={genre._id}
            href={`/the-loai/${genre.slug}`}
            className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-white">{genre.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 
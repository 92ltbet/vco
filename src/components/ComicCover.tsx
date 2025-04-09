import Image from 'next/image';

interface Comic {
  _id: string;
  name: string;
  thumb_url: string;
  [key: string]: any;
}

interface ComicCoverProps {
  comic: Comic;
  className?: string;
}

export default function ComicCover({ comic, className = '' }: ComicCoverProps) {
  return (
    <div className={`relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg ${className}`}>
      <Image
        src={`https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`}
        alt={comic.name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
    </div>
  );
} 
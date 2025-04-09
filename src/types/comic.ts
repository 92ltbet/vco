export interface Comic {
  _id: string;
  name: string;
  slug: string;
  origin_name: string[];
  status: string;
  thumb_url: string;
  sub_docquyen: boolean;
  author: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  content: string;
  chapters: Chapter[];
  total_chapters: number;
  updatedAt: string;
  chaptersLatest: {
    filename: string;
    chapter_name: string;
    chapter_title: string;
    chapter_api_data: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Chapter {
  server_name: string;
  server_data: ChapterData[];
}

export interface ChapterData {
  filename: string;
  chapter_name: string;
  chapter_title: string;
  chapter_api_data: string;
  time: string;
}

export interface ChapterImages {
  domain_cdn: string;
  item: {
    _id: string;
    comic_name: string;
    chapter_name: string;
    chapter_title: string;
    chapter_path: string;
    chapter_image: ChapterImage[];
  };
}

export interface ChapterImage {
  image_page: number;
  image_file: string;
} 
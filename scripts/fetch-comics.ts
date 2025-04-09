const fs = require('fs');
const path = require('path');
const axios = require('axios');

const CATEGORIES = ['manhua', 'manhwa', 'co-dai', 'dam-my'];
const DATA_DIR = path.join(process.cwd(), 'public/data');
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 giây

interface Comic {
  _id: string;
  name: string;
  slug: string;
  thumb_url: string;
  status: string;
  updatedAt: string;
  chaptersLatest: {
    chapter_name: string;
    chapter_api_data: string;
  }[];
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function downloadImage(url: string, filename: string, retries = 0) {
  try {
    const response = await axios.get(url, { 
      responseType: 'arraybuffer',
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (response.status === 200) {
      const imagePath = path.join(DATA_DIR, 'images', filename);
      fs.writeFileSync(imagePath, response.data);
      console.log(`Downloaded: ${filename}`);
      return true;
    }
    
    throw new Error(`HTTP status ${response.status}`);
  } catch (error: any) {
    console.error(`Error downloading image ${filename}:`, error?.message || 'Unknown error');
    
    if (retries < MAX_RETRIES) {
      console.log(`Retrying (${retries + 1}/${MAX_RETRIES})...`);
      await delay(RETRY_DELAY);
      return downloadImage(url, filename, retries + 1);
    }
    
    return false;
  }
}

async function fetchComics() {
  // Tạo thư mục nếu chưa tồn tại
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.mkdirSync(path.join(DATA_DIR, 'images'), { recursive: true });
  }

  const allComics: Comic[] = [];
  const failedDownloads: string[] = [];

  for (const category of CATEGORIES) {
    console.log(`\nFetching ${category} comics...`);
    try {
      const response = await axios.get(`https://otruyenapi.com/v1/api/the-loai/${category}?page=1`);
      const comics = response.data.data.items;

      // Tải ảnh thumb
      for (const comic of comics) {
        const imageUrl = `https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`;
        const success = await downloadImage(imageUrl, comic.thumb_url);
        
        if (!success) {
          failedDownloads.push(comic.thumb_url);
        }
        
        // Đợi một chút giữa các lần tải để tránh quá tải server
        await delay(500);
      }

      allComics.push(...comics);
    } catch (error: any) {
      console.error(`Error fetching ${category}:`, error?.message || 'Unknown error');
    }
  }

  // Lưu dữ liệu vào file JSON
  fs.writeFileSync(
    path.join(DATA_DIR, 'comics.json'),
    JSON.stringify(allComics, null, 2)
  );

  console.log(`\nTotal comics saved: ${allComics.length}`);
  if (failedDownloads.length > 0) {
    console.log(`\nFailed downloads (${failedDownloads.length}):`);
    failedDownloads.forEach(file => console.log(`- ${file}`));
  }
}

fetchComics(); 
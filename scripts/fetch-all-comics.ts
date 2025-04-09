import { getAllPages } from '../src/lib/api';
import fs from 'fs';
import path from 'path';

async function fetchAllComics() {
  try {
    console.log('Bắt đầu lấy dữ liệu truyện...');
    
    // Lấy tất cả truyện từ API home
    const allComics = await getAllPages('https://otruyenapi.com/v1/api/home');
    console.log(`Đã lấy được ${allComics.length} truyện từ trang chủ`);
    
    // Lấy tất cả thể loại
    const categories = [
      'manhua', 'xuyen-khong', 'chuyen-sinh', 
      'manga', 'comic', 'fantasy', 'action',
      'adventure', 'anime', 'co-dai', 'dam-my',
      'drama', 'ecchi', 'historical', 'martial-arts',
      'mature', 'mystery', 'ngon-tinh', 'psychological',
      'romance', 'school-life', 'sci-fi', 'seinen',
      'shoujo', 'shoujo-ai', 'shounen', 'shounen-ai',
      'slice-of-life', 'smut', 'sports', 'supernatural',
      'tragedy', 'trinh-tham', 'truyen-scan', 'truyen-mau',
      'viet-nam', 'webtoon'
    ];
    
    // Lấy truyện từ mỗi thể loại
    for (const category of categories) {
      console.log(`Đang lấy truyện thể loại ${category}...`);
      const categoryComics = await getAllPages(`https://otruyenapi.com/v1/api/the-loai/${category}`);
      console.log(`Đã lấy được ${categoryComics.length} truyện từ thể loại ${category}`);
      
      // Thêm vào danh sách tổng hợp
      allComics.push(...categoryComics);
    }
    
    // Loại bỏ trùng lặp
    const uniqueComics = Array.from(new Set(allComics.map(comic => comic._id)))
      .map(id => allComics.find(comic => comic._id === id));
    
    console.log(`Tổng số truyện sau khi loại bỏ trùng lặp: ${uniqueComics.length}`);
    
    // Lưu vào file
    const dataPath = path.join(process.cwd(), 'data', 'comics.json');
    fs.writeFileSync(dataPath, JSON.stringify(uniqueComics, null, 2));
    console.log('Đã lưu dữ liệu vào file comics.json');
    
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
  }
}

fetchAllComics(); 
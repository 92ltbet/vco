export function getImageUrl(thumbUrl: string): string {
  if (!thumbUrl) return '/images/placeholder.jpg';
  
  // Kiểm tra xem URL đã đầy đủ chưa
  if (thumbUrl.startsWith('http')) {
    return thumbUrl;
  }
  
  // Nếu URL có dạng /data/images/...
  if (thumbUrl.startsWith('/data/images/')) {
    return `https://img.otruyenapi.com${thumbUrl}`;
  }
  
  // Thêm domain nếu cần
  return `https://img.otruyenapi.com/uploads/comics/${thumbUrl}`;
} 
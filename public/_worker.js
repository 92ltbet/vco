// Cloudflare Pages worker script
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle dynamic routes - đảm bảo tất cả các routes khớp với Next.js
    if (url.pathname.startsWith('/api/')) {
      return new Response('API endpoint', { status: 200 });
    }
    
    // Nếu không có file tĩnh, trả về index.html
    return fetch(request);
  }
}; 
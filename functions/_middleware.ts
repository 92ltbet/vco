import { NextRequest } from 'next/server';

export const onRequest = async (context: any) => {
  const { request, next } = context;
  
  // Handle API routes và server components
  if (request.url.includes('/api/')) {
    try {
      return await next();
    } catch (error) {
      console.error('API route error:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: {
          'content-type': 'application/json',
        },
      });
    }
  }

  // Các requests khác
  return await next();
}; 
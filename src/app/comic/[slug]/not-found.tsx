import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Trang không tồn tại</h2>
        <p className="text-gray-400 mb-8">
          Đường dẫn /comic/... không còn được hỗ trợ, vui lòng sử dụng /truyen/... thay thế
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg text-white inline-block"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
} 
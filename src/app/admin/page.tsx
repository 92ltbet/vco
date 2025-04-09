import React from 'react';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-4xl font-bold text-white">Quản Lý Truyện</h1>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Thêm Truyện Mới</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Tên Truyện
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-white/10 px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Thể Loại
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-white/10 px-4 py-2 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Thêm Truyện
              </button>
            </form>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Cập Nhật Truyện</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  ID Truyện
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-white/10 px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Nội Dung Cập Nhật
                </label>
                <textarea
                  className="w-full rounded-lg bg-white/10 px-4 py-2 text-white"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
              >
                Cập Nhật
              </button>
            </form>
          </div>

          <div className="rounded-lg bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Xóa Truyện</h2>
            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  ID Truyện
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-white/10 px-4 py-2 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              >
                Xóa Truyện
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 
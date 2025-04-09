import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VenComic - Đọc truyện tranh online',
  description: 'Đọc truyện tranh online miễn phí, cập nhật nhanh chóng và liên tục',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-900">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
} 
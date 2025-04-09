# VenComic - Trang Web Đọc Truyện Tranh

VenComic là một trang web đọc truyện tranh online với giao diện đẹp và hiện đại, được xây dựng bằng Next.js và Tailwind CSS.

## Tính Năng

- Trang chủ hiển thị danh sách truyện theo thể loại
- Trang chi tiết truyện với thông tin đầy đủ
- Trang đọc truyện theo chiều dọc
- Trang admin để quản lý truyện

## Công Nghệ Sử Dụng

- Next.js 13
- TypeScript
- Tailwind CSS
- React Query
- Framer Motion

## Cài Đặt

1. Clone repository:
```bash
git clone https://github.com/your-username/vencomic.git
cd vencomic
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy development server:
```bash
npm run dev
```

4. Build cho production:
```bash
npm run build
```

5. Chạy production server:
```bash
npm start
```

## Cấu Trúc Dự Án

```
src/
  ├── app/              # Next.js app router
  ├── components/       # React components
  ├── hooks/           # Custom hooks
  ├── lib/             # Utility functions
  ├── types/           # TypeScript types
  └── utils/           # Helper functions
```

## API Endpoints

- `GET /api/the-loai/:category` - Lấy danh sách truyện theo thể loại
- `GET /api/truyen-tranh/:slug` - Lấy thông tin chi tiết truyện
- `GET /api/chapter/:id` - Lấy hình ảnh chương truyện

## License

MIT 
# AIDEVIX - Onlayn Ta'lim Platformasi

Professional dasturlash kurslari va video darslar platformasi.

## 🚀 Xususiyatlar

### ✅ Foydalanuvchi funksiyalari
- Ro'yxatdan o'tish / Kirish (JWT Authentication)
- **MAJBURIY:** Instagram, Telegram, YouTube ga obuna tekshiruvi
- 3 ta tarif: FREE, PLUS, PRO
- YouTube videolarni ko'rish
- Video saqlash (Favorites)
- Ko'rilgan videolar tarixi
- Progress tracking
- Like bosish
- Profil boshqarish

### 🎓 Kurslar
- React.js
- Next.js
- TypeScript
- HTML/CSS
- Tailwind CSS
- React Native

### 💎 Tariflar
- **FREE:** Faqat bepul videolar
- **PLUS:** 49,000 so'm/oy - Ortacha videolar + FREE
- **PRO:** 99,000 so'm/oy - Barcha videolar + Sertifikat + Mentor

### 👨‍💼 Admin Panel
- Kurs qo'shish/tahrirlash/o'chirish
- Video yuklash (YouTube)
- Reels qo'shish
- Foydalanuvchilarni boshqarish
- Statistika

## 🛠 Texnologiyalar

### Frontend
- React.js 19
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcryptjs

## 📦 O'rnatish

### 1. Frontend
```bash
npm install
cp .env.example .env
npm run dev
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
# .env faylini to'ldiring
npm run dev
```

### 3. MongoDB
MongoDB o'rnatilgan va ishlab turishi kerak:
```bash
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/aidevix
```

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aidevix
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret

INSTAGRAM_URL=https://www.instagram.com/aidevix
TELEGRAM_URL=https://t.me/aidevix
YOUTUBE_URL=https://youtube.com/@aidevix
```

## 📱 Ijtimoiy tarmoqlar

Ro'yxatdan o'tish uchun MAJBURIY:
- Instagram: [@aidevix](https://www.instagram.com/aidevix)
- Telegram: [@aidevix](https://t.me/aidevix)
- YouTube: [@aidevix](https://youtube.com/@aidevix)

## 🎯 Loyiha strukturasi

```
AIDEVIX/
├── src/
│   ├── components/     # Navbar, Footer
│   ├── pages/          # Home, Courses, VideoPlayer, etc.
│   ├── store/          # Redux slices
│   └── utils/          # API calls
├── backend/
│   ├── models/         # User, Course, Video, Reels
│   ├── routes/         # API routes
│   ├── middleware/     # Auth, role check
│   └── config/         # Database config
```

## 🔥 Asosiy funksiyalar

1. **Ijtimoiy tarmoq tekshiruvi** - Ro'yxatdan o'tish uchun majburiy
2. **3 darajali tarif tizimi** - FREE, PLUS, PRO
3. **YouTube video integratsiya** - Embedded player
4. **Progress tracking** - Video ko'rish jarayonini saqlash
5. **Favorites** - Sevimli videolarni saqlash
6. **Admin panel** - To'liq boshqaruv paneli

## 📝 API Endpoints

### Auth
- POST `/api/auth/register` - Ro'yxatdan o'tish
- POST `/api/auth/login` - Kirish

### Courses
- GET `/api/courses` - Barcha kurslar
- GET `/api/courses/:id` - Bitta kurs
- GET `/api/courses/video/:id` - Video (auth + social check)

### User
- GET `/api/user/profile` - Profil
- POST `/api/user/favorites/:videoId` - Saqlash
- POST `/api/user/progress/:videoId` - Progress

### Subscription
- POST `/api/subscription/subscribe` - Obuna
- GET `/api/subscription/status` - Status

### Admin
- POST `/api/admin/courses` - Kurs yaratish
- POST `/api/admin/videos` - Video yaratish
- GET `/api/admin/stats` - Statistika

## 🚀 Ishga tushirish

1. MongoDB ishga tushiring
2. Backend: `cd backend && npm run dev`
3. Frontend: `npm run dev`
4. Browser: `http://localhost:5173`

## 📄 Litsenziya

© 2026 AIDEVIX. Barcha huquqlar himoyalangan.

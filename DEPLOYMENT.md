# AIDEVIX - GitHub Pages Deployment Guide

## GitHub Pages ga deploy qilish

### 1. Repository sozlash

1. GitHub da repository yarating
2. Repository Settings > Pages ga o'ting
3. Source: "GitHub Actions" ni tanlang

### 2. Kodni yuklash

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

### 3. Base URL sozlash

Agar repository nomi `aidevix` bo'lsa:

`vite.config.js` da:
```javascript
base: '/aidevix/'
```

Agar custom domain ishlatmoqchi bo'lsangiz:
```javascript
base: '/'
```

### 4. Custom Domain (ixtiyoriy)

1. Repository Settings > Pages > Custom domain
2. Domain nomini kiriting (masalan: aidevix.uz)
3. DNS sozlamalarida CNAME record qo'shing:
   - Type: CNAME
   - Name: www (yoki @)
   - Value: USERNAME.github.io

### 5. Deploy

Har safar `main` branchga push qilganingizda avtomatik deploy bo'ladi:

```bash
git add .
git commit -m "Update"
git push
```

### 6. Tekshirish

Deploy tugagandan keyin (2-3 daqiqa):
- https://USERNAME.github.io/REPOSITORY/
- yoki custom domain: https://aidevix.uz

## Muammolarni hal qilish

### Oq ekran ko'rinsa:

1. Browser console ni oching (F12)
2. Xatolarni ko'ring
3. `vite.config.js` da `base` to'g'ri sozlanganini tekshiring

### 404 xatosi:

1. `public/404.html` fayli mavjudligini tekshiring
2. `index.html` da redirect script borligini tekshiring

### CSS yuklanmasa:

1. `npm run build` qiling
2. `dist` papkasini tekshiring
3. GitHub Actions logs ni ko'ring

## Local test

Deploy qilishdan oldin local test qiling:

```bash
npm run build
npm run preview
```

## Environment Variables

Production uchun `.env.production` yarating:

```
VITE_API_URL=https://api.aidevix.uz/api
```

## Monitoring

GitHub Actions > Workflows da deploy statusini kuzating.

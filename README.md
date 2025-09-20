# Personal Branding — Vue 3 + Tailwind CSS

Landing page bersih, responsif, dan modern menggunakan Vue 3 (Composition API), Vite, Tailwind CSS, animasi halus via `@vueuse/motion`, dan form kontak via EmailJS.

## Fitur
- Navigasi sticky dengan smooth scroll dan scroll spy (auto highlight section aktif)
- Hero dengan foto profil bulat, nama, tagline, dan CTA
- Section About, Services (grid card), Portfolio (grid galeri), Contact (form EmailJS)
- Footer dengan link sosial
- Dark mode toggle (persist di localStorage)
- Desain minimalis dengan animasi fade/slide halus

## Struktur Proyek
```
personal-branding-vue/
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ assets/
│  │  └─ main.css
│  ├─ components/
│  │  ├─ Navbar.vue
│  │  ├─ Hero.vue
│  │  ├─ About.vue
│  │  ├─ Services.vue
│  │  ├─ Portfolio.vue
│  │  ├─ Contact.vue
│  │  └─ Footer.vue
│  ├─ composables/
│  │  ├─ useScrollSpy.js
│  │  └─ useTheme.js
│  ├─ App.vue
│  └─ main.js
├─ index.html
├─ tailwind.config.cjs
├─ postcss.config.cjs
├─ vite.config.js
├─ package.json
└─ .env.example
```

## Menjalankan Secara Lokal
1. Install dependencies
```
npm install
```

2. Duplikat `.env.example` menjadi `.env` dan isi nilai EmailJS Anda.

3. Jalankan development server
```
npm run dev
```

4. Build untuk produksi
```
npm run build
npm run preview
```

## Konfigurasi EmailJS
- Buat akun di https://www.emailjs.com/
- Buat Service, Template, dan ambil Public Key
- Isi `.env`:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```
- Field yang dipakai pada template:
  - `from_name`
  - `reply_to`
  - `message`

## Catatan Kustomisasi
- Anda bisa mengganti teks/foto pada komponen di `src/components/` tanpa mengubah struktur.
- Tailwind utility tersedia di `src/assets/main.css` (kelas reusable seperti `section`, `card`, `btn-primary`).
- Jika Anda memiliki HTML/CSS/JS versi Anda, cukup mapping elemen ke struktur komponen Vue ini tanpa mengubah isi konten.
- Setelah deploy ke domain asakaprima.com, submit sitemap di Google Search Console:
Property → Sitemaps → Masukkan https://asakaprima.com/sitemap.xml.
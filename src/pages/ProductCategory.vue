<template>
  <div class="container max-w-6xl mx-auto">
    <nav aria-label="Breadcrumb" class="text-sm mb-3 text-slate-600 dark:text-slate-300">
      <button class="hover:underline" @click="$emit('back')">Beranda</button>
      <span class="mx-1">/</span>
      <span class="font-semibold capitalize">{{ meta.title }}</span>
    </nav>

    <header class="mb-6">
      <h1 class="text-3xl md:text-4xl font-bold tracking-tight">{{ meta.title }}</h1>
      <p class="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl">{{ meta.description }}</p>
    </header>

    <section class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <article v-for="(m, i) in media" :key="i" class="card overflow-hidden">
        <div class="aspect-[4/3] bg-slate-900/40 relative">
          <video v-if="isVideo(m)" :src="m" class="absolute inset-0 w-full h-full object-cover" controls preload="none" playsinline />
          <img v-else :src="m" :alt="meta.title + ' ' + (i+1)" class="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
        </div>
      </article>
    </section>

    <section class="mt-8 prose prose-slate dark:prose-invert max-w-none">
      <h2>Informasi</h2>
      <p>{{ meta.long }}</p>
      <ul>
        <li v-for="(b, i) in meta.bullets" :key="i">{{ b }}</li>
      </ul>
    </section>

    <div class="mt-8">
      <a
        href="https://wa.me/6287782527700?text=Halo%20ASAKA%20PRIMA%2C%20saya%20ingin%20bertanya%20tentang%20{{ encodeURIComponent(meta.title) }}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary"
      >Konsultasi via WhatsApp</a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ slug: { type: String, required: true } })

function isVideo(src) { return /\.(mp4|webm|ogg)$/i.test(src || '') }

// Map kategori ke judul, deskripsi, dan daftar media (pakai aset di public/)
const CATEGORIES = {
  'ape': {
    title: 'APE & Media Pembelajaran',
    description: 'Mainan edukasi dan media belajar untuk PAUD/TK hingga SD, mendukung perkembangan kognitif dan motorik.',
    long: 'Kami menyediakan beragam APE dan media pembelajaran yang dirancang untuk mendorong kreativitas dan keterampilan anak. Kualitas terjamin dan aman digunakan.',
    bullets: ['Bahan aman dan tahan lama', 'Cocok untuk PAUD/TK/SD', 'Siap kirim ke seluruh Indonesia'],
    media: ['/P4.png','/P2.png','/P3.png','/P1.png','/ape1.png','/ape2.png','/ape3.png']
  },
  'bkb-kit': {
    title: 'BKB KIT Stunting',
    description: 'Perlengkapan BKB untuk edukasi keluarga dan pencegahan stunting di masyarakat.',
    long: 'Paket BKB KIT lengkap untuk mendukung program pencegahan stunting. Materi edukasi mudah dipahami dan praktis digunakan.',
    bullets: ['Materi edukasi lengkap', 'Mudah digunakan kader/tenaga kesehatan', 'Dukungan konsultasi penggunaan'],
    media: ['/BKB.png']
  },
  'alkes-lab': {
    title: 'Alat Kesehatan & Laboratorium',
    description: 'Penyediaan alat kesehatan dan peralatan laboratorium untuk institusi kesehatan dan pendidikan.',
    long: 'Rangkaian alat kesehatan & laboratorium dengan kualitas teruji, didukung layanan after-sales.',
    bullets: ['Garansi purna jual', 'Kualitas terverifikasi', 'Pengadaan instansi'],
    media: ['/KIT.png','/KIT1.png','/KIT2.png','/20.mp4']
  },
  'bordir-sablon': {
    title: 'Bordir & Sablon',
    description: 'Layanan bordir dan sablon komputer untuk berbagai jenis pakaian dan media.',
    long: 'Hasil rapi dan presisi menggunakan mesin modern. Cocok untuk seragam sekolah, komunitas, dan kebutuhan promosi.',
    bullets: ['Desain custom', 'Warna tajam & awet', 'Proses cepat'],
    media: ['/Asakasablon.mp4','/Asakasablon1.mp4','/Asakasablon2.mp4']
  },
  'buku': {
    title: 'Buku Paket & Buku Induk',
    description: 'Paket buku sekolah TK–SMA dan buku induk guru untuk administrasi yang rapi.',
    long: 'Pilihan paket buku lengkap sesuai kurikulum. Memudahkan pengadaan sekolah dan instansi.',
    bullets: ['Kurikulum terkini', 'Siap distribusi skala besar', 'Layanan rekomendasi paket'],
    media: ['/SD.png','/SD1.png','/SMP.png','/SMA.png','/PAKETAISLAM.png','/PAKETBISLAM.png','/A.png','/B.png','/PAKETAUMUM.png','/PAKETAUMUM1.png']
  },
  'trophy': {
    title: 'Piala Trophy & Medali',
    description: 'Piala dan medali untuk berbagai event dan kejuaraan.',
    long: 'Beragam pilihan piala & medali dengan kustomisasi desain dan ukuran, cocok untuk sekolah dan komunitas.',
    bullets: ['Desain variatif', 'Kustom nama/gelar', 'Harga bersaing'],
    media: ['/B3.png','/B2.png','/B1.png','/B4.png','/B5.png']
  }
}

const meta = computed(() => CATEGORIES[props.slug] || {
  title: 'Kategori Produk',
  description: 'Detail kategori tidak ditemukan.',
  long: 'Kategori yang Anda cari belum tersedia atau sedang diperbarui.',
  bullets: [],
  media: []
})

const media = computed(() => meta.value.media)
</script>

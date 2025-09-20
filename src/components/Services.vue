<template>
  <div id="services" class="container max-w-6xl mx-auto -mt-6 lg:-mt-10 scroll-mt-24">
    <h2 class="section-title">Layanan</h2>
    <p class="section-subtitle mb-8">Berikut beberapa jasa/layanan yang saya sediakan.</p>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="card p-6" v-for="s in services" :key="s.title" v-motion :initial="{ opacity: 0, y: 16 }" :enter="{ opacity: 1, y: 0, transition: { duration: 400 } }">
        <div class="text-2xl">{{ s.emoji }}</div>
        <h3 class="mt-3 font-semibold text-lg">{{ s.title }}</h3>
        <p class="mt-1 text-slate-600 dark:text-slate-300">{{ s.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const services = [
  { emoji: '🧸', title: 'Mainan Edukasi TK/PAUD', desc: 'Menyediakan mainan edukasi berkualitas untuk pengembangan anak usia dini.' },
  { emoji: '🩺', title: 'Alat Kesehatan', desc: 'Penyedia alat kesehatan dan alat laboratorium untuk pencegahan stunting di masyarakat.' },
  { emoji: '👶', title: 'BKB Kit Stunting', desc: 'Penyedia perlengkapan BKB untuk pencegahan stunting di masyarakat.' },
  { emoji: '👕', title: 'Bordir & Sablon', desc: 'Layanan bordir dan sablon untuk kebutuhan seragam, merchandise, dan promosi.' },
  { emoji: '🏆', title: 'PIALA TROPHY & MEDALI ', desc: 'Distribusi produk UMKM dengan jaringan yang luas dan andal.' },
  { emoji: '📚', title: 'Buku Paket TK/PAUD & Buku Induk Guru', desc: 'Pilihan tepat untuk sekolah yang ingin pembelajaran lebih terarah dan administrasi lebih rapi.' },
]
</script>

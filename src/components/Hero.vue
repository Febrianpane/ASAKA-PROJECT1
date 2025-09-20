<template>
  <!-- Wrapper full-width dengan background slider dan overlay 50% -->
  <div id="home" class="relative w-full min-h-screen overflow-hidden">
    <!-- Layer background berganti otomatis (img + object-cover untuk responsif) -->
    <transition name="bgfade" mode="out-in">
      <img
        :key="currentIndex"
        :src="images[currentIndex]"
        alt="Hero background"
        class="absolute inset-0 w-full h-full object-cover object-center"
        decoding="async"
        fetchpriority="high"
      />
    </transition>

    <!-- Overlay: vertical gradient + subtle blur -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- subtle backdrop blur for busy backgrounds -->
      <div class="absolute inset-0 backdrop-blur-[1.5px] md:backdrop-blur-sm"></div>
      <!-- main vertical gradient: top darker -> bottom lighter -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/20"></div>
      <!-- top vignette to protect header/nav area -->
      <div class="absolute inset-x-0 top-0 h-24 sm:h-28 md:h-32 bg-gradient-to-b from-black/70 to-transparent"></div>
    </div>

    <!-- Konten teks -->
    <div class="container max-w-6xl mx-auto relative z-10 min-h-screen flex items-start md:items-center justify-center pt-14 sm:pt-20 md:pt-0 lg:pt-0 pb-6 sm:pb-8 md:pb-0">
      <div class="grid md:grid-cols-1 gap-6 items-center w-full">
        <div
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="order-2 md:order-1"
        >
          <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)]">
            Solusi Lengkap untuk Pendidikan & Kebutuhan Institusi <span class="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">ASAKA PRIMA</span>
          </h1>
          <p class="text-lg md:text-xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] mb-6">
            
            Mitra tepercaya untuk Sekolah, Dinas, Kesehatan, Kampus, dan Komunitas. Kami menyediakan Berbagai APE & media pembelajaran, paket buku TK/PAUD–SMA & buku induk, BKB KIT Stunting, alat kesehatan & laboratorium, Dan Layanan BORDIR & SABLON profesional. Cepat, rapi, dan bergaransi kualitas.
          </p>
          <div class="relative w-full">
            <!-- decorative blur blob behind CTAs -->
            <div aria-hidden="true" class="pointer-events-none absolute -inset-x-10 -top-6 h-28 sm:h-32 bg-gradient-to-r from-emerald-300/20 via-cyan-300/15 to-amber-300/20 blur-3xl rounded-full"></div>
            <div class="relative w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 xl:px-6 xl:py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-400/40 hover:brightness-110 hover:opacity-95 active:opacity-90 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                @click="$emit('cta')"
                aria-label="Hubungi Saya"
              >
                <!-- phone/chat icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C10.3 22 2 13.7 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"/></svg>
                <span>Hubungi Saya</span>
              </button>
              <a
                href="#product"
                @click.prevent="goToProduct"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 xl:px-6 xl:py-3 text-sm font-semibold text-white/95 border border-white/50 bg-white/5 hover:bg-white/15 hover:border-white/70 hover:text-white transition backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label="Lihat Produk"
              >
                <!-- grid/list icon -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" aria-hidden="true"><path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/></svg>
                <span>Lihat PRODUK</span>
              </a>
            </div>
          </div>

          <!-- Chips kecil non-klik di bawah tombol -->
          <div class="mt-7 md:mt-5 w-full flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/30 backdrop-blur-sm pointer-events-none select-none text-xs sm:text-sm">
              <!-- Profesional -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" fill="currentColor" aria-hidden="true"><path d="M12 .587l3.668 7.431L24 9.75l-6 5.847 1.417 8.263L12 19.771 4.583 23.86 6 15.597 0 9.75l8.332-1.732z"/></svg>
              <span>Profesional</span>
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/30 backdrop-blur-sm pointer-events-none select-none text-xs sm:text-sm">
              <!-- Tepat Waktu -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 10.59l3.3 3.3-1.41 1.41L11 13V6h2v6.59z"/></svg>
              <span>Tepat Waktu</span>
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/30 backdrop-blur-sm pointer-events-none select-none text-xs sm:text-sm">
              <!-- Garansi Kualitas -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300" fill="currentColor" aria-hidden="true"><path d="M12 2l7 4v6c0 5-3.5 9.5-7 10-3.5-.5-7-5-7-10V6l7-4zm-1 14l6-6-1.41-1.41L11 12.17l-2.59-2.58L7 11l4 4z"/></svg>
              <span>Garansi Kualitas</span>
            </span>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/30 backdrop-blur-sm pointer-events-none select-none text-xs sm:text-sm">
              <!-- Harga Kompetitif -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-300" fill="currentColor" aria-hidden="true"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 16h2v2h-2v-2zm0-10h2v8h-2V7z"/></svg>
              <span>Harga Kompetitif</span>
            </span>
          </div>
        </div>

        <!-- Kolom kanan dibiarkan kosong agar grid tetap seimbang di desktop -->
        <div class="order-1 md:order-2"></div>
      </div>
    </div>
  <!-- Scroll cue at bottom center (visible only while scrolling) -->
  <transition name="cue-fade">
    <div v-show="showScrollCue" class="absolute left-1/2 -translate-x-1/2 bottom-3 sm:bottom-5 z-20">
      <button
        type="button"
        @click="goToProduct"
        aria-label="Scroll ke Produk"
        class="group inline-flex flex-col items-center text-white/80 hover:text-white focus:outline-none"
      >
        <span class="sr-only">Scroll ke bawah</span>
        <span class="block h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-bounce" fill="currentColor" aria-hidden="true">
            <path d="M12 16.5l-6-6 1.41-1.41L12 13.67l4.59-4.58L18 10.5l-6 6z"/>
          </svg>
        </span>
      </button>
    </div>
  </transition>
</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Daftar gambar slider (ganti dengan aset perusahaan Anda, mis: '/hero-1.jpg')
const images = [
  '/BG1.png', // contoh dari folder public, ganti dengan '/hero-1.jpg' jika tersedia
]

const currentIndex = ref(0)
let timer
// Scroll cue visibility controller
const showScrollCue = ref(false)
let scrollHideTimer

function handleScrollCue() {
  showScrollCue.value = true
  if (scrollHideTimer) clearTimeout(scrollHideTimer)
  // Hide shortly after scrolling stops
  scrollHideTimer = setTimeout(() => {
    showScrollCue.value = false
  }, 1200)
}

onMounted(() => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 5000) // 5 detik per slide

  // Listen to scroll for cue visibility (mobile & desktop)
  window.addEventListener('scroll', handleScrollCue, { passive: true })
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  window.removeEventListener('scroll', handleScrollCue)
  if (scrollHideTimer) clearTimeout(scrollHideTimer)
})

// Smooth scroll to product section using scrollIntoView; sections use scroll-mt to account for sticky navbar
const goToProduct = () => {
  const selectors = ['#products', '#product', '#produk', '#portfolio', '[data-section="product"]']
  const el = selectors.map(s => document.querySelector(s)).find(Boolean)
  if (el && el instanceof HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
/* Partner logos marquee */
.marquee {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1rem; /* adjust if needed */
  z-index: 10;
}
.marquee-viewport {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
.marquee-track {
  display: inline-flex;
  gap: 2.5rem;
  align-items: center;
  animation: marquee 28s linear infinite;
  opacity: .85;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>

<style scoped>
.bgfade-enter-active, .bgfade-leave-active { transition: opacity 600ms ease; }
.bgfade-enter-from, .bgfade-leave-to { opacity: 0; }
/* Scroll cue fade */
.cue-fade-enter-active, .cue-fade-leave-active { transition: opacity 200ms ease; }
.cue-fade-enter-from, .cue-fade-leave-to { opacity: 0; }
</style>

<template>
  <div id="testimonials" class="container max-w-5xl mx-auto scroll-mt-24">
    <h2 class="section-title text-center">Testimoni Pelanggan</h2>
    <p class="section-subtitle text-center mb-5">Apa kata mereka tentang layanan kami</p>

    <div class="relative">
      <div
        class="overflow-hidden select-none"
        ref="viewportEl"
        @mousedown="onPointerDown"
        @touchstart="onPointerDown"
        @mouseenter="onHover(true)"
        @mouseleave="onHover(false)"
        :class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
      >
        <div
          :class="['flex', useTransition ? 'transition-transform duration-500 ease-out' : '']"
          :style="{ transform: dragTransform }"
        >
          <div
            v-for="(t, i) in loopedTestimonials"
            :key="i"
            class="min-w-0 shrink-0 px-2 sm:px-3"
            :style="{ width: `${100 / itemsPerView}%` }"
          >
            <div class="h-full card rounded-xl border border-amber-100/60 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow p-4 md:p-5 bg-gradient-to-b from-amber-50/80 to-amber-50/60 dark:from-slate-900/90 dark:to-slate-900/70">
              <div class="flex items-center gap-2.5 mb-2">
                <img :src="t.avatar" :alt="t.author" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700" />
                <div>
                  <p class="font-semibold text-slate-900 dark:text-white leading-tight text-[13px] md:text-sm">{{ t.author }}</p>
                  <p class="text-[10px] md:text-[11px] text-slate-500 dark:text-slate-400">{{ t.role }}</p>
                </div>
              </div>
              <div class="flex items-start">
                <p class="text-slate-800 dark:text-slate-100 italic text-sm md:text-base leading-relaxed">“{{ t.quote }}”</p>
              </div>
              <div class="flex items-center justify-end gap-1.5 mt-2.5" aria-label="rating">
                <template v-for="n in 5" :key="n">
                  <span class="relative inline-block" :style="{ width: starPx, height: starPx }">
                    <!-- base grey star -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute inset-0" fill="currentColor" :class="'text-slate-400/40 dark:text-slate-500/40'">
                      <path d="M12 .587l3.668 7.431L24 9.75l-6 5.847 1.417 8.263L12 19.771 4.583 23.86 6 15.597 0 9.75l8.332-1.732z" />
                    </svg>
                    <!-- gold overlay with partial fill -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute inset-0 text-yellow-400" fill="currentColor" :style="{ clipPath: `inset(0 ${100 - fillPercent(t.rating, n)}% 0 0)` }">
                      <path d="M12 .587l3.668 7.431L24 9.75l-6 5.847 1.417 8.263L12 19.771 4.583 23.86 6 15.597 0 9.75l8.332-1.732z" />
                    </svg>
                  </span>
                </template>
              </div>
              <div class="mt-3 md:mt-4 hidden md:flex flex-wrap gap-2">
                <span v-for="(tag, idx) in t.tags" :key="idx" class="text-[11px] px-2 py-0.5 rounded-full bg-amber-100/70 dark:bg-slate-800 text-amber-700 dark:text-slate-300">#{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Seamless runner indicator (gentle, no snapping) -->
      <div class="mt-5 flex items-center justify-center">
        <div class="runner-track" aria-label="indikator slide kontinu" role="status">
          <span class="runner-dot" aria-hidden="true"></span>
        </div>
      </div>

      <!-- Arrows -->
      <button
        class="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-slate-800/70 hover:bg-white/90 dark:hover:bg-slate-800/90 text-slate-700 dark:text-slate-200 w-9 h-9 rounded-full items-center justify-center shadow"
        aria-label="Sebelumnya"
        @click="prevSlide"
      >
        ‹
      </button>
      <button
        class="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 bg-white/70 dark:bg-slate-800/70 hover:bg-white/90 dark:hover:bg-slate-800/90 text-slate-700 dark:text-slate-200 w-9 h-9 rounded-full items-center justify-center shadow"
        aria-label="Berikutnya"
        @click="nextSlide"
      >
        ›
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

const testimonials = [
  {
    quote: 'Kualitas produk sangat baik, anak-anak jadi lebih aktif di kelas. Pengiriman cepat!',
    author: 'Ibu Rina',
    role: 'Kepala TK',
    rating: 4,
    avatar: '/icon1.png',
    tags: ['edukasi', 'pengiriman-cepat']
  },
  {
    quote: 'BKB KIT lengkap dan mudah digunakan. Tim ramah dan responsif.',
    author: 'Bidan Putri',
    role: 'Puskesmas',
    rating: 5,
    avatar: '/icon1.png',
    tags: ['bkb', 'pelayanan']
  },
  {
    quote: 'Bordir seragam rapi dan presisi. Harga bersaing!',
    author: 'Pak Arif',
    role: 'UKM Konveksi',
    rating: 4.5,
    avatar: '/icon1.png',
    tags: ['bordir', 'harga-bagus']
  },
  {
    quote: 'Respon cepat dan hasil memuaskan. Sangat direkomendasikan!',
    author: 'Ibu Sari',
    role: 'Komite Sekolah',
    rating: 3.5,
    avatar: '/icon1.png',
    tags: ['responsif', 'rekomendasi']
  },
  {
    quote: 'Pengemasan rapi, kualitas buku sekolah sangat baik.',
    author: 'Bu Nia',
    role: 'Guru SD',
    rating: 5,
    avatar: '/icon1.png',
    tags: ['buku', 'kualitas']
  },
  {
    quote: 'Piala dan medali sesuai pesanan, proses cepat.',
    author: 'Pak Dedi',
    role: 'Panitia Lomba',
    rating: 4,
    avatar: '/icon1.png',
    tags: ['trophy', 'tepat-waktu']
  },
  {
    quote: 'Alat lab lengkap, harga bersaing, support after sales bagus.',
    author: 'Yuni',
    role: 'Laboran',
    rating: 4.5,
    avatar: '/icon1.png',
    tags: ['lab', 'after-sales']
  },
  {
    quote: 'Konveksi responsif, hasil sablon rapi dan awet.',
    author: 'Rangga',
    role: 'Owner Komunitas',
    rating: 5,
    avatar: '/icon1.png',
    tags: ['sablon', 'responsif']
  },
  {
    quote: 'Hasil sablon rapi tdk mudah luntur.',
    author: 'Gendon',
    role: 'Pembeli',
    rating: 5,
    avatar: '/icon1.png',
    tags: ['sablon', 'kaos', 'rapih']
  },
  {
    quote: 'Hasil bordir jaket sangat lumayanlah.',
    author: 'Taufiq',
    role: 'Pelanggan Bordir',
    rating: 4,
    avatar: '/icon1.png',
    tags: ['sablon', 'kaos', 'rapih']
  },
  {
    quote: 'kebutuhan baju sablon dan design keren.',
    author: 'adi',
    role: 'Pelanggan baru',
    rating: 5,
    avatar: '/icon1.png',
    tags: ['sablon']
  },
  {
    quote: 'sangat direkomendasikan ',
    author: 'arya ',
    role: 'Pelanggan',
    rating: 4.3,
    avatar: '/icon1.png',
    tags: ['']
  },
]

// Helpers for star rendering (support half-stars)
function fillPercent(rating, starIndex) {
  const value = Math.max(0, Math.min(5, Number(rating) || 0))
  const diff = value - (starIndex - 1)
  if (diff >= 1) return 100
  if (diff <= 0) return 0
  return Math.round(diff * 100)
}

const starPxRef = ref('12px')
const starPx = computed(() => starPxRef.value)
function updateStarPx() {
  starPxRef.value = window.innerWidth >= 768 ? '16px' : '12px'
}

// Responsif: jumlah kartu per tampilan
const itemsPerView = ref(1)
function updateItemsPerView() {
  const w = window.innerWidth
  if (w >= 1280) itemsPerView.value = 3
  else if (w >= 768) itemsPerView.value = 2
  else itemsPerView.value = 1
  // setelah berubah, pusatkan ulang offset agar tetap di band tengah
  recenter()
}

// Loop tak terputus: render 3x deret agar reset tak terlihat
const loopedTestimonials = computed(() => [...testimonials, ...testimonials, ...testimonials])

// Panjang satu deret (dalam % lebar viewport). Satu halaman = 100%.
const singleSequenceLen = computed(() => (testimonials.length * (100 / itemsPerView.value)))

// Offset kontinu (dalam % viewport). Kita mulai di band tengah = singleSequenceLen
const offsetPercent = ref(0)

// Kontrol transisi: saat reset lintas-batas, matikan transisi 1 tick agar tak terlihat
const useTransition = ref(true)
function withoutTransitionOnce(fn) {
  useTransition.value = false
  fn()
  // aktifkan kembali pada frame berikutnya
  requestAnimationFrame(() => { useTransition.value = true })
}

function recenter() {
  const L = singleSequenceLen.value
  if (L <= 0) return
  // tempatkan offset di band tengah: [L, 2L)
  const total = 3 * L
  let x = offsetPercent.value
  if (!isFinite(x)) x = L
  // normalisasi ke [0, 3L)
  x = ((x % total) + total) % total
  if (x < L || x >= 2 * L) {
    withoutTransitionOnce(() => {
      offsetPercent.value = (x % L) + L
    })
  }
}

// Drag state for manual swipe
const viewportEl = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const deltaX = ref(0)

const dragOffsetPercent = computed(() => {
  if (!isDragging.value) return 0
  const w = viewportEl.value?.clientWidth || 1
  return (deltaX.value / w) * 100
})

// Continuous auto progress (dalam % viewport per detik)
const pausedHover = ref(false)
const autoSpeedPercent = ref(6)
function updateAutoSpeed() {
  const w = window.innerWidth
  autoSpeedPercent.value = w >= 1280 ? 4.5 : w >= 768 ? 5.5 : 6.5
}

const dragTransform = computed(() => `translateX(calc(-${offsetPercent.value}% + ${dragOffsetPercent.value}%))`)

// Smooth auto sliding via rAF
let timer
const mobileAutoplay = ref(true) // autoplay aktif untuk semua ukuran
function updateAutoplay() { mobileAutoplay.value = true }
function startTimer() {}
function stopTimer() { if (timer) clearInterval(timer) }
function goToPageDelta(delta) {
  offsetPercent.value += delta * 100
  recenter()
}
function onHover(state) { pausedHover.value = state }

let rafId = 0
let lastTs = 0
function loop(ts) {
  if (!lastTs) lastTs = ts
  const dt = (ts - lastTs) / 1000
  lastTs = ts
  const canRun = !isDragging.value && !pausedHover.value
  if (canRun) {
    offsetPercent.value += autoSpeedPercent.value * dt
    // jika melewati band atas (>= 2L), geser instan mundur L
    const L = singleSequenceLen.value
    if (L > 0 && offsetPercent.value >= 2 * L) {
      withoutTransitionOnce(() => {
        offsetPercent.value -= L
      })
    }
  }
  rafId = requestAnimationFrame(loop)
}
function prevSlide() { goToPageDelta(-1) }
function nextSlide() { goToPageDelta(1) }

function onPointerDown(e) {
  isDragging.value = true
  useTransition.value = false
  startX.value = 'touches' in e ? e.touches[0].clientX : e.clientX
  deltaX.value = 0
  stopTimer()
  window.addEventListener('mousemove', onPointerMove)
  window.addEventListener('mouseup', onPointerUp)
  window.addEventListener('touchmove', onPointerMove, { passive: false })
  window.addEventListener('touchend', onPointerUp)
}

function onPointerMove(e) {
  if (!isDragging.value) return
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  deltaX.value = clientX - startX.value
  if ('preventDefault' in e) {
    try { e.preventDefault() } catch {}
  }
}

function onPointerUp() {
  if (!isDragging.value) return
  const w = viewportEl.value?.clientWidth || 1
  const threshold = w * 0.15
  if (Math.abs(deltaX.value) > threshold) {
    // geser satu halaman
    if (deltaX.value > 0) offsetPercent.value -= 100
    else offsetPercent.value += 100
  }
  deltaX.value = 0
  isDragging.value = false
  // aktifkan kembali transisi setelah drag selesai
  requestAnimationFrame(() => { useTransition.value = true })
  recenter()
  // rAF loop continues automatically
  window.removeEventListener('mousemove', onPointerMove)
  window.removeEventListener('mouseup', onPointerUp)
  window.removeEventListener('touchmove', onPointerMove)
  window.removeEventListener('touchend', onPointerUp)
}

onMounted(() => {
  updateItemsPerView()
  window.addEventListener('resize', updateItemsPerView)
  window.addEventListener('resize', updateAutoplay)
  updateAutoplay()
  updateStarPx()
  window.addEventListener('resize', updateStarPx)
  updateAutoSpeed()
  window.addEventListener('resize', updateAutoSpeed)
  // mulai di band tengah
  nextTick(() => {
    offsetPercent.value = singleSequenceLen.value
  })
  rafId = requestAnimationFrame(loop)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerView)
  window.removeEventListener('resize', updateAutoplay)
  window.removeEventListener('resize', updateStarPx)
  window.removeEventListener('resize', updateAutoSpeed)
  stopTimer()
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* Runner indicator styles */
.runner-track {
  position: relative;
  width: min(220px, 60vw);
  height: 8px;
  border-radius: 9999px;
  background: linear-gradient(90deg, rgba(148,163,184,0.25), rgba(148,163,184,0.35)); /* slate-400 */
  overflow: hidden;
}
.runner-dot {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0.2) 100%);
  box-shadow: 0 0 12px rgba(255,255,255,0.5);
  animation: runner 7.5s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .runner-dot { animation-duration: 0s; }
}
@keyframes runner {
  0% { left: 0%; }
  50% { left: calc(100% - 14px); }
  100% { left: 0%; }
}
</style>

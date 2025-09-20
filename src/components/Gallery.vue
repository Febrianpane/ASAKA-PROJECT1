<template>
  <div id="gallery" class="container max-w-6xl mx-auto scroll-mt-24">
    <h2 class="section-title text-center">Galeri Produk & Proyek</h2>

    <div class="relative">
      <!-- Track -->
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
          class="flex will-change-transform"
          :style="{ transform: dragTransform, transition: trackTransition }"
        >
          <div
            v-for="(item, i) in loopedItems"
            :key="i"
            class="min-w-0 shrink-0 px-2 sm:px-3"
            :style="{ width: `${100 / itemsPerView}%` }"
          >
            <div class="card h-full overflow-hidden">
              <div class="aspect-[4/3] bg-slate-800/50 relative">
                <video
                  v-if="isVideo(item.src)"
                  :src="item.src"
                  class="absolute inset-0 w-full h-full object-cover"
                  playsinline
                  muted
                  loop
                  autoplay
                />
                <img
                  v-else
                  :src="item.src"
                  :alt="'Gambar galeri'"
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div class="mt-4 flex items-center justify-center gap-2">
        <button
          v-for="n in pageCount"
          :key="n"
          class="h-2.5 w-2.5 rounded-full"
          :class="n - 1 === currentPage ? 'bg-slate-900 dark:bg-white' : 'bg-slate-400/40'"
          aria-label="slide-dot"
          @click="goTo(n - 1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
// Helper: detect if source is a video file
function isVideo(src) {
  return /\.(mp4|webm|ogg)$/i.test(src || '')
}

const items = ref([
  { src: '/1.jpeg' },
  { src: '/2.jpeg' },
  { src: '/3.jpeg' },
  { src: '/4.jpeg' },
  { src: '/5.jpg' },
  { src: '/6.jpeg' },
  { src: '/7.png' },
  { src: '/8.jpeg' },
  { src: '/9.jpeg' },
  { src: '/10.jpg' },
  { src: '/11.jpg' },
  { src: '/12.jpg' },
  { src: '/13.jpg' },
  { src: '/14.jpg' },
  { src: '/15.jpg' },
  { src: '/16.mp4' },
  { src: '/17.jpg' },
  { src: '/18.jpg' },
  { src: '/19.jpg' },
  { src: '/20.mp4' },
  { src: '/21.jpeg' },
  { src: '/22.mp4' },
  { src: '/23.png' },
  { src: '/24.jpg' },
  { src: '/25.jpeg' },
  { src: '/26.jpeg' },
  { src: '/27.jpeg' },
  { src: '/28.jpeg' },
  { src: '/29.jpg' },
])

// Responsif: jumlah kartu per tampilan
const itemsPerView = ref(1)
function updateItemsPerView() {
  const w = window.innerWidth
  if (w >= 1280) itemsPerView.value = 4
  else if (w >= 1024) itemsPerView.value = 3
  else if (w >= 640) itemsPerView.value = 2
  else itemsPerView.value = 1
  recenter()
}

// Infinite loop via triple rendering
const loopedItems = computed(() => [...items.value, ...items.value, ...items.value])
const pageCount = computed(() => Math.max(1, Math.ceil(items.value.length / itemsPerView.value)))
const singleSequenceLen = computed(() => (items.value.length * (100 / itemsPerView.value)))

// Continuous offset in % viewport
const offsetPercent = ref(0)

// Transition control for dot clicks / swipe settle
const useTransition = ref(false)
const trackTransition = computed(() => useTransition.value ? 'transform 600ms cubic-bezier(0.22,1,0.36,1)' : 'none')

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

const dragTransform = computed(() => `translateX(calc(-${offsetPercent.value}% + ${dragOffsetPercent.value}%))`)
// Autoplay via rAF
const pausedHover = ref(false)
function onHover(state) { pausedHover.value = state }
let rafId = 0
let lastTs = 0
const autoSpeedPercent = ref(9) // faster than testimonials untuk galeri
function loop(ts) {
  if (!lastTs) lastTs = ts
  const dt = (ts - lastTs) / 1000
  lastTs = ts
  if (!isDragging.value && !pausedHover.value) {
    offsetPercent.value += autoSpeedPercent.value * dt
    const L = singleSequenceLen.value
    if (L > 0 && offsetPercent.value >= 2 * L) {
      // recenter silently backward by one sequence
      useTransition.value = false
      offsetPercent.value -= L
    }
  }
  rafId = requestAnimationFrame(loop)
}

function recenter() {
  const L = singleSequenceLen.value
  if (L <= 0) return
  let x = ((offsetPercent.value % (3 * L)) + (3 * L)) % (3 * L)
  if (x < L || x >= 2 * L) {
    useTransition.value = false
    offsetPercent.value = (x % L) + L
  }
}

function goTo(i) {
  const L = singleSequenceLen.value
  if (L <= 0) return
  const target = (L) + (i * 100)
  useTransition.value = true
  offsetPercent.value = target
  setTimeout(() => { useTransition.value = false; recenter() }, 700)
}

function onPointerDown(e) {
  isDragging.value = true
  startX.value = 'touches' in e ? e.touches[0].clientX : e.clientX
  deltaX.value = 0
  useTransition.value = false
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
    // move one page width (100%)
    if (deltaX.value > 0) offsetPercent.value -= 100
    else offsetPercent.value += 100
  }
  deltaX.value = 0
  isDragging.value = false
  // settle to next/prev page amount (100%)
  const L = singleSequenceLen.value
  if (L > 0) {
    useTransition.value = true
    setTimeout(() => { useTransition.value = false; recenter() }, 500)
  }
  window.removeEventListener('mousemove', onPointerMove)
  window.removeEventListener('mouseup', onPointerUp)
  window.removeEventListener('touchmove', onPointerMove)
  window.removeEventListener('touchend', onPointerUp)
}

onMounted(() => {
  updateItemsPerView()
  window.addEventListener('resize', updateItemsPerView)
  nextTick(() => { offsetPercent.value = singleSequenceLen.value })
  rafId = requestAnimationFrame(loop)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerView)
  if (rafId) cancelAnimationFrame(rafId)
})

// Current page indicator derived from offsetPercent
const currentPage = computed(() => {
  const L = singleSequenceLen.value
  if (L <= 0) return 0
  const within = ((offsetPercent.value - L) % L + L) % L // [0, L)
  return Math.round(within / 100) % pageCount.value
})
</script>

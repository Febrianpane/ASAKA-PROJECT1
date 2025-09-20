<template>
  <div id="products" class="container max-w-6xl mx-auto scroll-mt-24">
    <h2 class="section-title">Produk</h2>
    <p class="section-subtitle mb-8">Katalog produk unggulan kami untuk pendidikan, kesehatan, dan kebutuhan institusi.</p>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, idx) in items"
        :key="idx"
        role="button"
        tabindex="0"
        @click="openModal(idx)"
        @keydown.enter.prevent="openModal(idx)"
        @keydown.space.prevent="openModal(idx)"
        class="group card overflow-hidden cursor-pointer"
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 400, delay: idx * 50 } }"
      >
        <div class="aspect-[4/3] overflow-hidden relative">
          <transition name="fade" mode="out-in">
            <template v-if="currentMedia(idx)?.type === 'video'">
              <!-- Jika YouTube, tampilkan thumbnail agar ringan. Klik kartu akan buka modal untuk memutar. -->
              <template v-if="isYouTube(currentMedia(idx)?.src)">
                <div class="absolute inset-0">
                  <img
                    :key="currentMedia(idx)?.src + '-ytthumb'"
                    :src="ytThumb(currentMedia(idx)?.src)"
                    :alt="item.title"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-cover"
                  />
                  <div class="absolute inset-0 grid place-items-center">
                    <span class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 text-slate-900 shadow">▶</span>
                  </div>
                </div>
              </template>
              <!-- Jika file link langsung (mp4/webm), putar langsung di kartu -->
              <template v-else>
                <video
                  :key="currentMedia(idx)?.src"
                  :src="currentMedia(idx)?.src"
                  class="absolute inset-0 w-full h-full object-cover"
                  autoplay
                  muted
                  playsinline
                  preload="metadata"
                  @ended="onVideoEnded(idx)"
                ></video>
              </template>
            </template>
            <template v-else>
              <img
                :key="currentMedia(idx)?.src"
                :src="currentMedia(idx)?.src"
                :alt="item.title"
                loading="lazy"
                decoding="async"
                class="absolute inset-0 w-full h-full object-cover sm:group-hover:scale-105 transition duration-300"
              />
            </template>
          </transition>
        </div>
        <div class="p-4">
          <h3 class="font-semibold">{{ item.title }}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 mt-1">{{ item.desc }}</p>
          <div class="mt-3">
            <a
              v-if="item.slug"
              href="javascript:void(0)"
              @click.prevent.stop="openModal(idx)"
              @keydown.enter.prevent.stop="openModal(idx)"
              @keydown.space.prevent.stop="openModal(idx)"
              class="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300 hover:underline"
              aria-label="Lihat detail kategori"
              role="button"
              tabindex="0"
            >
              Lihat Detail
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA WhatsApp di bawah produk -->
    <div class="mt-8 md:mt-10 flex justify-center px-4">
      <a
        href="https://wa.me/6287782527700?text=Halo%20ASAKA%20PRIMA%2C%20saya%20ingin%20menerima%20katalog%20produk."
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-slate-900 bg-gradient-to-r from-sky-300 to-cyan-400 shadow-lg shadow-cyan-500/20 transform transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:from-emerald-400 hover:to-green-500 hover:text-white active:scale-95 active:from-emerald-500 active:to-green-600 active:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 touch-manipulation"
        style="will-change: transform"
        aria-label="Minta Katalog via WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.44 0 .02 5.42.02 12.08c0 2.13.56 4.21 1.62 6.04L0 24l6.07-1.6a11.99 11.99 0 0 0 5.98 1.6h.01c6.64 0 12.06-5.42 12.06-12.08 0-3.22-1.26-6.25-3.6-8.44zM12.06 22.02h-.01a9.96 9.96 0 0 1-5.08-1.4l-.36-.21-3.6.95.96-3.51-.23-.36a9.95 9.95 0 0 1-1.53-5.39C2.21 6.54 6.64 2.1 12.06 2.1c2.66 0 5.17 1.04 7.06 2.93a9.86 9.86 0 0 1 2.93 7.05c0 5.44-4.43 9.94-9.99 9.94zm5.73-7.46c-.31-.16-1.85-.92-2.13-1.03-.28-.1-.48-.16-.68.16-.2.31-.78 1.03-.95 1.25-.17.2-.35.23-.66.08-.31-.16-1.3-.48-2.48-1.54-.92-.8-1.54-1.8-1.72-2.1-.18-.31-.02-.47.13-.62.13-.13.31-.35.47-.52.16-.18.2-.31.31-.52.1-.2.05-.39-.02-.55-.07-.16-.68-1.64-.93-2.25-.24-.58-.49-.5-.68-.5h-.58c-.2 0-.52.08-.8.39-.28.31-1.05 1.03-1.05 2.51 0 1.48 1.07 2.92 1.22 3.12.16.2 2.11 3.22 5.1 4.52.71.31 1.26.5 1.69.65.71.23 1.35.2 1.86.12.57-.08 1.85-.76 2.11-1.49.26-.71.26-1.31.18-1.49-.08-.16-.28-.26-.58-.39z"/>
        </svg>
        <span>Minta Katalog via WhatsApp</span>
      </a>
    </div>

    <!-- Modal Lightbox -->
    <div v-if="modalOpen" class="fixed inset-0 z-50 bg-black/70 p-4 flex items-center justify-center">
      <div class="relative w-full max-w-3xl">
        <button @click="closeModal" class="absolute -top-3 -right-3 z-10 rounded-full bg-white text-slate-900 w-8 h-8 shadow flex items-center justify-center">×</button>
        <div class="relative rounded-xl overflow-hidden bg-black">
          <template v-if="modalMedia?.type === 'video'">
            <!-- YouTube: gunakan IFrame API agar bisa auto-next saat selesai -->
            <template v-if="isYouTube(modalMedia.src)">
              <div :id="ytPlayerId" class="w-full aspect-video"></div>
            </template>
            <template v-else>
              <video :src="modalMedia.src" class="w-full h-auto max-h-[80vh] object-contain" controls autoplay muted playsinline @ended="nextImage"></video>
            </template>
          </template>
          <template v-else>
            <img :src="modalMedia?.src" :alt="items[modalItem].title" class="w-full h-auto max-h-[80vh] object-contain" />
          </template>
          <button @click="prevImage" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-9 h-9 flex items-center justify-center">‹</button>
          <button @click="nextImage" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-9 h-9 flex items-center justify-center">›</button>
        </div>
        <div class="mt-3 flex items-center justify-center gap-2">
          <span
            v-for="(m, i) in mediaList(modalItem)"
            :key="i"
            class="h-2.5 w-2.5 rounded-full"
            :class="i === modalIndex ? 'bg-white' : 'bg-white/40'"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'

// Data produk dengan slug kategori untuk navigasi SEO
const items = [
  { slug: 'ape', title: 'Mainan Edukasi PAUD & PAKET', desc: 'Paket mainan edukasi interaktif.', images: ['/P1.png', '/P2.png', '/P3.png', '/P4.png', '/ape1.png', '/ape2.png', '/ape3.png'] ,videos: ['https://youtu.be/bfb4qH41kX0?si=P5s5VDxSVK1jeGs_'] },
  { slug: 'bkb-kit', title: 'BKB KIT STUNTING', desc: 'Perlengkapan untuk pencegahan stunting.', images: ['/BKB.png','/1a.png','/2a.png','/3a.jpeg'] },
  { slug: 'alkes-lab', title: 'ALKES & ALAT LABORATORIUM', desc: 'Berbagai Alat kesehatan & alat laboratorium.', images: ['/KIT.png','/KIT1.png','/KIT2.png' ], videos: ['https://youtu.be/Z_d6yv1uxxU', 'https://youtu.be/Q7bRqa8ALWE'] },
  { slug: 'bordir-sablon', title: 'BORDIR & SABLON KOMPUTER', desc: 'Bordir & sablon untuk Semua Pakaian.', videos: ['https://youtu.be/vCjJ7MNXdxU?si=eUe1BFOpUIMAvJ6d','https://youtu.be/pDaiEfjdmNs?si=RMPplhMB2nCxyQ6L', 'https://youtu.be/FDKITT7z6ds?si=W3W4-5nn3OXBILPR'] },
  { slug: 'buku', title: 'BUKU PAKET TK,SD,SMP,SMA & BUKU INDUK GURU', desc: 'Paket buku sekolah dan buku induk guru lengkap.', images: ['/SD.png', '/SD1.png', '/SMP.png', '/SMA.png', '/PAKETAISLAM.png', '/PAKETBISLAM.png', '/A.png', '/B.png', '/PAKETAUMUM.png', '/PAKETAUMUM1.png'] },
  { slug: 'trophy', title: 'PIALA TROPHY & MEDALI', desc: 'Piala dan medali untuk berbagai event.', images: ['/B3.png', '/B2.png', '/B1.png', '/B4.png', '/B5.png'] },
]

// Indeks per-item agar kontrol waktu bisa berbeda untuk video/gambar
const indices = ref(Array(items.length).fill(0))
let timer
onMounted(() => {
  // Interval hanya memajukan media yang berupa gambar
  timer = setInterval(() => {
    items.forEach((_, i) => {
      const list = mediaList(i)
      if (!list.length) return
      const media = list[indices.value[i] % list.length]
      if (media.type === 'image') {
        indices.value[i] = (indices.value[i] + 1) % list.length
      }
    })
  }, 4000)
})
onUnmounted(() => { if (timer) clearInterval(timer) })

function mediaList(i) {
  const images = (items[i].images || []).map(src => ({ type: 'image', src }))
  const videos = (items[i].videos || []).map(src => ({ type: 'video', src }))
  const media = [...images, ...videos]
  return media.length ? media : images
}
function currentMedia(i) {
  const list = mediaList(i)
  if (!list.length) return null
  return list[indices.value[i] % list.length]
}
function onVideoEnded(i) {
  const list = mediaList(i)
  if (!list.length) return
  indices.value[i] = (indices.value[i] + 1) % list.length
}

// Modal lightbox state & actions
const modalOpen = ref(false)
const modalItem = ref(0)
const modalIndex = ref(0)

function openModal(i) {
  modalItem.value = i
  // Jika ada video pada item ini, mulai dari video pertama agar autoplay bekerja langsung
  const list = mediaList(i)
  const firstVideoIdx = list.findIndex(m => m.type === 'video')
  modalIndex.value = firstVideoIdx !== -1 ? firstVideoIdx : 0
  modalOpen.value = true
}
function closeModal() { modalOpen.value = false }
function nextImage() {
  const len = mediaList(modalItem.value).length
  modalIndex.value = (modalIndex.value + 1) % len
}
function prevImage() {
  const len = mediaList(modalItem.value).length
  modalIndex.value = (modalIndex.value - 1 + len) % len
}

const modalMedia = computed(() => {
  const list = mediaList(modalItem.value)
  return list[modalIndex.value] || null
})

// ===== YouTube helpers & player management for modal playback =====
const ytPlayerId = 'yt-player'
let ytPlayer = null

function isYouTube(url) {
  if (!url) return false
  return /youtu\.be\//i.test(url) || /youtube\.com\/watch\?v=/i.test(url)
}
function ytId(url) {
  if (!url) return ''
  const short = url.match(/youtu\.be\/([\w-]+)/i)
  if (short) return short[1]
  const vParam = url.match(/[?&]v=([\w-]+)/i)
  if (vParam) return vParam[1]
  return ''
}
function ytThumb(url) {
  const id = ytId(url)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ''
}

function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve()
    const existing = document.getElementById('yt-iframe-api')
    if (!existing) {
      const s = document.createElement('script')
      s.id = 'yt-iframe-api'
      s.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(s)
    }
    const check = () => {
      if (window.YT && window.YT.Player) resolve()
      else setTimeout(check, 100)
    }
    check()
  })
}

async function ensureYtPlayer() {
  const media = modalMedia.value
  if (!media || !isYouTube(media.src)) return
  await loadYouTubeAPI()
  await nextTick()
  // Destroy previous
  if (ytPlayer && ytPlayer.destroy) {
    try { ytPlayer.destroy() } catch {}
    ytPlayer = null
  }
  const id = ytId(media.src)
  ytPlayer = new window.YT.Player(ytPlayerId, {
    videoId: id,
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
    },
    events: {
      onReady: (e) => {
        try {
          const iframe = e.target.getIframe ? e.target.getIframe() : null
          if (iframe && iframe.setAttribute) {
            iframe.setAttribute('allow', 'autoplay; fullscreen; encrypted-media')
          }
          e.target.mute()
          e.target.playVideo()
        } catch {}
      },
      onStateChange: (e) => {
        // 0 = ended
        if (e.data === window.YT.PlayerState.ENDED) {
          nextImage()
        }
      },
    },
  })
}

watch(() => modalOpen.value, async (open) => {
  if (open) {
    await ensureYtPlayer()
  } else {
    // Cleanup when modal closed
    if (ytPlayer && ytPlayer.destroy) {
      try { ytPlayer.destroy() } catch {}
      ytPlayer = null
    }
  }
})

watch(() => modalMedia.value && modalMedia.value.src, async () => {
  // When switching media inside modal, re-initialize YT player if needed
  await ensureYtPlayer()
})

// Tidak lagi menavigasi; link 'Lihat Detail' membuka modal agar tetap stay di tempat
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 400ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

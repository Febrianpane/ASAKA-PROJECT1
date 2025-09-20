<template>
  <div>
    <Navbar
      :sections="sections"
      :active-section="activeSection"
      :dark="isDark"
      @toggle-dark="toggleDark"
      @navigate="onNavigate"
    />

    <!-- Category page router view -->
    <main v-if="isCategoryPage">
      <section class="section scroll-mt-24">
        <ProductCategory :slug="categorySlug" @back="goHome" />
      </section>
    </main>

    <!-- Homepage sections -->
    <main v-else>
      <section id="home" class="scroll-mt-24">
        <Hero @cta="() => scrollTo('contact')" />
      </section>

      <section id="about" class="section scroll-mt-24">
        <About />
      </section>

      <section id="services" class="section scroll-mt-24">
        <Services />
      </section>

      <section id="products" class="section scroll-mt-24">
        <Product />
      </section>

      <section id="gallery" class="section scroll-mt-24">
        <Gallery />
      </section>

      <section id="testimonials" class="section">
        <Testimonials />
      </section>

      <section id="trust" class="section scroll-mt-24">
        <TrustSection />
      </section>

      <section id="contact" class="section">
        <Contact />
      </section>

      <!-- Kebijakan & Syarat Ketentuan berdampingan -->
      <section id="policies" class="section scroll-mt-24">
        <div class="container max-w-6xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Privacy embedded />
            <Terms embedded />
          </div>
        </div>
      </section>
    </main>

    <!-- Tombol WhatsApp Mengambang -->
    <a
      :href="waMeUrl"
      @click.prevent="handleWhatsAppClick"
      target="_blank"
      rel="noopener nofollow noreferrer"
      class="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center justify-center"
      aria-label="Hubungi via WhatsApp"
    >
      <!-- Ikon WhatsApp SVG -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7">
        <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.44 0 .02 5.42.02 12.08c0 2.13.56 4.21 1.62 6.04L0 24l6.07-1.6a11.99 11.99 0 0 0 5.98 1.6h.01c6.64 0 12.06-5.42 12.06-12.08 0-3.22-1.26-6.25-3.6-8.44zM12.06 22.02h-.01a9.96 9.96 0 0 1-5.08-1.4l-.36-.21-3.6.95.96-3.51-.23-.36a9.95 9.95 0 0 1-1.53-5.39C2.21 6.54 6.64 2.1 12.06 2.1c2.66 0 5.17 1.04 7.06 2.93a9.86 9.86 0 0 1 2.93 7.05c0 5.44-4.43 9.94-9.99 9.94zm5.73-7.46c-.31-.16-1.85-.92-2.13-1.03-.28-.1-.48-.16-.68.16-.2.31-.78 1.03-.95 1.25-.17.2-.35.23-.66.08-.31-.16-1.3-.48-2.48-1.54-.92-.8-1.54-1.8-1.72-2.1-.18-.31-.02-.47.13-.62.13-.13.31-.35.47-.52.16-.18.2-.31.31-.52.1-.2.05-.39-.02-.55-.07-.16-.68-1.64-.93-2.25-.24-.58-.49-.5-.68-.5h-.58c-.2 0-.52.08-.8.39-.28.31-1.05 1.03-1.05 2.51 0 1.48 1.07 2.92 1.22 3.12.16.2 2.11 3.22 5.1 4.52.71.31 1.26.5 1.69.65.71.23 1.35.2 1.86.12.57-.08 1.85-.76 2.11-1.49.26-.71.26-1.31.18-1.49-.08-.16-.28-.26-.58-.39z"/>
      </svg>
      <span class="sr-only">WhatsApp</span>
    </a>

    <Footer />
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect, computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Services from './components/Services.vue'
import Product from './components/Product.vue'
import Gallery from './components/Gallery.vue'
import Testimonials from './components/Testimonials.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import Privacy from './components/Privacy.vue'
import Terms from './components/Terms.vue'
import TrustSection from './components/TrustSection.vue'
import { useScrollSpy } from './composables/useScrollSpy'
import { useTheme } from './composables/useTheme'
import { useMiniRouter } from './composables/useMiniRouter'
import ProductCategory from './pages/ProductCategory.vue'

// WhatsApp helpers for floating button (robust fallbacks)
const waNumber = '6287782527700'
const waText = encodeURIComponent('Halo ASAKA PRIMA, saya ingin bertanya')
const waMePlain = computed(() => `https://wa.me/${waNumber}`)
const waMeUrl = computed(() => `https://wa.me/${waNumber}?text=${waText}`)
const waWebUrl = computed(() => `https://web.whatsapp.com/send?phone=${waNumber}&text=${waText}`)
const waDeepLink = computed(() => `whatsapp://send?phone=${waNumber}&text=${waText}`)
// Android intent URI opens the app directly when available
const waAndroidIntent = computed(
  () => `intent://send/?phone=${waNumber}&text=${waText}#Intent;scheme=whatsapp;package=com.whatsapp;end`
)

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent)
const isAndroid = () => /Android/i.test(navigator.userAgent)

function handleWhatsAppClick(e) {
  const openInNew = (url) => window.open(url, '_blank', 'noopener,noreferrer')
  try {
    if (isMobile()) {
      if (isIOS()) {
        // iOS: langsung ke wa.me dengan text (paling stabil)
        window.location.href = waMeUrl.value
      } else if (isAndroid()) {
        // Android: coba intent URI (paling andal buka aplikasi), lalu fallback
        window.location.href = waAndroidIntent.value
        setTimeout(() => { window.location.href = waMeUrl.value }, 700)
        setTimeout(() => { window.location.href = waWebUrl.value }, 1400)
      } else {
        // Mobile lain: wa.me dengan text
        window.location.href = waMeUrl.value
      }
    } else {
      // Desktop (app tidak terpasang): buka WhatsApp Web langsung di tab ini
      window.location.href = waWebUrl.value
    }
  } catch {
    // Hard fallback
    window.location.href = waWebUrl.value
  }
}

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Tentang' },
  { id: 'services', label: 'Layanan' },
  { id: 'products', label: 'Produk' },
  { id: 'gallery', label: 'Galeri' },
  { id: 'testimonials', label: 'Testimoni' },
  { id: 'trust', label: 'Kepercayaan' },
  { id: 'contact', label: 'Kontak' },
]

const { activeId, observeSections } = useScrollSpy({ rootMargin: '-40% 0px -50% 0px' })
const activeSection = ref('home')

onMounted(() => {
  observeSections(sections.map(s => s.id))
  injectJsonLd()
})

activeSection.value = activeId.value

watchEffect(() => {
  activeSection.value = activeId.value || 'home'
})

const { isDark, toggleDark } = useTheme()

// Mini Router for category pages
const { path, navigate } = useMiniRouter()
const isCategoryPage = computed(() => path.value.startsWith('/produk/'))
const categorySlug = computed(() => path.value.replace('/produk/', '').replace(/\/+$/, ''))

function onNavigate(id) {
  // If navigating home sections while on category page, go home first
  if (isCategoryPage.value) {
    navigate('/')
    requestAnimationFrame(() => scrollTo(id))
    return
  }
  scrollTo(id)
}

function goHome() { navigate('/') }

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// SEO: Inject JSON-LD structured data
function injectJsonLd() {
  // helper to add <script type="application/ld+json"> once
  const addJsonLd = (id, obj) => {
    const existed = document.getElementById(id)
    if (existed) existed.remove()
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.id = id
    s.text = JSON.stringify(obj)
    document.head.appendChild(s)
  }

  // LocalBusiness / Organization
  addJsonLd('ld-localbusiness', {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ASAKA PRIMA',
    url: window.location.origin,
    logo: window.location.origin + '/icon1.png',
    image: [window.location.origin + '/icon1.png'],
    telephone: '+62-877-8252-7700',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Alamat Jalan Anda',
      addressLocality: 'Kota Anda',
      postalCode: '00000',
      addressCountry: 'ID'
    },
    openingHours: 'Mo-Sa 08:00-17:00',
    sameAs: []
  })

  // AggregateRating + Review snippet (summary)
  addJsonLd('ld-aggregate-rating', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ASAKA PRIMA',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '500'
    }
  })

  // FAQPage for policy items
  addJsonLd('ld-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Bagaimana garansi jika ada cacat produksi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cacat produksi seperti jahitan lepas atau sablon retak akan diganti atau diperbaiki tanpa biaya.'
        }
      },
      {
        '@type': 'Question',
        name: 'Bagaimana jika spesifikasi tidak sesuai PO/brief?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Kami revisi agar sesuai dengan PO/brief yang disepakati.'
        }
      },
      {
        '@type': 'Question',
        name: 'Batas waktu pengajuan klaim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Klaim maksimal 3x24 jam setelah barang diterima dengan bukti foto/video.'
        }
      },
      {
        '@type': 'Question',
        name: 'Apakah ada prioritas untuk order urgent/event?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ya, kami memberikan prioritas perbaikan/penanganan untuk order event/urgent.'
        }
      }
    ]
  })
}
</script>

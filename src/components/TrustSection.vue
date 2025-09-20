<template>
  <section id="trust" class="container max-w-6xl mx-auto py-10 md:py-14">
    <header class="mb-6 md:mb-8 text-center">
      <h2 class="section-title">Kepercayaan & Jaminan</h2>
      <p class="section-subtitle mt-1 text-slate-600 dark:text-slate-300">Kami transparan soal kualitas, pembayaran, dan pengiriman</p>
    </header>
    <!-- Badges: sosial bukti -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
      <div class="rounded-xl border border-amber-100/60 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 p-4 md:p-6 text-center shadow">
        <p class="text-3xl md:text-4xl font-extrabold text-amber-600">500+</p>
        <p class="text-[12px] md:text-sm text-slate-600 dark:text-slate-300 mt-1">Pesanan Sekolah/Instansi</p>
      </div>
      <div class="rounded-xl border border-amber-100/60 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 p-4 md:p-6 text-center shadow">
        <p class="text-3xl md:text-4xl font-extrabold text-amber-600">4.8/5</p>
        <p class="text-[12px] md:text-sm text-slate-600 dark:text-slate-300 mt-1">Rating Pelanggan</p>
      </div>
      <div class="col-span-2 sm:col-span-3 lg:col-span-1 rounded-xl border border-amber-100/60 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 p-4 md:p-6 text-center shadow">
        <p class="text-3xl md:text-4xl font-extrabold text-amber-600">100%</p>
        <p class="text-[12px] md:text-sm text-slate-600 dark:text-slate-300 mt-1">Garansi Kualitas</p>
      </div>
    </div>

    <!-- Kebijakan garansi & revisi -->
    <div class="mt-8 md:mt-12 grid md:grid-cols-2 gap-6 md:gap-8">
      <div class="rounded-xl border border-amber-100/60 dark:border-slate-700 bg-gradient-to-b from-amber-50/60 to-amber-50/30 dark:from-slate-900/80 dark:to-slate-900/60 p-5 md:p-6">
        <h3 class="text-base md:text-lg font-semibold text-slate-900 dark:text-white">Kebijakan Garansi & Revisi</h3>
        <ul class="mt-3 space-y-2">
          <li class="flex items-start gap-3">
            <span class="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/90 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="h-3.5 w-3.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <p class="text-sm md:text-[15px] text-slate-700 dark:text-slate-300">Cacat produksi (jahitan lepas, sablon retak/tidak rata) diganti atau diperbaiki!.</p>
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/90 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="h-3.5 w-3.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <p class="text-sm md:text-[15px] text-slate-700 dark:text-slate-300">Salah spesifikasi (warna, ukuran, bahan) kami revisi sesuai PO/brief.</p>
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/90 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="h-3.5 w-3.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <p class="text-sm md:text-[15px] text-slate-700 dark:text-slate-300">Klaim maksimal 3x24 jam setelah barang diterima (sertakan foto/video).</p>
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/90 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="h-3.5 w-3.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <p class="text-sm md:text-[15px] text-slate-700 dark:text-slate-300">Prioritas perbaikan untuk order event/urgent.</p>
          </li>
        </ul>
        <div class="mt-4 text-[12px] md:text-[13px] text-slate-500 dark:text-slate-400">S&K berlaku. Kami akan memberikan solusi terbaik dan transparan.</div>
      </div>

      <!-- Metode pembayaran & pengiriman -->
      <div class="rounded-xl border border-amber-100/60 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 p-5 md:p-6">
        <h3 class="text-base md:text-lg font-semibold text-slate-900 dark:text-white">Metode Pembayaran & Pengiriman</h3>
        <div class="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 items-center">
          <div
            v-for="(item, idx) in paymentLogos"
            :key="idx"
            class="flex items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-amber-100/50 dark:border-slate-700 h-12 sm:h-14 p-2 shadow"
          >
            <img
              v-if="item.img"
              :src="item.img"
              :alt="item.label"
              class="max-h-8 sm:max-h-10 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
            <span v-else :class="['text-[9px] sm:text-[10px] font-semibold', item.bg ? 'text-white px-2 py-1 rounded' : 'text-slate-700 dark:text-slate-700']">
              {{ item.label }}
            </span>
          </div>
        </div>
        <div class="mt-1 text-[12px] md:text-[13px] text-slate-600 dark:text-slate-300">
          Dukungan pembayaran transfer bank, e-wallet, invoice resmi, dan <span class="font-medium">COD</span> tertentu (silakan konfirmasi area).
        </div>
      </div>
    </div>

    <!-- CTA Row -->
    <div class="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4">
      <a href="#contact" class="inline-flex items-center justify-center px-4 py-2.5 md:px-5 md:py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow" aria-label="Minta Penawaran">
        Minta Penawaran
      </a>
      <a href="#policies" class="inline-flex items-center justify-center px-4 py-2.5 md:px-5 md:py-3 rounded-lg bg-white dark:bg-slate-800 border border-amber-200/60 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold shadow" aria-label="Lihat Kebijakan Lengkap">
        Lihat Kebijakan Lengkap
      </a>
    </div>
  </section>
</template>

<script setup>
const paymentLogos = [
  // Bank (dummy URLs - ganti dengan logo resmi jika ada)
  { label: 'BCA', img: 'https://kilasjatim.com/wp-content/uploads/2024/01/BCA.png' },
  { label: 'Mandiri', img: 'https://cdn0-production-images-kly.akamaized.net/ClOSWKZI_eb6xIDHlG8tIQqaf2Y=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4255282/original/094712800_1670569941-mandiri.jpg' },
  { label: 'BRI', img: 'https://fahum.umsu.ac.id/blog/wp-content/uploads/2024/11/cara-dan-syarat-melamar-pekerjaan-di-bank-bri.jpg' },
  { label: 'BNI', img: 'https://www.julo.co.id/sites/default/files/2025-04/Desain%20tanpa%20judul%20%2811%29.png' },
  // E-Wallet
  { label: 'OVO', img: 'https://pakuwon.com/files/img/upload/events/PKW-Events-TP-OVO.jpg' },
  { label: 'GoPay', img: 'https://cdn.prod.website-files.com/62b477ccbf74cf1bbe23236d/64ad767d9067ac30b4d0d1b7_Virtual%20Account%20GoPay%201.jpeg' },
  { label: 'Dana', img: 'https://static.tildacdn.com/tild3466-3034-4261-b964-666531366236/jual-saldo-dana.png' },
  { label: 'ShopeePay', img: 'https://bnp.jambiprov.go.id/wp-content/uploads/2023/10/Cara-Top-Up-ShopeePay-melalui-DANA.png' },
  // Ekspedisi
  { label: 'JNE', img: 'https://www.julo.co.id/sites/default/files/2024-10/JNE%20Logo.webp' },
  { label: 'J&T', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Logo_J%26T_Merah_Square.jpg/500px-Logo_J%26T_Merah_Square.jpg' },
  { label: 'SiCepat', img: 'https://jaringkerja.com/wp-content/uploads/2024/01/Logo-sicepat.png' },
  { label: 'POS', img: 'https://i.pinimg.com/736x/52/03/84/52038412b56099d11cf02762b4830c85.jpg' },
]
</script>

<style scoped>
.container { padding-left: 1rem; padding-right: 1rem; }
@media (min-width: 640px) { .container { padding-left: 1rem; padding-right: 1rem; } }
</style>

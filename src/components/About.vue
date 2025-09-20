<template>
  <div id="about" class="container max-w-6xl mx-auto scroll-mt-24">
    <h2 class="section-title">Tentang Kami</h2>
    <div class="grid md:grid-cols-2 gap-8 items-start">
      <p class="section-subtitle">
        Kami adalah mitra pengadaan tepercaya dengan fokus pada peningkatan kualitas pembelajaran dan layanan kesehatan.
        Portofolio kami meliputi penyediaan mainan edukatif untuk TK/PAUD, BKB KIT Stunting, buku paket sekolah & buku induk,
        alat kesehatan dan laboratorium, serta layanan bordir dan sablon dengan hasil rapi dan tahan lama. Dengan mengutamakan
        kemudahan, kecepatan, dan kepuasan klien, kami siap mendukung kebutuhan sekolah, instansi pemerintah, dan lembaga swasta
        di seluruh Indonesia.
      </p>
      <div class="stats grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-700 dark:text-slate-300">
        <div class="card p-3 text-center">
          <strong class="block text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">12+</strong>
          <span class="block text-sm md:text-base">Tahun Pengalaman</span>
        </div>
        <div class="card p-3 text-center">
          <strong class="block text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">120+</strong>
          <span class="block text-sm md:text-base">Instansi Terlayani</span>
        </div>
        <div class="card p-3 text-center">
          <strong class="block text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">100+</strong>
          <span class="block text-sm md:text-base">Produk Tersedia</span>
        </div>
      </div>
    </div>

    <!-- Nilai Perusahaan -->
    <section class="mt-10 grid md:grid-cols-3 gap-4 md:gap-6">
      <article class="card p-4">
        <div class="flex items-start gap-3">
          <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M9 12l2 2 4-5 1.5 1.2-5.5 7L7.5 13z"/></svg>
          </span>
          <div>
            <h3 class="font-semibold text-lg">Integritas</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Transparan, dapat dipercaya, dan memegang komitmen pada setiap pengadaan.</p>
          </div>
        </div>
      </article>
      <article class="card p-4">
        <div class="flex items-start gap-3">
          <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
          </span>
          <div>
            <h3 class="font-semibold text-lg">Kualitas</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Produk terkurasi dan layanan purna jual yang responsif.</p>
          </div>
        </div>
      </article>
      <article class="card p-4">
        <div class="flex items-start gap-3">
          <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M3 12h6l3 9 3-18 3 9h3"/></svg>
          </span>
          <div>
            <h3 class="font-semibold text-lg">Kecepatan</h3>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Pengadaan cepat dan tepat waktu dengan proses yang sederhana.</p>
          </div>
        </div>
      </article>
    </section>

    

    <!-- Tim Inti -->
    <section class="mt-12">
      <h3 class="text-xl md:text-2xl font-bold mb-4">Tim Inti</h3>
      <div class="grid xs:grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
        <article class="card p-4 text-center">
          <div class="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white grid place-items-center text-2xl font-bold">RM</div>
          <h4 class="mt-3 font-semibold">REDIS M. S.E</h4>
          <p class="text-sm text-slate-600 dark:text-slate-300">Direktur</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

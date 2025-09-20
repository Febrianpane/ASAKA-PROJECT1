<template>
  <div :class="rootClass">
    <h2 :class="titleClass">Kebijakan Privasi</h2>
    <p :class="descClass">Ringkas dan jelas. Detail bisa dibuka bila diperlukan.</p>

    <div class="flex items-center gap-3">
      <button :class="buttonClass" @click="show = !show" :aria-expanded="show.toString()">
        {{ show ? 'Sembunyikan Detail' : 'Lihat Detail' }}
      </button>
    </div>

    <div :class="[proseClass, show ? 'max-h-[1200px] opacity-100 mt-2.5 md:mt-3' : 'max-h-0 opacity-0']">
      <p class="mb-4">Kami menjaga privasi Anda secara sederhana dan jelas.</p>
      <ul>
        <li>Kami hanya mengumpulkan data yang Anda kirim via formulir (nama, email, pesan).</li>
        <li>Analytics anonim dipakai untuk memperbaiki pengalaman penggunaan.</li>
        <li>Data dipakai untuk membalas pesan dan meningkatkan layanan.</li>
        <li>Keamanan wajar diterapkan, namun tidak ada sistem yang 100% aman.</li>
        <li>Layanan pihak ketiga (mis. EmailJS/analytics) mengikuti kebijakan masing‑masing.</li>
      </ul>
      <p class="mt-4">Minta pembaruan atau penghapusan data melalui halaman Kontak.</p>
      <p class="text-[10px] md:text-[11px] text-slate-500 mt-2">Terakhir diperbarui: {{ new Date().toLocaleDateString('id-ID') }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  embedded: { type: Boolean, default: false },
})

const show = ref(false)

const rootClass = computed(() =>
  props.embedded
    ? 'h-full p-2.5 md:p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm text-[12px] md:text-[13px]'
    : 'container max-w-6xl mx-auto'
)

const titleClass = computed(() =>
  props.embedded ? 'section-title text-sm md:text-base' : 'section-title'
)

const descClass = computed(() =>
  props.embedded ? 'text-slate-600 dark:text-slate-300 mb-1.5 md:mb-2 text-[11px] md:text-xs' : 'text-slate-600 dark:text-slate-300 mb-3'
)

const buttonClass = computed(() =>
  props.embedded ? 'btn-outline px-2 py-0.5 text-[11px] md:text-xs' : 'btn-outline'
)

const proseClass = computed(() =>
  [
    'prose prose-slate dark:prose-invert max-w-none overflow-hidden transition-all duration-300',
    props.embedded ? 'prose-sm text-[11px] md:text-xs' : '',
  ].join(' ')
)
</script>

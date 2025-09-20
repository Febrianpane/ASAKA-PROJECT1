<template>
  <div class="container max-w-6xl mx-auto">
    <h2 class="section-title">Kontak</h2>
    <p class="section-subtitle mb-8">Silakan tinggalkan pesan atau temukan lokasi kami di peta di bawah.</p>

    <div class="grid md:grid-cols-2 gap-6 lg:gap-8 items-start">
      <!-- Kolom Kiri: Form -->
      <form @submit.prevent="onSubmit" class="card p-6 space-y-4">
        <div>
          <label class="block text-sm mb-1" for="name">Nama</label>
          <input id="name" v-model="form.name" type="text" required class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 focus:outline-none focus:ring focus:ring-slate-300 dark:focus:ring-slate-700" placeholder="Nama Anda" />
        </div>
        <div>
          <label class="block text-sm mb-1" for="email">Email</label>
          <input id="email" v-model="form.email" type="email" required class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 focus:outline-none focus:ring focus:ring-slate-300 dark:focus:ring-slate-700" placeholder="email@contoh.com" />
        </div>
        <div>
          <label class="block text-sm mb-1" for="message">Pesan</label>
          <textarea id="message" v-model="form.message" rows="5" required class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-4 py-2 focus:outline-none focus:ring focus:ring-slate-300 dark:focus:ring-slate-700" placeholder="Tulis pesan Anda..."></textarea>
        </div>

        <div class="flex items-center gap-3">
          <button type="submit" class="btn-primary" :disabled="loading">
            <span v-if="!loading">Kirim Pesan</span>
            <span v-else>Mengirim...</span>
          </button>
          <p v-if="status" class="text-sm" :class="status.type === 'success' ? 'text-emerald-600' : 'text-rose-500'">{{ status.message }}</p>
        </div>
      </form>

      <!-- Kolom Kanan: Lokasi & Alamat -->
      <div class="space-y-4">
        <div class="card overflow-hidden">
          <div class="aspect-video bg-slate-900/40">
            <!-- Embed Google Maps sederhana dengan query nama perusahaan; ganti sesuai alamat spesifik -->
            <iframe
              class="w-full h-full"
              style="border:0;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=ASAKA%20PRIMA&output=embed"
              allowfullscreen
            ></iframe>
          </div>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Lokasi & Alamat</h3>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              Jl. Irigasi, RT.003/RW.008, Cipondoh, Kec. Cipondoh, Kota Tangerang, Banten 15122, Indonesia
            </p>
            <p class="text-sm text-slate-600 dark:text-slate-300 mt-1">Jam Operasional: Senin–Sabtu 08.00–17.00</p>
            <div class="mt-3 text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V21a1 1 0 01-1 1C10.3 22 2 13.7 2 3a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z"/></svg>
              <span>Telepon Kantor:</span>
              <a href="tel:+6287782527700" class="font-semibold hover:underline">0877-8252-7700</a>
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=ASAKA+PRIMA"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-outline"
              >Buka di Google Maps</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'

const form = reactive({ name: '', email: '', message: '' })
const loading = ref(false)
const status = ref(null)

async function onSubmit() {
  status.value = null
  loading.value = true
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    const toEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL || ''
    const subject = import.meta.env.VITE_EMAILJS_SUBJECT || 'Pesan dari Website ASAKA PRIMA'

    // Debug: log env values to verify they're loaded by Vite
    console.log('ENV', {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    })

    if (!serviceId || !templateId) {
      throw new Error('Konfigurasi EmailJS tidak lengkap. Pastikan SERVICE_ID dan TEMPLATE_ID di .env.')
    }

    const payload = {
      // Primary variables (sesuai kode dan template yang kita rekomendasikan)
      from_name: form.name,
      reply_to: form.email,
      message: form.message,

      // Aliases umum agar cocok dengan template yang berbeda-beda
      user_name: form.name,
      user_email: form.email,
      subject,
      SUBJECT: subject,
    }

    // Hanya kirim to_email jika disediakan agar tidak memicu error 'recipient address is empty'
    if (toEmail) {
      payload.to_email = toEmail
      payload.TO_EMAIL = toEmail
    }

    // Debug: log payload and identifiers
    console.log('EmailJS send()', { serviceId, templateId, payload })

    await emailjs.send(
      serviceId,
      templateId,
      payload,
    )

    status.value = { type: 'success', message: 'Pesan berhasil dikirim!' }
    form.name = ''
    form.email = ''
    form.message = ''
  } catch (err) {
    // Try to show EmailJS error details for easier troubleshooting
    let detail = (err && (err.text || err.message)) || 'Terjadi kesalahan saat mengirim.'
    // Common hints for status 400
    if (err && err.status === 400) {
      if (/origin/i.test(detail)) {
        detail += ' • Periksa Allowed Origins di EmailJS (tambahkan http://localhost:5173 & domain produksi).'
      }
      if (/service/i.test(detail)) {
        detail += ' • Periksa SERVICE_ID di .env.'
      }
      if (/template/i.test(detail)) {
        detail += ' • Periksa TEMPLATE_ID di .env dan variabel template.'
      }
      if (/user|public/i.test(detail)) {
        detail += ' • Periksa PUBLIC_KEY di .env.'
      }
    }
    console.error('EmailJS error:', err)
    status.value = { type: 'error', message: detail }
  } finally {
    loading.value = false
  }
}
</script>

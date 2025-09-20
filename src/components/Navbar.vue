<template>
  <header class="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-white/60 dark:bg-slate-900/50 border-b border-white/30 dark:border-white/10 shadow-sm supports-backdrop-blur:bg-white/60">
    <div class="container max-w-6xl mx-auto flex items-center justify-between py-3">
      <a href="#home" class="font-extrabold text-lg tracking-tight" @click.prevent="onNavigate('home')">
        <span class="inline-flex items-center gap-2">
          <img src="/logo.png" alt="Logo" class="h-6 w-6 object-contain" />
          <span class="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">ASAKA PRIMA</span>
        </span>
      </a>

      <nav class="hidden md:flex items-center gap-3">
        <a
          v-for="s in sections"
          :key="s.id"
          href="#"
          @click.prevent="onNavigate(s.id)"
          class="text-sm font-medium transition relative px-3 py-1 rounded-full"
          :class="{
            'text-slate-900 dark:text-white bg-white/30 dark:bg-white/10 shadow-sm': activeSection === s.id,
            'text-slate-500 hover:text-slate-900 dark:hover:text-white': activeSection !== s.id
          }"
          
        >
          {{ s.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <button
          class="btn-outline w-10 h-10 !px-0 !py-0 flex items-center justify-center"
          @click="$emit('toggle-dark')"
          :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg v-if="!dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M12 18a6 6 0 100-12 6 6 0 000 12z"/><path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0v-2A.75.75 0 0112 2.25zm0 16a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0v-2a.75.75 0 01.75-.75zM4.397 4.397a.75.75 0 011.06 0l1.414 1.414a.75.75 0 01-1.06 1.06L4.397 5.457a.75.75 0 010-1.06zm12.732 12.732a.75.75 0 011.06 0l1.414 1.414a.75.75 0 11-1.06 1.06l-1.414-1.414a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h2a.75.75 0 010 1.5h-2A.75.75 0 012.25 12zm16 0a.75.75 0 01.75-.75h2a.75.75 0 010 1.5h-2a.75.75 0 01-.75-.75zM4.397 19.603a.75.75 0 010-1.06l1.414-1.414a.75.75 0 111.06 1.06l-1.414 1.414a.75.75 0 01-1.06 0zm12.732-12.732a.75.75 0 010-1.06l1.414-1.414a.75.75 0 111.06 1.06l-1.414 1.414a.75.75 0 01-1.06 0z" clip-rule="evenodd"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98A10.502 10.502 0 1110.347 1.56a.75.75 0 01-.819.158z" clip-rule="evenodd"/></svg>
        </button>
        <button class="md:hidden btn-outline w-10 h-10 !px-0 !py-0" @click="open = !open" aria-label="Open menu">
          ☰
        </button>
      </div>
    </div>

    <transition name="fade">
      <div v-if="open" class="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur">
        <div class="container max-w-6xl mx-auto py-3 flex flex-col gap-2">
          <a v-for="s in sections" :key="s.id" href="#" @click.prevent="onNavigate(s.id)" class="py-2" :class="{ 'text-slate-900 dark:text-white': activeSection === s.id, 'text-slate-500': activeSection !== s.id }">{{ s.label }}</a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  sections: { type: Array, required: true },
  activeSection: { type: String, default: 'home' },
  dark: { type: Boolean, default: false },
})

const emit = defineEmits(['navigate', 'toggle-dark'])

const open = ref(false)

function onNavigate(id) {
  open.value = false
  emit('navigate', id)

  // Smooth scroll to the appropriate section
  requestAnimationFrame(() => {
    let el = null
    if (id === 'home') {
      el = document.querySelector('#home') || document.body
    } else {
      const candidates = [
        `#${id}`,
        `#${id}s`,
        `[data-section="${id}"]`
      ]
      el = candidates.map(sel => document.querySelector(sel)).find(Boolean)
    }

    if (el === document.body) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (el && el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

watch(() => props.activeSection, () => {
  // Close menu when section changes
  open.value = false
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 200ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

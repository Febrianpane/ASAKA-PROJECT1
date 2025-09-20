import { ref, onMounted, onUnmounted } from 'vue'

// Very small client-side router using History API
// Supports paths like: /, /produk/:slug
export function useMiniRouter() {
  const path = ref(window.location.pathname || '/')

  function navigate(to) {
    if (to === path.value) return
    window.history.pushState({}, '', to)
    path.value = to
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function onPopState() {
    path.value = window.location.pathname || '/'
  }

  onMounted(() => {
    window.addEventListener('popstate', onPopState)
  })
  onUnmounted(() => {
    window.removeEventListener('popstate', onPopState)
  })

  return { path, navigate }
}

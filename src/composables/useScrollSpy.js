import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrollSpy(options = {}) {
  const activeId = ref('home')
  let observer = null

  const observeSections = (ids = []) => {
    if (observer) observer.disconnect()
    const rootMargin = options.rootMargin || '-40% 0px -50% 0px'
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    }, { root: null, threshold: 0.01, rootMargin })

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  }

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })

  // Re-attach on mount in case DOM updates
  onMounted(() => {})

  return { activeId, observeSections }
}

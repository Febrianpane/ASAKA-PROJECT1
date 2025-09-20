import { ref, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  const apply = (dark) => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
  }

  const toggleDark = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    apply(isDark.value)
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved) isDark.value = saved === 'dark'
    else isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    apply(isDark.value)
  })

  return { isDark, toggleDark }
}

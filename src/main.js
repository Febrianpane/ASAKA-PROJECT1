import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import emailjs from '@emailjs/browser'
import App from './App.vue'
import './assets/main.css'

// Initialize EmailJS with public key from env
try {
  const pk = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  if (pk) {
    emailjs.init(pk)
    // console.debug('EmailJS initialized')
  } else {
    // console.warn('EmailJS public key not found in env')
  }
} catch (e) {
  // console.error('EmailJS init error', e)
}

createApp(App)
  .use(MotionPlugin)
  .mount('#app')

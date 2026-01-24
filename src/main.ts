import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router'
import './index.css'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, head }) => {
    const pinia = createPinia()
    app.use(pinia)
  }
)

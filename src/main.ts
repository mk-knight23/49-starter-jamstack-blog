import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import './index.css'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, head }) => {
    // Install plugins like Pinia here
  }
)

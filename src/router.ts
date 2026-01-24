import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/post/:id',
    component: () => import('./views/Post.vue'),
    props: true
  }
]

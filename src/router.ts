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
  },
  {
    path: '/tags/:tag',
    component: () => import('./views/tags/TagPage.vue'),
    props: true
  },
  {
    path: '/categories/:category',
    component: () => import('./views/categories/CategoryPage.vue'),
    props: true
  },
  {
    path: '/admin/login',
    component: () => import('./views/admin/Login.vue'),
  },
  {
    path: '/admin/dashboard',
    component: () => import('./views/admin/Dashboard.vue'),
  },
  {
    path: '/admin/posts',
    component: () => import('./views/admin/PostList.vue'),
  },
  {
    path: '/admin/posts/:id/edit',
    component: () => import('./views/admin/PostEditor.vue'),
    props: true,
  },
  {
    path: '/admin/posts/new',
    component: () => import('./views/admin/PostEditor.vue'),
    props: { id: 'new' },
  },
]

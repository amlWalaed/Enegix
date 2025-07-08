import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      layout: 'AppLayout',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
] satisfies RouteRecordRaw[]

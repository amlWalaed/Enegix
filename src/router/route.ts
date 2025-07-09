import type { RouteRecordRaw } from 'vue-router'
import AuthMiddleware from './middleware/AuthMiddleware'
import GuestMiddleware from './middleware/GuestMiddleware'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      layout: 'AppLayout',
    },
    beforeEnter: [AuthMiddleware],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: [GuestMiddleware],
  },
] satisfies RouteRecordRaw[]

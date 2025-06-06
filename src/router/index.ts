import { createRouter, createWebHistory } from 'vue-router'
import QrScanTestView from '@/views/QrScanTestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: QrScanTestView,
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/SignIn.vue'
import FrameView from '@/Layout/FrameView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/main',
      component: FrameView,
      children: [
        {
          path: 'main',
          name: 'main',
          component: () => import('@/views/Home/index.vue')
        },
        {
          path: 'project/:pid',
          name: 'project',
          component: () => import('@/views/Home/Project/index.vue') },
        {
          path: 'project/:pid/section/:sid',
          name: 'projectSection',
          component: () => import('@/views/Home/Section/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: SignIn
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/loginView.vue')
    }
  ]
})

export default router

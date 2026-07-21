import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: () => import('@/views/ProjectDetailView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      return { el: to.hash, behavior: reduceMotion ? 'auto' : 'smooth' }
    }

    return { top: 0 }
  },
})

export default router

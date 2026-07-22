import { createRouter, createWebHashHistory } from 'vue-router'
import { updatePageMeta } from '@/composables/useMeta'
import { siteConfig, getAbsoluteUrl } from '@/config/site'
import { projects } from '@/data/projects'

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

router.afterEach((to) => {
  if (to.name === 'home') {
    updatePageMeta({
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      robots: 'index, follow',
    })
  } else if (to.name === 'project-detail') {
    const slug = to.params.slug as string
    const project = projects.find((p) => p.slug === slug)
    if (project) {
      const firstImage = project.images?.[0]
      const ogImage = firstImage
        ? getAbsoluteUrl(firstImage.src.startsWith('/') ? firstImage.src : `/${firstImage.src}`)
        : getAbsoluteUrl(siteConfig.defaultOgImage)

      updatePageMeta({
        title: `${project.name} — ${siteConfig.siteName}`,
        description: project.summary || siteConfig.defaultDescription,
        robots: 'index, follow',
        ogTitle: `${project.name} — ${siteConfig.siteName}`,
        ogDescription: project.summary || siteConfig.defaultDescription,
        ogImage,
        ogImageAlt: firstImage?.alt || project.name,
      })
    } else {
      updatePageMeta({
        title: `專案不存在 — ${siteConfig.siteName}`,
        description: '找不到您要查看的專案內容。',
        robots: 'noindex, nofollow',
      })
    }
  } else {
    updatePageMeta({
      title: `404 頁面不存在 — ${siteConfig.siteName}`,
      description: '找不到您要存取的頁面。',
      robots: 'noindex, nofollow',
    })
  }
})

export default router

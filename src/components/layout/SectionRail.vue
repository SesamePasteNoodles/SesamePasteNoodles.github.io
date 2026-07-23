<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useActiveSection } from '@/composables/useActiveSection'

const route = useRoute()
const activeSection = useActiveSection(['intro', 'projects', 'contact'])
</script>

<template>
  <aside class="section-rail" aria-label="頁面段落">
    <RouterLink to="/" class="rail-mark" aria-label="回到首頁">RC.</RouterLink>
    <nav>
      <RouterLink
        to="/#intro"
        active-class=""
        :class="{ 'section-link--active': route.path === '/' && activeSection === 'intro' }"
        aria-label="前往簡介段落"
      >
        01
      </RouterLink>
      <RouterLink
        to="/#projects"
        active-class=""
        :class="{ 'section-link--active': route.path === '/' && activeSection === 'projects' }"
        aria-label="前往首頁精選專案"
      >
        02
      </RouterLink>
      <RouterLink
        to="/#contact"
        active-class=""
        :class="{ 'section-link--active': route.path === '/' && activeSection === 'contact' }"
        aria-label="前往聯絡段落"
      >
        03
      </RouterLink>
    </nav>
    <span class="rail-year" aria-hidden="true">2026</span>
  </aside>
</template>

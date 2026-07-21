<script setup lang="ts">
import { useActiveSection } from '@/composables/useActiveSection'

const activeSection = useActiveSection(['intro', 'approach', 'contact'])
</script>

<template>
  <aside class="section-rail" aria-label="頁面段落">
    <RouterLink to="/" class="rail-mark" aria-label="回到首頁">RC.</RouterLink>
    <nav>
      <RouterLink
        to="/#intro"
        active-class=""
        :class="{ 'section-link--active': activeSection === 'intro' }"
        aria-label="前往簡介段落"
      >
        01
      </RouterLink>
      <RouterLink
        to="/#approach"
        active-class=""
        :class="{ 'section-link--active': activeSection === 'approach' }"
        aria-label="前往作品呈現原則"
      >
        02
      </RouterLink>
      <RouterLink
        to="/#contact"
        active-class=""
        :class="{ 'section-link--active': activeSection === 'contact' }"
        aria-label="前往聯絡段落"
      >
        03
      </RouterLink>
    </nav>
    <span class="rail-year" aria-hidden="true">2026</span>
  </aside>
</template>

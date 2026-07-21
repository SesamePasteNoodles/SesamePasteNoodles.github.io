<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import SectionRail from '@/components/layout/SectionRail.vue'
import BackToTopButton from '@/components/shared/BackToTopButton.vue'
</script>

<template>
  <a class="skip-link" href="#main-content">跳至主要內容</a>
  <AppHeader />
  <SectionRail />
  <main id="main-content">
    <RouterView />
  </main>
  <BackToTopButton />
  <AppFooter />
</template>

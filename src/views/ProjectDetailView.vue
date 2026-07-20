<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { projects } from '@/data/projects'

const route = useRoute()
const project = computed(() => projects.find((item) => item.slug === route.params.slug))
</script>

<template>
  <section class="route-page">
    <p class="mono-label">PROJECT DETAIL</p>

    <template v-if="project">
      <h1>{{ project.name }}</h1>
      <p v-if="project.summary" class="route-page-copy">{{ project.summary }}</p>
    </template>

    <template v-else>
      <p class="route-index">PENDING</p>
      <h1>PROJECT CONTENT<br />NOT PUBLISHED.</h1>
      <p class="route-page-copy">
        專案內容會在文字與素材確認可公開後顯示。
      </p>
    </template>

    <RouterLink class="text-link" to="/">← 回到首頁</RouterLink>
  </section>
</template>

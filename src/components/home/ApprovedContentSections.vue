<script setup lang="ts">
import FeaturedProjects from '@/components/home/FeaturedProjects.vue'
import { experienceItems } from '@/data/experience'
</script>

<template>
  <FeaturedProjects />

  <section v-if="experienceItems.length" id="experience" aria-label="經歷">
    <article v-for="item in experienceItems" :key="`${item.period}-${item.title}`">
      <time>{{ item.period }}</time>
      <h2>{{ item.title }}</h2>
      <p v-if="item.summary">{{ item.summary }}</p>
    </article>
  </section>
</template>

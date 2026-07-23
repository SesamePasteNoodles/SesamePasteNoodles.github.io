<script setup lang="ts">
import FeaturedProjects from '@/components/home/FeaturedProjects.vue'
import { experienceItems } from '@/data/experience'
import { skillGroups } from '@/data/skills'
</script>

<template>
  <FeaturedProjects />

  <section v-if="skillGroups.length" id="skills" aria-label="技能">
    <article v-for="group in skillGroups" :key="group.title">
      <h2>{{ group.title }}</h2>
      <ul>
        <li v-for="skill in group.items" :key="skill">{{ skill }}</li>
      </ul>
    </article>
  </section>

  <section v-if="experienceItems.length" id="experience" aria-label="經歷">
    <article v-for="item in experienceItems" :key="`${item.period}-${item.title}`">
      <time>{{ item.period }}</time>
      <h2>{{ item.title }}</h2>
      <p v-if="item.summary">{{ item.summary }}</p>
    </article>
  </section>
</template>

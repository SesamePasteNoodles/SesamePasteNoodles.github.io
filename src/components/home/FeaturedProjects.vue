<script setup lang="ts">
import { computed } from 'vue'

import FeaturedProjectCard from '@/components/home/FeaturedProjectCard.vue'
import { getFeaturedProjects } from '@/data/projects'

const featuredProjects = computed(() => getFeaturedProjects())
const primaryProject = computed(() => featuredProjects.value[0])
const secondaryProjects = computed(() => featuredProjects.value.slice(1))
</script>

<template>
  <section id="projects" class="featured-section" aria-labelledby="featured-projects-title">
    <div class="featured-section__container">
      <div class="featured-section__header">
        <p class="mono-label">02 / FEATURED PROJECTS</p>
        <h2 id="featured-projects-title" class="featured-section__title">
          精選專案
        </h2>
      </div>

      <div v-if="featuredProjects.length" class="featured-grid">
        <div v-if="primaryProject" class="featured-grid__primary">
          <FeaturedProjectCard :project="primaryProject" variant="primary" />
        </div>

        <div v-if="secondaryProjects.length" class="featured-grid__secondary">
          <FeaturedProjectCard
            v-for="project in secondaryProjects"
            :key="project.slug"
            :project="project"
            variant="secondary"
          />
        </div>
      </div>
    </div>
  </section>
</template>

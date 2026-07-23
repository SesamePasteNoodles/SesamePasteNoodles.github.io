<script setup lang="ts">
import { computed } from 'vue'

import type { Project, ProjectImage } from '@/data/projects'

const props = withDefaults(
  defineProps<{
    project: Project
    variant?: 'primary' | 'secondary'
  }>(),
  {
    variant: 'secondary',
  },
)

const displayImage = computed<ProjectImage | undefined>(() => {
  return props.project.cardImage ?? props.project.images?.[0]
})

const displayedTechs = computed(() => {
  const techs = props.project.technologies ?? []
  return props.variant === 'primary' ? techs.slice(0, 6) : techs.slice(0, 4)
})
</script>

<template>
  <article class="featured-card" :class="`featured-card--${variant}`">
    <div class="featured-card__media">
      <template v-if="displayImage">
        <img
          :src="displayImage.src"
          :alt="displayImage.alt"
          class="featured-card__img"
          loading="lazy"
        />
      </template>
      <template v-else>
        <div
          class="featured-card__placeholder"
          role="img"
          :aria-label="`${project.name} 專案視覺示意：專案影像尚未公開`"
        >
          <div class="placeholder-content">
            <span class="placeholder-brand">{{ project.name }}</span>
            <span class="placeholder-label">專案影像尚未公開</span>
          </div>
        </div>
      </template>
    </div>

    <div class="featured-card__body">
      <div>
        <div class="featured-card__meta">
          <span v-if="project.period" class="featured-card__period">{{ project.period }}</span>
          <span v-if="project.status" class="featured-card__status">{{ project.status }}</span>
        </div>
        <h3 class="featured-card__title">
          {{ project.name }}
        </h3>
        <p v-if="project.summary" class="featured-card__summary">
          {{ project.summary }}
        </p>
      </div>

      <div>
        <ul v-if="displayedTechs.length" class="featured-card__techs" aria-label="關鍵技術">
          <li v-for="tech in displayedTechs" :key="tech" class="tech-tag">
            {{ tech }}
          </li>
        </ul>

        <div class="featured-card__footer">
          <RouterLink
            :to="{ name: 'project-detail', params: { slug: project.slug } }"
            class="featured-card__cta"
          >
            <span>查看專案詳情</span>
            <span aria-hidden="true" class="cta-arrow">↗</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </article>
</template>

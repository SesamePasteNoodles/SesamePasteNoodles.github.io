<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Project, ProjectImage } from '@/data/projects'

const props = withDefaults(
  defineProps<{
    project: Project
    size?: 'featured' | 'standard'
  }>(),
  {
    size: 'standard',
  },
)

const displayImage = computed<ProjectImage | undefined>(() => {
  return props.project.cardImage ?? props.project.images?.[0]
})

const displayedTechs = computed(() => {
  const techs = props.project.technologies ?? []
  return props.size === 'featured' ? techs.slice(0, 6) : techs.slice(0, 4)
})
</script>

<template>
  <article class="bento-card" :class="`bento-card--${size}`">
    <div class="bento-card__media">
      <template v-if="displayImage">
        <img
          :src="displayImage.src"
          :alt="displayImage.alt"
          class="bento-card__img"
          loading="lazy"
          decoding="async"
        />
      </template>
      <template v-else>
        <div
          class="bento-card__placeholder"
          role="img"
          :aria-label="`${project.name} 專案影像尚未公開`"
        >
          <div class="placeholder-pattern" aria-hidden="true"></div>
          <div class="placeholder-content">
            <span class="placeholder-brand">{{ project.name }}</span>
            <span class="placeholder-label">專案影像尚未公開</span>
          </div>
        </div>
      </template>
    </div>

    <div class="bento-card__body">
      <div class="bento-card__header">
        <div class="bento-card__meta">
          <span v-if="project.period" class="meta-period">{{ project.period }}</span>
          <span v-if="project.status" class="meta-status">{{ project.status }}</span>
        </div>
        <h3 class="bento-card__title">
          {{ project.name }}
        </h3>
        <p v-if="project.summary" class="bento-card__summary">
          {{ project.summary }}
        </p>
      </div>

      <div class="bento-card__footer">
        <ul v-if="displayedTechs.length" class="bento-card__techs" aria-label="核心技術標籤">
          <li v-for="tech in displayedTechs" :key="tech" class="tech-tag">
            {{ tech }}
          </li>
        </ul>

        <div class="bento-card__action">
          <RouterLink
            :to="{ name: 'project-detail', params: { slug: project.slug } }"
            class="bento-card__cta"
          >
            <span>查看專案詳情</span>
            <span aria-hidden="true" class="cta-arrow">↗</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.bento-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.bento-card:hover {
  border-color: var(--color-primary-muted, var(--color-border-strong));
}

/* Media section */
.bento-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-bottom: 1px solid var(--color-border);
  border-radius: 0.75rem 0.75rem 0 0;
  overflow: hidden;
  background: var(--color-background-dark, #0d0f12);
}

.bento-card--featured .bento-card__media {
  aspect-ratio: 16 / 9;
}

.bento-card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

@media (prefers-reduced-motion: no-preference) {
  .bento-card:hover .bento-card__img {
    transform: scale(1.02);
  }
}

/* Placeholder styling */
.bento-card__placeholder {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  background: linear-gradient(135deg, #0b1329 0%, #151d33 50%, #0d0f12 100%);
}

.placeholder-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--color-border-strong) 1px, transparent 1px);
  background-size: 16px 16px;
  opacity: 0.25;
}

.placeholder-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.placeholder-brand {
  color: var(--color-primary);
  font-family: var(--font-mono);
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.placeholder-label {
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 0, 0, 0.4);
  color: var(--color-text-secondary);
  font-size: 0.8125rem;
}

/* Body section */
.bento-card__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 1.5rem;
  gap: 1.25rem;
}

.bento-card__header {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.bento-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.meta-period {
  color: var(--color-primary-strong);
  font-weight: 700;
}

.meta-status {
  color: var(--color-text-muted);
}

.bento-card__title {
  margin: 0;
  color: var(--color-text);
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.3;
}

.bento-card--featured .bento-card__title {
  font-size: 1.625rem;
}

.bento-card__summary {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
}

/* Techs list & CTA */
.bento-card__footer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--color-border);
}

.bento-card__techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tech-tag {
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
  background: var(--color-background);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.bento-card__action {
  display: flex;
  justify-content: flex-end;
}

.bento-card__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  min-width: 2.75rem;
  padding: 0.5rem 0.75rem;
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s;
}

.bento-card__cta:hover {
  color: var(--color-primary-hover, var(--color-primary));
}

.bento-card__cta:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
  border-radius: 2px;
}

.cta-arrow {
  transition: transform 0.2s ease;
}

@media (prefers-reduced-motion: no-preference) {
  .bento-card__cta:hover .cta-arrow {
    transform: translate(2px, -2px);
  }
}
</style>

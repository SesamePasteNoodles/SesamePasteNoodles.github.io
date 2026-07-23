<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Project, ProjectImage } from '@/data/projects'

const props = defineProps<{
  project: Project
}>()

const displayImage = computed<ProjectImage | undefined>(() => {
  return props.project.cardImage ?? props.project.images?.[0]
})

const displayedTechs = computed(() => {
  const techs = props.project.technologies ?? []
  return techs.slice(0, 6)
})
</script>

<template>
  <article class="project-overview-card">
    <div class="project-overview-card__media">
      <template v-if="displayImage">
        <img
          :src="displayImage.src"
          :alt="displayImage.alt"
          class="project-overview-card__img"
          loading="lazy"
          decoding="async"
        />
      </template>
      <template v-else>
        <div
          class="project-overview-card__placeholder"
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

    <div class="project-overview-card__body">
      <div class="project-overview-card__header">
        <div class="project-overview-card__meta">
          <span v-if="project.period" class="meta-period">{{ project.period }}</span>
          <span v-if="project.status" class="meta-status">{{ project.status }}</span>
        </div>
        <h3 class="project-overview-card__title">
          {{ project.name }}
        </h3>
        <p v-if="project.summary" class="project-overview-card__summary">
          {{ project.summary }}
        </p>
      </div>

      <div class="project-overview-card__footer">
        <ul v-if="displayedTechs.length" class="project-overview-card__techs" aria-label="核心技術標籤">
          <li v-for="tech in displayedTechs" :key="tech" class="tech-tag">
            {{ tech }}
          </li>
        </ul>

        <div class="project-overview-card__action">
          <RouterLink
            :to="{ name: 'project-detail', params: { slug: project.slug } }"
            class="project-overview-card__cta"
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
.project-overview-card {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.9fr);
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.project-overview-card:hover {
  border-color: var(--color-primary-muted, var(--color-border-strong));
}

/* Media section */
.project-overview-card__media {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: clamp(16rem, 24vw, 22rem);
  background: var(--color-background-dark, #0d0f12);
  border-right: 1px solid var(--color-border);
  overflow: hidden;
}

.project-overview-card__img {
  display: block;
  width: 100%;
  height: 100%;
  max-height: 22rem;
  padding: 1rem;
  object-fit: contain;
  transition: transform 0.3s ease;
}

@media (prefers-reduced-motion: no-preference) {
  .project-overview-card:hover .project-overview-card__img {
    transform: scale(1.015);
  }
}

/* Placeholder styling */
.project-overview-card__placeholder {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 16rem;
  padding: 2rem 1.5rem;
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
  font-size: 1.375rem;
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
.project-overview-card__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.75rem;
  gap: 1.5rem;
}

.project-overview-card__header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-overview-card__meta {
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

.project-overview-card__title {
  margin: 0;
  color: var(--color-text);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25;
}

.project-overview-card__summary {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

/* Footer & Techs */
.project-overview-card__footer {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px dashed var(--color-border);
}

.project-overview-card__techs {
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
  padding: 0.25rem 0.65rem;
  background: var(--color-background);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.project-overview-card__action {
  display: flex;
  justify-content: flex-end;
}

.project-overview-card__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  min-height: 2.75rem;
  min-width: 2.75rem;
  padding: 0.5rem 1rem;
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s;
}

.project-overview-card__cta:hover {
  color: var(--color-primary-hover, var(--color-primary));
}

.project-overview-card__cta:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 4px;
}

.cta-arrow {
  transition: transform 0.2s ease;
}

@media (prefers-reduced-motion: no-preference) {
  .project-overview-card__cta:hover .cta-arrow {
    transform: translate(2px, -2px);
  }
}

/* Tablet & Mobile responsive fallback (< 56rem / 896px) */
@media (max-width: 55.9375rem) {
  .project-overview-card {
    grid-template-columns: 1fr;
  }

  .project-overview-card__media {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    min-height: 14rem;
    aspect-ratio: 16 / 9;
  }

  .project-overview-card__body {
    padding: 1.375rem;
    gap: 1.25rem;
  }
}
</style>

<script setup lang="ts">
import type { OverviewSection } from '@/data/projects'

defineProps<{
  section: OverviewSection
}>()
</script>

<template>
  <section class="project-overview-section" aria-labelledby="overview-heading">
    <h2 id="overview-heading" class="section-title">
      {{ section.title || 'OVERVIEW' }}
    </h2>
    <div class="overview-content">
      <p class="overview-description">{{ section.description }}</p>
    </div>
  </section>
</template>

<style scoped>
.project-overview-section {
  margin: 2.5rem 0;
}

.section-title {
  margin-bottom: 1.25rem;
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.overview-content {
  border-left: 3px solid var(--color-primary);
  padding: 1.25rem 1.5rem;
  background: var(--color-background-soft);
  border-radius: 0 0.5rem 0.5rem 0;
}

.overview-description {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 1.05rem;
  line-height: 1.75;
}
</style>

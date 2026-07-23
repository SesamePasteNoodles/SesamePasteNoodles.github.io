<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Project } from '@/data/projects'

defineProps<{
  project: Project
}>()
</script>

<template>
  <header class="project-hero">
    <nav aria-label="麵包屑導覽" class="project-breadcrumb">
      <RouterLink to="/projects" class="back-link">← 回到所有專案</RouterLink>
    </nav>

    <div class="project-title-group">
      <p class="mono-label">PROJECT CASE STUDY</p>
      <h1 class="project-title">{{ project.name }}</h1>
      <p v-if="project.summary" class="project-summary">
        {{ project.summary }}
      </p>
    </div>

    <div class="project-meta-bar">
      <div v-if="project.period" class="meta-item">
        <span class="meta-label">DEVELOPMENT PERIOD</span>
        <span class="meta-value">{{ project.period }}</span>
      </div>

      <div v-if="project.status" class="meta-item">
        <span class="meta-label">PROJECT STATUS</span>
        <span class="meta-value">{{ project.status }}</span>
      </div>

      <div v-if="project.license" class="meta-item">
        <span class="meta-label">LICENSE</span>
        <span class="meta-value">{{ project.license }}</span>
      </div>
    </div>

    <div v-if="project.technologies?.length" class="project-tech-bar">
      <span class="tech-bar-label">TECH STACK:</span>
      <ul class="tech-tag-list" aria-label="核心技術標籤">
        <li v-for="tech in project.technologies" :key="tech" class="tech-tag">
          {{ tech }}
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
.project-hero {
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 2.5rem;
}

.project-breadcrumb {
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--color-primary-strong);
}

.back-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

.project-title-group {
  margin-bottom: 2rem;
}

.project-title {
  margin: 0.5rem 0 1rem;
  color: var(--color-text);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.project-summary {
  max-width: 52rem;
  color: var(--color-text-secondary);
  font-size: 1.125rem;
  line-height: 1.7;
}

.project-meta-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: 1px;
  margin-bottom: 1.5rem;
  border: 1px solid var(--color-border);
  background: var(--color-border);
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.25rem;
  background: var(--color-background-soft);
}

.meta-label {
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.meta-value {
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.4;
}

.project-tech-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.tech-bar-label {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.tech-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tech-tag {
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  padding: 0.35rem 0.75rem;
  background: var(--color-background-soft);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}
</style>

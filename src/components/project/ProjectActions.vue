<script setup lang="ts">
defineProps<{
  repositoryUrl?: string
  demoUrl?: string
}>()
</script>

<template>
  <div v-if="repositoryUrl || demoUrl" class="project-actions">
    <a
      v-if="repositoryUrl"
      :href="repositoryUrl"
      target="_blank"
      rel="noreferrer"
      class="action-btn primary-btn"
    >
      <span>檢視 GitHub Repository</span>
      <span aria-hidden="true">↗</span>
    </a>

    <a
      v-if="demoUrl"
      :href="demoUrl"
      target="_blank"
      rel="noreferrer"
      class="action-btn secondary-btn"
    >
      <span>開啟 Demo 展示</span>
      <span aria-hidden="true">↗</span>
    </a>
  </div>
</template>

<style scoped>
.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin: 3rem 0;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.primary-btn {
  border: 1px solid var(--color-primary);
  background: var(--color-primary);
  color: var(--color-ink);
}

.primary-btn:hover {
  border-color: var(--color-primary-hover);
  background: var(--color-primary-hover);
}

.primary-btn:focus-visible {
  outline: 2px solid var(--color-primary-strong);
  outline-offset: 3px;
}

.secondary-btn {
  border: 1px solid var(--color-border-strong);
  background: var(--color-background-soft);
  color: var(--color-text);
}

.secondary-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary-strong);
}

.secondary-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}
</style>

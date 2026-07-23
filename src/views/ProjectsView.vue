<script setup lang="ts">
</script>

<template>
  <div class="projects-page">
    <header class="projects-page__header">
      <p class="mono-label">PORTFOLIO / PROJECTS</p>
      <h1 class="projects-page__title">所有專案</h1>
      <p class="projects-page__lead">
        收錄已驗證的個人與團隊專案，涵蓋全端 Web 應用、桌面售票系統與 AI Agent 工具鏈。
      </p>
    </header>
  </div>
</template>

<style scoped>
.projects-page {
  max-width: 68rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;
}

.projects-page__header {
  margin-bottom: 3rem;
}

.projects-page__title {
  margin: 0.5rem 0 1rem;
  color: var(--color-text);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.projects-page__lead {
  max-width: 52rem;
  color: var(--color-text-secondary);
  font-size: 1.125rem;
  line-height: 1.7;
}
</style>

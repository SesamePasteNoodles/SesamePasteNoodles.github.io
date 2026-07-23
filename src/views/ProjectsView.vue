<script setup lang="ts">
import { computed } from 'vue'
import { profile } from '@/data/profile'
import { getProjectsForOverview } from '@/data/projects'
import ProjectBentoCard from '@/components/projects/ProjectBentoCard.vue'
import BaseButton from '@/components/shared/BaseButton.vue'

const overviewProjects = computed(() => getProjectsForOverview())
</script>

<template>
  <div class="projects-page">
    <header class="projects-page__header">
      <p class="mono-label">PORTFOLIO / PROJECTS</p>
      <h1 id="projects-page-title" class="projects-page__title">所有專案</h1>
      <p class="projects-page__lead">
        收錄已驗證的個人與團隊專案，涵蓋全端 Web 應用、桌面售票系統與 AI Agent 工具鏈。
      </p>
    </header>

    <section class="projects-page__bento-grid" aria-labelledby="projects-page-title">
      <div
        v-for="(project, index) in overviewProjects"
        :key="project.slug"
        class="bento-grid-item"
        :class="{ 'bento-grid-item--featured': index === 0 }"
      >
        <ProjectBentoCard
          :project="project"
          :size="index === 0 ? 'featured' : 'standard'"
        />
      </div>
    </section>

    <section class="projects-page__contact" aria-labelledby="projects-contact-heading">
      <div class="contact-card">
        <div class="contact-card__content">
          <h2 id="projects-contact-heading" class="contact-title">探索更多或提出合作討論？</h2>
          <p class="contact-copy">
            歡迎隨時透過 Email 聯絡或至 GitHub 查看公開程式碼庫。
          </p>
        </div>
        <div class="contact-actions">
          <BaseButton :href="`mailto:${profile.email}`" variant="primary">
            發送 Email
          </BaseButton>
          <BaseButton :href="profile.githubUrl" external variant="secondary">
            GitHub
          </BaseButton>
        </div>
      </div>
    </section>
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

/* Bento Grid */
.projects-page__bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.bento-grid-item {
  grid-column: span 6;
}

.bento-grid-item--featured {
  grid-column: span 7;
  grid-row: span 2;
}

.bento-grid-item:nth-child(2),
.bento-grid-item:nth-child(3) {
  grid-column: span 5;
}

/* Contact section */
.projects-page__contact {
  margin-top: 2rem;
}

.contact-card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 2rem 2.5rem;
  border: 1px dashed var(--color-border-strong);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
}

.contact-card__content {
  max-width: 36rem;
}

.contact-title {
  margin: 0 0 0.5rem;
  color: var(--color-text);
  font-size: 1.375rem;
  font-weight: 700;
}

.contact-copy {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* Responsive adjustments */
@media (max-width: 63.9375rem) {
  .projects-page__bento-grid {
    grid-template-columns: repeat(12, 1fr);
    gap: 1.25rem;
  }

  .bento-grid-item {
    grid-column: span 6;
    grid-row: auto;
  }

  .bento-grid-item--featured {
    grid-column: span 12;
    grid-row: auto;
  }

  .bento-grid-item:nth-child(2),
  .bento-grid-item:nth-child(3) {
    grid-column: span 6;
  }
}

@media (max-width: 47.9375rem) {
  .projects-page {
    padding-top: 1.5rem;
    padding-bottom: 3.5rem;
  }

  .projects-page__header {
    margin-bottom: 2rem;
  }

  .projects-page__bento-grid {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 3rem;
  }

  .bento-grid-item,
  .bento-grid-item--featured,
  .bento-grid-item:nth-child(2),
  .bento-grid-item:nth-child(3) {
    grid-column: auto;
    width: 100%;
  }

  .contact-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem;
  }
}
</style>

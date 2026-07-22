<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { projects } from '@/data/projects'

const route = useRoute()
const project = computed(() => projects.find((item) => item.slug === route.params.slug))
</script>

<template>
  <section class="route-page">
    <p class="mono-label">PROJECT DETAIL</p>

    <template v-if="project">
      <h1>{{ project.name }}</h1>
      <p v-if="project.summary" class="route-page-copy">{{ project.summary }}</p>

      <dl v-if="project.status || project.period || project.license" class="project-facts">
        <div v-if="project.status">
          <dt>STATUS</dt>
          <dd>{{ project.status }}</dd>
        </div>
        <div v-if="project.period">
          <dt>VERIFIED PERIOD</dt>
          <dd>{{ project.period }}</dd>
        </div>
        <div v-if="project.license">
          <dt>LICENSE</dt>
          <dd>{{ project.license }}</dd>
        </div>
      </dl>

      <section v-if="project.technologies?.length" class="project-detail-section">
        <h2>TECH STACK</h2>
        <ul class="project-tag-list" aria-label="專案技術">
          <li v-for="technology in project.technologies" :key="technology">
            {{ technology }}
          </li>
        </ul>
      </section>

      <section v-if="project.highlights?.length" class="project-detail-section">
        <h2>TECHNICAL HIGHLIGHTS</h2>
        <ul class="project-highlight-list">
          <li v-for="highlight in project.highlights" :key="highlight">
            {{ highlight }}
          </li>
        </ul>
      </section>

      <section v-if="project.images?.length" class="project-detail-section">
        <h2>PROJECT GALLERY</h2>
        <div class="project-gallery">
          <figure v-for="image in project.images" :key="image.src">
            <img :src="image.src" :alt="image.alt" loading="lazy" />
            <figcaption v-if="image.caption">{{ image.caption }}</figcaption>
          </figure>
        </div>
      </section>

      <div v-if="project.repositoryUrl || project.demoUrl" class="project-actions">
        <a
          v-if="project.repositoryUrl"
          class="text-link"
          :href="project.repositoryUrl"
          target="_blank"
          rel="noreferrer"
        >
          查看 Repository ↗
        </a>
        <a
          v-if="project.demoUrl"
          class="text-link"
          :href="project.demoUrl"
          target="_blank"
          rel="noreferrer"
        >
          查看 Demo ↗
        </a>
      </div>
    </template>

    <template v-else>
      <p class="route-index">PENDING</p>
      <h1>PROJECT CONTENT<br />NOT PUBLISHED.</h1>
      <p class="route-page-copy">
        專案內容會在文字與素材確認可公開後顯示。
      </p>
    </template>

    <RouterLink class="text-link" to="/">← 回到首頁</RouterLink>
  </section>
</template>

<style scoped>
.project-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  gap: 1px;
  margin: 2.5rem 0;
  border: 1px solid var(--color-border);
  background: var(--color-border);
}

.project-facts div {
  padding: 1rem;
  background: var(--color-background-soft);
}

.project-facts dt,
.project-detail-section h2 {
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.project-facts dd {
  margin: 0.5rem 0 0;
  color: var(--color-text-secondary);
}

.project-detail-section {
  margin: 2.5rem 0;
}

.project-tag-list,
.project-highlight-list {
  margin: 1rem 0 0;
}

.project-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
}

.project-tag-list li {
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  padding: 0.45rem 0.75rem;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.project-highlight-list {
  display: grid;
  gap: 0.75rem;
  padding-left: 1.25rem;
  color: var(--color-text-secondary);
}

.project-highlight-list li::marker {
  color: var(--color-primary);
}

.project-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.project-gallery figure {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
}

.project-gallery img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.project-gallery figcaption {
  padding: 0.875rem 1rem;
  color: var(--color-text-secondary);
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin: 2.5rem 0;
}

@media (max-width: 42rem) {
  .project-gallery {
    grid-template-columns: 1fr;
  }
}
</style>

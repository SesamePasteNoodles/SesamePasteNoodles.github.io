<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { projects } from '@/data/projects'
import type { ProjectImage } from '@/data/projects'

import ProjectHero from '@/components/project/ProjectHero.vue'
import ProjectSectionRenderer from '@/components/project/ProjectSectionRenderer.vue'
import ProjectActions from '@/components/project/ProjectActions.vue'
import ImageModal from '@/components/shared/ImageModal.vue'

const route = useRoute()
const project = computed(() => projects.find((item) => item.slug === route.params.slug))

// Modal state management
const isModalOpen = ref(false)
const modalImages = ref<ProjectImage[]>([])
const activeImageIndex = ref(0)
const activeTriggerEl = ref<HTMLElement | null>(null)

function handleOpenModal(payload: {
  index: number
  triggerEl: HTMLElement
  images: ProjectImage[]
}) {
  modalImages.value = payload.images
  activeImageIndex.value = payload.index
  activeTriggerEl.value = payload.triggerEl
  isModalOpen.value = true
}

function handleCloseModal() {
  isModalOpen.value = false
}

function handleSelectImage(index: number) {
  activeImageIndex.value = index
}
</script>

<template>
  <article class="project-detail-page">
    <template v-if="project">
      <ProjectHero :project="project" />

      <!-- Section Renderer for Structured Sections -->
      <ProjectSectionRenderer
        v-if="project.sections?.length"
        :sections="project.sections"
        @open-modal="handleOpenModal"
      />

      <!-- Fallback / Default Renderer if no sections defined -->
      <template v-else>
        <section v-if="project.highlights?.length" class="legacy-section">
          <h2 class="section-title">TECHNICAL HIGHLIGHTS</h2>
          <ul class="highlight-list">
            <li v-for="highlight in project.highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ul>
        </section>

        <section v-if="project.images?.length" class="legacy-section">
          <h2 class="section-title">PROJECT GALLERY</h2>
          <div class="legacy-gallery">
            <figure v-for="(img, idx) in project.images" :key="img.src">
              <button
                type="button"
                class="legacy-img-btn"
                :aria-label="`點擊放大圖片：${img.alt}`"
                @click="handleOpenModal({ index: idx, triggerEl: $event.currentTarget as HTMLElement, images: project.images! })"
              >
                <img :src="img.src" :alt="img.alt" loading="lazy" decoding="async" />
              </button>
              <figcaption v-if="img.caption">{{ img.caption }}</figcaption>
            </figure>
          </div>
        </section>
      </template>

      <!-- Project Actions (Repo & Demo links, zero output if none exist) -->
      <ProjectActions
        :repository-url="project.repositoryUrl"
        :demo-url="project.demoUrl"
      />
    </template>

    <!-- Not Found / Pending Published State -->
    <template v-else>
      <div class="not-found-container">
        <p class="mono-label">STATUS 404 ／ PENDING</p>
        <h1 class="not-found-title">PROJECT CONTENT NOT FOUND</h1>
        <p class="not-found-copy">
          要求的專案不存在，或內容尚未過核可公開。請確認網址是否正確。
        </p>
        <RouterLink to="/" class="back-home-btn">← 回到作品集首頁</RouterLink>
      </div>
    </template>

    <!-- Global Accessible Image Gallery Modal -->
    <ImageModal
      :is-open="isModalOpen"
      :images="modalImages"
      :current-index="activeImageIndex"
      :trigger-element="activeTriggerEl"
      @close="handleCloseModal"
      @select="handleSelectImage"
    />
  </article>
</template>

<style scoped>
.project-detail-page {
  max-width: 68rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;
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

.legacy-section {
  margin: 2.5rem 0;
}

.highlight-list {
  display: grid;
  gap: 0.75rem;
  padding-left: 1.25rem;
  color: var(--color-text-secondary);
}

.highlight-list li::marker {
  color: var(--color-primary);
}

.legacy-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.legacy-gallery figure {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
}

.legacy-img-btn {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.legacy-gallery img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.legacy-gallery figcaption {
  padding: 0.875rem 1rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

/* Not found view styling */
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 4rem 2rem;
  border: 1px dashed var(--color-border-strong);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
}

.not-found-title {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
}

.not-found-copy {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 1.05rem;
  line-height: 1.6;
}

.back-home-btn {
  display: inline-flex;
  align-items: center;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--color-primary);
  border-radius: 0.5rem;
  background: var(--color-primary);
  color: var(--color-ink);
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 0.2s;
}

.back-home-btn:hover {
  background: var(--color-primary-hover);
}

.back-home-btn:focus-visible {
  outline: 2px solid var(--color-primary-strong);
  outline-offset: 3px;
}

@media (max-width: 42rem) {
  .legacy-gallery {
    grid-template-columns: 1fr;
  }
}
</style>

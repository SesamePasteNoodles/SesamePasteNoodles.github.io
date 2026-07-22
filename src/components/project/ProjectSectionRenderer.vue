<script setup lang="ts">
import type { ProjectSection, ProjectImage } from '@/data/projects'
import ProjectOverview from './ProjectOverview.vue'
import TechnicalHighlight from './TechnicalHighlight.vue'
import ProjectGallery from './ProjectGallery.vue'

defineProps<{
  sections: ProjectSection[]
}>()

const emit = defineEmits<{
  (e: 'openModal', payload: { index: number; triggerEl: HTMLElement; images: ProjectImage[] }): void
}>()

function handleGalleryOpenModal(
  images: ProjectImage[],
  payload: { index: number; triggerEl: HTMLElement }
) {
  emit('openModal', {
    index: payload.index,
    triggerEl: payload.triggerEl,
    images,
  })
}
</script>

<template>
  <div class="project-sections-container">
    <template v-for="(section, idx) in sections" :key="idx">
      <!-- 1. Overview Section -->
      <ProjectOverview
        v-if="section.type === 'overview'"
        :section="section"
      />

      <!-- 2. Technical Decision Section -->
      <TechnicalHighlight
        v-else-if="section.type === 'technicalDecision'"
        :section="section"
      />

      <!-- 3. Gallery Section -->
      <ProjectGallery
        v-else-if="section.type === 'gallery'"
        :section="section"
        @open-modal="handleGalleryOpenModal(section.images, $event)"
      />

      <!-- 4. Highlights Section -->
      <section
        v-else-if="section.type === 'highlights'"
        class="highlights-section"
      >
        <h2 class="section-title">{{ section.title || 'TECHNICAL HIGHLIGHTS' }}</h2>
        <ul class="highlights-list">
          <li v-for="(item, hIdx) in section.items" :key="hIdx" class="highlight-item">
            <template v-if="typeof item === 'string'">
              {{ item }}
            </template>
            <template v-else>
              <h3 v-if="item.title" class="highlight-item-title">{{ item.title }}</h3>
              <p v-if="item.problem" class="highlight-detail"><strong>問題：</strong>{{ item.problem }}</p>
              <p v-if="item.choice" class="highlight-detail"><strong>方案：</strong>{{ item.choice }}</p>
              <p v-if="item.reason" class="highlight-detail"><strong>理由：</strong>{{ item.reason }}</p>
              <p v-if="item.impact" class="highlight-detail"><strong>成效：</strong>{{ item.impact }}</p>
              <p v-if="item.description" class="highlight-detail">{{ item.description }}</p>
            </template>
          </li>
        </ul>
      </section>

      <!-- 5. Media Section -->
      <section
        v-else-if="section.type === 'media'"
        class="media-section"
      >
        <h2 v-if="section.title" class="section-title">{{ section.title }}</h2>
        <figure class="media-figure" :class="section.layout || 'contained'">
          <button
            type="button"
            class="media-trigger-btn"
            :aria-label="`點擊放大檢視圖片：${section.image.alt}`"
            @click="handleGalleryOpenModal([section.image], { index: 0, triggerEl: $event.currentTarget as HTMLElement })"
          >
            <img
              :src="section.image.src"
              :alt="section.image.alt"
              loading="lazy"
              class="media-img"
            />
            <span class="zoom-badge">🔍 點擊放大</span>
          </button>
          <figcaption v-if="section.image.caption" class="media-caption">
            {{ section.image.caption }}
          </figcaption>
        </figure>
      </section>

      <!-- 6. Text Section -->
      <section
        v-else-if="section.type === 'text'"
        class="text-section"
      >
        <h2 v-if="section.title" class="section-title">{{ section.title }}</h2>
        <div class="paragraphs-list">
          <p v-for="(para, pIdx) in section.paragraphs" :key="pIdx">
            {{ para }}
          </p>
        </div>
      </section>

      <!-- 7. Contribution Section -->
      <section
        v-else-if="section.type === 'contribution'"
        class="contribution-section"
      >
        <h2 class="section-title">{{ section.title || 'CONTRIBUTION & TEAM' }}</h2>
        <div class="contribution-box">
          <p v-if="section.summary" class="contribution-summary">
            {{ section.summary }}
          </p>
          <ul v-if="section.items?.length" class="contribution-items">
            <li v-for="(item, itemIdx) in section.items" :key="itemIdx">
              {{ item }}
            </li>
          </ul>
        </div>
      </section>

      <!-- Fallback for unknown / custom sections -->
      <section v-else class="unknown-section-fallback">
        <!-- Unknown section type skipped safely without crashing page -->
      </section>
    </template>
  </div>
</template>

<style scoped>
.project-sections-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

.text-section,
.contribution-section,
.highlights-section,
.media-section {
  margin: 2.5rem 0;
}

.paragraphs-list p {
  margin-bottom: 1.25rem;
  color: var(--color-text-secondary);
  font-size: 1.05rem;
  line-height: 1.75;
}

.highlights-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1.25rem;
  color: var(--color-text-secondary);
}

.highlight-item::marker {
  color: var(--color-primary);
}

.highlight-item-title {
  margin: 0 0 0.5rem;
  color: var(--color-text);
  font-size: 1.1rem;
}

.highlight-detail {
  margin: 0.25rem 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.media-figure {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
}

.media-trigger-btn {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.media-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.media-caption {
  padding: 0.875rem 1.25rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.zoom-badge {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  border-radius: 0.375rem;
  padding: 0.35rem 0.65rem;
  background: rgba(5, 8, 13, 0.85);
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.media-trigger-btn:hover .zoom-badge,
.media-trigger-btn:focus-visible .zoom-badge {
  opacity: 1;
}

.contribution-box {
  border: 1px dashed var(--color-border-strong);
  border-radius: 0.75rem;
  padding: 1.5rem;
  background: var(--color-background-soft);
}

.contribution-summary {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

.contribution-items {
  margin: 1rem 0 0;
  padding-left: 1.25rem;
  color: var(--color-text-secondary);
}

.unknown-section-fallback {
  display: none;
}
</style>

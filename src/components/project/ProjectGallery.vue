<script setup lang="ts">
import { useId } from 'vue'
import type { GallerySection } from '@/data/projects'

defineProps<{
  section: GallerySection
}>()

const headingId = useId()

const emit = defineEmits<{
  (e: 'openModal', payload: { index: number; triggerEl: HTMLElement }): void
}>()

function handleClick(index: number, event: MouseEvent) {
  const target = event.currentTarget as HTMLElement
  emit('openModal', { index, triggerEl: target })
}
</script>

<template>
  <section class="project-gallery-section" :aria-labelledby="headingId">
    <h2 :id="headingId" class="section-title">
      {{ section.title || 'SCREENSHOTS & GALLERY' }}
    </h2>

    <div
      class="gallery-grid"
      :style="{
        '--columns': section.columns || 2,
      }"
    >
      <figure
        v-for="(image, index) in section.images"
        :key="image.src"
        class="gallery-item"
      >
        <button
          type="button"
          class="gallery-trigger-btn"
          :aria-label="`點擊放大檢視圖片：${image.alt}`"
          @click="handleClick(index, $event)"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            decoding="async"
            class="gallery-img"
          />
          <span class="zoom-badge">🔍 點擊放大</span>
        </button>
        <figcaption v-if="image.caption" class="gallery-caption">
          {{ image.caption }}
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.project-gallery-section {
  margin: 3rem 0;
}

.section-title {
  margin-bottom: 1.5rem;
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(var(--columns, 2), minmax(0, 1fr));
  gap: 1.5rem;
}

.gallery-item {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
  transition: border-color 0.2s;
}

.gallery-item:hover {
  border-color: var(--color-primary);
}

.gallery-trigger-btn {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  overflow: hidden;
}

.gallery-trigger-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: -2px;
}

.gallery-img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-trigger-btn:hover .gallery-img {
  transform: scale(1.02);
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

.gallery-trigger-btn:hover .zoom-badge,
.gallery-trigger-btn:focus-visible .zoom-badge {
  opacity: 1;
}

.gallery-caption {
  padding: 0.875rem 1.25rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

@media (prefers-reduced-motion: reduce) {
  .gallery-img {
    transition: none;
  }
  .gallery-trigger-btn:hover .gallery-img {
    transform: none;
  }
}

@media (max-width: 48rem) {
  .gallery-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>

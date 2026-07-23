<script setup lang="ts">
import { computed } from 'vue'
import type { Project, ProjectImage } from '@/data/projects'

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  (e: 'open-modal', payload: { index: number; triggerEl: HTMLElement; images: ProjectImage[] }): void
}>()

const heroImage = computed<ProjectImage | undefined>(() => {
  return props.project.heroImage ?? props.project.cardImage ?? props.project.images?.[0]
})

function handleImageClick(event: MouseEvent) {
  if (!heroImage.value) return

  // Deduplicate project images by src
  const allImages = props.project.images ?? []
  const uniqueImages = allImages.filter(
    (img, index, self) => index === self.findIndex((t) => t.src === img.src),
  )

  // Find index of current hero image in uniqueImages array (or default to 0)
  let foundIndex = uniqueImages.findIndex((img) => img.src === heroImage.value?.src)
  if (foundIndex < 0) {
    uniqueImages.unshift(heroImage.value)
    foundIndex = 0
  }

  emit('open-modal', {
    index: foundIndex,
    triggerEl: event.currentTarget as HTMLElement,
    images: uniqueImages,
  })
}
</script>

<template>
  <div class="project-hero-media">
    <figure v-if="heroImage" class="hero-media-figure">
      <button
        type="button"
        class="hero-media-btn"
        :aria-label="`點擊放大檢視主視覺：${heroImage.alt}`"
        @click="handleImageClick"
      >
        <img
          :src="heroImage.src"
          :alt="heroImage.alt"
          class="hero-media-img"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </button>
      <figcaption v-if="heroImage.caption" class="hero-media-caption">
        {{ heroImage.caption }}
      </figcaption>
    </figure>

    <div
      v-else
      class="hero-media-placeholder"
      role="img"
      :aria-label="`${project.name} 專案影像尚未公開`"
    >
      <div class="placeholder-pattern" aria-hidden="true"></div>
      <div class="placeholder-content">
        <span class="placeholder-brand">{{ project.name }}</span>
        <span class="placeholder-label">專案影像尚未公開</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-hero-media {
  margin: 1.5rem 0 2rem;
  width: 100%;
}

.hero-media-figure {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
}

.hero-media-btn {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  outline-offset: 4px;
}

.hero-media-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  border-radius: 0.75rem;
}

.hero-media-img {
  display: block;
  width: 100%;
  max-height: 28rem;
  object-fit: cover;
  aspect-ratio: 16 / 9;
}

.hero-media-caption {
  padding: 0.875rem 1.25rem;
  border-top: 1px solid var(--color-border);
  background: var(--color-background-soft);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

/* Placeholder */
.hero-media-placeholder {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 16rem;
  padding: 2.5rem 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #0b1329 0%, #151d33 50%, #0d0f12 100%);
  overflow: hidden;
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
  gap: 0.625rem;
  text-align: center;
}

.placeholder-brand {
  color: var(--color-primary);
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.placeholder-label {
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0.35rem 1rem;
  background: rgba(0, 0, 0, 0.4);
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}
</style>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type { ProjectImage } from '@/data/projects'

const props = defineProps<{
  isOpen: boolean
  images: ProjectImage[]
  currentIndex: number
  triggerElement?: HTMLElement | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', index: number): void
}>()

const modalRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLButtonElement | null>(null)
const imageViewportRef = ref<HTMLElement | null>(null)
const zoomLevel = ref(1)
let previousOverflow = ''
const MIN_ZOOM = 1
const MAX_ZOOM = 3
const ZOOM_STEP = 0.5

const safeIndex = computed(() => {
  if (!props.images.length) return 0
  if (props.currentIndex < 0) return 0
  if (props.currentIndex >= props.images.length) return props.images.length - 1
  return props.currentIndex
})

const currentImage = computed(() => props.images[safeIndex.value] || null)
const zoomPercent = computed(() => `${Math.round(zoomLevel.value * 100)}%`)
const canZoomOut = computed(() => zoomLevel.value > MIN_ZOOM)
const canZoomIn = computed(() => zoomLevel.value < MAX_ZOOM)

function setZoom(nextZoom: number) {
  const viewport = imageViewportRef.value
  const centerX = viewport
    ? (viewport.scrollLeft + viewport.clientWidth / 2) / Math.max(viewport.scrollWidth, 1)
    : 0.5
  const centerY = viewport
    ? (viewport.scrollTop + viewport.clientHeight / 2) / Math.max(viewport.scrollHeight, 1)
    : 0.5

  zoomLevel.value = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom))

  nextTick(() => {
    if (!viewport) return
    viewport.scrollLeft = centerX * viewport.scrollWidth - viewport.clientWidth / 2
    viewport.scrollTop = centerY * viewport.scrollHeight - viewport.clientHeight / 2
  })
}

function handleZoomOut() {
  setZoom(zoomLevel.value - ZOOM_STEP)
}

function handleZoomIn() {
  setZoom(zoomLevel.value + ZOOM_STEP)
}

function resetZoom() {
  zoomLevel.value = MIN_ZOOM
  nextTick(() => {
    if (!imageViewportRef.value) return
    imageViewportRef.value.scrollLeft = 0
    imageViewportRef.value.scrollTop = 0
  })
}

function handleClose() {
  emit('close')
}

function handlePrev() {
  if (!props.images.length) return
  resetZoom()
  const newIndex = (safeIndex.value - 1 + props.images.length) % props.images.length
  emit('select', newIndex)
}

function handleNext() {
  if (!props.images.length) return
  resetZoom()
  const newIndex = (safeIndex.value + 1) % props.images.length
  emit('select', newIndex)
}

function handleKeyDown(event: KeyboardEvent) {
  if (!props.isOpen) return

  if (event.key === 'Escape') {
    event.preventDefault()
    handleClose()
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    handlePrev()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    handleNext()
  } else if (event.key === 'Tab') {
    // Focus Trap
    if (!modalRef.value) return
    const focusables = modalRef.value.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (focusables.length === 0) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }
}

watch(
  () => props.isOpen,
  (newOpen, oldOpen) => {
    if (newOpen && !oldOpen) {
      resetZoom()
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
      nextTick(() => {
        closeBtnRef.value?.focus()
      })
    } else if (!newOpen && oldOpen) {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (props.triggerElement && typeof props.triggerElement.focus === 'function') {
        props.triggerElement.focus()
      }
    }
  }
)

onMounted(() => {
  if (props.isOpen) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (props.isOpen) {
    document.body.style.overflow = previousOverflow
  }
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isOpen && images.length && currentImage"
        ref="modalRef"
        class="modal-backdrop"
        role="dialog"
        aria-modal="true"
        aria-label="圖片放大預覽"
        @click.self="handleClose"
      >
        <div class="modal-container">
          <header class="modal-header">
            <span class="modal-counter">
              {{ safeIndex + 1 }} / {{ images.length }}
            </span>
            <div class="zoom-controls" role="group" aria-label="圖片縮放控制">
              <button
                type="button"
                class="zoom-btn"
                :disabled="!canZoomOut"
                aria-label="縮小圖片"
                @click="handleZoomOut"
              >
                −
              </button>
              <button
                type="button"
                class="zoom-btn zoom-value"
                :disabled="!canZoomOut"
                aria-label="重設為符合視窗大小"
                @click="resetZoom"
              >
                <span aria-live="polite">{{ zoomPercent }}</span>
              </button>
              <button
                type="button"
                class="zoom-btn"
                :disabled="!canZoomIn"
                aria-label="放大圖片"
                @click="handleZoomIn"
              >
                ＋
              </button>
            </div>
            <button
              ref="closeBtnRef"
              type="button"
              class="modal-close-btn"
              aria-label="關閉預覽 (ESC)"
              @click="handleClose"
            >
              ✕
            </button>
          </header>

          <div class="modal-body">
            <button
              v-if="images.length > 1"
              type="button"
              class="modal-nav-btn prev-btn"
              aria-label="上一張圖片 (←)"
              @click="handlePrev"
            >
              ‹
            </button>

            <div class="modal-image-wrapper">
              <div
                ref="imageViewportRef"
                class="modal-image-viewport"
                :class="{ 'is-zoomed': canZoomOut }"
              >
                <img
                  :src="currentImage.src"
                  :alt="currentImage.alt"
                  decoding="async"
                  class="modal-image"
                  :style="{
                    width: canZoomOut ? `${zoomLevel * 100}%` : '100%',
                    height: canZoomOut ? 'auto' : '100%',
                  }"
                />
              </div>
              <p v-if="currentImage.caption" class="modal-caption">
                {{ currentImage.caption }}
              </p>
            </div>

            <button
              v-if="images.length > 1"
              type="button"
              class="modal-nav-btn next-btn"
              aria-label="下一張圖片 (→)"
              @click="handleNext"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: rgba(5, 8, 13, 0.88);
  backdrop-filter: blur(8px);
}

.modal-container {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 1.5rem);
  height: calc(100dvh - 1.5rem);
  max-width: none;
  max-height: none;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.6);
}

.modal-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-soft);
}

.modal-counter {
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.zoom-btn,
.modal-close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  background: transparent;
  color: var(--color-text);
  font-size: 1.125rem;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s;
}

.zoom-btn {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
}

.zoom-value {
  min-width: 4.25rem;
  font-size: 0.8125rem;
}

.modal-close-btn {
  justify-self: end;
}

.zoom-btn:hover:not(:disabled),
.modal-close-btn:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
}

.zoom-btn:focus-visible,
.modal-close-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.modal-body {
  position: relative;
  display: flex;
  flex: 1;
  min-height: 0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.75rem;
}

.zoom-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.modal-image-wrapper {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.modal-image-viewport {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.modal-image-viewport.is-zoomed {
  display: block;
  overflow: auto;
  overscroll-behavior: contain;
  scrollbar-color: var(--color-primary) var(--color-background-soft);
}

.modal-image {
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 0.5rem;
  object-fit: contain;
}

.modal-caption {
  margin-top: 0.75rem;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  text-align: center;
}

.modal-nav-btn {
  position: absolute;
  top: 50%;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  transform: translateY(-50%);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(16, 36, 62, 0.85);
  color: var(--color-text);
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.prev-btn {
  left: 1rem;
}

.next-btn {
  right: 1rem;
}

.modal-nav-btn:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
}

.modal-nav-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Transition styles */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: none;
  }
}

@media (max-width: 36rem) {
  .modal-backdrop {
    padding: 0.25rem;
  }

  .modal-container {
    width: calc(100vw - 0.5rem);
    height: calc(100dvh - 0.5rem);
  }

  .modal-header {
    gap: 0.375rem;
    padding: 0.625rem 0.75rem;
  }

  .zoom-controls {
    gap: 0.125rem;
  }

  .zoom-btn,
  .modal-close-btn {
    min-width: 2.5rem;
    min-height: 2.5rem;
  }

  .zoom-value {
    min-width: 3.5rem;
    font-size: 0.75rem;
  }

  .modal-body {
    padding: 0.25rem;
  }

  .modal-nav-btn {
    min-width: 2.75rem;
    min-height: 2.75rem;
    font-size: 1.5rem;
  }

  .prev-btn {
    left: 0.5rem;
  }

  .next-btn {
    right: 0.5rem;
  }
}
</style>

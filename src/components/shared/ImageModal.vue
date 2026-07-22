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
let previousOverflow = ''

const safeIndex = computed(() => {
  if (!props.images.length) return 0
  if (props.currentIndex < 0) return 0
  if (props.currentIndex >= props.images.length) return props.images.length - 1
  return props.currentIndex
})

const currentImage = computed(() => props.images[safeIndex.value] || null)

function handleClose() {
  emit('close')
}

function handlePrev() {
  if (!props.images.length) return
  const newIndex = (safeIndex.value - 1 + props.images.length) % props.images.length
  emit('select', newIndex)
}

function handleNext() {
  if (!props.images.length) return
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
              <img
                :src="currentImage.src"
                :alt="currentImage.alt"
                decoding="async"
                class="modal-image"
              />
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
  padding: 1.5rem;
  background: rgba(5, 8, 13, 0.88);
  backdrop-filter: blur(8px);
}

.modal-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 72rem;
  max-height: 90vh;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.6);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.modal-close-btn:hover {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
}

.modal-close-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.modal-body {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 1rem;
}

.modal-image-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: calc(90vh - 5rem);
  overflow: hidden;
}

.modal-image {
  max-width: 100%;
  max-height: calc(90vh - 8rem);
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
    padding: 0.75rem;
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

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const SHOW_THRESHOLD = 480
const isVisible = ref(false)

function updateVisibility() {
  isVisible.value = window.scrollY > SHOW_THRESHOLD
}

function scrollToTop() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
}

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateVisibility)
})
</script>

<template>
  <Transition name="back-to-top">
    <button
      v-if="isVisible"
      class="back-to-top"
      type="button"
      aria-label="回到頁面頂端"
      @click="scrollToTop"
    >
      <span aria-hidden="true">↑</span>
      <span>TOP</span>
    </button>
  </Transition>
</template>

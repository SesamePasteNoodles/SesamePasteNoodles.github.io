<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    email: string
    label?: string
    copiedLabel?: string
    variant?: 'primary' | 'secondary'
  }>(),
  {
    label: '複製 Email',
    copiedLabel: '已複製',
    variant: undefined,
  },
)

const emit = defineEmits<{
  copied: []
}>()

const copyState = ref<'idle' | 'copied' | 'failed'>('idle')
let resetTimer: number | undefined

const displayLabel = computed(() => {
  if (copyState.value === 'copied') return props.copiedLabel
  if (copyState.value === 'failed') return '複製失敗'
  return props.label
})

function copyWithFallback() {
  const textArea = document.createElement('textarea')
  textArea.value = props.email
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'fixed'
  textArea.style.left = '-9999px'
  document.body.appendChild(textArea)
  textArea.select()

  try {
    return document.execCommand('copy')
  } finally {
    textArea.remove()
  }
}

async function copyEmail() {
  let copied = false

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(props.email)
      copied = true
    }
  } catch {
    copied = false
  }

  try {
    if (!copied) copied = copyWithFallback()
    if (!copied) throw new Error('Clipboard API is unavailable')
    copyState.value = 'copied'
    emit('copied')
  } catch {
    copyState.value = 'failed'
  }

  window.clearTimeout(resetTimer)
  resetTimer = window.setTimeout(() => {
    copyState.value = 'idle'
  }, 2200)
}

onBeforeUnmount(() => {
  window.clearTimeout(resetTimer)
})
</script>

<template>
  <button
    type="button"
    class="copy-email-button"
    :class="variant ? [`base-button`, `base-button--${variant}`] : undefined"
    :title="`複製 ${email}`"
    @click="copyEmail"
  >
    <span aria-live="polite">{{ displayLabel }}</span>
    <span aria-hidden="true">{{ copyState === 'copied' ? '✓' : '⧉' }}</span>
  </button>
</template>

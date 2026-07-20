<script setup lang="ts">
withDefaults(
  defineProps<{
    href: string
    external?: boolean
    variant?: 'primary' | 'secondary'
  }>(),
  {
    external: false,
    variant: 'primary',
  },
)
</script>

<template>
  <a
    class="base-button"
    :class="`base-button--${variant}`"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noreferrer' : undefined"
  >
    <slot />
    <span aria-hidden="true">↗</span>
  </a>
</template>

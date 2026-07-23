<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    href?: string
    to?: string | Record<string, unknown>
    external?: boolean
    variant?: 'primary' | 'secondary'
  }>(),
  {
    href: undefined,
    to: undefined,
    external: false,
    variant: 'primary',
  },
)

const isRouterLink = computed(() => !!props.to)
</script>

<template>
  <RouterLink
    v-if="isRouterLink && to"
    class="base-button"
    :class="`base-button--${variant}`"
    :to="to"
  >
    <slot />
    <span aria-hidden="true">↗</span>
  </RouterLink>
  <a
    v-else
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

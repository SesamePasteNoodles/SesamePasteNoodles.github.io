<script setup lang="ts">
defineProps<{
  index: string
  title: string
}>()
</script>

<template>
  <header class="section-heading">
    <p>{{ index }}</p>
    <h2>{{ title }}</h2>
  </header>
</template>

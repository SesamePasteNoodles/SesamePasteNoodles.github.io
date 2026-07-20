<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue'
import { profile } from '@/data/profile'
</script>

<template>
  <section id="intro" class="hero" aria-labelledby="hero-title">
    <div class="hero-copy">
      <div class="hero-eyebrow">
        <span>PORTFOLIO</span>
        <span>2026 / WEB</span>
      </div>

      <h1 id="hero-title">
        <span>RANDY</span>
        <span class="hero-title-accent">CHEN<span class="hero-dot">.</span></span>
      </h1>

      <div class="hero-actions">
        <BaseButton :href="`mailto:${profile.email}`">Email</BaseButton>
        <BaseButton :href="profile.githubUrl" external variant="secondary">GitHub</BaseButton>
      </div>
    </div>

    <div class="hero-art" aria-hidden="true">
      <div class="art-grid">
        <span class="art-square art-square--black"></span>
        <span class="art-square art-square--yellow"></span>
        <span class="art-circle"></span>
        <span class="art-line"></span>
        <span class="art-index">01</span>
        <span class="art-caption">PUBLIC<br />BY DESIGN</span>
      </div>
    </div>

    <div class="hero-status">
      <span>SELECTED WORK</span>
      <span class="status-line"></span>
      <span>CONTENT VERIFIED BEFORE PUBLISHING</span>
    </div>
  </section>
</template>

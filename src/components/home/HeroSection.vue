<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue'
import { profile } from '@/data/profile'
</script>

<template>
  <section id="intro" class="hero" aria-labelledby="hero-title">
    <div class="hero-copy">
      <div class="hero-eyebrow">
        <span>PORTFOLIO / 2026</span>
        <span>WEB / INTERFACE</span>
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

    <div class="hero-art" aria-label="作品集資訊索引">
      <div class="signal-panel">
        <div class="signal-panel__head">
          <span>PROFILE INDEX</span>
          <span>RC—01</span>
        </div>
        <div class="signal-panel__core" aria-hidden="true">
          <span class="signal-orbit"></span>
          <span class="signal-axis signal-axis--horizontal"></span>
          <span class="signal-axis signal-axis--vertical"></span>
          <span class="signal-node"></span>
          <strong>RC</strong>
        </div>
        <dl class="signal-panel__list">
          <div><dt>01</dt><dd>PUBLIC PROFILE</dd></div>
          <div><dt>02</dt><dd>SELECTED WORK</dd></div>
          <div><dt>03</dt><dd>VERIFIED LINKS</dd></div>
        </dl>
      </div>
    </div>

    <div class="hero-status">
      <span>SELECTED WORK</span>
      <span class="status-line"></span>
      <span>ONLY VERIFIED CONTENT IS PUBLISHED</span>
    </div>
  </section>
</template>

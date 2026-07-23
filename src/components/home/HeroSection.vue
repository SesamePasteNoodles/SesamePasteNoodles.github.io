<script setup lang="ts">
import BaseButton from '@/components/shared/BaseButton.vue'
import { profile } from '@/data/profile'
</script>

<template>
  <section id="intro" class="hero" aria-labelledby="hero-title">
    <div class="hero-copy">
      <div class="hero-eyebrow">
        <span>PORTFOLIO / 2026</span>
      </div>

      <h1 id="hero-title">
        <span>RANDY</span>
        <span class="hero-title-accent">CHEN<span class="hero-dot">.</span></span>
      </h1>

      <p class="hero-lead">
        專注於全端 Web 開發、桌面售票系統與 AI Agent 工具鏈建置。本作品集收錄已驗證的個人專案與關鍵技術實作。
      </p>

      <div class="hero-actions">
        <BaseButton href="#projects" variant="primary">
          查看精選專案
        </BaseButton>
        <BaseButton :href="profile.githubUrl" external variant="secondary">
          GitHub
        </BaseButton>
        <BaseButton :href="`mailto:${profile.email}`" variant="secondary">
          Email
        </BaseButton>
      </div>
    </div>
  </section>
</template>

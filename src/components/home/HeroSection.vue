<script setup lang="ts">
import BaseButton from "@/components/shared/BaseButton.vue";
import CopyEmailButton from "@/components/shared/CopyEmailButton.vue";
import { profile } from "@/data/profile";
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
        我是還在累積實務經驗的全端工程師。<br />歡迎瀏覽我實際做過的專案、解決過的問題，以及還在持續學習的內容。
      </p>

      <div class="hero-actions">
        <BaseButton to="/#projects" variant="primary">
          查看精選專案
        </BaseButton>
        <BaseButton :href="profile.githubUrl" external variant="secondary">
          GitHub
        </BaseButton>
        <CopyEmailButton :email="profile.email" variant="secondary" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "@/components/shared/BaseButton.vue";
import CopyEmailButton from "@/components/shared/CopyEmailButton.vue";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
</script>

<template>
  <section id="intro" class="hero" aria-labelledby="hero-title">
    <div class="hero-copy">
      <div class="hero-main">
        <div class="hero-eyebrow">
          <span>PORTFOLIO / 2026</span>
        </div>

        <h1 id="hero-title">
          <span>RANDY</span>
          <span class="hero-title-accent">CHEN<span class="hero-dot">.</span></span>
        </h1>

        <p class="hero-lead">
          我是持續累積實務經驗的全端工程師。<br />歡迎瀏覽我實際做過的專案、解決過的問題，以及還在持續學習的內容。
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

      <aside class="hero-skills" aria-labelledby="hero-skills-title">
        <div class="hero-skills-header">
          <h2 id="hero-skills-title">SELECTED SKILL SET</h2>
        </div>

        <ul class="hero-skills-list">
          <li
            v-for="(group, index) in skillGroups"
            :key="group.title"
            class="hero-skills-item"
          >
            <h3 class="hero-skills-category">
              <span class="hero-skills-num" aria-hidden="true">0{{ index + 1 }} / </span>{{ group.title }}
            </h3>
            <ul class="hero-skills-tech" :aria-label="`${group.title} 技術`">
              <li v-for="skill in group.items" :key="skill">
                {{ skill }}
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

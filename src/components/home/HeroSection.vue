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

        <div class="hero-lead">
          <p>
            以 C# / ASP.NET Core
            為核心，具備 API、資料庫、身分驗證及交易流程實作經驗。除了功能實作，也重視需求如何轉化為系統設計，以及資料、資安與服務間的協作。
          </p>
          <p>
            現階段希望透過軟體開發累積工程實務經驗，並持續拓展網路、部署與 Cloud
            等系統知識，長期希望具備從需求理解、系統設計到技術交付的完整 Solution 能力。
          </p>
        </div>

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

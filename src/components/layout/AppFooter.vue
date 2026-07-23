<script setup lang="ts">
import CopyEmailButton from '@/components/shared/CopyEmailButton.vue'
import { profile } from '@/data/profile'
</script>

<template>
  <footer id="contact" class="site-footer">
    <div class="footer-grid">
      <p class="footer-kicker">03 / CONTACT</p>
      <div class="footer-callout">
        <p class="footer-title">LET’S START A<br /><span>CONVERSATION.</span></p>
        <CopyEmailButton
          class="footer-email"
          :email="profile.email"
          :label="profile.email"
          copied-label="Email 已複製"
        />
      </div>
      <div class="footer-meta">
        <span>© 2026 {{ profile.name }}</span>
        <a :href="profile.githubUrl" target="_blank" rel="noreferrer">GitHub ↗</a>
        <span>Built with Vue</span>
      </div>
    </div>
  </footer>
</template>

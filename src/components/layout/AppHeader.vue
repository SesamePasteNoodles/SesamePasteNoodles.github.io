<script setup lang="ts">
import { ref } from 'vue'

import { profile } from '@/data/profile'

const isOpen = ref(false)

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink class="wordmark" to="/" aria-label="Randy Chen 作品集首頁" @click="closeMenu">
        RC<span>.</span>
      </RouterLink>

      <button
        class="menu-button"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="primary-navigation"
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">{{ isOpen ? '關閉選單' : '開啟選單' }}</span>
        <span aria-hidden="true">{{ isOpen ? 'CLOSE' : 'MENU' }}</span>
      </button>

      <nav
        id="primary-navigation"
        class="header-nav"
        :class="{ 'header-nav--open': isOpen }"
        aria-label="主要導覽"
      >
        <RouterLink to="/#intro" @click="closeMenu">Intro</RouterLink>
        <a :href="profile.githubUrl" target="_blank" rel="noreferrer" @click="closeMenu">GitHub</a>
        <a class="header-email" :href="`mailto:${profile.email}`" @click="closeMenu">Email</a>
      </nav>
    </div>
  </header>
</template>

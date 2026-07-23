<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useActiveSection } from '@/composables/useActiveSection'
import { profile } from '@/data/profile'

const route = useRoute()
const isOpen = ref(false)
const activeSection = useActiveSection(['intro', 'projects', 'contact'])

const menuButtonRef = ref<HTMLButtonElement | null>(null)
const navRef = ref<HTMLElement | null>(null)

function closeMenu(restoreFocus = false) {
  if (isOpen.value) {
    isOpen.value = false
    document.body.style.overflow = ''
    if (restoreFocus) {
      menuButtonRef.value?.focus()
    }
  }
}

function openMenu() {
  isOpen.value = true
  if (window.innerWidth <= 760) {
    document.body.style.overflow = 'hidden'
  }
  nextTick(() => {
    const firstFocusable = navRef.value?.querySelector<HTMLElement>('a, button')
    firstFocusable?.focus()
  })
}

function toggleMenu() {
  if (isOpen.value) {
    closeMenu(true)
  } else {
    openMenu()
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    closeMenu(true)
  }
}

function handleNavKeydown(e: KeyboardEvent) {
  if (!isOpen.value || window.innerWidth > 760) return

  if (e.key === 'Tab') {
    const focusables = Array.from(
      navRef.value?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []
    )
    if (focusables.length === 0) return

    const firstItem = focusables[0]
    const lastItem = focusables[focusables.length - 1]

    if (e.shiftKey && document.activeElement === firstItem) {
      e.preventDefault()
      menuButtonRef.value?.focus()
    } else if (!e.shiftKey && document.activeElement === lastItem) {
      e.preventDefault()
      menuButtonRef.value?.focus()
    }
  }
}

function handleMenuButtonKeydown(e: KeyboardEvent) {
  if (!isOpen.value || window.innerWidth > 760) return

  if (e.key === 'Tab' && e.shiftKey) {
    const focusables = Array.from(
      navRef.value?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []
    )
    if (focusables.length > 0) {
      e.preventDefault()
      focusables[focusables.length - 1].focus()
    }
  }
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  }
)

function handleResize() {
  if (window.innerWidth > 760 && isOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('resize', handleResize)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink class="wordmark" to="/" aria-label="Randy Chen 作品集首頁" @click="closeMenu()">
        RC<span>.</span>
      </RouterLink>

      <button
        ref="menuButtonRef"
        class="menu-button"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="primary-navigation"
        @click="toggleMenu"
        @keydown="handleMenuButtonKeydown"
      >
        <span class="sr-only">{{ isOpen ? '關閉選單' : '開啟選單' }}</span>
        <span aria-hidden="true">{{ isOpen ? 'CLOSE' : 'MENU' }}</span>
      </button>

      <nav
        id="primary-navigation"
        ref="navRef"
        class="header-nav"
        :class="{ 'header-nav--open': isOpen }"
        aria-label="主要導覽"
        @keydown="handleNavKeydown"
      >
        <RouterLink
          to="/#intro"
          active-class=""
          :class="{ 'section-link--active': route.path === '/' && activeSection === 'intro' }"
          @click="closeMenu()"
        >
          Intro
        </RouterLink>
        <RouterLink
          to="/#projects"
          active-class=""
          :class="{ 'section-link--active': route.path === '/' && activeSection === 'projects' }"
          @click="closeMenu()"
        >
          Projects
        </RouterLink>
        <RouterLink
          to="/#contact"
          active-class=""
          :class="{ 'section-link--active': route.path === '/' && activeSection === 'contact' }"
          @click="closeMenu()"
        >
          Contact
        </RouterLink>
        <a :href="profile.githubUrl" target="_blank" rel="noreferrer" @click="closeMenu()">GitHub</a>
        <a class="header-email" :href="`mailto:${profile.email}`" @click="closeMenu()">Email</a>
      </nav>
    </div>
  </header>
</template>

import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useActiveSection(sectionIds: string[]) {
  const activeSection = ref(sectionIds[0] ?? '')
  let layoutObserver: ResizeObserver | undefined

  function updateActiveSection() {
    const activationLine = window.innerHeight * 0.35
    let currentSection = sectionIds[0] ?? ''

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section && section.getBoundingClientRect().top <= activationLine) {
        currentSection = id
      }
    })

    activeSection.value = currentSection
  }

  onMounted(() => {
    requestAnimationFrame(() => requestAnimationFrame(updateActiveSection))
    layoutObserver = new ResizeObserver(updateActiveSection)
    layoutObserver.observe(document.body)
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    window.addEventListener('load', updateActiveSection, { once: true })
  })

  onBeforeUnmount(() => {
    layoutObserver?.disconnect()
    window.removeEventListener('scroll', updateActiveSection)
    window.removeEventListener('resize', updateActiveSection)
    window.removeEventListener('load', updateActiveSection)
  })

  return activeSection
}

<script setup lang="ts">
import { useId } from 'vue'
import type { TechnicalDecisionSection } from '@/data/projects'

defineProps<{
  section: TechnicalDecisionSection
}>()

const headingId = useId()

function padNumber(index: number): string {
  return String(index + 1).padStart(2, '0')
}
</script>

<template>
  <section class="tech-highlights-section" :aria-labelledby="headingId">
    <h2 :id="headingId" class="section-title">
      {{ section.title || 'TECHNICAL HIGHLIGHTS' }}
    </h2>

    <div class="decision-grid">
      <article
        v-for="(item, index) in section.decisions"
        :key="item.title"
        class="decision-card"
      >
        <header class="card-header">
          <span class="card-number">{{ padNumber(index) }}</span>
          <h3 class="card-title">{{ item.title }}</h3>
        </header>

        <dl class="quad-grid">
          <div class="quad-item problem">
            <dt class="quad-label">PROBLEM ／ 問題</dt>
            <dd class="quad-value">{{ item.problem }}</dd>
          </div>

          <div class="quad-item choice">
            <dt class="quad-label">CHOICE ／ 選擇</dt>
            <dd class="quad-value">{{ item.choice }}</dd>
          </div>

          <div class="quad-item reason">
            <dt class="quad-label">REASON ／ 原因</dt>
            <dd class="quad-value">{{ item.reason }}</dd>
          </div>

          <div class="quad-item impact">
            <dt class="quad-label">IMPACT ／ 影響</dt>
            <dd class="quad-value">{{ item.impact }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>

<style scoped>
.tech-highlights-section {
  margin: 3rem 0;
}

.section-title {
  margin-bottom: 1.5rem;
  color: var(--color-primary-strong);
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.decision-grid {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.decision-card {
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  background: var(--color-background-soft);
  overflow: hidden;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.decision-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--color-border);
  background: rgba(8, 21, 38, 0.6);
}

.card-number {
  color: var(--color-primary);
  font-family: var(--font-mono);
  font-size: 1.125rem;
  font-weight: 800;
}

.card-title {
  margin: 0;
  color: var(--color-text);
  font-size: 1.15rem;
  font-weight: 700;
}

.quad-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  margin: 0;
  background: var(--color-border);
}

.quad-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem 1.5rem;
  background: var(--color-background-soft);
}

.quad-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.problem .quad-label {
  color: #f87171;
}

.choice .quad-label {
  color: #60a5fa;
}

.reason .quad-label {
  color: #fbbf24;
}

.impact .quad-label {
  color: #34d399;
}

.quad-value {
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 48rem) {
  .quad-grid {
    grid-template-columns: 1fr;
  }
}
</style>

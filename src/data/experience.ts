export interface ExperienceItem {
  period: string
  title: string
  summary?: string
}

/** Experience remains hidden until its public wording has been approved. */
export const experienceItems: ExperienceItem[] = []

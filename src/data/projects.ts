export interface Project {
  slug: string
  name: string
  summary?: string
  repositoryUrl?: string
  demoUrl?: string
}

/**
 * Public project content is added only after it has been explicitly approved.
 * The route and views already support future entries without placeholder copy.
 */
export const projects: Project[] = []

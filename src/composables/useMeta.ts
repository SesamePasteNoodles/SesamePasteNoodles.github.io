import { siteConfig, getAbsoluteUrl } from '@/config/site'
import { projects } from '@/data/projects'

export interface MetaOptions {
  title?: string
  description?: string
  robots?: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogUrl?: string
  ogImage?: string
  ogImageAlt?: string
}

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attrName, attrValue)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function setLinkTag(rel: string, href: string) {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

export function updatePageMeta(options: MetaOptions = {}): void {
  if (typeof document === 'undefined') return

  const title = options.title || siteConfig.defaultTitle
  const description = options.description || siteConfig.defaultDescription
  const robots = options.robots || 'index, follow'
  const canonicalUrl = options.canonicalUrl || getAbsoluteUrl('/')
  const ogTitle = options.ogTitle || title
  const ogDescription = options.ogDescription || description
  const ogUrl = options.ogUrl || getAbsoluteUrl('/')
  const ogImage = options.ogImage || getAbsoluteUrl(siteConfig.defaultOgImage)
  const ogImageAlt = options.ogImageAlt || siteConfig.defaultOgImageAlt

  document.title = title

  setMetaTag('name', 'description', description)
  setMetaTag('name', 'robots', robots)
  setLinkTag('canonical', canonicalUrl)

  setMetaTag('property', 'og:title', ogTitle)
  setMetaTag('property', 'og:description', ogDescription)
  setMetaTag('property', 'og:url', ogUrl)
  setMetaTag('property', 'og:image', ogImage)
  setMetaTag('property', 'og:image:alt', ogImageAlt)
  setMetaTag('property', 'og:type', 'website')
}

export function useMeta() {
  return {
    updatePageMeta,
    siteConfig,
    projects,
  }
}

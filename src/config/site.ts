export interface SiteConfig {
  siteName: string
  defaultTitle: string
  defaultDescription: string
  siteOrigin: string
  basePath: string
  defaultOgImage: string
  defaultOgImageAlt: string
}

export const siteConfig: SiteConfig = {
  siteName: 'Randy Chen — Portfolio',
  defaultTitle: 'Randy Chen — Portfolio',
  defaultDescription: 'Randy Chen 的個人作品集，收錄經確認後公開的專案與技術內容。',
  siteOrigin: 'https://sesamepastenoodles.github.io',
  basePath: '/',
  defaultOgImage: '/og-default.png',
  defaultOgImageAlt: 'Randy Chen Portfolio — Deep Navy, Gold, and Modern Bauhaus design showcasing verified engineering projects',
}

/**
 * 依據給定的相對/絕對路徑，產生不含 localhost 的完整 Production 絕對 URL
 * @param path 相對路徑 (如 '/og-default.png')
 */
export function getAbsoluteUrl(path: string = '/'): string {
  const cleanBase = siteConfig.siteOrigin.endsWith('/')
    ? siteConfig.siteOrigin.slice(0, -1)
    : siteConfig.siteOrigin

  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${cleanBase}${cleanPath}`
}

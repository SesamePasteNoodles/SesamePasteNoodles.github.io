/* global console */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const distDir = path.resolve(process.cwd(), 'dist')
const srcDir = path.resolve(process.cwd(), 'src')

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ Smoke Check Failed: ${message}`)
    process.exit(1)
  }
}

console.log('🔍 Running Enhanced Production Build Smoke Check...')

// 1. Check dist directory & index.html non-empty
assert(fs.existsSync(distDir), '`dist` directory does not exist. Run `npm run build` first.')

const indexPath = path.join(distDir, 'index.html')
assert(fs.existsSync(indexPath), '`dist/index.html` does not exist.')
const indexStat = fs.statSync(indexPath)
assert(indexStat.size > 0, '`dist/index.html` is empty (0 bytes).')

const indexContent = fs.readFileSync(indexPath, 'utf-8')

// 2. Check title tag
assert(
  /<title>Randy Chen — Portfolio<\/title>/.test(indexContent),
  'Index HTML is missing valid <title> tag.',
)

// 3. Check metadata tags for non-empty content / href
const descMatch = indexContent.match(/<meta\s+name="description"\s+content="([^"]+)"/)
assert(descMatch && descMatch[1].trim().length > 0, 'Index HTML is missing valid non-empty description meta tag.')

const robotsMatch = indexContent.match(/<meta\s+name="robots"\s+content="([^"]+)"/)
assert(robotsMatch && robotsMatch[1].trim().length > 0, 'Index HTML is missing valid non-empty robots meta tag.')

const canonicalMatch = indexContent.match(/<link\s+rel="canonical"\s+href="https:\/\/sesamepastenoodles\.github\.io\/?"/)
assert(canonicalMatch, 'Index HTML is missing valid production HTTPS canonical link.')

const ogTitleMatch = indexContent.match(/<meta\s+property="og:title"\s+content="([^"]+)"/)
assert(ogTitleMatch && ogTitleMatch[1].trim().length > 0, 'Index HTML is missing valid non-empty og:title tag.')

const ogImageMatch = indexContent.match(/<meta\s+property="og:image"\s+content="(https:\/\/sesamepastenoodles\.github\.io\/([^"]+))"/)
assert(ogImageMatch, 'Index HTML default og:image is not a valid production HTTPS absolute URL.')

// 4. Verify that default og:image asset file actually exists in dist/
const defaultOgRelativePath = ogImageMatch[2]
const defaultOgFileInDist = path.join(distDir, defaultOgRelativePath)
assert(
  fs.existsSync(defaultOgFileInDist) && fs.statSync(defaultOgFileInDist).size > 0,
  `Default og:image target file \`dist/${defaultOgRelativePath}\` does not exist or is empty.`,
)

// 5. Check static icon files in dist
const staticAssets = ['favicon.svg', 'favicon-32x32.png', 'apple-touch-icon.png', 'og-default.png']
for (const asset of staticAssets) {
  const assetPath = path.join(distDir, asset)
  assert(fs.existsSync(assetPath), `Required static asset \`dist/${asset}\` is missing.`)
  assert(fs.statSync(assetPath).size > 0, `Required static asset \`dist/${asset}\` is empty (0 bytes).`)
}

// 6. Check projects static image directory & AI Agent real image in dist/projects/
const projectsDir = path.join(distDir, 'projects')
assert(fs.existsSync(projectsDir), '`dist/projects` directory is missing.')

const aiAgentImageInDist = path.join(projectsDir, 'ai-agent', 'ui-main-menu.png')
assert(
  fs.existsSync(aiAgentImageInDist) && fs.statSync(aiAgentImageInDist).size > 0,
  '`dist/projects/ai-agent/ui-main-menu.png` does not exist or is empty (0 bytes).',
)

const oldAiAgentImageInDist = path.join(projectsDir, 'ai-agent', 'main-menu.jpg')
assert(
  !fs.existsSync(oldAiAgentImageInDist),
  'Old unapproved asset `dist/projects/ai-agent/main-menu.jpg` still exists in dist output.',
)

const happetImageFiles = [
  '01-my-wallet.png',
  '02-payment-admin.png',
  '03-member-center.png',
  '04-member-admin.png',
  '05-matching-orders.png',
  '06-expert-records.png',
  '07-pet-profile.png',
  '08-community-home.png',
  '09-marketplace-home.png',
]

for (const imageFile of happetImageFiles) {
  const imageInDist = path.join(projectsDir, 'happet', imageFile)
  assert(
    fs.existsSync(imageInDist) && fs.statSync(imageInDist).size > 0,
    `\`dist/projects/happet/${imageFile}\` does not exist or is empty (0 bytes).`,
  )
}

// 7. Check JS & CSS bundles in dist/assets
const assetsDir = path.join(distDir, 'assets')
assert(fs.existsSync(assetsDir), '`dist/assets` directory does not exist.')

const assetFiles = fs.readdirSync(assetsDir)
const jsFiles = assetFiles.filter((f) => f.endsWith('.js') && fs.statSync(path.join(assetsDir, f)).size > 0)
const hasCss = assetFiles.some((f) => f.endsWith('.css') && fs.statSync(path.join(assetsDir, f)).size > 0)

assert(jsFiles.length > 0, 'No valid non-empty JavaScript bundle found in `dist/assets`.')
assert(hasCss, 'No valid non-empty CSS bundle found in `dist/assets`.')

// 8. Verify removed copy is not in dist JS bundles
const combinedJsContent = jsFiles
  .map((f) => fs.readFileSync(path.join(assetsDir, f), 'utf-8'))
  .join('\n')

const removedStrings = [
  'PROFILE INDEX',
  'RC—01',
  'PUBLIC PROFILE',
  'VERIFIED LINKS',
  'ONLY VERIFIED CONTENT IS PUBLISHED',
  '02 / APPROACH',
  'BUILT TO MAKE THE WORK CLEAR.',
  'main-menu.jpg',
  'mailto:',
]

for (const str of removedStrings) {
  assert(!combinedJsContent.includes(str), `Removed internal string or asset reference "${str}" found in production JS bundle!`)
}

// 9. Verify featured & all project slugs and route exist in production bundle
const requiredSlugs = ['happet', 'shi-ruan-ticketing-system', 'ai-agent-rules-sync']
for (const slug of requiredSlugs) {
  assert(combinedJsContent.includes(slug), `Required project slug "${slug}" not found in production JS bundle.`)
}

assert(
  combinedJsContent.includes('/projects') || combinedJsContent.includes('projects'),
  'Projects route definition missing from production bundle.',
)

assert(
  combinedJsContent.includes('https://github.com/SesamePasteNoodles/HAPPET'),
  'HAPPET repository URL missing from production JS bundle.',
)

// 10. Source contract checks for Projects row layout criteria
const projectsViewSrc = fs.readFileSync(path.join(srcDir, 'views', 'ProjectsView.vue'), 'utf-8')
assert(
  !/<main[\s>]/.test(projectsViewSrc),
  'ProjectsView.vue contains nested `<main>` landmark. Only `App.vue` should provide `<main>`.',
)
assert(
  projectsViewSrc.includes('ProjectOverviewCard'),
  'ProjectsView.vue must use `ProjectOverviewCard` component.',
)
assert(
  projectsViewSrc.includes('getProjectsForOverview'),
  'ProjectsView.vue must use `getProjectsForOverview` to determine project ordering.',
)
assert(
  !projectsViewSrc.includes('grid-row: span 2'),
  'ProjectsView.vue must not contain Bento `grid-row: span 2` rules.',
)
assert(
  !projectsViewSrc.includes('bento-grid-item--featured'),
  'ProjectsView.vue must not contain Bento `bento-grid-item--featured` class.',
)
assert(
  !projectsViewSrc.includes('nth-child'),
  'ProjectsView.vue must not use `nth-child` rules to determine card layout sizes.',
)

const heroMediaSrc = fs.readFileSync(path.join(srcDir, 'components', 'project', 'ProjectHeroMedia.vue'), 'utf-8')
assert(
  heroMediaSrc.includes('loading="eager"') && heroMediaSrc.includes('fetchpriority="high"'),
  'ProjectHeroMedia.vue must specify both `loading="eager"` and `fetchpriority="high"` on hero media.',
)

const overviewCardSrc = fs.readFileSync(path.join(srcDir, 'components', 'projects', 'ProjectOverviewCard.vue'), 'utf-8')
assert(
  /min-height:\s*2\.75rem/.test(overviewCardSrc) || /min-height:\s*44px/.test(overviewCardSrc),
  'ProjectOverviewCard.vue `.project-overview-card__cta` must have `min-height: 2.75rem` (44px) or equivalent touch target height.',
)
assert(
  overviewCardSrc.includes('loading="lazy"'),
  'ProjectOverviewCard.vue image must use `loading="lazy"`.',
)

console.log('✅ All Enhanced Production Build Smoke Checks Passed Successfully!')

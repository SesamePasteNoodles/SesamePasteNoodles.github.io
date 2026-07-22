/* global console */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const distDir = path.resolve(process.cwd(), 'dist')

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

// 6. Check projects static image directory in dist/projects/
const projectsDir = path.join(distDir, 'projects')
assert(fs.existsSync(projectsDir), '`dist/projects` directory is missing.')
const projectSubdirs = fs.readdirSync(projectsDir)
assert(projectSubdirs.length > 0, '`dist/projects` directory has no project assets.')

// 7. Check JS & CSS bundles in dist/assets
const assetsDir = path.join(distDir, 'assets')
assert(fs.existsSync(assetsDir), '`dist/assets` directory does not exist.')

const assetFiles = fs.readdirSync(assetsDir)
const hasJs = assetFiles.some((f) => f.endsWith('.js') && fs.statSync(path.join(assetsDir, f)).size > 0)
const hasCss = assetFiles.some((f) => f.endsWith('.css') && fs.statSync(path.join(assetsDir, f)).size > 0)

assert(hasJs, 'No valid non-empty JavaScript bundle found in `dist/assets`.')
assert(hasCss, 'No valid non-empty CSS bundle found in `dist/assets`.')

console.log('✅ All Enhanced Production Build Smoke Checks Passed Successfully!')

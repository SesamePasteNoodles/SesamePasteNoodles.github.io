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

console.log('🔍 Running Production Build Smoke Check...')

// 1. Check dist directory
assert(fs.existsSync(distDir), '`dist` directory does not exist. Run `npm run build` first.')

// 2. Check dist/index.html
const indexPath = path.join(distDir, 'index.html')
assert(fs.existsSync(indexPath), '`dist/index.html` does not exist.')

const indexContent = fs.readFileSync(indexPath, 'utf-8')

// 3. Check critical HTML elements & metadata
assert(indexContent.includes('<title>Randy Chen — Portfolio</title>'), 'Index HTML is missing <title> tag.')
assert(indexContent.includes('name="description"'), 'Index HTML is missing description meta tag.')
assert(indexContent.includes('name="robots"'), 'Index HTML is missing robots meta tag.')
assert(indexContent.includes('rel="canonical"'), 'Index HTML is missing canonical link.')
assert(indexContent.includes('property="og:title"'), 'Index HTML is missing og:title tag.')
assert(indexContent.includes('property="og:image"'), 'Index HTML is missing og:image tag.')

// 4. Check static asset files in dist
assert(fs.existsSync(path.join(distDir, 'favicon.svg')), '`dist/favicon.svg` is missing.')
assert(fs.existsSync(path.join(distDir, 'favicon-32x32.png')), '`dist/favicon-32x32.png` is missing.')
assert(fs.existsSync(path.join(distDir, 'apple-touch-icon.png')), '`dist/apple-touch-icon.png` is missing.')
assert(fs.existsSync(path.join(distDir, 'og-default.png')), '`dist/og-default.png` is missing.')

// 5. Check JS & CSS bundles in dist/assets
const assetsDir = path.join(distDir, 'assets')
assert(fs.existsSync(assetsDir), '`dist/assets` directory does not exist.')

const assetFiles = fs.readdirSync(assetsDir)
const hasJs = assetFiles.some((f) => f.endsWith('.js'))
const hasCss = assetFiles.some((f) => f.endsWith('.css'))

assert(hasJs, 'No JavaScript bundle found in `dist/assets`.')
assert(hasCss, 'No CSS bundle found in `dist/assets`.')

console.log('✅ All Production Build Smoke Checks Passed Successfully!')

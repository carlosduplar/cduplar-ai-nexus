# SSR/Prerendering Implementation Guide

## Overview

This project now uses **custom Puppeteer-based prerendering** to generate SEO-friendly static HTML at build time. This solves the critical SEO issue where search engine crawlers see empty pages.

## ✅ Implementation Status

**COMPLETED** - Full prerendering is now active and working.

### What Was Implemented

1. **Custom Prerendering Script** (`scripts/prerender.mjs`)
   - Uses Puppeteer to render the React app
   - Waits for full component hydration
   - Extracts complete rendered HTML
   - Replaces empty index.html with pre-rendered content

2. **React Hydration Support** (`src/main.tsx`)
   - Detects pre-rendered content
   - Uses `hydrateRoot()` for pre-rendered pages
   - Falls back to `createRoot()` for development

3. **Build Process Integration**
   - `npm run build` - Full build with prerendering
   - `npm run build:no-prerender` - Build without prerendering (faster for dev)
   - `npm run prerender` - Run prerendering manually

## 🔍 SEO Benefits

### Before Prerendering
```html
<body>
  <div id="root"></div>
  <script src="/assets/index.js"></script>
</body>
```
❌ Search engines see: **NOTHING**

### After Prerendering
```html
<body>
  <div id="root">
    <nav>...</nav>
    <header>
      <h1>Carlos Duplar Mello - Transforming Complex Technical Challenges...</h1>
      <p>Digital Transformation Project Manager at HEIG-VD | AI Product Owner...</p>
      <!-- ALL CONTENT VISIBLE -->
    </header>
    <main>...</main>
  </div>
  <script src="/assets/index.js"></script>
</body>
```
✅ Search engines see: **FULL CONTENT**

## 📦 Build Commands

### Production Build (with prerendering)
```bash
npm run build
```
- Builds Vite app to `dist/`
- Launches Puppeteer to render the page
- Extracts fully rendered HTML
- Replaces index.html with pre-rendered version
- **Time:** ~40-50 seconds

### Development Build (no prerendering)
```bash
npm run build:dev
```
- Faster build for testing
- No prerendering step
- Still includes all other optimizations

### Manual Prerendering
```bash
npm run prerender
```
- Run prerendering on existing `dist/` folder
- Useful for testing prerendering changes

### Local Development
```bash
npm run dev
```
- No prerendering (not needed for dev)
- Hot module reload works normally

## 🔧 How It Works

### 1. Build Phase
```bash
vite build
```
Outputs standard React SPA to `dist/`

### 2. Prerendering Phase
```bash
node scripts/prerender.mjs
```

The script:
1. Starts local Vite server on port 3000
2. Launches headless Chromium via Puppeteer
3. Navigates to `http://localhost:3000`
4. Waits for React to fully render (`#root > *`)
5. Waits additional 2 seconds for all components
6. Extracts complete HTML including:
   - All rendered React components
   - Inline Tailwind CSS
   - Populated content (text, images, links)
7. Saves pre-rendered HTML to `dist/index.html`
8. Closes browser and server

### 3. Hydration Phase (Client-Side)

When users visit the site:

```typescript
// src/main.tsx
const rootElement = document.getElementById("root")!;

if (rootElement.hasChildNodes()) {
  // Pre-rendered content exists, hydrate it
  hydrateRoot(rootElement, <App />);
} else {
  // No pre-rendered content (dev mode), render normally
  createRoot(rootElement).render(<App />);
}
```

- React attaches event listeners to pre-rendered HTML
- No visual flash or re-render
- Interactive features work immediately

## 🌐 Multi-Language Support

The prerenderer captures whatever language React renders by default:
- Currently renders in **French** (detected from browser)
- Search engines get full content in the detected language
- Client-side language switching still works after hydration

### To Prerender Multiple Languages

Modify `scripts/prerender.mjs` to prerender all language versions:

```javascript
const languages = ['en', 'pt', 'fr', 'de', 'es'];

for (const lang of languages) {
  await page.goto(`http://localhost:3000?lang=${lang}`);
  // ... extract and save to dist/${lang}/index.html
}
```

## 📊 Verification

### Check Prerendered Content
```bash
grep -A 10 '<div id="root">' dist/index.html
```

Should show actual HTML content, not empty `<div id="root"></div>`

### Test with Search Engine View
```bash
curl http://localhost:4173 | grep -i "Carlos"
```

Should return matches (search engines see this content)

### Verify Hydration Works
1. `npm run preview`
2. Open http://localhost:4173
3. Check browser console for hydration warnings (there should be none)
4. Test interactive features (language switcher, navigation, etc.)

## 🚀 Deployment

### Firebase Hosting (Current Setup)
```bash
npm run build
firebase deploy
```

The prerendered `dist/` folder is deployed directly.

### Other Platforms
- **Netlify:** Deploy `dist/` folder
- **Vercel:** Deploy `dist/` folder
- **GitHub Pages:** Deploy `dist/` folder
- **AWS S3:** Upload `dist/` folder to S3 bucket

All static hosting platforms work without special configuration.

## 🐛 Troubleshooting

### Prerendering Fails
```bash
# Check if port 3000 is available
npx kill-port 3000

# Run prerendering with more verbose output
npm run prerender
```

### Hydration Mismatch Warnings
- Usually caused by client-only features (localStorage, dates)
- Add `suppressHydrationWarning` to affected elements
- Or use `useEffect` to render client-only content

### Content Not Appearing
- Verify React components render on first load
- Check for async data loading (prerenderer waits 2s max)
- Increase wait time in `scripts/prerender.mjs` if needed

## 📝 Technical Details

### Dependencies
- **puppeteer** (^24.22.3) - Headless browser for rendering
- **vite** - Dev server for prerendering

### File Changes
```
package.json         - Added prerender scripts
src/main.tsx         - Added hydration support
scripts/prerender.mjs - New: Prerendering script
PRERENDERING.md      - This documentation
```

### Browser Compatibility
- **Modern browsers:** Use pre-rendered HTML + hydration
- **Firefox Android:** Use pre-rendered HTML + legacy polyfills
- **Search engines:** Parse pre-rendered HTML only

## 🎯 Results

### Before Implementation
- Google Search Console: 0 indexed pages
- Empty `<body>` for crawlers
- Zero SEO value

### After Implementation
- Full HTML content visible to crawlers
- All text, headings, and links indexed
- Rich snippets possible (structured data included)
- Instant content display (no loading spinner)

## 🔮 Future Enhancements

### 1. Multi-Language Prerendering
Generate separate HTML files for each language:
- `dist/index.html` (default/en)
- `dist/fr/index.html`
- `dist/pt/index.html`
- etc.

### 2. Route-Based Prerendering
If adding multiple pages, prerender each route:
- `dist/index.html` (home)
- `dist/projects/index.html`
- `dist/contact/index.html`

### 3. Incremental Static Regeneration
- Rebuild prerendered pages periodically
- Update content without full redeployment

### 4. Dynamic Social Media Previews
- Generate custom OpenGraph images per page
- Update meta tags based on route

## 📚 References

- [React Hydration Docs](https://react.dev/reference/react-dom/client/hydrateRoot)
- [Puppeteer Documentation](https://pptr.dev/)
- [Vite SSR Guide](https://vitejs.dev/guide/ssr.html)

---

**Implementation Date:** September 30, 2025
**Status:** ✅ Production Ready
**Maintained By:** Carlos Duplar Mello
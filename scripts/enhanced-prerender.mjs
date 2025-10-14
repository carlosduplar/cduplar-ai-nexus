import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import serveStatic from 'serve-static';
import finalhandler from 'finalhandler';

// Import supported languages from the utility file
import { SUPPORTED_LANGUAGES } from '../src/utils/languageDetector.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');
const BASE_URL = 'http://localhost:3000';

/**
 * Ensures the directory for the given file path exists.
 * @param {string} filePath
 */
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
}

/**
 * Prerenders a single URL and saves the output.
 * @param {import('puppeteer').Browser} browser
 * @param {string} urlPath - The path to navigate to (e.g., '/', '/en/')
 * @param {string} outputPath - The absolute path to save the HTML file (e.g., 'dist/index.html')
 */
async function prerenderUrl(browser, urlPath, outputPath) {
  const page = await browser.newPage();
  let success = false;

  try {
    console.log(`\n🔍 Prerendering URL: ${urlPath}`);

    // Enable console logging from the page
    page.on('console', msg => console.log('  PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('  PAGE ERROR:', error.message));

    // Go to the page and wait for it to be fully rendered
    await page.goto(`${BASE_URL}${urlPath}`, {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    console.log(`  ✓ Page loaded: ${urlPath}`);

    // Wait for React to render content with increased timeout
    try {
      await page.waitForSelector('#root > *', { timeout: 30000 });
      console.log(`  ✓ Root selector found`);
    } catch (err) {
      // Log the current HTML to debug
      const html = await page.content();
      console.log(`  ❌ Root selector timeout. Current HTML length: ${html.length}`);
      console.log(`  First 500 chars:`, html.substring(0, 500));
      throw err;
    }

    // Give extra time for all components to mount and i18n to initialize
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));

    // Get the fully rendered HTML
    const html = await page.content();

    // Save the prerendered HTML
    ensureDirectoryExistence(outputPath);
    fs.writeFileSync(outputPath, html);

    console.log(`✅ Successfully prerendered ${urlPath}`);
    console.log(`📁 Output: ${outputPath}`);

    success = true;
  } catch (error) {
    console.error(`❌ Error during prerendering ${urlPath}:`, error);
  } finally {
    await page.close();
  }
  return success;
}

async function enhancedPrerender() {
  console.log('🚀 Starting enhanced multilingual prerendering process...');

  // Setup the static server
  const serve = serveStatic(distPath, { index: ['index.html'] });
  const server = http.createServer((req, res) => {
    serve(req, res, (err) => {
      if (err) {
        return finalhandler(req, res)(err);
      }
      // SPA fallback: if no file was found, rewrite the URL to index.html
      // and try serving again.
      if (!res.headersSent) {
        req.url = '/index.html';
        serve(req, res, finalhandler(req, res));
      }
    });
  });

  await new Promise(resolve => server.listen(3000, resolve));
  console.log(`✅ Local server started on ${BASE_URL}`);

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let allSuccess = true;

  try {
    // 1. Skip prerendering the root path to avoid hydration mismatch
    // The root path redirects to a language-specific path anyway
    console.log('\n⏭️  Skipping root path prerendering (redirects to language-specific path)');

    // 2. Prerender all language-specific paths
    for (const lang of SUPPORTED_LANGUAGES) {
      const urlPath = `/${lang}/`;
      const outputPath = path.join(distPath, lang, 'index.html');
      if (!await prerenderUrl(browser, urlPath, outputPath)) {
        allSuccess = false;
      }
    }

  } catch (error) {
    console.error('❌ Fatal error during enhanced prerendering:', error);
    allSuccess = false;
  } finally {
    await browser.close();
    server.close();
    console.log('\n🛑 Server stopped');
  }

  if (!allSuccess) {
    console.error('Enhanced prerendering failed for one or more languages.');
    process.exit(1);
  } else {
    console.log('\n🎉 Enhanced multilingual prerendering completed successfully.');
  }
}

enhancedPrerender().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

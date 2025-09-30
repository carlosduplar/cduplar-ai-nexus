import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');

async function prerender() {
  console.log('🚀 Starting prerendering process...');

  // Start a local server for the dist folder
  const server = await createServer({
    root: distPath,
    server: {
      port: 3000
    }
  });

  await server.listen();
  console.log('✅ Local server started on http://localhost:3000');

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    console.log('🔍 Loading page...');

    // Go to the page and wait for it to be fully rendered
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for React to render content
    await page.waitForSelector('#root > *', { timeout: 10000 });

    // Give extra time for all components to mount
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    console.log('📝 Extracting rendered HTML...');

    // Get the fully rendered HTML
    const html = await page.content();

    // Save the prerendered HTML
    const indexPath = path.join(distPath, 'index.html');
    fs.writeFileSync(indexPath, html);

    console.log('✅ Successfully prerendered index.html');
    console.log(`📁 Output: ${indexPath}`);

    // Log first 500 chars of the root div to verify content
    const rootContent = await page.evaluate(() => {
      const root = document.getElementById('root');
      return root ? root.innerHTML.substring(0, 500) : 'No content';
    });
    console.log('📄 Preview of rendered content:');
    console.log(rootContent.substring(0, 200) + '...');

  } catch (error) {
    console.error('❌ Error during prerendering:', error);
    throw error;
  } finally {
    await browser.close();
    await server.close();
    console.log('🛑 Server stopped');
  }
}

prerender().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
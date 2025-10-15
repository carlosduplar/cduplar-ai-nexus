import http from 'http';
import serveStatic from 'serve-static';
import finalhandler from 'finalhandler';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');

const serve = serveStatic(distPath, { index: ['index.html'] });
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  serve(req, res, (err) => {
    if (err) {
      console.error(`Error serving ${req.url}:`, err);
      return finalhandler(req, res)(err);
    }
    // SPA fallback
    if (!res.headersSent) {
      console.log(`  -> Fallback to index.html for ${req.url}`);
      req.url = '/index.html';
      serve(req, res, finalhandler(req, res));
    }
  });
});

server.listen(3000, () => {
  console.log('Test server running on http://localhost:3000');
  console.log('Try accessing:');
  console.log('  - http://localhost:3000/en/');
  console.log('  - http://localhost:3000/locales/en/translation.json');
  console.log('Press Ctrl+C to stop');
});

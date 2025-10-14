import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import language data
import { SUPPORTED_LANGUAGES, LANGUAGE_METADATA } from '../src/utils/languageDetector.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');
const BASE_URL = 'https://carlosmello.work';

/**
 * Generates the XML for the <url> block including hreflang annotations.
 * @param {string} lang - The language code for the current sitemap.
 * @returns {string} The XML string for the URL.
 */
function generateUrlXml(lang) {
  const url = `${BASE_URL}/${lang}/`;
  let xml = `  <url>\n`;
  xml += `    <loc>${url}</loc>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;

  // Add hreflang annotations for all supported languages
  for (const altLang of SUPPORTED_LANGUAGES) {
    const altUrl = `${BASE_URL}/${altLang}/`;
    const hreflang = LANGUAGE_METADATA[altLang].hreflang;
    xml += `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${altUrl}" />\n`;
  }

  // Add x-default for the root URL (which should redirect to the best language)
  // Assuming the root URL is the x-default
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/" />\n`;

  xml += `  </url>\n`;
  return xml;
}

/**
 * Generates a single language sitemap file.
 * @param {string} lang - The language code.
 */
function generateLanguageSitemap(lang) {
  const filePath = path.join(distPath, `sitemap-${lang}.xml`);
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // For simplicity, we only include the root page for now, as per the task description
  // In a real app, this would loop over all pages.
  xml += generateUrlXml(lang);

  xml += `</urlset>\n`;

  fs.writeFileSync(filePath, xml);
  console.log(`✅ Generated sitemap for ${lang}: ${path.basename(filePath)}`);
}

/**
 * Generates the main sitemap index file.
 */
function generateSitemapIndex() {
  const filePath = path.join(distPath, 'sitemap.xml');
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add sitemap entries for each language
  for (const lang of SUPPORTED_LANGUAGES) {
    const sitemapUrl = `${BASE_URL}/sitemap-${lang}.xml`;
    xml += `  <sitemap>\n`;
    xml += `    <loc>${sitemapUrl}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `  </sitemap>\n`;
  }

  xml += `</sitemapindex>\n`;

  fs.writeFileSync(filePath, xml);
  console.log(`✅ Generated sitemap index: ${path.basename(filePath)}`);
}

function generateSitemaps() {
  console.log('🚀 Starting sitemap generation...');

  // 1. Generate individual language sitemaps
  for (const lang of SUPPORTED_LANGUAGES) {
    generateLanguageSitemap(lang);
  }

  // 2. Generate the sitemap index
  generateSitemapIndex();

  console.log('🎉 Sitemap generation completed successfully.');
}

generateSitemaps();

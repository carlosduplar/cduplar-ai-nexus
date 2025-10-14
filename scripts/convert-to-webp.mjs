import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.resolve(__dirname, '../src/assets');
const publicDir = path.resolve(__dirname, '../public');

async function convertImageToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    console.log(`Converted: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error.message);
    return false;
  }
}

async function processDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();

      // Only convert PNG, JPG, JPEG images to WebP
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const outputPath = fullPath.replace(ext, '.webp');

        // Only convert if WebP doesn't exist or is older than source
        if (!fs.existsSync(outputPath) ||
            fs.statSync(fullPath).mtime > fs.statSync(outputPath).mtime) {
          await convertImageToWebP(fullPath, outputPath);
        } else {
          console.log(`Skipped (up to date): ${entry.name}`);
        }
      }
    }
  }
}

async function main() {
  console.log('Starting image conversion to WebP format...\n');

  console.log('Processing src/assets directory...');
  if (fs.existsSync(assetsDir)) {
    await processDirectory(assetsDir);
  }

  console.log('\nProcessing public directory...');
  if (fs.existsSync(publicDir)) {
    await processDirectory(publicDir);
  }

  console.log('\nImage conversion complete!');
}

main().catch(console.error);

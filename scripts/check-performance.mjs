#!/usr/bin/env node

/**
 * Performance checking script
 * Analyzes build output and provides insights
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = join(__dirname, '..', 'dist');
const jsPath = join(distPath, 'assets', 'js');
const cssPath = join(distPath, 'assets', 'css');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getFileSize(filePath) {
  try {
    const stats = statSync(filePath);
    return stats.size;
  } catch (e) {
    return 0;
  }
}

function analyzeDirectory(dirPath, fileType) {
  try {
    const files = readdirSync(dirPath);
    const fileStats = files
      .filter(f => f.endsWith(fileType === 'js' ? '.js' : '.css'))
      .map(f => {
        const filePath = join(dirPath, f);
        const size = getFileSize(filePath);
        return { name: f, size };
      })
      .sort((a, b) => b.size - a.size);

    return fileStats;
  } catch (e) {
    return [];
  }
}

function getStatusColor(size, thresholds) {
  if (size < thresholds.good) return colors.green;
  if (size < thresholds.warning) return colors.yellow;
  return colors.red;
}

function main() {
  console.log(`\n${colors.bright}${colors.cyan}=== Performance Analysis ===${colors.reset}\n`);

  // Analyze JavaScript bundles
  console.log(`${colors.bright}JavaScript Bundles:${colors.reset}`);
  const jsFiles = analyzeDirectory(jsPath, 'js');
  let totalJsSize = 0;

  if (jsFiles.length === 0) {
    console.log(`${colors.yellow}No JS files found. Have you run 'npm run build'?${colors.reset}\n`);
  } else {
    jsFiles.forEach(file => {
      totalJsSize += file.size;
      const sizeColor = getStatusColor(file.size, {
        good: 150 * 1024,
        warning: 250 * 1024,
      });
      console.log(`  ${sizeColor}• ${file.name}: ${formatBytes(file.size)}${colors.reset}`);
    });
    console.log(`  ${colors.bright}Total JS: ${formatBytes(totalJsSize)}${colors.reset}\n`);
  }

  // Analyze CSS bundles
  console.log(`${colors.bright}CSS Files:${colors.reset}`);
  const cssFiles = analyzeDirectory(cssPath, 'css');
  let totalCssSize = 0;

  if (cssFiles.length === 0) {
    console.log(`${colors.yellow}No CSS files found.${colors.reset}\n`);
  } else {
    cssFiles.forEach(file => {
      totalCssSize += file.size;
      const sizeColor = getStatusColor(file.size, {
        good: 50 * 1024,
        warning: 100 * 1024,
      });
      console.log(`  ${sizeColor}• ${file.name}: ${formatBytes(file.size)}${colors.reset}`);
    });
    console.log(`  ${colors.bright}Total CSS: ${formatBytes(totalCssSize)}${colors.reset}\n`);
  }

  // Overall analysis
  const totalSize = totalJsSize + totalCssSize;
  console.log(`${colors.bright}Overall Statistics:${colors.reset}`);
  console.log(`  Total Bundle Size: ${formatBytes(totalSize)}`);
  console.log(`  Number of JS chunks: ${jsFiles.length}`);
  console.log(`  Number of CSS files: ${cssFiles.length}\n`);

  // Performance recommendations
  console.log(`${colors.bright}Performance Assessment:${colors.reset}`);

  const largeFiles = [...jsFiles, ...cssFiles].filter(f => f.size > 250 * 1024);
  if (largeFiles.length > 0) {
    console.log(`  ${colors.yellow}⚠ Warning: ${largeFiles.length} file(s) exceed 250KB${colors.reset}`);
    largeFiles.forEach(f => {
      console.log(`    - ${f.name}: ${formatBytes(f.size)}`);
    });
  } else {
    console.log(`  ${colors.green}✓ All bundles are within recommended size limits${colors.reset}`);
  }

  if (jsFiles.length < 3) {
    console.log(`  ${colors.yellow}⚠ Consider more code splitting (only ${jsFiles.length} JS chunks)${colors.reset}`);
  } else {
    console.log(`  ${colors.green}✓ Good code splitting with ${jsFiles.length} chunks${colors.reset}`);
  }

  if (totalSize > 500 * 1024) {
    console.log(`  ${colors.yellow}⚠ Total bundle size exceeds 500KB${colors.reset}`);
  } else {
    console.log(`  ${colors.green}✓ Total bundle size is optimal${colors.reset}`);
  }

  // Budget check
  console.log(`\n${colors.bright}Budget Check:${colors.reset}`);
  const budgets = {
    initialJS: { target: 200 * 1024, current: totalJsSize, name: 'Initial JS' },
    totalCSS: { target: 100 * 1024, current: totalCssSize, name: 'Total CSS' },
    totalBundle: { target: 500 * 1024, current: totalSize, name: 'Total Bundle' },
  };

  Object.values(budgets).forEach(budget => {
    const percentage = (budget.current / budget.target) * 100;
    const status = percentage < 80 ? colors.green : percentage < 100 ? colors.yellow : colors.red;
    const icon = percentage < 80 ? '✓' : percentage < 100 ? '⚠' : '✗';
    console.log(
      `  ${status}${icon} ${budget.name}: ${formatBytes(budget.current)} / ${formatBytes(budget.target)} (${percentage.toFixed(1)}%)${colors.reset}`
    );
  });

  // Recommendations
  console.log(`\n${colors.bright}Recommendations:${colors.reset}`);
  if (totalSize > 400 * 1024) {
    console.log(`  1. Consider further code splitting for route-based chunks`);
    console.log(`  2. Analyze and remove unused dependencies`);
    console.log(`  3. Use dynamic imports for heavy components`);
  } else if (totalSize > 300 * 1024) {
    console.log(`  1. Monitor bundle size on future updates`);
    console.log(`  2. Consider implementing bundle size budgets in CI`);
  } else {
    console.log(`  ${colors.green}Bundle is well optimized! Good job!${colors.reset}`);
  }

  console.log(`\n${colors.cyan}Run 'npm run build -- --mode analyze' for detailed bundle analysis${colors.reset}\n`);
}

main();

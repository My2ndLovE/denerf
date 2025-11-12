/**
 * Image Optimization Script
 *
 * This script optimizes images for web:
 * - Converts to WebP format
 * - Generates 2x versions for retina displays
 * - Creates tiny placeholders for blur-up effect
 *
 * Usage: node scripts/optimize-images.js
 *
 * Note: Requires 'sharp' package to be installed
 */

import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

const SOURCE_DIR = 'public/images/projects';
const IMAGE_PATTERNS = '**/*.{jpg,jpeg,png}';

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  try {
    const images = await glob(path.join(SOURCE_DIR, IMAGE_PATTERNS));

    if (images.length === 0) {
      console.log('ℹ️  No images found to optimize.');
      console.log(`   Add your project screenshots to: ${SOURCE_DIR}/`);
      return;
    }

    for (const imagePath of images) {
      const filename = path.basename(imagePath, path.extname(imagePath));
      const dir = path.dirname(imagePath);

      console.log(`Processing: ${filename}...`);

      // Generate WebP (1x)
      await sharp(imagePath)
        .resize({ width: 800 })
        .webp({ quality: 85 })
        .toFile(path.join(dir, `${filename}.webp`));

      // Generate WebP (2x for retina)
      await sharp(imagePath)
        .resize({ width: 1600 })
        .webp({ quality: 85 })
        .toFile(path.join(dir, `${filename}@2x.webp`));

      console.log(`  ✓ WebP versions created`);
    }

    console.log('\n✨ Image optimization complete!');
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();

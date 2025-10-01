#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const IMAGES_FOLDER = path.join(__dirname, 'public', 'images');
const OUTPUT_FILE = path.join(__dirname, 'public', 'imageData.json');

// Random photo captions
const PHOTO_CAPTIONS = [
    "YAY You are so awesome Mama!",
    "Kakak seneng banget bisa jadi anak Mama karena Mama orang yang baik hati, semangat, dan always motivated!",
    "Mama itu the best mama in the world! kakak sayang BANYAK sama Mama!",
    "JUJUR kakak kangen momz banget!",
    "I AM SO happy that i get learn so much from mama! kalo dipikir-pikir kakak sebenarnya asiknya sama kayak mama hahaha",
    "NANTI PAS KAKAK KETEMU MOMZ LAGI I WILLL HUG YOU FOR A LONG TIME! (3 DETIK!) HDBAWHDBAHWDBAHBDAW TAPI YES KAKAK KANGEN MOMZ BANGET SAMA EMZ JUGA KAKAK KANGEN GANGGUIN DAN ISENGIN YOU GUYS BHDABDHABDA"
];

function createImagesFolder() {
  if (!fs.existsSync(IMAGES_FOLDER)) {
    fs.mkdirSync(IMAGES_FOLDER, { recursive: true });
    console.log('📁 Created images folder at:', IMAGES_FOLDER);
  }
}

function getImageFiles() {
  if (!fs.existsSync(IMAGES_FOLDER)) {
    return [];
  }
  
  const files = fs.readdirSync(IMAGES_FOLDER);
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
  
  return files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    })
    .sort((a, b) => {
      // Sort by filename, you can customize this logic
      // Extract numbers for better sorting (e.g., img1.jpg, img2.jpg, img10.jpg)
      const aMatch = a.match(/(\d+)/);
      const bMatch = b.match(/(\d+)/);
      
      if (aMatch && bMatch) {
        return parseInt(aMatch[1]) - parseInt(bMatch[1]);
      }
      
      return a.localeCompare(b);
    });
}

function generateImageData() {
  const imageFiles = getImageFiles();
  
  if (imageFiles.length === 0) {
    console.log('⚠️  No images found in the images folder.');
    console.log('📝 Please add some images to:', IMAGES_FOLDER);
    return;
  }
  
  console.log(`🖼️  Found ${imageFiles.length} images:`, imageFiles);
  
  const imageData = imageFiles.map((filename, index) => {
    // Cycle through captions to ensure variety, or use random if we have more images than captions
    const captionIndex = index < PHOTO_CAPTIONS.length ? index : Math.floor(Math.random() * PHOTO_CAPTIONS.length);
    const selectedCaption = PHOTO_CAPTIONS[captionIndex];
    
    return {
      id: index + 1,
      filename: filename,
      src: `/images/${filename}`,
      alt: `Beautiful photo of Mom`,
      text: selectedCaption
    };
  });
  
  // Write the data to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(imageData, null, 2));
  
  console.log('✅ Successfully generated image data!');
  console.log(`📄 Output saved to: ${OUTPUT_FILE}`);
  console.log('🔄 Your website will automatically use these images now.');
  
  return imageData;
}

function watchFolder() {
  console.log('👀 Watching for changes in:', IMAGES_FOLDER);
  
  fs.watchFile(IMAGES_FOLDER, { persistent: true, interval: 1000 }, () => {
    console.log('📁 Images folder changed, regenerating...');
    generateImageData();
  });
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const shouldWatch = args.includes('--watch') || args.includes('-w');
  
  console.log('🎨 Birthday Website Image Generator');
  console.log('=====================================');
  
  createImagesFolder();
  generateImageData();
  
  if (shouldWatch) {
    watchFolder();
    console.log('Press Ctrl+C to stop watching...');
  }
}

// Run if called directly
main();

export { generateImageData, getImageFiles };
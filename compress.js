const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directories = [
  'public/cases/invisalign',
  'public/cases/gaps-fixed',
  'public/cases/aesthetic-fillings'
];

async function processImages() {
  for (const dir of directories) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith('.jpg') || file.endsWith('.JPG')) {
        const filePath = path.join(dir, file);
        const webpPath = filePath.replace(/\.jpg$/i, '.webp');
        
        console.log(`Processing ${filePath} -> ${webpPath}`);
        await sharp(filePath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(webpPath);
          
        fs.unlinkSync(filePath); // delete original large jpg
      }
    }
  }
}

processImages().catch(console.error);

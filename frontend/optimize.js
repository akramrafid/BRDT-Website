import fs from 'fs';
import path from 'path';

const publicDir = path.join('f:', 'BRDT-Charity v1', 'frontend', 'public');

function optimizeHtmlImages(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      optimizeHtmlImages(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      
      // Add loading="lazy" to img tags that don't already have it
      let updatedContent = content.replace(/<img(?!.*?loading=(['"])lazy\2)[^>]*>/gi, (match) => {
        // Skip logo and hero images as they should load immediately
        if (match.includes('logo') || match.includes('hero') || match.includes('banner')) {
          return match;
        }
        return match.replace('<img', '<img loading="lazy"');
      });

      if (content !== updatedContent) {
        fs.writeFileSync(fullPath, updatedContent, 'utf-8');
        console.log(`Optimized images in ${file}`);
      }
    }
  }
}

optimizeHtmlImages(publicDir);
console.log('Successfully optimized images with lazy loading!');

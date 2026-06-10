import fs from 'fs';
import path from 'path';

const publicDir = path.join('f:', 'BRDT-Charity v1', 'frontend', 'public');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('http://localhost:5000')) {
        content = content.replace(/http:\/\/localhost:5000/g, '');
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated ${file}`);
      }
    }
  }
}

replaceInDir(publicDir);
console.log('All localhost:5000 references have been replaced with relative paths.');

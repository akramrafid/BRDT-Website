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
      
      // We previously changed http://localhost:5000/api to /api
      // Now we need to change /api to https://api.brdtrust.com/api
      // Be careful not to replace already absolute URLs if run multiple times
      if (content.includes("fetch('/api/")) {
        content = content.replace(/fetch\('\/api\//g, "fetch('https://api.brdtrust.com/api/");
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated fetch in ${file}`);
      }
      if (content.includes("fetch(\"/api/")) {
        content = content.replace(/fetch\("\/api\//g, "fetch(\"https://api.brdtrust.com/api/");
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated fetch in ${file}`);
      }
    }
  }
}

replaceInDir(publicDir);
console.log('API URLs updated to https://api.brdtrust.com/api/');

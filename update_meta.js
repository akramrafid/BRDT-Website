const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'frontend', 'public');

function updateMeta(directory) {
  fs.readdirSync(directory, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(directory, dirent.name);
    if (dirent.isDirectory()) {
      updateMeta(fullPath);
    } else if (dirent.isFile() && fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/<meta[^>]*name=["']viewport["'][^>]*>/i, '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />');
      fs.writeFileSync(fullPath, content);
      console.log('Updated ' + dirent.name);
    }
  });
}

updateMeta(dir);

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Make the Appeals link regex more permissive for whitespace/newlines
  const regex = /(<li>\s*<a[^>]*href="madrasah\.html"[^>]*>Madrasah<\/a>\s*<\/li>\s*)(<li class="has-dropdown">\s*<a href="#"[^>]*>\s*Appeals\s*<i class="fa-solid fa-chevron-down dropdown-icon"><\/i>\s*<\/a>\s*<ul class="dropdown-menu">[\s\S]*?<\/ul>\s*<\/li>)/;

  if (regex.test(content)) {
    content = content.replace(regex, '$2\n          $1');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Swapped nav in ${file}`);
  }
});

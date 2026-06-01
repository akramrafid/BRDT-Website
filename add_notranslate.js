const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const regex = /<div class="custom-select-wrapper">(\s*<button class="switcher-btn" id="langSwitcherBtn">)/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, '<div class="custom-select-wrapper notranslate">$1');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added notranslate to ${file}`);
  }
});

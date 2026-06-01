const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // The regex looks for <nav class="main-nav"> \s* <ul> and ensures we don't add Home twice
  const regex = /(<nav class="main-nav">\s*<ul>)(?!\s*<li><a[^>]*>Home<\/a><\/li>)/i;

  if (regex.test(content)) {
    // If it's index.html we might want to add class="active"
    if (file === 'index.html') {
      content = content.replace(regex, '$1\n          <li><a class="active" href="index.html">Home</a></li>');
    } else {
      content = content.replace(regex, '$1\n          <li><a href="index.html">Home</a></li>');
    }
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added Home link to ${file}`);
  }
});

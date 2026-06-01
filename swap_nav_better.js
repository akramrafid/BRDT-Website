const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'frontend', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const madrasahMatch = content.match(/<li>\s*<a[^>]*href="madrasah\.html"[^>]*>Madrasah<\/a>\s*<\/li>/);
  if (!madrasahMatch) return;

  const appealsMatch = content.match(/<li class="has-dropdown">\s*<a href="#"[\s\S]*?>\s*Appeals\s*<i[\s\S]*?<\/i\s*>[\s\S]*?<\/a>\s*<ul class="dropdown-menu">[\s\S]*?<\/ul>\s*<\/li>/);
  if (!appealsMatch) {
      console.log('Appeals not found in ' + file);
      return;
  }
  
  if (madrasahMatch.index < appealsMatch.index) {
     const between = content.substring(madrasahMatch.index + madrasahMatch[0].length, appealsMatch.index);
     if (between.trim() === '') {
        const newPart = appealsMatch[0] + between + madrasahMatch[0];
        content = content.substring(0, madrasahMatch.index) + newPart + content.substring(appealsMatch.index + appealsMatch[0].length);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Swapped in " + file);
     } else {
        console.log('Not adjacent in ' + file);
     }
  }
});

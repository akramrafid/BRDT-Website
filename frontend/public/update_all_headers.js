const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname);
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

// Match the Appeals dropdown more flexibly
const headerRegex = /(<li class="has-dropdown">[\s\S]*?Appeals[\s\S]*?<ul class="dropdown-menu">)([\s\S]*?)(<\/ul>\s*<\/li>)/;

const newHeaderList = `
              <li><a href="appeal-fitra.html"><i class="fa-solid fa-wheat-awn"></i> Fitra</a></li>
              <li><a href="appeal-zakat.html"><i class="fa-solid fa-sack-dollar"></i> Zakat</a></li>
              <li><a href="appeal-sadaqah.html"><i class="fa-solid fa-hand-holding-heart"></i> Sadaqah</a></li>
              <li><a href="appeal-flood.html"><i class="fa-solid fa-house-flood-water"></i> Flood Relief</a></li>
              <li><a href="appeal-back-to-school.html"><i class="fa-solid fa-school"></i> Back to School</a></li>
              <li><a href="appeal-sponsor-hafiz.html"><i class="fa-solid fa-book-open-reader"></i> Sponsor a Hafiz</a></li>
              <li><a href="appeal-orphan.html"><i class="fa-solid fa-child-reaching"></i> Orphan Sponsorship</a></li>
            `;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (headerRegex.test(content)) {
    // Only replace the list items inside the ul
    content = content.replace(headerRegex, `$1${newHeaderList}$3`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated header in ${file}`);
  }
});

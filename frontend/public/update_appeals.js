const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname);
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const headerRegex = /<li class="has-dropdown">\s*<a href="#">Appeals <i class="fa-solid fa-chevron-down"><\/i><\/a>\s*<ul class="dropdown">([\s\S]*?)<\/ul>\s*<\/li>/;

const footerRegex = /<div class="footer-col">\s*<h4>Appeals<\/h4>\s*<ul>([\s\S]*?)<\/ul>\s*<\/div>/;

const newHeaderList = `
              <li><a href="appeal-fitra.html">Fitra</a></li>
              <li><a href="appeal-zakat.html">Zakat</a></li>
              <li><a href="appeal-sadaqah.html">Sadaqah</a></li>
              <li><a href="appeal-flood.html">Flood Relief</a></li>
              <li><a href="appeal-back-to-school.html">Back to School</a></li>
              <li><a href="appeal-sponsor-hafiz.html">Sponsor a Hafiz</a></li>
              <li><a href="appeal-orphan.html">Orphan Sponsorship</a></li>
            `;

const newFooterList = `
          <li><a href="appeal-fitra.html">Fitra</a></li>
          <li><a href="appeal-zakat.html">Zakat</a></li>
          <li><a href="appeal-sadaqah.html">Sadaqah</a></li>
          <li><a href="appeal-flood.html">Flood Relief</a></li>
          <li><a href="appeal-back-to-school.html">Back to School</a></li>
          <li><a href="appeal-sponsor-hafiz.html">Sponsor a Hafiz</a></li>
          <li><a href="appeal-orphan.html">Orphan Sponsorship</a></li>
        `;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, `<li class="has-dropdown">\n            <a href="#">Appeals <i class="fa-solid fa-chevron-down"></i></a>\n            <ul class="dropdown">${newHeaderList}</ul>\n          </li>`);
    changed = true;
  }

  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, `<div class="footer-col">\n            <h4>Appeals</h4>\n            <ul>${newFooterList}</ul>\n          </div>`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

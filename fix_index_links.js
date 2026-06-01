const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'frontend', 'public', 'index.html');
let content = fs.readFileSync(file, 'utf8');

const replacement = `          <span>Disaster Relief</span>
        </a>
        <a href="projects.html#initiative-08" class="category-card">
          <i class="fa-solid fa-ring"></i>
          <span>Wedding Help</span>
        </a>
        <a href="projects.html#initiative-09" class="category-card">
          <i class="fa-solid fa-stethoscope"></i>
          <span>Treatment Help</span>
        </a>
        <a href="projects.html#initiative-11" class="category-card">
          <i class="fa-solid fa-people-group"></i>
          <span>Social Dev.</span>
        </a>
        <a href="appeal-orphan.html" class="category-card">`;

content = content.replace(/<a href="projects\.html#initiative-06" class="category-card">\s*<i class="fa-solid fa-hand-holding-droplet"><\/i>\s*<a href="appeal-orphan\.html" class="category-card">/, `<a href="projects.html#initiative-06" class="category-card">\n          <i class="fa-solid fa-hand-holding-droplet"></i>\n${replacement}`);

fs.writeFileSync(file, content);
console.log("Restored deleted links");

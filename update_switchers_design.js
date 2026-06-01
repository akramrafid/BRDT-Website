const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const regex = /<div class="top-switchers">[\s\S]*?<\/div>/;

const newSwitchers = `<div class="top-switchers">
          <div class="custom-select-wrapper">
            <button class="switcher-btn" id="langSwitcherBtn"><span id="langSwitcherText">EN</span> <i class="fa-solid fa-chevron-down"></i></button>
            <select class="invisible-select" id="langSwitcherSelect">
              <option value="en">EN</option>
              <option value="bn">BN</option>
              <option value="ar">AR</option>
            </select>
          </div>
          <div class="custom-select-wrapper">
            <button class="switcher-btn" id="currencySwitcherBtn"><span id="currencySwitcherText">৳ (BDT)</span> <i class="fa-solid fa-chevron-down"></i></button>
            <select class="invisible-select" id="currencySwitcherSelect">
              <option value="BDT">৳ (BDT)</option>
              <option value="GBP">£ (GBP)</option>
              <option value="USD">$ (USD)</option>
              <option value="EUR">€ (EUR)</option>
            </select>
          </div>
        </div>`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (regex.test(content)) {
    content = content.replace(regex, newSwitchers);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated switchers in ${file}`);
  }
});

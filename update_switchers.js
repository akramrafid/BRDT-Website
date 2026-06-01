const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const oldSwitchersRegex = /<div class="top-switchers">\s*<button class="switcher-btn" id="langSwitcherBtn"><span id="langSwitcherText">EN<\/span> <i class="fa-solid fa-chevron-down"><\/i><\/button>\s*<button class="switcher-btn" id="currencySwitcherBtn"><span id="currencySwitcherText">৳ \(BDT\)<\/span> <i class="fa-solid fa-chevron-down"><\/i><\/button>\s*<\/div>/;

const newSwitchers = `<div class="top-switchers">
          <select class="switcher-select" id="langSwitcherSelect">
            <option value="en">EN</option>
            <option value="bn">BN</option>
            <option value="ar">AR</option>
          </select>
          <select class="switcher-select" id="currencySwitcherSelect">
            <option value="BDT">৳ (BDT)</option>
            <option value="GBP">£ (GBP)</option>
            <option value="USD">$ (USD)</option>
            <option value="EUR">€ (EUR)</option>
          </select>
        </div>`;

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (oldSwitchersRegex.test(content)) {
    content = content.replace(oldSwitchersRegex, newSwitchers);
    changed = true;
  } else {
      // maybe the text changed slightly, let's try a more robust regex
      const flexibleRegex = /<div class="top-switchers">[\s\S]*?<\/div>/;
      if (flexibleRegex.test(content)) {
          content = content.replace(flexibleRegex, newSwitchers);
          changed = true;
      }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated switchers in ${file}`);
  }
});

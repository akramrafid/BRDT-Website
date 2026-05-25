const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname);

fs.readdir(publicDir, (err, files) => {
  if (err) throw err;

  const htmlFiles = files.filter(f => f.endsWith('.html'));
  
  htmlFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let modified = false;

    // 1. Insert Gallery
    const galleryRegex = /<li><a[^>]*>Gallery<\/a><\/li>/;
    if (!galleryRegex.test(content)) {
      content = content.replace(/(<li><a[^>]*href="who-we-are\.html"[^>]*>Who We Are<\/a><\/li>)/g, '$1\n          <li><a href="gallery.html">Gallery</a></li>');
      modified = true;
    }

    // 2. Update Header Actions
    const newHeaderActions = `      <div class="header-right-container">
        <div class="top-switchers">
          <button class="switcher-btn" id="langSwitcherBtn"><span id="langSwitcherText">EN</span> <i class="fa-solid fa-chevron-down"></i></button>
          <button class="switcher-btn" id="currencySwitcherBtn"><span id="currencySwitcherText">৳ (BDT)</span> <i class="fa-solid fa-chevron-down"></i></button>
        </div>
        <div class="header-actions">
          <a class="btn-donate" href="#">Donate Now</a>
          <a class="login-link" href="login.html">Login/Register</a>
        </div>
      </div>`;

    const headerActionsRegex = /<div class="header-actions">[\s\S]*?<\/div>\s*(?=<\/div>\s*<\/header>)/;
    if (headerActionsRegex.test(content) && !content.includes('header-right-container')) {
      content = content.replace(headerActionsRegex, newHeaderActions);
      modified = true;
    }

    // 3. Inject Scripts
    if (!content.includes('switchers.js')) {
      content = content.replace(/<\/body>/, `  <div id="google_translate_element" style="display:none;"></div>\n  <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>\n  <script src="assets/js/switchers.js"></script>\n</body>`);
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`Skipped ${file}`);
    }
  });
});

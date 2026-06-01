const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'frontend', 'public', 'assets', 'css', 'style.css');
let content = fs.readFileSync(file, 'utf8');

const correctTop = `:root {
  --primary-purple: #8c1d54;
  --dark-blue: #1d3b82;
  --light-blue: #29aee4;
  --text-dark: #1e293b;
  --text-light: #ffffff;
  --bg-light: #f8fafc;
  --border-color: #e2e8f0;
}

@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap');

/* Prevent Google Translate from altering layout/font sizes */
font {
    font-size: inherit !important;
    line-height: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
}

.goog-te-banner-frame,
.goog-te-banner-frame.skiptranslate,
iframe.goog-te-banner-frame {
    display: none !important;
}
body, html {
    top: 0px !important;
    position: static !important;
}
#goog-gt-tt,`;

const regex = /:root \{[\s\S]*?#goog-gt-tt,/m;
content = content.replace(regex, correctTop);
fs.writeFileSync(file, content);
console.log('Fixed style.css top');

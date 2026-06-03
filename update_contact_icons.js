const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'frontend', 'public', 'assets', 'css', 'style.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

const newCss = `
/* Contact Bar Animated Icons */
.contact-icons {
  display: inline-flex;
  gap: 8px;
  margin-left: 10px;
  align-items: center;
  vertical-align: middle;
}

.contact-icons i, .contact-icons .imo-icon {
  font-size: 16px;
  cursor: pointer;
  animation: pulse-icon 2.5s infinite;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.contact-icons i:hover, .contact-icons .imo-icon:hover {
  animation-play-state: paused;
  transform: scale(1.2);
}

.imo-icon {
  font-family: "Outfit", sans-serif;
  font-size: 9px !important;
  font-weight: 700;
  color: #fff !important;
  padding: 2px 4px;
  border-radius: 4px;
  line-height: 1;
  text-transform: uppercase;
  text-decoration: none;
}

.contact-icons .fa-whatsapp { color: #25D366; animation-delay: 0s; }
.contact-icons .fa-facebook-messenger { color: #00B2FF; animation-delay: 0.2s; }
.contact-icons .fa-telegram { color: #0088cc; animation-delay: 0.4s; }
.contact-icons .imo-icon { background-color: #0056b3; animation-delay: 0.6s; }
.contact-icons .fa-viber { color: #59267c; animation-delay: 0.8s; }

@keyframes pulse-icon {
  0% { transform: scale(1); }
  10% { transform: scale(1.2) rotate(5deg); }
  20% { transform: scale(1) rotate(0deg); }
  100% { transform: scale(1); }
}
`;

if (!cssContent.includes('.contact-icons {')) {
    fs.appendFileSync(cssPath, newCss, 'utf8');
    console.log("CSS appended.");
}

const directoryPath = path.join(__dirname, 'frontend', 'public');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('contact-icons')) return;

    const targetText = '<span><i class="fa-solid fa-phone"></i> Contact : +44 7540 253384</span>';
    const replacementText = `<span><i class="fa-solid fa-phone"></i> Contact : +44 7540 253384
          <span class="contact-icons">
            <i class="fa-brands fa-whatsapp" title="WhatsApp"></i>
            <i class="fa-brands fa-facebook-messenger" title="Messenger"></i>
            <i class="fa-brands fa-telegram" title="Telegram"></i>
            <span class="imo-icon" title="IMO">imo</span>
            <i class="fa-brands fa-viber" title="Viber"></i>
          </span>
        </span>`;

    if (content.includes(targetText)) {
        content = content.replace(targetText, replacementText);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Updated", filePath);
    }
}

function walkDir(currentPath) {
    const files = fs.readdirSync(currentPath);
    for (const file of files) {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (filePath.endsWith('.html')) {
            processFile(filePath);
        }
    }
}

walkDir(directoryPath);

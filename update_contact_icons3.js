const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend', 'public');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('contact-icons')) return;

    const targetText = 'Contact : +44 7540 253384';
    const replacementText = `Contact : +44 7540 253384
          <span class="contact-icons">
            <a href="#" style="color: inherit; text-decoration: none;"><i class="fa-brands fa-whatsapp" title="WhatsApp"></i></a>
            <a href="#" style="color: inherit; text-decoration: none;"><i class="fa-brands fa-facebook-messenger" title="Messenger"></i></a>
            <a href="#" style="color: inherit; text-decoration: none;"><i class="fa-brands fa-telegram" title="Telegram"></i></a>
            <a href="#" style="color: inherit; text-decoration: none;"><span class="imo-icon" title="IMO">imo</span></a>
            <a href="#" style="color: inherit; text-decoration: none;"><i class="fa-brands fa-viber" title="Viber"></i></a>
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

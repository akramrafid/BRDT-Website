const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');

function replaceNewsletter(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Do not recurse into assets or other dirs for now, only root html files
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            const regex = /SUBSCRIBE TO OUR NEWSLETTER/g;
            
            if (regex.test(content)) {
                content = content.replace(regex, 'Get Involved - BECOME A VOLUNTEER');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${file}`);
            }
        }
    }
}

replaceNewsletter(publicDir);

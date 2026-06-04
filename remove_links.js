const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            
            // Remove events link
            content = content.replace(/^[ \t]*<li><a href="events\.html">Events<\/a><\/li>[ \t]*\r?\n/gm, '');
            // Some places might not have a newline after it or just replace the line
            content = content.replace(/[ \t]*<li><a href="events\.html">Events<\/a><\/li>[ \t]*/g, '');
            
            // Remove our-values link
            content = content.replace(/^[ \t]*<li><a href="our-values\.html">Our Values<\/a><\/li>[ \t]*\r?\n/gm, '');
            content = content.replace(/[ \t]*<li><a href="our-values\.html">Our Values<\/a><\/li>[ \t]*/g, '');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${file}`);
            }
        }
    }
}

processDirectory(publicDir);
console.log('Done.');

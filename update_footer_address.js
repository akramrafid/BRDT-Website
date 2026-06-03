const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend', 'public');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the specific text block
    const oldText = 'Village: Belghar; Union: Adra North<br />\n          Upazilla: Nangalkot; Cumilla, Bangladesh';
    const oldText2 = 'Village: Belghar; Union: Adra North<br />\r\n          Upazilla: Nangalkot; Cumilla, Bangladesh';
    const oldText3 = 'Village: Belghar; Union: Adra North<br/>\n          Upazilla: Nangalkot; Cumilla, Bangladesh';
    
    // Using Regex to be robust against whitespace differences
    const regex = /Village: Belghar;\s*Union:\s*Adra\s*North\s*<br\s*\/>\s*Upazilla:\s*Nangalkot;\s*Cumilla,\s*Bangladesh/;
    const newText = 'Village: Belghar; Union: Adra North, Upazilla: Nangalkot; Cumilla, Bangladesh';

    if (regex.test(content)) {
        const newContent = content.replace(regex, newText);
        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
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

const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend', 'public');

function replaceFooterNumbers() {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach((file) => {
            if (path.extname(file) === '.html') {
                const filePath = path.join(directoryPath, file);
                let content = fs.readFileSync(filePath, 'utf8');
                
                // Replace footer mobile number
                const targetStr = 'Mobile: +44 7540 253384<br />';
                const replaceStr = 'Mobile: +44 7540 253384<br />\n          Mobile: +88 01967 613770<br />\n          Mobile: +88 01625 050379<br />';
                
                if (content.includes(targetStr)) {
                    content = content.replace(targetStr, replaceStr);
                    fs.writeFileSync(filePath, content, 'utf8');
                    console.log(`Updated: ${file}`);
                }
            }
        });
    });
}

replaceFooterNumbers();

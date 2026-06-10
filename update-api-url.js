const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend', 'public');

function replaceApiUrls(dirPath) {
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach((dirent) => {
            const fullPath = path.join(dirPath, dirent.name);
            if (dirent.isDirectory()) {
                replaceApiUrls(fullPath);
            } else if (dirent.isFile() && (fullPath.endsWith('.html') || fullPath.endsWith('.js'))) {
                let content = fs.readFileSync(fullPath, 'utf8');
                const targetStr = 'https://api.brdtrust.com';
                const replaceStr = 'http://localhost:5000';
                
                if (content.includes(targetStr)) {
                    // Replace all occurrences using split/join
                    content = content.split(targetStr).join(replaceStr);
                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Updated: ${fullPath}`);
                }
            }
        });
    });
}

replaceApiUrls(directoryPath);

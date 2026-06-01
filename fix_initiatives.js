const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'public', 'projects.html');
let content = fs.readFileSync(filePath, 'utf8');

const splitMarker = '<!-- New Initiatives - Animated Blog Cards -->';
if (content.includes(splitMarker) || content.includes('<!-- New Initiatives — Animated Blog Cards -->')) {
    const parts = content.split(/<!-- New Initiatives [—-] Animated Blog Cards -->/);
    let topPart = parts[0];
    let bottomPart = parts[1];

    // In bottomPart, replace "initiative-14" with "initiative-15", etc down to 09
    for (let i = 14; i >= 9; i--) {
        const oldNumStr = i.toString().padStart(2, '0');
        const newNumStr = (i + 1).toString().padStart(2, '0');
        
        bottomPart = bottomPart.replace(new RegExp(`initiative-${oldNumStr}`, 'g'), `initiative-${newNumStr}`);
        bottomPart = bottomPart.replace(new RegExp(`Initiative ${oldNumStr}`, 'g'), `Initiative ${newNumStr}`);
    }

    content = topPart + '<!-- New Initiatives - Animated Blog Cards -->' + bottomPart;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed initiative numbers in projects.html');
} else {
    console.log('Could not find split marker.');
}

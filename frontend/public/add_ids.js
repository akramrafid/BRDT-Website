const fs = require('fs');

const filePath = 'f:\\BRDT-Charity v1\\frontend\\public\\projects.html';
let content = fs.readFileSync(filePath, 'utf8');

// The pattern to match sections and add an id based on the Initiative number
const regex = /(<section[^>]*class="featured-project[^>]*>[\s\S]*?<span class="section-subtitle">Initiative\s*(\d+)<\/span>)/g;

let updatedContent = content.replace(regex, (match, p1, p2) => {
    // If it already has an id, don't add another
    if (match.includes('id="initiative-')) return match;
    
    // Add id to the <section ...> tag
    return match.replace(/<section\s+/, `<section id="initiative-${p2.padStart(2, '0')}" `);
});

// For the animated blog cards (Initiative 09, 10, 11)
const regex2 = /(<div\s+class="initiative-card"([^>]*)>[\s\S]*?<span class="initiative-card-num">Initiative\s*(\d+)<\/span>)/g;

updatedContent = updatedContent.replace(regex2, (match, p1, p2, p3) => {
    if (match.includes('id="initiative-')) return match;
    return match.replace(/<div\s+class="initiative-card"/, `<div id="initiative-${p3.padStart(2, '0')}" class="initiative-card"`);
});


fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Added IDs to projects.html');

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');

const newLinksHTML = `<ul>
          <li><a href="contact.html#faqs">FAQ's</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="#">Policies</a></li>
          <li><a href="#">Our Values</a></li>
          <li><a href="#">Latest News</a></li>
          <li><a href="annual-reports.html">Annual Reports</a></li>
          <li><a href="#">Press Releases</a></li>
          <li><a href="#">Zakat Calculator</a></li>
        </ul>`;

function updateFooter(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Do not recurse into assets or other dirs for now, only root html files
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Regex to match the ul block under <h4>Useful Links</h4>
            // We look for <h4>Useful Links</h4> followed by <ul>...</ul>
            const regex = /<h4>Useful Links<\/h4>\s*<ul>[\s\S]*?<\/ul>/;
            
            if (regex.test(content)) {
                content = content.replace(regex, `<h4>Useful Links</h4>\n        ${newLinksHTML}`);
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${file}`);
            }
        }
    }
}

updateFooter(publicDir);

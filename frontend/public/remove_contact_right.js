const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'contact.html');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<div class="map-header-right">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;
// Wait, replacing this whole chunk might be tricky because of div nesting.
// It's safer to just replace the exact text.
const textToRemove = `<div class="map-header-right">
              <div class="map-contact-item">
                <div class="map-contact-title">
                  <i class="fa-solid fa-envelope"></i> Contacts
                </div>
                <div class="map-contact-text">
                  info@brdt.org.bd
                </div>
              </div>
              <div class="map-contact-item">
                <div class="map-contact-title">
                  <i class="fa-solid fa-location-dot"></i> Address
                </div>
                <div class="map-contact-text">
                  Belghar Rural Development Trust, Belghar, Bangladesh
                </div>
              </div>
            </div>`;

// Since Windows line endings (\r\n) might mess up string matching, let's normalize both to \n
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTextToRemove = textToRemove.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTextToRemove)) {
  const newContent = normalizedContent.replace(normalizedTextToRemove, '');
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Successfully removed map-header-right block.');
} else {
  console.log('Block not found.');
}

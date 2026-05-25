const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'projects.html');
let content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');

let galleryIndices = [];
lines.forEach((line, i) => {
  if (line.includes('<div class="project-gallery">')) {
    galleryIndices.push(i);
  }
});

if (galleryIndices.length >= 8) {
  let start7 = galleryIndices[6];
  let end7 = start7;
  let divCount = 0;
  for (let i = start7; i < lines.length; i++) {
    if (lines[i].includes('<div')) divCount += (lines[i].match(/<div/g) || []).length;
    if (lines[i].includes('</div')) divCount -= (lines[i].match(/<\/div/g) || []).length;
    if (divCount === 0) {
      end7 = i;
      break;
    }
  }

  let start8 = galleryIndices[7];
  let end8 = start8;
  divCount = 0;
  for (let i = start8; i < lines.length; i++) {
    if (lines[i].includes('<div')) divCount += (lines[i].match(/<div/g) || []).length;
    if (lines[i].includes('</div')) divCount -= (lines[i].match(/<\/div/g) || []).length;
    if (divCount === 0) {
      end8 = i;
      break;
    }
  }

  let chunk7 = lines.slice(start7, end7 + 1);
  let chunk8 = lines.slice(start8, end8 + 1);

  // We are replacing start8 to end8 with chunk7
  lines.splice(start8, end8 - start8 + 1, ...chunk7);
  // We are replacing start7 to end7 with chunk8
  lines.splice(start7, end7 - start7 + 1, ...chunk8);

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log('Successfully swapped galleries for Initiative 7 and 8!');
} else {
  console.log('Could not find enough galleries.');
}

const fs = require('fs');
const path = require('path');

const filesToUpdate = ['index.html', 'projects.html'];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Regex to match the CTA section
  const ctaRegex = /<section class="cta-section">([\s\S]*?)<\/section>/;
  
  const newCta = `<section class="cta-section">
    <div class="container cta-inner">
      <h2>Ready to make a difference?</h2>
      <p>
        If anyone is interested to work with us for something like voluntary work, please register. Every penny counts, give your Zakat and Sadaqah today and change a life.
      </p>
      <div class="cta-actions">
        <a class="btn-white" href="#">Donate Now</a>
        <a class="btn-outline-white" href="register.html">Registration Now</a>
      </div>
    </div>
  </section>`;

  if (ctaRegex.test(content)) {
    content = content.replace(ctaRegex, newCta);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated CTA in ${file}`);
  } else {
    console.log(`CTA section not found in ${file}`);
  }
});

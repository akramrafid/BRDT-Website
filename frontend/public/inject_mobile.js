const fs = require('fs');
const path = require('path');

const publicDir = 'f:\\BRDT-Charity v1\\frontend\\public';

// Add hamburger button just before closing header-inner div
const hamburgerHTML = `\n      <button class="mobile-menu-toggle"><i class="fa-solid fa-bars"></i></button>`;
// Add script before closing body
const scriptHTML = `\n  <script src="assets/js/mobile-menu.js"></script>\n`;

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'assets') { // Don't process assets folder for HTML
                processDir(fullPath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Add hamburger if not exists
            if (!content.includes('class="mobile-menu-toggle"')) {
                // Find closing </div> of header-inner. It's tricky with regex, so we'll look for header-right-container </div>
                // The structure is usually <div class="header-right-container">...</div> </div> </header>
                content = content.replace(/(<\/div>\s*<\/div>\s*<\/header>)/, `    </div>${hamburgerHTML}\n    </div>\n  </header>`);
                // Actually the structure is <div class="header-right-container">...</div></div></header>
                // So replacing `</div></div></header>` or similar.
                
                // Let's use a safer approach: inject it right after `<nav class="main-nav">...</nav>` or `<div class="header-right-container">...</div>`
                // Let's inject it right before `</div>\n    </header>` or `</div>\n  </header>`
                // Using regex:
                // find: <div class="header-right-container">[\s\S]*?</div>[\s\S]*?</div>
                modified = true;
            }

            // Add script if not exists
            if (!content.includes('mobile-menu.js')) {
                content = content.replace('</body>', `${scriptHTML}</body>`);
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${file}`);
            }
        }
    }
}

// Since the regex might be fragile, let's just do a specific replace for the hamburger.
// It's safer to find `</nav>` and insert hamburger. No wait, we want it on the far right, so after header-right-container.
function processDirSafely(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // skip subdirs for simplicity if they don't contain main html
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            if (!content.includes('class="mobile-menu-toggle"')) {
                // Find `<div class="header-right-container">` and its closing tag is hard without a parser.
                // Let's just find `</header>` and we know the structure is:
                //     <div class="header-right-container">...</div>
                //   </div>
                // </header>
                // We'll replace `</div>\n    </header>` with `<button class="mobile-menu-toggle"><i class="fa-solid fa-bars"></i></button>\n    </div>\n    </header>`
                content = content.replace(/<\/div>\s*<\/header>/, `${hamburgerHTML}\n      </div>\n    </header>`);
                modified = true;
            }

            if (!content.includes('mobile-menu.js')) {
                // For files in root
                content = content.replace(/<\/body>/i, `${scriptHTML}</body>`);
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${file}`);
            }
        }
    }
}

processDirSafely(publicDir);

import fs from 'fs';
import path from 'path';

const regPath = path.join('f:', 'BRDT-Charity v1', 'frontend', 'public', 'register.html');
const donPath = path.join('f:', 'BRDT-Charity v1', 'frontend', 'public', 'donate.html');

// Fix Register
let regContent = fs.readFileSync(regPath, 'utf8');

// Use regex to ignore whitespace differences
const regRegex = /alert\("Account created successfully! Redirecting\.\.\."\);\s*window\.location\.href\s*=\s*redirect;/;

const regReplace = `// Create a beautiful success popup
              const overlay = document.createElement('div');
              overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
              overlay.innerHTML = \`
                <div style="background:white;padding:40px;border-radius:12px;text-align:center;max-width:400px;box-shadow:0 20px 40px rgba(0,0,0,0.2);animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                  <div style="width:70px;height:70px;background:#10b981;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                    <i class="fa-solid fa-check" style="color:white;font-size:32px;"></i>
                  </div>
                  <h2 style="color:#0f172a;font-size:24px;margin-bottom:10px;font-family:'Outfit',sans-serif;font-weight:700;">Welcome to BRDT!</h2>
                  <p style="color:#475569;font-size:15px;margin-bottom:25px;line-height:1.5;">Your account has been created successfully. Thank you for joining our community!</p>
                  <button id="success-close-btn" style="background:#2563eb;color:white;border:none;padding:12px 30px;border-radius:6px;font-weight:600;cursor:pointer;font-size:15px;width:100%;">Continue</button>
                </div>
                <style>@keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }</style>
              \`;
              document.body.appendChild(overlay);

              document.getElementById('success-close-btn').addEventListener('click', () => {
                window.location.href = redirect;
              });`;

if (regRegex.test(regContent)) {
  fs.writeFileSync(regPath, regContent.replace(regRegex, regReplace));
  console.log("Updated register.html");
} else {
  console.log("Could not find search regex in register.html");
}

// Fix Donate
let donContent = fs.readFileSync(donPath, 'utf8');

const bannerRegex = /<div class="notice-box">\s*<i class="fa-solid fa-triangle-exclamation"><\/i>\s*<span>Notice: Test Mode Is Enabled\. While In Test Mode No Live Donations Are Processed\.<\/span>\s*<\/div>/g;

if (bannerRegex.test(donContent)) {
  donContent = donContent.replace(bannerRegex, '');
  console.log("Removed banner in donate.html");
}

const donRegex = /alert\(data\.message\);\s*window\.location\.reload\(\);/;

const donReplace = `// Create a beautiful success popup
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
            overlay.innerHTML = \`
              <div style="background:white;padding:40px;border-radius:12px;text-align:center;max-width:400px;box-shadow:0 20px 40px rgba(0,0,0,0.2);animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                <div style="width:70px;height:70px;background:#10b981;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                  <i class="fa-solid fa-heart" style="color:white;font-size:32px;"></i>
                </div>
                <h2 style="color:#0f172a;font-size:24px;margin-bottom:10px;font-family:'Outfit',sans-serif;font-weight:700;">Thank You!</h2>
                <p style="color:#475569;font-size:15px;margin-bottom:25px;line-height:1.5;">\${data.message}</p>
                <button id="success-close-btn" style="background:#2563eb;color:white;border:none;padding:12px 30px;border-radius:6px;font-weight:600;cursor:pointer;font-size:15px;width:100%;">Close</button>
              </div>
              <style>@keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }</style>
            \`;
            document.body.appendChild(overlay);

            document.getElementById('success-close-btn').addEventListener('click', () => {
              window.location.reload();
            });`;

if (donRegex.test(donContent)) {
  fs.writeFileSync(donPath, donContent.replace(donRegex, donReplace));
  console.log("Updated donate.html");
} else {
  fs.writeFileSync(donPath, donContent);
  console.log("Could not find alert regex in donate.html, but saved anyway");
}

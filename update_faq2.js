const fs = require('fs');
const file = 'frontend/public/contact.html';
let content = fs.readFileSync(file, 'utf8');

const replacement = `            <div class="premium-faq-accordion">
              <details open>
                <summary>
                  How can I make a donation online? 
                  <span class="faq-icon-circle"><i class="fa-solid fa-chevron-down"></i></span>
                </summary>
                <div class="premium-faq-content">
                  <p>It's quick and easy to donate online. From our online donation form, you can:</p>
                  <ul>
                    <li>Make a one-off donation or become a regular donor.</li>
                    <li>Pay in money from a collection or a fundraising event online.</li>
                    <li>Make a donation in memory of someone or in celebration of a special occasion.</li>
                  </ul>
                </div>
              </details>

              <details>
                <summary>
                  What is Gift Aid?
                  <span class="faq-icon-circle"><i class="fa-solid fa-chevron-down"></i></span>
                </summary>
                <div class="premium-faq-content">
                  <p>Gift Aid allows charities to claim back the basic rate tax already paid on donations by the donor. This means your donation can increase by 25% at no extra cost to you. Sorry, we are unable to offer you this Gift Aid benefit at this time.</p>
                </div>
              </details>

              <details>
                <summary>
                  Can I call you if I have any further questions?
                  <span class="faq-icon-circle"><i class="fa-solid fa-chevron-down"></i></span>
                </summary>
                <div class="premium-faq-content">
                  <p>Absolutely! You can reach our support team at +44 7540 253384 during business hours.</p>
                </div>
              </details>

              <details>
                <summary>
                  Is making a credit card donation online secure?
                  <span class="faq-icon-circle"><i class="fa-solid fa-chevron-down"></i></span>
                </summary>
                <div class="premium-faq-content">
                  <p>Yes, our website is highly secure. We use industry-standard encryption, and your payment details are handled securely by our payment processors.</p>
                </div>
              </details>

              <details>
                <summary>
                  What will you do with my details?
                  <span class="faq-icon-circle"><i class="fa-solid fa-chevron-down"></i></span>
                </summary>
                <div class="premium-faq-content">
                  <p>We treat your data with the utmost confidentiality according to our Privacy Policy. We will never give your details to third parties. We are keeping this information for you as we may need it until we submit our accounts.</p>
                </div>
              </details>
            </div>`;

const regex = /(<div class="premium-faq-accordion">)[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- Reviews Section -->)/;

if (regex.test(content)) {
  const newContent = content.replace(regex, replacement);
  fs.writeFileSync(file, newContent, 'utf8');
  console.log('Successfully replaced FAQ section using regex.');
} else {
  console.log('Regex did not match.');
}

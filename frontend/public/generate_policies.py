import os
import re

directory = r'f:\BRDT-Charity v1\frontend\public'

files_to_update = {
    'privacy-policy.html': {
        'title': 'Privacy Policy',
        'subtitle': 'How we collect, use, and protect your data',
        'content': '''      <h2 style="color: #000; font-size: 28px; font-weight: 700; margin-bottom: 20px;">Your Privacy is Our Priority</h2>
      <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
        At Belghar Rural Development Trust (BRDT), we are committed to protecting your personal information and being transparent about what information we hold about you. This policy applies to all pages hosted on our website and outlines how we collect, use, and safeguard your data.
      </p>

      <h3 style="color: #000; font-size: 24px; font-weight: 700; margin-bottom: 20px;">What Information We Collect</h3>
      <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 15px;">
        We may collect personal information such as your name, email address, postal address, telephone number, and payment details when you:
      </p>
      <ul style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 20px; list-style-type: disc; margin-left: 20px;">
        <li>Make a donation to our charity</li>
        <li>Sign up for our newsletter or updates</li>
        <li>Register to volunteer or participate in our events</li>
        <li>Contact us directly via email or our website forms</li>
      </ul>

      <h3 style="color: #000; font-size: 24px; font-weight: 700; margin-bottom: 20px;">How We Use Your Information</h3>
      <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
        We will only use your information for the purposes for which it was obtained. This includes processing your donations, claiming Gift Aid (if applicable), sending you updates on our projects (if you have opted in), and responding to your inquiries. We will <strong>never</strong> sell or share your personal data with third parties for marketing purposes.
      </p>

      <h3 style="color: #000; font-size: 24px; font-weight: 700; margin-bottom: 20px;">Protecting Your Data</h3>
      <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 40px;">
        We take appropriate physical, electronic, and managerial measures to ensure that we keep your information secure, accurate, and up to date. We only keep your information for as long as is strictly necessary for the purposes for which it was collected or as required by law.
      </p>'''
    },
    'terms-conditions.html': {
        'title': 'Terms & Conditions',
        'subtitle': 'The terms governing your use of our website',
        'content': '''      <h2 style="color: #000; font-size: 28px; font-weight: 700; margin-bottom: 20px;">Website Usage & Donation Terms</h2>
      <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
        Welcome to the Belghar Rural Development Trust (BRDT) website. By continuing to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use.
      </p>

      <h3 style="color: #000; font-size: 24px; font-weight: 700; margin-bottom: 20px;">Use of Website</h3>
      <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
        The content of the pages of this website is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense. You may not reproduce, duplicate, or copy material from our site without written consent from BRDT.
      </p>

      <h3 style="color: #000; font-size: 24px; font-weight: 700; margin-bottom: 20px;">Donations and Refunds</h3>
      <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
        All donations made to BRDT are voluntary and non-refundable. However, if you believe a donation has been made in error, please contact us within 7 days, and we will review your request on a case-by-case basis. We ensure that 100% of your donation is allocated to the designated charitable cause, as outlined in our 100% Donation Policy.
      </p>

      <h3 style="color: #000; font-size: 24px; font-weight: 700; margin-bottom: 20px;">External Links</h3>
      <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 40px;">
        From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
      </p>'''
    },
    'safeguarding-policy.html': {
        'title': 'Safeguarding Policy',
        'subtitle': 'Our commitment to protecting the vulnerable',
        'content': '''      <h2 style="color: #000; font-size: 28px; font-weight: 700; margin-bottom: 20px;">Our Duty of Care</h2>
      <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
        Belghar Rural Development Trust (BRDT) believes that everyone we come into contact with, regardless of age, gender identity, disability, sexual orientation, or ethnic origin, has the right to be protected from all forms of harm, abuse, neglect, and exploitation.
      </p>

      <h3 style="color: #000; font-size: 24px; font-weight: 700; margin-bottom: 20px;">Our Commitment</h3>
      <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 15px;">
        We are firmly committed to ensuring the safety and well-being of the communities we serve. This includes:
      </p>
      <ul style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 20px; list-style-type: disc; margin-left: 20px;">
        <li>Ensuring all staff, volunteers, and partners understand their safeguarding responsibilities.</li>
        <li>Creating a safe environment for all children and vulnerable adults involved in our projects, including our Madrasah and educational initiatives.</li>
        <li>Providing clear procedures for reporting and responding to safeguarding concerns.</li>
        <li>Conducting appropriate background checks for individuals working closely with vulnerable groups.</li>
      </ul>

      <h3 style="color: #000; font-size: 24px; font-weight: 700; margin-bottom: 20px;">Reporting a Concern</h3>
      <p style="color: #475569; font-size: 16px; line-height: 1.8; margin-bottom: 40px;">
        If you have a safeguarding concern regarding any BRDT staff member, volunteer, or project, we strongly encourage you to report it immediately. All reports will be handled with the utmost confidentiality and treated seriously. You can contact our safeguarding lead at <strong>brdtbd@gmail.com</strong> or call us at <strong>+44 7540 253384</strong>.
      </p>'''
    }
}

for filename, data in files_to_update.items():
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the <title> tag
    content = re.sub(r'<title>.*?</title>', f'<title>{data["title"]} - BRDT</title>', content)

    # Replace the Page Header Banner
    header_pattern = re.compile(r'(<!-- Page Header Banner -->.*?<h1.*?>).*?(</h1>\s*<p.*?>).*?(</p>.*?</section>)', re.DOTALL)
    content = header_pattern.sub(rf'\g<1>{data["title"]}\g<2>{data["subtitle"]}\g<3>', content)

    # Replace the Policy Content inside the container
    content_pattern = re.compile(r'(<!-- Policy Content -->.*?<div class="container"[^>]*>).*?(</div>\s*</section>\s*<!-- Footer -->)', re.DOTALL)
    
    # We add a newline for formatting
    new_inner_content = f'\n{data["content"]}\n    '
    content = content_pattern.sub(rf'\g<1>{new_inner_content}\g<2>', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'Updated {filename}')


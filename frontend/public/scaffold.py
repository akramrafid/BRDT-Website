import os

base_file = r'f:\BRDT-Charity v1\frontend\public\100-donation-policy.html'
with open(base_file, 'r', encoding='utf-8') as f:
    content = f.read()

header_part = content.split('<!-- Page Header Banner -->')[0]
footer_part = '  <!-- Footer -->\n' + content.split('<!-- Footer -->')[1]

pages = {
    'events.html': 'Upcoming Events',
    'policies.html': 'Our Policies',
    'our-values.html': 'Our Values',
    'latest-news.html': 'Latest News',
    'press-releases.html': 'Press Releases',
    'zakat-calculator.html': 'Zakat Calculator'
}

for filename, title in pages.items():
    filepath = os.path.join(r'f:\BRDT-Charity v1\frontend\public', filename)
    
    # modify <title> tag in header
    page_header = header_part.replace('<title>100% Donation Policy - BRDT</title>', f'<title>{title} - BRDT</title>')
    
    body = f'''  <!-- Page Header Banner -->
  <section class="page-header" style="background: var(--dark-blue); color: #fff; padding: 60px 0; text-align: center;">
    <div class="container">
      <h1 style="font-size: 40px; font-weight: 700; margin-bottom: 10px;">{title}</h1>
      <p style="font-size: 18px; color: var(--light-blue);">Belghar Rural Development Trust</p>
    </div>
  </section>

  <!-- Main Content -->
  <section class="section-padding" style="padding: 80px 0; background: #fff;">
    <div class="container">
      <!-- CONTENT_GOES_HERE -->
    </div>
  </section>

'''
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(page_header + body + footer_part)
    print(f'Created {filename}')

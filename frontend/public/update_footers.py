import os
import glob

directory = r'f:\BRDT-Charity v1\frontend\public'
html_files = glob.glob(os.path.join(directory, '*.html'))

replacements = [
    ('href="#">Events</a>', 'href="events.html">Events</a>'),
    ('href="#">Policies</a>', 'href="policies.html">Policies</a>'),
    ('href="#">Our Values</a>', 'href="our-values.html">Our Values</a>'),
    ('href="#">Latest News</a>', 'href="latest-news.html">Latest News</a>'),
    ('href="#">Press Releases</a>', 'href="press-releases.html">Press Releases</a>'),
    ('href="#">Zakat Calculator</a>', 'href="zakat-calculator.html">Zakat Calculator</a>')
]

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    for old_str, new_str in replacements:
        if old_str in content:
            content = content.replace(old_str, new_str)
            modified = True
            
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {os.path.basename(filepath)}')

print('Done updating all footers.')

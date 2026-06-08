import os
import glob
import re

directory = r'f:\BRDT-Charity v1\frontend\public'
html_files = glob.glob(os.path.join(directory, '*.html'))

old_projects_block = """            <h4>Projects</h4>
            <ul>
              
              <li><a href="madrasah.html">Madrasah</a></li>
              <li><a href="projects.html">Cleanliness & Environment</a></li>
              <li><a href="projects.html">Healthcare for Poor</a></li>
              <li><a href="projects.html">Skills for Life</a></li>
              <li><a href="projects.html">Empowering Community</a></li>
            </ul>"""

new_projects_block = """            <h4>Projects</h4>
            <ul>
              <li><a href="madrasah.html">Madrasah</a></li>
              <li><a href="projects.html#initiative-10">Cleanliness & Environment</a></li>
              <li><a href="projects.html#initiative-09">Healthcare for Poor</a></li>
              <li><a href="projects.html#initiative-11">Skills for Life</a></li>
              <li><a href="projects.html#initiative-12">Empowering Community</a></li>
              <li><a href="projects.html#initiative-14">Education & Cultural Centres</a></li>
              <li><a href="projects.html#initiative-06">Disaster Relief</a></li>
            </ul>"""

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We will use regex to replace the Projects block in case there are slight whitespace differences
    # Find the <h4>Projects</h4> and its following <ul>...</ul>
    pattern = re.compile(r'<h4>Projects</h4>\s*<ul>.*?</ul>', re.DOTALL)
    
    if pattern.search(content):
        new_content = pattern.sub(new_projects_block, content)
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated projects block in {os.path.basename(filepath)}')

print('Done updating all footers.')

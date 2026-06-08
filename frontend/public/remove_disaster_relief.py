import os
import glob

directory = r'f:\BRDT-Charity v1\frontend\public'
html_files = glob.glob(os.path.join(directory, '*.html'))

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove the Disaster Relief line
    target_line = '<li><a href="projects.html#initiative-06">Disaster Relief</a></li>'
    if target_line in content:
        # Also remove the newline and spaces before it if possible, but a simple replace works too
        new_content = content.replace('\n              ' + target_line, '')
        new_content = new_content.replace(target_line, '')
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Removed Disaster Relief from {os.path.basename(filepath)}')

print('Done removing Disaster Relief from all footers.')

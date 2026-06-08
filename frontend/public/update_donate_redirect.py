import os
import glob
import re

directory = r'f:\BRDT-Charity v1\frontend\public'
html_files = glob.glob(os.path.join(directory, 'appeal-*.html'))

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = re.sub(
        r'alert\(\s*"Thank you! Redirecting to secure payment for ৳"\s*\+[^;]+;\s*',
        "window.location.href = 'donate.html';\n        ",
        content
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated {os.path.basename(filepath)}")

import glob
import re

files = glob.glob(r'f:\BRDT-Charity v1\frontend\public\*.html')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace style.css with style.css?v=5 to bust cache
    content = re.sub(r'style\.css(\?v=\d+)?', 'style.css?v=5', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print('Cache busted for style.css')

import os
import glob

dir_path = "f:/BRDT-Charity v1/frontend/public"

for filepath in glob.glob(os.path.join(dir_path, "*.html")):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace('+44 (0)7540 253384', '+44 7540 253384').replace('+44 (0) 7540 253384', '+44 7540 253384')
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

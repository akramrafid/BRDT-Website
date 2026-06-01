import glob
import re

files = glob.glob(r'f:\BRDT-Charity v1\frontend\public\*.html')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find top-switchers block wherever it is
    match = re.search(r'(\s*<div class="top-switchers">.*?</select>\s*</div>\s*</div>)', content, re.DOTALL)
    
    if match:
        switchers_block = match.group(1)
        
        # Check if it's in top-bar-right
        if switchers_block in content:
            # Remove it from current location
            content = content.replace(switchers_block, '')
            
            # Find header-actions
            header_actions_match = re.search(r'(\s*<div class="header-actions">)', content)
            if header_actions_match:
                # Insert switchers_block right before header-actions
                new_switchers = switchers_block.rstrip()
                # Make sure the indentation looks decent
                replacement = new_switchers + '\n' + header_actions_match.group(1)
                content = content.replace(header_actions_match.group(1), replacement)
                
            # Bump cache buster for style.css
            content = re.sub(r'style\.css\?v=\d+', 'style.css?v=6', content)

            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)

print('Restored switchers back to header-right-container.')

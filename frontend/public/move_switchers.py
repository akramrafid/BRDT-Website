import glob
import re

files = glob.glob(r'f:\BRDT-Charity v1\frontend\public\*.html')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the top-switchers block
    # We use non-greedy matching to capture the whole div
    match = re.search(r'(\s*<div class="top-switchers">.*?</select>\s*</div>\s*</div>)', content, re.DOTALL)
    
    if match:
        switchers_block = match.group(1)
        
        # Remove from header
        content = content.replace(switchers_block, '')
        
        # We need to insert it into top-bar-right, before the social icons
        # Find <div class="top-bar-right">
        top_bar_match = re.search(r'(<div class="top-bar-right">)', content)
        if top_bar_match:
            # We add it inside top-bar-right
            new_switchers = switchers_block.strip()
            # Wrap it in a span or just keep the div, since top-bar-right is usually flex
            replacement = top_bar_match.group(1) + '\n        ' + new_switchers
            content = content.replace(top_bar_match.group(1), replacement)
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

print('Moved switchers to top bar.')

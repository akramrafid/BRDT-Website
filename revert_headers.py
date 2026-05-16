import os
import glob
import re

directory = r'f:\BRDT-Charity v1\frontend\public'

old_actions = """        <div class="header-actions">
          <a class="login-link" href="login.html">Login/Register</a>
          <a class="btn-donate" href="#">Donate Now</a>
        </div>"""

new_actions_escaped = r"""        <div class="header-actions" style="display: flex; align-items: center; gap: 20px;">
          <a href="#" style="color: #475569; font-size: 18px;" title="Search"><i class="fa-solid fa-magnifying-glass"></i></a>
          <a class="login-link" href="login.html" style="display: flex; align-items: center; gap: 8px; color: #475569; font-size: 14px; font-weight: 500;">
            <i class="fa-regular fa-user" style="font-size: 18px;"></i> Login / Register
          </a>
          <a href="#" class="btn-donate-cart" style="display: flex; align-items: center; background: #29aee4; border-radius: 50px; padding: 5px 15px 5px 5px; color: white; font-weight: 700; font-size: 14px; position: relative; gap: 10px; box-shadow: 0 4px 10px rgba(41,174,228,0.3);">
            <div style="background: white; color: #29aee4; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;">
              <i class="fa-solid fa-hand-holding-heart"></i>
            </div>
            £0.00
            <span style="position: absolute; top: -5px; right: -5px; background: #8c1d54; color: white; width: 18px; height: 18px; border-radius: 50%; font-size: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold;">0</span>
          </a>
        </div>"""

for filepath in glob.glob(os.path.join(directory, '*.html')):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Revert actions
    if new_actions_escaped in content:
        content = content.replace(new_actions_escaped, old_actions)
    
    # Wrap logo and main-nav
    # Check if already wrapped
    if '<div class="header-left"' not in content:
        # Regex to find <div class="logo">...</div>\n        <nav class="main-nav">...</nav>
        # Because we want to group them
        logo_nav_pattern = re.compile(r'(<div class="logo">.*?</nav>)', re.DOTALL)
        match = logo_nav_pattern.search(content)
        if match:
            wrapped = '<div class="header-left" style="display: flex; align-items: center; gap: 50px;">\n        ' + match.group(1) + '\n        </div>'
            content = content[:match.start()] + wrapped + content[match.end():]
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Reverted and updated layout in {os.path.basename(filepath)}")

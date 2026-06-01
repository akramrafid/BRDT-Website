import sys
file_path = r'f:\BRDT-Charity v1\frontend\public\assets\css\style.css'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_block = """body, html {
    top: 0px !important;
    position: static !important;
    margin-top: 0 !important;
    padding-top: 0 !important;
}

#goog-gt-tt,
.goog-te-balloon-frame {
    display: none !important;
}

.goog-text-highlight {
    background: none !important;
    box-shadow: none !important;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Outfit", sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-light);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

a {
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

/* Top Bar */
.top-bar {
  background-color: #1e293b; /* Dark Slate */
  color: var(--text-light);
  padding: 10px 0;
  font-size: 17px;
  letter-spacing: 0.5px;
}
"""

start_idx = -1
for i, line in enumerate(lines):
    if line.startswith('body, html {'):
        start_idx = i
        break

if start_idx != -1:
    end_idx = start_idx
    while not lines[end_idx].strip() == '}':
        end_idx += 1
    
    lines = lines[:start_idx] + [new_block] + lines[end_idx+1:]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print('File successfully restored!')
else:
    print('Could not find target block.')

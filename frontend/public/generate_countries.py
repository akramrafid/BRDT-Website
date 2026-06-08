import urllib.request
import json

url = "https://restcountries.com/v3.1/all?fields=name,idd,cca2,flag"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())

    countries = []
    for c in data:
        name = c.get('name', {}).get('common', '')
        code = c.get('cca2', '')
        flag = c.get('flag', '')
        idd = c.get('idd', {})
        dial = ""
        if idd and idd.get('root'):
            dial = idd['root'] + (idd.get('suffixes', [''])[0] if idd.get('suffixes') else '')
        if name and code:
            countries.append({
                "name": name,
                "code": code,
                "flag": flag,
                "dial": dial
            })
            
    countries.sort(key=lambda x: x['name'])
    
    js_content = "const COUNTRIES = " + json.dumps(countries, indent=2) + ";"
    with open("f:/BRDT-Charity v1/frontend/public/assets/js/countries.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    print("Successfully generated countries.js")
except Exception as e:
    print(f"Error: {e}")

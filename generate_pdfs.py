import os

pdf_content = b"""%PDF-1.1
%\xe6\xe2\xcf\xd3
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> >>
endobj
4 0 obj
<< /Length 55 >>
stream
BT
/F1 24 Tf
100 700 Td
(Annual Report coming soon.) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000015 00000 n 
0000000064 00000 n 
0000000122 00000 n 
0000000287 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
393
%%EOF
"""

files = [
    "frontend/public/annual-reports/BRDT_Annual_Report_2021.pdf",
    "frontend/public/annual-reports/BRDT_Annual_Report_2022.pdf",
    "frontend/public/annual-reports/BRDT_Annual_Report_2023.pdf",
    "frontend/public/annual-reports/BRDT_Annual_Report_2024.pdf"
]

for f in files:
    with open(f, 'wb') as out:
        out.write(pdf_content)
    print(f"Generated {f}")

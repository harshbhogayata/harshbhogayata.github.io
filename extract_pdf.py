import sys
try:
    from pypdf import PdfReader
except ImportError:
    try:
        from PyPDF2 import PdfReader
    except ImportError:
        print("pypdf not installed")
        sys.exit(1)

try:
    reader = PdfReader("resume_updated.pdf")
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    
    with open("resume_text_utf8.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("Done")
except Exception as e:
    print(f"Error: {e}")

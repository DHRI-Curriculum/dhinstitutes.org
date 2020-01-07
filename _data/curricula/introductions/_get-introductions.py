import requests
from bs4 import BeautifulSoup
from pathlib import Path

workshops = [
    "command-line",
    "machine-learning",
    "text-analysis",
    "git",
    "python",
    "html-css",
    "omeka",
    "ethics",
    "databases",
    "mapping",
    "project-lab",
    "twitter-api"
]

for workshop in workshops:
    r = requests.get(f'https://github.com/DHRI-Curriculum/{workshop}/blob/master/README.md')

    soup = BeautifulSoup(r.text, 'lxml')
    introduction = soup.find("article")
    
    Path(f'./_raw-html/{workshop}.html').write_text(str(introduction))
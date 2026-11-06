"""Monta a cópia local do site original (referência do teste visual).

Uso: python3 tests/visual/prepare-ref.py promopost-original.zip promopost-scripts.zip /tmp/ref
     cd /tmp/ref/srv && python3 -m http.server 8080
(Os zips ficam no Drive: JOBS/PROJETOS/PROMOPOST/_referencia.)
"""
import glob, os, re, shutil, sys, zipfile

orig, scripts, out = sys.argv[1:4]
os.makedirs(out, exist_ok=True)
for z in (orig, scripts):
    zipfile.ZipFile(z).extractall(out)
os.chdir(out)
os.makedirs("srv/_gf", exist_ok=True)
shutil.copytree("site", "srv", dirs_exist_ok=True)
if os.path.isdir("fonts.gstatic.com"):
    shutil.copytree("fonts.gstatic.com", "srv/_gf/fonts.gstatic.com", dirs_exist_ok=True)
g = open("fonts/google-roboto.css").read().replace("https://fonts.gstatic.com", "/_gf/fonts.gstatic.com")
open("srv/_gf/roboto.css", "w").write(g)
for f in glob.glob("html/*.html"):
    if "rendered" in f:
        continue
    t = open(f).read()
    t = re.sub(r"https://fonts\.googleapis\.com/css\?family=Roboto[^\"']*", "/_gf/roboto.css", t)
    t = t.replace("https://promopost.com.br", "").replace("https:\\/\\/promopost.com.br", "")
    t = re.sub(r"<script[^>]*googletagmanager[^>]*></script>", "", t)
    name = os.path.basename(f)[:-5]
    d = "srv" if name == "home" else "srv/" + name
    os.makedirs(d, exist_ok=True)
    open(d + "/index.html", "w").write(t)
print("Referência pronta em", os.path.join(out, "srv"))

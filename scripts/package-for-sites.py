"""Empacota os arquivos versionados do projeto para importação no Sites."""

from pathlib import Path, PurePosixPath
import subprocess
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "para-sites" / "karla-muller-site.zip"
INSTRUCTIONS = ROOT / "para-sites" / "INSTRUCOES-PARA-O-SITES.md"


def allowed(name):
    parts = PurePosixPath(name).parts
    excluded = {".git", "node_modules", "dist", ".cache", "para-sites", "__pycache__"}
    return (
        not any(part in excluded for part in parts)
        and not any(part == ".env" or part.startswith(".env.") for part in parts)
        and not name.endswith(".zip")
    )


def add(archive, name, data):
    entry = ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
    entry.compress_type = ZIP_DEFLATED
    entry.external_attr = 0o100644 << 16
    archive.writestr(entry, data, compresslevel=9)


def main():
    names = subprocess.check_output(
        ["git", "ls-files", "-z"], cwd=ROOT
    ).decode().split("\0")
    files = sorted({name for name in names if name and allowed(name)})
    required = {"index.html", "package.json", "package-lock.json", "src/page.html"}
    if not required.issubset(files):
        raise RuntimeError("Arquivos essenciais ausentes; adicione os fontes ao Git primeiro.")
    html = (ROOT / "index.html").read_bytes()
    if b"{{STYLES}}" in html or b'type="module"' in html:
        raise RuntimeError("Gere o HTML autônomo com npm run build antes de empacotar.")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(OUTPUT, "w") as archive:
        for name in files:
            add(archive, name, (ROOT / name).read_bytes())
        add(archive, "PARA-O-SITES.md", INSTRUCTIONS.read_bytes())
    with ZipFile(OUTPUT) as archive:
        if archive.testzip() is not None or archive.read("index.html") != html:
            raise RuntimeError("Falha na validação do pacote.")
        print(f"ZIP validado: {OUTPUT.relative_to(ROOT)}")
        print(f"{len(archive.namelist())} arquivos; {OUTPUT.stat().st_size} bytes")


if __name__ == "__main__":
    main()

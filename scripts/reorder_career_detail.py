# -*- coding: utf-8 -*-
"""Reorder careerDetailSections to match projects.ts task order."""

import re
from pathlib import Path

path = Path(__file__).resolve().parent.parent / "src" / "data" / "career-detail.ts"
text = path.read_text(encoding="utf-8")

marker = "export const careerDetailSections: CareerDetailSection[] = ["
start = text.index(marker) + len(marker)
end = text.rindex("];")
inner = text[start:end]

order = [
    "flowpay",
    "ywave",
    "neurosight",
    "tcp",
    "hai",
    "ainterview",
    "rzi",
    "artliving",
    "mealdang",
    "huriup",
    "songeul",
    "connect",
    "dotori",
    "16play",
]


def extract_sections(s: str) -> list[str]:
    parts: list[str] = []
    i = 0
    s = s.strip()
    while i < len(s):
        chunk_start = i
        while i < len(s) and s[i].isspace():
            i += 1
        if s[i : i + 2] == "//":
            while i < len(s) and s[i] != "\n":
                i += 1
            i += 1
        while i < len(s) and s[i].isspace():
            i += 1
        if i >= len(s):
            break
        if s[i] != "{":
            raise ValueError(f"expected {{ at {i}, got {s[i : i + 20]!r}")
        depth = 0
        for j in range(i, len(s)):
            if s[j] == "{":
                depth += 1
            elif s[j] == "}":
                depth -= 1
                if depth == 0:
                    parts.append(s[chunk_start : j + 1])
                    i = j + 1
                    while i < len(s) and s[i] in ",\n ":
                        i += 1
                    break
        else:
            raise ValueError("unbalanced braces")
    return parts


sections = extract_sections(inner)
by_id = {}
for block in sections:
    m = re.search(r'id:\s*"([^"]+)"', block)
    if not m:
        raise ValueError("no id in block: " + block[:120])
    by_id[m.group(1)] = block

for oid in order:
    if oid not in by_id:
        raise KeyError(f"missing {oid}")

new_inner = "\n" + ",\n\n".join(by_id[i].rstrip() for i in order) + "\n"
new_text = text[:start] + new_inner + text[end:]
path.write_text(new_text, encoding="utf-8")
print("OK:", len(sections), "sections ->", len(order), "ordered")

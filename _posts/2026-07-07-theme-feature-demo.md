---
title: "Theme Feature Demo: Syntax Highlighting, Tags & Markdown"
date: 2026-07-07 12:00:00 +0300
tags: [meta, demo, yara, reversing]
---

This is a test post that doubles as a quick tour of what this theme can render. No actual research here — just fenced code blocks, tags, tables, and other Markdown building blocks to make sure everything looks right before real write-ups go live.

## Syntax highlighting

Every fenced code block gets a language header and a copy button that appears on hover.

```python
import hashlib


def sha256_of_file(path: str) -> str:
    digest = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            digest.update(chunk)
    return digest.hexdigest()
```

YARA rules get the same treatment:

```yaml
rule Demo_Suspicious_Loader
{
    meta:
        author = "kumih0x"
        description = "Example rule for the theme demo post"

    strings:
        $s1 = "VirtualAllocEx" ascii
        $s2 = "WriteProcessMemory" ascii
        $s3 = { 4D 5A 90 00 03 00 00 00 }

    condition:
        uint16(0) == 0x5A4D and 2 of ($s1, $s2, $s3)
}
```

And a bit of x86 assembly, because a malware blog without disassembly would be strange:

```nasm
start:
    push    ebp
    mov     ebp, esp
    sub     esp, 0x10
    xor     eax, eax
    call    dword [ebp+0x8]
    leave
    ret
```

## Lists

Things this theme currently supports:

- Gruvbox Dark syntax highlighting via Rouge
- Clickable tags (try the ones on this post, or in the sidebar on the [homepage](/))
- A reading progress bar at the top of the viewport
- Scroll-reveal on post cards, respecting `prefers-reduced-motion`

Rough rollout order was:

1. Base layout and typography
2. Homepage hero + tag filtering
3. Post typography and code block polish
4. This demo post

## Blockquote

> Analysis is only as good as the notes you leave for your future self re-reading it six months later.

## Table

| Technique | ATT&CK ID | Notes |
|---|---|---|
| Process Hollowing | T1055.012 | Common in loader stage |
| Registry Run Keys | T1547.001 | Cheap persistence |
| DNS Tunneling | T1071.004 | Slow but stealthy C2 |

## Inline code and images

Inline snippets like `VirtualAlloc` or `ptrace(PTRACE_ATTACH, ...)` render as small pills. Images are centered and rounded automatically:

![Pixel-art terminal illustration](/assets/images/pixel-art-computer.svg)

---

That's the tour. Tags on this post (`meta`, `demo`, `yara`, `reversing`) are clickable and will filter the post list on the homepage — clicking one from a post page jumps back to `/` with the filter already applied.

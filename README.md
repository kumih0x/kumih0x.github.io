# kumih0x.github.io

Source for my security research blog — a Gruvbox-inspired Jekyll site for
malware analysis, reverse engineering and low-level research write-ups.

## Features

- Gruvbox Dark aesthetic
- Responsive layout
- Rouge syntax highlighting with language header + copy buttons for code blocks
- Tag filtering (clickable from both the homepage and post pages)
- Subtle, tasteful motion: typing hero terminal line, scroll-reveal cards, one-shot title glitch (all respect `prefers-reduced-motion`)
- Reading progress bar on posts
- RSS + SEO

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Open http://127.0.0.1:4000

## Deployment

Pushes to `main` are built and deployed automatically to GitHub Pages via
the workflow in `.github/workflows/jekyll.yml`.

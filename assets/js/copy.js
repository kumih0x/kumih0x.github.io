document.addEventListener('DOMContentLoaded', () => {
  // Language header for fenced code blocks (div.language-xxx.highlighter-rouge)
  document.querySelectorAll('div.highlighter-rouge').forEach((wrapper) => {
    const highlight = wrapper.querySelector('.highlight');
    if (!highlight || wrapper.querySelector('.code-header')) return;

    const langClass = Array.from(wrapper.classList).find((c) => c.startsWith('language-'));
    if (!langClass) return;

    const lang = langClass.replace('language-', '');
    if (!lang || lang === 'plaintext') return;

    const header = document.createElement('div');
    header.className = 'code-header';
    header.innerHTML = `<span class="code-language">${lang}</span>`;

    wrapper.insertBefore(header, highlight);
    highlight.classList.add('with-header');
  });

  document.querySelectorAll('pre').forEach((block) => {
    // Защита от дублей
    if (block.querySelector('.copy-code-btn')) return;

    const btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.innerHTML = `
      <svg class="icon-copy" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
      </svg>
      <span class="copy-text">copy</span>
    `;
    btn.setAttribute('aria-label', 'Copy code');

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(block.innerText);
        btn.classList.add('copied');
        const textSpan = btn.querySelector('.copy-text');
        textSpan.textContent = 'copied';
        
        setTimeout(() => {
          btn.classList.remove('copied');
          textSpan.textContent = 'copy';
        }, 1500);
      } catch (err) {
        console.error('Failed to copy:', err);
        btn.querySelector('.copy-text').textContent = 'fail';
      }
    });

    block.appendChild(btn);
  });
});
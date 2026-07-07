document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initTypingEffect(reduceMotion);
  initScrollReveal(reduceMotion);
  initReadingProgress();
});

// Types out the hero "$ whoami" command, then reveals the output line.
// Falls back instantly (no animation) if the user prefers reduced motion,
// or if JS never ran the markup already contains the final text.
function initTypingEffect(reduceMotion) {
  const cmd = document.querySelector('.typed-text');
  if (!cmd) return;

  const text = cmd.getAttribute('data-typed') || cmd.textContent;
  const output = document.querySelector('.command-output[data-output]');

  if (reduceMotion) {
    cmd.textContent = text;
    if (output) output.style.opacity = 1;
    return;
  }

  if (output) output.style.opacity = 0;
  cmd.textContent = '';

  const speed = 90;
  let i = 0;

  (function typeChar() {
    if (i <= text.length) {
      cmd.textContent = text.slice(0, i);
      i += 1;
      setTimeout(typeChar, speed);
    } else if (output) {
      output.style.opacity = 1;
    }
  })();
}

// Fades + slides post cards and sidebar blocks in as they enter the
// viewport. Elements stay fully visible by default; the .reveal class
// (which hides them pre-animation) is only added here, so content never
// depends on JS running to be readable.
function initScrollReveal(reduceMotion) {
  const targets = document.querySelectorAll('.post-item, .sidebar-block');
  if (!targets.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    return;
  }

  targets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

// Thin bar at the top of the viewport showing how far through the post
// article the reader has scrolled. No-op on pages without a .post-content
// (homepage, about). Not gated by prefers-reduced-motion: it's a functional
// scroll-linked indicator, not a self-playing decorative animation.
function initReadingProgress() {
  const bar = document.getElementById('readingProgress');
  const article = document.querySelector('.post-content');
  if (!bar || !article) return;

  function update() {
    const rect = article.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
    const pct = total > 0 ? (scrolled / total) * 100 : 0;
    bar.style.width = pct + '%';
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

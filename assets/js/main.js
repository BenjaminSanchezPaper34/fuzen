// ============ SCROLL REVEAL ============
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.sr, .reveal').forEach(el => io.observe(el));

// Marque en .sr automatiquement les sections du menu pour reveal au scroll
document.querySelectorAll('.menu-section').forEach(s => { s.classList.add('sr'); io.observe(s); });

// ============ ACTIVE TAB SYNC (carte) ============
const tabs = document.querySelectorAll('.menu-tabs a');
if (tabs.length) {
  const sections = [...tabs].map(t => document.querySelector(t.getAttribute('href')));
  const onScroll = () => {
    const y = window.scrollY + 140;
    let active = 0;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) active = i; });
    tabs.forEach((t, i) => t.classList.toggle('active', i === active));
    const activeTab = tabs[active];
    if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============ FALLBACK TRANSITION DE PAGE ============
// Pour navigateurs sans View Transitions API : fade out body avant navigation
if (!document.startViewTransition) {
  document.querySelectorAll('a[href$=".html"], a[href="/"], a[href="index.html"], a[href="carte.html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const url = link.getAttribute('href');
      if (!url || link.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (url.startsWith('http') && !url.includes(location.hostname)) return;
      e.preventDefault();
      document.body.style.transition = 'opacity 0.35s ease';
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = url; }, 300);
    });
  });
}

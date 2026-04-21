// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Active tab sync on menu page
const tabs = document.querySelectorAll('.menu-tabs a');
if (tabs.length) {
  const sections = [...tabs].map(t => document.querySelector(t.getAttribute('href')));
  const onScroll = () => {
    const y = window.scrollY + 120;
    let active = 0;
    sections.forEach((s, i) => { if (s && s.offsetTop <= y) active = i; });
    tabs.forEach((t, i) => t.classList.toggle('active', i === active));
    // Scroll active tab into view horizontally
    const activeTab = tabs[active];
    if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

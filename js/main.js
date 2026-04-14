// ── Page load fade-in ────────────────────────────────────────
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue("--nav-h")) || 60;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ── Reveal sections on scroll ─────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ── Nav: highlight active section ────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.style.color = link.getAttribute("href") === `#${id}`
          ? "var(--text-primary)"
          : "";
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => activeObserver.observe(s));

// ── Nav: elevate on scroll ────────────────────────────────────
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.style.background = window.scrollY > 10
    ? "rgba(11,12,15,0.95)"
    : "rgba(11,12,15,0.75)";
}, { passive: true });

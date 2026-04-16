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
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", isActive);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => activeObserver.observe(s));

// ── Nav: elevate on scroll ────────────────────────────────────
const nav = document.getElementById("nav");

if (nav) {
  window.addEventListener("scroll", () => {
    nav.style.background = window.scrollY > 10
      ? "rgba(11,12,15,0.95)"
      : "rgba(11,12,15,0.75)";
  }, { passive: true });
}

// ── Mobile menu toggle ───────────────────────────────────────
const menuBtn = document.getElementById("menu-btn");
const navLinksContainer = document.querySelector(".nav-links");

if (menuBtn && navLinksContainer) {
  menuBtn.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
  });

  // Close menu when a link is clicked
  const navItems = navLinksContainer.querySelectorAll("a");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navLinksContainer.classList.remove("active");
    });
  });
}

// ── Back to top button ────────────────────────────────────────
const backToTop = document.createElement("button");
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTop.className = "back-to-top";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  backToTop.blur(); // ← force-clears the active/focus state
});
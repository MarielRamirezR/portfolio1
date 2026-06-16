const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    mobileNav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

const isHomePage = Boolean(document.querySelector(".hero") && document.querySelector(".known-for"));
const homeRevealItems = isHomePage
  ? document.querySelectorAll(
  [
    ".hero-copy > *",
    ".hero-media",
    ".impact-ribbon",
    ".impact-item",
    ".intro-highlight",
    ".known-for-heading",
    ".skill-group",
    ".ticket",
    ".section-label",
    ".project-card",
    ".site-footer",
  ].join(",")
)
  : [];

if (homeRevealItems.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  homeRevealItems.forEach((item, index) => {
    item.classList.add("reveal");

    if (item.matches(".impact-ribbon, .known-for-heading, .project-card, .hero-media")) {
      item.classList.add("reveal-soft");
    }

    const delay = item.matches(".ticket")
      ? Math.min(index * 18, 220)
      : Math.min(index * 45, 280);

    item.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    }
  );

  homeRevealItems.forEach((item) => revealObserver.observe(item));
}

const caseNavLinks = [...document.querySelectorAll(".case-nav a")];
const caseSections = caseNavLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (caseNavLinks.length && caseSections.length) {
  const setActiveCaseLink = (id) => {
    caseNavLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const updateActiveCaseLink = () => {
    const activeSection = [...caseSections].reverse().find((section) => {
      return section.getBoundingClientRect().top <= 180;
    });

    setActiveCaseLink((activeSection || caseSections[0]).id);
  };

  updateActiveCaseLink();

  const caseNavObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCaseLink(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-28% 0px -62% 0px",
      threshold: 0,
    }
  );

  caseSections.forEach((section) => caseNavObserver.observe(section));
  window.addEventListener("scroll", updateActiveCaseLink, { passive: true });
  window.addEventListener("resize", updateActiveCaseLink);
}

// DOM Elements
const themeToggle = document.querySelector(".theme-toggle");
const themeButtons = document.querySelectorAll(".theme-btn");
const body = document.body;
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");
const downloadBtn = document.getElementById("downloadCV");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.querySelector(".header");

// Theme Management
function setTheme(theme) {
  // Remove all theme classes
  body.classList.remove("light-mode", "dark-mode");

  // Set new theme
  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    body.classList.add(prefersDark ? "dark-mode" : "light-mode");
  } else {
    body.classList.add(theme + "-mode");
  }

  // Update active button
  themeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });

  // Save to localStorage
  localStorage.setItem("portfolio-theme", theme);
}

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme") || "light";
  setTheme(savedTheme);
}

// Theme button event listeners
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(button.dataset.theme);
  });
});

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (localStorage.getItem("portfolio-theme") === "system") {
      setTheme("system");
    }
  });

// Mobile Menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu);

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// CV Download
downloadBtn.addEventListener("click", () => {
  // Create temporary link
  const link = document.createElement("a");
  link.href = "myCV.pdf";
  link.download = "Abdilahi_Suleiman_Elmi_CV.pdf";

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Visual feedback
  const originalHTML = downloadBtn.innerHTML;
  downloadBtn.innerHTML = '<i class="fas fa-check"></i> CV Downloaded!';
  downloadBtn.style.background = "#10b981";

  setTimeout(() => {
    downloadBtn.innerHTML = originalHTML;
    downloadBtn.style.background = "";
  }, 2000);
});

// Smooth Scrolling
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Mobile links also need smooth scrolling
mobileLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Header scroll effect
function updateHeader() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Intersection Observer for animations
function setupAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupAnimations();
  updateHeader();

  // Update header on scroll
  window.addEventListener("scroll", updateHeader);

  // Close mobile menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      toggleMobileMenu();
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      toggleMobileMenu();
    }
  });
});

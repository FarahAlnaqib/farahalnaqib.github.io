const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const revealItems = document.querySelectorAll(".reveal");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const navbar = document.querySelector(".navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const avatarShell = document.getElementById("avatarShell");
const avatarFace = document.querySelector(".avatar-face");

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("dark");
  themeToggle.textContent = body.classList.contains("dark") ? "🌙" : "☀️";
});

menuToggle?.addEventListener("click", () => {
  navMenu?.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("show");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item) => observer.observe(item));

window.addEventListener("scroll", () => {
  navbar?.classList.toggle("scrolled", window.scrollY > 30);
  scrollTopBtn?.classList.toggle("show", window.scrollY > 300);
});

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function animateAvatar() {
  currentX += (mouseX - currentX) * 0.08;
  currentY += (mouseY - currentY) * 0.08;

  const x = (currentX / window.innerWidth - 0.5) * 2;
  const y = (currentY / window.innerHeight - 0.5) * 2;

  if (avatarShell) {
    avatarShell.style.transform = `translate(${x * 8}px, ${y * 6}px)`;
  }

  if (avatarFace) {
    avatarFace.style.transform = `translate(${x * 8}px, ${y * 6}px)`;
  }

  requestAnimationFrame(animateAvatar);
}

animateAvatar();
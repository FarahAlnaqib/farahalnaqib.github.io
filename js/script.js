const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const revealItems = document.querySelectorAll(".reveal");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const navbar = document.querySelector(".navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    themeToggle.textContent = body.classList.contains("dark") ? "🌙" : "☀️";
  });
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}

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
  if (window.scrollY > 30) {
    navbar?.classList.add("scrolled");
  } else {
    navbar?.classList.remove("scrolled");
  }

  if (window.scrollY > 300) {
    scrollTopBtn?.classList.add("show");
  } else {
    scrollTopBtn?.classList.remove("show");
  }

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const face = document.querySelector(".face");
const innerFace = document.querySelector(".inner-face");
const eyes = document.querySelectorAll(".eye");
const brows = document.querySelectorAll(".brow");
const hairFront = document.querySelector(".hair-front");
const hairBack = document.querySelector(".hair-back");
const ears = document.querySelectorAll(".ear");
const shadows = document.querySelectorAll(".shape-shadow");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateAvatar() {
  currentX += (mouseX - currentX) * 0.08;
  currentY += (mouseY - currentY) * 0.08;

  const x = (currentX / window.innerWidth - 0.5) * 2;
  const y = (currentY / window.innerHeight - 0.5) * 2;

  if (face) face.style.transform = `translate(${x * 6}px, ${y * 5}px)`;
  if (innerFace) innerFace.style.transform = `translate(${x * 4}px, ${y * 4}px)`;

  eyes.forEach((eye) => {
    eye.style.transform = `translate(${x * 4}px, ${y * 4}px)`;
  });

  brows.forEach((brow) => {
    brow.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
  });

  if (hairFront) hairFront.style.transform = `translate(${x * 2}px, ${y * 1.6}px)`;
  if (hairBack) hairBack.style.transform = `translate(${x * -1.4}px, ${y * -1.2}px)`;

  ears.forEach((ear) => {
    ear.style.transform = `translate(${x * -1.5}px, ${y * -0.8}px)`;
  });

  shadows.forEach((shadow) => {
    shadow.style.transform = `translate(${x * -1}px, ${y * -1}px)`;
  });

  requestAnimationFrame(animateAvatar);
}

animateAvatar();

const eyeLeft = document.querySelector(".eye-left");
const eyeRight = document.querySelector(".eye-right");
const eyeLeftBlink = document.querySelector(".eye-left-2");
const eyeRightBlink = document.querySelector(".eye-right-2");

function blinkEyes() {
  if (!eyeLeft || !eyeRight || !eyeLeftBlink || !eyeRightBlink) return;

  eyeLeft.style.opacity = "0";
  eyeRight.style.opacity = "0";
  eyeLeftBlink.style.opacity = "1";
  eyeRightBlink.style.opacity = "1";

  setTimeout(() => {
    eyeLeft.style.opacity = "1";
    eyeRight.style.opacity = "1";
    eyeLeftBlink.style.opacity = "0";
    eyeRightBlink.style.opacity = "0";
  }, 170);

  const nextBlink = Math.random() * 2600 + 2200;
  setTimeout(blinkEyes, nextBlink);
}

setTimeout(blinkEyes, 1500);
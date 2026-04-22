const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const revealItems = document.querySelectorAll(".reveal");
const projectTriggers = document.querySelectorAll(".project-trigger");
const projectCards = document.querySelectorAll(".project-card");
const scrollTopBtn = document.getElementById("scrollTopBtn");

// theme
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  themeToggle.textContent = body.classList.contains("dark") ? "🌙" : "☀️";
});

// reveal on scroll
function revealOnScroll() {
  revealItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    const visible = window.innerHeight - 80;
    if (top < visible) {
      item.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// projects switch
projectTriggers.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    const index = btn.dataset.project;

    projectTriggers.forEach((b) => b.classList.remove("active"));
    projectCards.forEach((card) => card.classList.remove("active"));

    btn.classList.add("active");
    document.querySelector(`.project-card[data-card="${index}"]`).classList.add("active");
  });

  btn.addEventListener("click", () => {
    const index = btn.dataset.project;

    projectTriggers.forEach((b) => b.classList.remove("active"));
    projectCards.forEach((card) => card.classList.remove("active"));

    btn.classList.add("active");
    document.querySelector(`.project-card[data-card="${index}"]`).classList.add("active");
  });
});

// scroll top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// avatar face follow mouse
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

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateAvatar() {
  const x = (mouseX / window.innerWidth - 0.5) * 2;
  const y = (mouseY / window.innerHeight - 0.5) * 2;

  if (face) {
    face.style.transform = `translate(${x * 6}px, ${y * 5}px)`;
  }
  if (innerFace) {
    innerFace.style.transform = `translate(${x * 4}px, ${y * 4}px)`;
  }
  eyes.forEach((eye) => {
    eye.style.transform = `translate(${x * 5}px, ${y * 5}px)`;
  });
  brows.forEach((brow) => {
    brow.style.transform = `translate(${x * 2}px, ${y * 3}px)`;
  });
  if (hairFront) {
    hairFront.style.transform = `translate(${x * 2.5}px, ${y * 2}px)`;
  }
  if (hairBack) {
    hairBack.style.transform = `translate(${x * -1.5}px, ${y * -1.5}px)`;
  }
  ears.forEach((ear) => {
    ear.style.transform = `translate(${x * -2}px, ${y * -1}px)`;
  });
  shadows.forEach((shadow) => {
    shadow.style.transform = `translate(${x * -1.2}px, ${y * -1.2}px)`;
  });

  requestAnimationFrame(animateAvatar);
}
animateAvatar();

// blinking
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
  }, 180);

  const nextBlink = Math.random() * 3000 + 2500;
  setTimeout(blinkEyes, nextBlink);
}

setTimeout(blinkEyes, 1800);
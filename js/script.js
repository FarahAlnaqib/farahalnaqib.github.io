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

/* ===== AI CHAT ===== */

const aiChat = document.getElementById("aiChat");
const aiChatToggle = document.getElementById("aiChatToggle");
const aiChatClose = document.getElementById("aiChatClose");
const aiChatForm = document.getElementById("aiChatForm");
const aiChatInput = document.getElementById("aiChatInput");
const aiChatMessages = document.getElementById("aiChatMessages");
const aiSuggestionButtons = document.querySelectorAll(".ai-chat-suggestions button");

const aiAnswers = {
  projects:
    "Farah has worked on several projects, including Fidak Blood Donation Management System, Smart Parking System, Movie Theater Management System, Maze Solver Game, Bank / ATM Management System, and Tic-Tac-Toe with User System.",
  skills:
    "Farah’s skills include C++, Python, JavaScript, PHP, HTML, CSS, Bootstrap, jQuery, MySQL, SQL, Git, GitHub, VS Code, problem solving, system design, data structures, and algorithms.",
  certificates:
    "Farah’s certificates include Developing AI Applications with Python and Flask, Application Security for Developers and DevOps Professionals, Python Data Structures, and Monitoring and Observability for Development and DevOps.",
  contact:
    "You can contact Farah by email at fabalnaqib@effat.edu.sa, or visit her GitHub and LinkedIn from the Contact section.",
  education:
    "Farah is a Computer Science student at Effat University. She started her Computer Science major in 2023 and is currently entering her senior year with a GPA of 3.80.",
  default:
    "I can answer questions about Farah’s projects, skills, certificates, education, and contact information."
};

function addAIMessage(text, type) {
  if (!aiChatMessages) return;

  const message = document.createElement("div");
  message.className = `ai-message ${type}`;
  message.textContent = text;

  aiChatMessages.appendChild(message);
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
}

function getAIAnswer(question) {
  const text = question.toLowerCase();

  if (text.includes("project") || text.includes("github") || text.includes("work")) {
    return aiAnswers.projects;
  }

  if (text.includes("skill") || text.includes("programming") || text.includes("tools")) {
    return aiAnswers.skills;
  }

  if (
    text.includes("certificate") ||
    text.includes("certification") ||
    text.includes("certificates") ||
    text.includes("ibm") ||
    text.includes("coursera")
  ) {
    return aiAnswers.certificates;
  }

  if (text.includes("contact") || text.includes("email") || text.includes("linkedin")) {
    return aiAnswers.contact;
  }

  if (text.includes("education") || text.includes("university") || text.includes("gpa")) {
    return aiAnswers.education;
  }

  return aiAnswers.default;
}

aiChatToggle?.addEventListener("click", () => {
  aiChat?.classList.toggle("open");
});

aiChatClose?.addEventListener("click", () => {
  aiChat?.classList.remove("open");
});

aiChatForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const question = aiChatInput.value.trim();
  if (!question) return;

  addAIMessage(question, "user");
  aiChatInput.value = "";

  setTimeout(() => {
    addAIMessage(getAIAnswer(question), "bot");
  }, 450);
});

aiSuggestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const questionKey = button.dataset.question;

    addAIMessage(button.textContent, "user");

    setTimeout(() => {
      addAIMessage(aiAnswers[questionKey] || aiAnswers.default, "bot");
    }, 350);
  });
});
particlesJS("particles-js", {
  particles: {
    number: { value: 50 },
    size: { value: 3 },
    color: { value: "#00f0ff" },
    line_linked: {
      enable: true,
      color: "#00f0ff"
    },
    move: { speed: 2 }
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "repulse" } }
  }
});


function toggleMenu() {
  document.querySelector('.nav-center').classList.toggle('active');
  // document.querySelector('.nav-right').classList.toggle('active');
}

let introPlayed = false;

// Trigger animation on first scroll or swipe, but do not block scrolling
window.addEventListener('wheel', () => {
  if (!introPlayed) playIntroAnimation();
}, { passive: true });

window.addEventListener('touchstart', () => { // for mobile
  if (!introPlayed) playIntroAnimation();
}, { passive: true });

let moved = false;
let overlayed = false;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const heroContent = document.getElementById('heroContent');
  const foregroundImage = document.getElementById('foregroundImage');
  const currentScroll = window.scrollY;

  // Scroll down action
  if (currentScroll > 50 && !moved) {
    heroContent.classList.add('moved');
    foregroundImage.classList.add('moved');
    foregroundImage.classList.remove('overlay');
    moved = true;
    overlayed = false;
  }

  // Scroll up action (trigger as soon as upward scroll starts)
  else if (currentScroll < lastScrollY && moved && !overlayed) {
    heroContent.classList.remove('moved');
    foregroundImage.classList.remove('moved');
    foregroundImage.classList.add('overlay');
    moved = false;
    overlayed = true;
  }

  lastScrollY = currentScroll;
});

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotMessages = document.getElementById('chatbotMessages');

// Open chatbot
chatbotToggle.addEventListener('click', () => {
  chatbotContainer.style.display = 'flex';
});

// Close chatbot
chatbotClose.addEventListener('click', () => {
  chatbotContainer.style.display = 'none';
});

// Send message
chatbotSend.addEventListener('click', () => {
  const userMessage = chatbotInput.value.trim();
  if (userMessage === '') return;

  // Display user message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.classList.add('message', 'user');
  userMsgDiv.textContent = userMessage;
  chatbotMessages.appendChild(userMsgDiv);

  chatbotInput.value = '';

  // Simulate AI reply
  setTimeout(() => {
    const botMsgDiv = document.createElement('div');
    botMsgDiv.classList.add('message', 'bot');
    botMsgDiv.textContent = "I'm still learning! 😊";
    chatbotMessages.appendChild(botMsgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 600);
});



function playIntroAnimation() {
  const hero = document.getElementById('hero');
  const content = document.getElementById('heroContent');
  const fgImage = document.getElementById('foregroundImage');

  hero.classList.add('active');
  content.classList.add('moved');

  setTimeout(() => {
    fgImage.classList.add('active');
  }, 600);

  setTimeout(() => {
    introPlayed = true;
  }, 1800);
}

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.glass-section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
  });

  // Tilt effect
  document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

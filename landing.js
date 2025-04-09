// landing.js

// Fade-in and fade-up on scroll
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".fade-in, .fade-up");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.2,
    });
  
    animatedElements.forEach(el => observer.observe(el));
  });
  
  // Optional parallax effect (subtle)
  window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax');
    let scrollPosition = window.pageYOffset;
    if (parallax) {
      parallax.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
  });
  
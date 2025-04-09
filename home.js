// home.js

document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in, .fade-up");
  
    const appearOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };
  
    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        appearOnScroll.unobserve(entry.target);
      });
    }, appearOptions);
  
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    });
  });
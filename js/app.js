document.addEventListener("DOMContentLoaded", () => {
  // --- Global Functionality ---

  // 1. Preloader
  const loader =
    document.getElementById("loader") || document.getElementById("preloader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 800);
  }

  // 2. Mobile Navigation
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const icon = mobileToggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });
  }

  // 3. Sticky Header on Scroll
  const header = document.querySelector(".main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // 4. Smooth Scrolling for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = header ? header.offsetHeight : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Close mobile menu after clicking a link
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          const icon = mobileToggle.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  });

  // 5. Chatbot
  const chatbotBubble = document.querySelector(".chatbot-bubble");
  const chatbotContainer = document.querySelector(".chatbot-container");
  const closeBtn = document.querySelector(".close-btn");
  const chatInput = chatbotContainer?.querySelector(".chat-input input");
  const sendBtn = chatbotContainer?.querySelector(".chat-input button");
  const chatMessages = chatbotContainer?.querySelector(".chat-messages");

  if (chatbotBubble && chatbotContainer && closeBtn) {
    chatbotBubble.addEventListener("click", () => {
      chatbotContainer.style.display = "flex";
      chatbotBubble.style.display = "none";
    });

    closeBtn.addEventListener("click", () => {
      chatbotContainer.style.display = "none";
      chatbotBubble.style.display = "flex";
    });

    const appendMessage = (sender, text) => {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("chat-message", sender);
      msgDiv.innerHTML = `<p>${text}</p>`;
      chatMessages.appendChild(msgDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleSendMessage = () => {
      const message = chatInput.value.trim();
      if (message) {
        appendMessage("user", message);
        chatInput.value = "";
        // Simple bot response logic
        setTimeout(() => {
          appendMessage(
            "bot",
            "Thanks for your message! An agent will be with you shortly."
          );
        }, 1000);
      }
    };

    sendBtn.addEventListener("click", handleSendMessage);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSendMessage();
    });
  }

  // 6. AOS Initialization
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      disable: "mobile",
    });
  }

  // --- Page-Specific Functionality ---

  // 1. Stats Counter (Index & About pages)
  const statsContainer = document.querySelector(".stats-container");
  if (statsContainer) {
    const counters = statsContainer.querySelectorAll(".stat-counter");
    const animateCounters = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => {
            counter.innerText = "0";
            const target = +counter.getAttribute("data-target");
            const duration = 1500;
            const increment = target / (duration / 16);

            const updateCount = () => {
              const current = +counter.innerText;
              if (current < target) {
                counter.innerText = `${Math.ceil(current + increment)}`;
                setTimeout(updateCount, 16);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
          });
          observer.unobserve(statsContainer);
        }
      });
    };
    const observer = new IntersectionObserver(animateCounters, {
      threshold: 0.5,
    });
    observer.observe(statsContainer);
  }

  // 2. Contact Page Form Validation & FAQ
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formSuccess = document.getElementById("formSuccess");
      // Basic validation success simulation
      this.reset();
      formSuccess.style.display = "flex";
      setTimeout(() => (formSuccess.style.display = "none"), 4000);
    });
  }

  const faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      question.addEventListener("click", () => {
        const answer = item.querySelector(".faq-answer");
        const icon = question.querySelector("i");

        item.classList.toggle("active");
        if (item.classList.contains("active")) {
          answer.style.maxHeight = answer.scrollHeight + "px";
          icon.style.transform = "rotate(180deg)";
        } else {
          answer.style.maxHeight = "0";
          icon.style.transform = "rotate(0deg)";
        }
      });
    });
  }

  // 3. Services Page: Tabs and Slider
  const serviceTabs = document.querySelector(".service-tabs");
  if (serviceTabs) {
    const tabButtons = serviceTabs.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));
        button.classList.add("active");
        document.getElementById(button.dataset.target).classList.add("active");
      });
    });
  }

  const caseStudySlider = document.querySelector(".case-studies-slider");
  if (caseStudySlider) {
    // Basic slider functionality can be added here if needed.
    // For now, it's a static display.
  }

  // 4. Why AI Page: Modals and Tabs
  const benefitLinks = document.querySelectorAll(".benefit-link");
  if (benefitLinks.length > 0) {
    benefitLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const modalId = link.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "flex";
      });
    });

    document.querySelectorAll(".modal-container").forEach((modal) => {
      modal.querySelector(".close-modal").addEventListener("click", () => {
        modal.style.display = "none";
      });
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    });
  }

  const researchTabs = document.querySelector(".research-tabs");
  if (researchTabs) {
    const tabButtons = researchTabs.querySelectorAll(".tabs-nav .tab-btn");
    const tabPanels = researchTabs.querySelectorAll(".tabs-content .tab-panel");
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabPanels.forEach((panel) => panel.classList.remove("active"));
        button.classList.add("active");
        document.getElementById(button.dataset.tab).classList.add("active");
      });
    });
  }
});

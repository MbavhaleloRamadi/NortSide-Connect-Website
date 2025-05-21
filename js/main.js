
// Preloader
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('preloader').style.display = 'none';
  }, 1000);
});

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Shrink Header on Scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Stats Counter Animation
function animateStats() {
  const counters = document.querySelectorAll('.stat-counter');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // Animation duration in milliseconds
    const increment = target / (duration / 16); // 60fps
    let currentCount = 0;
    
    const updateCounter = () => {
      currentCount += increment;
      counter.textContent = Math.floor(currentCount);
      
      if (currentCount < target) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  });
}

// Initialize AOS (Animate on Scroll)
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}

// Intersection Observer for Stats Section
document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.stats-section');
  
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }
});

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

if (chatbotToggle && chatbotContainer) {
  // Toggle chatbot window
  chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    chatbotToggle.style.display = 'none';
  });
  
  // Close chatbot window
  chatbotClose.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
    chatbotToggle.style.display = 'flex';
  });
  
  // Send message function
  const sendUserMessage = () => {
    const message = userInput.value.trim();
    
    if (message !== '') {
      // Display user message
      appendMessage('user', message);
      
      // Clear input
      userInput.value = '';
      
      // Process and respond to user message
      processUserMessage(message);
    }
  };
  
  // Add event listeners to send message
  sendMessage.addEventListener('click', sendUserMessage);
  
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendUserMessage();
    }
  });
  
  // Append message to chat window
  const appendMessage = (sender, text) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    
    const messagePara = document.createElement('p');
    messagePara.textContent = text;
    
    messageDiv.appendChild(messagePara);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };
  
  // Process user message and generate response
  const processUserMessage = (message) => {
    // Simple responses based on keywords
    setTimeout(() => {
      let response = '';
      
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        response = 'Hello! How can I help you today?';
      } else if (lowerMessage.includes('services') || lowerMessage.includes('offer')) {
        response = 'We offer B2B AI Solutions, Mobile App Development, AI-Powered Cybersecurity,and System Implementation Training. Would you like to know more about any of these services?';
      } else if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
        response = 'Our AI solutions include custom chatbots, automation systems, and analytics to optimize your business workflows. Would you like to schedule a consultation?';
      } else if (lowerMessage.includes('mobile') || lowerMessage.includes('app')) {
        response = 'We develop cross-platform mobile applications built with scalability and user experience at the core. Our team can help bring your app idea to life!';
      } else if (lowerMessage.includes('security') || lowerMessage.includes('cyber')) {
        response = 'Our AI-Powered Cybersecurity solutions provide proactive systems that monitor, detect, and respond to threats in real-time, keeping your business safe.';
      } else if (lowerMessage.includes('training') || lowerMessage.includes('learn')) {
        response = 'We provide comprehensive System Implementation Training to ensure your team can effectively run, scale, and troubleshoot your new systems.';
      } else if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('pricing')) {
        response = 'Our pricing varies based on project requirements. We\'d be happy to provide a personalized quote after understanding your specific needs. Would you like to schedule a call?';
          } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
        response = 'You can reach us at info@northsideconnect.com or by phone at +27 (0) 123 456 789. Would you like us to contact you?';
      } else if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('office')) {
        response = 'We are based in Pretoria, South Africa. We can arrange virtual meetings or in-person consultations based on your preference.';
      } else if (lowerMessage.includes('appointment') || lowerMessage.includes('meeting') || lowerMessage.includes('consult')) {
        response = 'We\'d be happy to schedule a consultation! Please provide your preferred date, time, and contact details, and we\'ll get back to you shortly.';
      } else if (lowerMessage.includes('thank')) {
        response = "You're welcome! Is there anything else I can help you with?";
      } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
        response = 'Thank you for chatting with us! If you have more questions later, feel free to come back anytime.';
      } else {
        response = 'Thank you for your message. To better assist you, would you like to know about our services, schedule a consultation, or speak with a human representative?';
      }
      
      appendMessage('bot', response);
    }, 1000); // Simulate thinking time
  };
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
          }
        }
      }
    });
  });
});

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu ul li a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    } else if (current === undefined && link.getAttribute('href') === '#home') {
      link.classList.add('active');
    }
  });
});

// Form validation for contact form (if exists)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Name validation
    if (nameInput && nameInput.value.trim() === '') {
      isValid = false;
      showError(nameInput, 'Please enter your name');
    }
    
    // Email validation
    if (emailInput && emailInput.value.trim() === '') {
      isValid = false;
      showError(emailInput, 'Please enter your email');
    } else if (emailInput && !isValidEmail(emailInput.value)) {
      isValid = false;
      showError(emailInput, 'Please enter a valid email address');
    }
    
    // Message validation
    if (messageInput && messageInput.value.trim() === '') {
      isValid = false;
      showError(messageInput, 'Please enter your message');
    }
    
    // If valid, submit the form (in this case, show success message)
    if (isValid) {
      const successMessage = document.createElement('div');
      successMessage.classList.add('success-message');
      successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
      
      contactForm.innerHTML = '';
      contactForm.appendChild(successMessage);
    }
  });
  
  // Helper function to show error message
  function showError(input, message) {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = message;
    
    input.parentNode.appendChild(errorMessage);
    input.classList.add('error');
  }
  
  // Helper function to validate email
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
}

// Testimonial slider (if exists)
const testimonialSlider = document.querySelector('.testimonial-slider');

if (testimonialSlider) {
  let currentSlide = 0;
  const slides = testimonialSlider.querySelectorAll('.testimonial-item');
  const dotsContainer = document.querySelector('.testimonial-dots');
  
  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('data-slide', i);
    dotsContainer.appendChild(dot);
  });
  
  // Add event listeners to dots
  document.querySelectorAll('.testimonial-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const slide = dot.getAttribute('data-slide');
      currentSlide = parseInt(slide);
      updateSlider();
    });
  });
  
  function updateSlider() {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
    
    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Auto slide
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }, 5000);
}

// Project filter functionality (if exists)
const projectFilters = document.querySelectorAll('.project-filter-item');
const projectItems = document.querySelectorAll('.project-item');

if (projectFilters.length > 0 && projectItems.length > 0) {
  projectFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      // Remove active class from all filters
      projectFilters.forEach(item => item.classList.remove('active'));
      
      // Add active class to current filter
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Show/hide project items based on filter
      projectItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          
          // Add animation
          setTimeout(() => {
            item.style.transform = 'scale(1)';
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.transform = 'scale(0.8)';
          item.style.opacity = '0';
          
          setTimeout(() => {
            item.style.display = 'none';
          }, 500);
        }
      });
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  // Page loading animation
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 800);
  }

  // Counter animation for statistics
  const statNumbers = document.querySelectorAll('.ai-stat-number');
  
  function animateNumbers() {
    statNumbers.forEach(stat => {
      const targetValue = parseInt(stat.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      const startValue = 0;
      
      function updateNumber() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          // Using easeOutQuad easing function for smoother animation
          const easeProgress = 1 - (1 - progress) * (1 - progress);
          const currentValue = Math.floor(startValue + easeProgress * (targetValue - startValue));
          stat.textContent = currentValue;
          requestAnimationFrame(updateNumber);
        } else {
          stat.textContent = targetValue;
        }
      }
      
      updateNumber();
    });
  }

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
      const revealTop = element.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }

  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');
      
      // Deactivate all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Activate the clicked button and corresponding panel
      button.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // Modal functionality
  const benefitLinks = document.querySelectorAll('.benefit-link');
  const modalContainers = document.querySelectorAll('.modal-container');
  const closeButtons = document.querySelectorAll('.close-modal');
  const aiDemoButton = document.getElementById('show-ai-demo');
  const demoModal = document.getElementById('demo-modal');
  
  benefitLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = link.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  if (aiDemoButton) {
    aiDemoButton.addEventListener('click', (e) => {
      e.preventDefault();
      demoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal-container');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
  
  // Close modal when clicking outside content
  modalContainers.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Demo tabs functionality
  const demoTabs = document.querySelectorAll('.demo-tab');
  const demoPanels = document.querySelectorAll('.demo-panel');
  
  demoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-demo');
      
      // Deactivate all tabs and panels
      demoTabs.forEach(t => t.classList.remove('active'));
      demoPanels.forEach(panel => panel.classList.remove('active'));
      
      // Activate the clicked tab and corresponding panel
      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  // Chatbot demo interaction simulation
  const chatbotDemo = document.querySelector('.chatbot-demo');
  if (chatbotDemo) {
    const chatInput = chatbotDemo.querySelector('input');
    const sendButton = chatbotDemo.querySelector('button');
    const chatMessages = chatbotDemo.querySelector('.chat-messages');
    
    sendButton.addEventListener('click', () => {
      simulateChatMessage();
    });
    
    function simulateChatMessage() {
      // Create user message
      const userMessage = document.createElement('div');
      userMessage.className = 'chat-message user';
      const userText = document.createElement('p');
      userText.textContent = "I need help with my order status";
      userMessage.appendChild(userText);
      chatMessages.appendChild(userMessage);
      
      // Create bot response after delay
      setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot';
        const botText = document.createElement('p');
        botText.textContent = "I can help with that! Could you please provide your order number or the email address associated with your order?";
        botMessage.appendChild(botText);
        chatMessages.appendChild(botMessage);
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    }
  }

  // Initialize effects when page loads
  setTimeout(() => {
    animateNumbers();
    checkReveal();
  }, 1000);

  // Check for reveal elements on scroll
  window.addEventListener('scroll', () => {
    checkReveal();
  });
});
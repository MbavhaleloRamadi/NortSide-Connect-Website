// Page loader
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(function() {
      document.getElementById('loader').style.display = 'none';
    }, 500);
  }, 800);
});

// Mobile navigation toggle
document.querySelector('.mobile-toggle').addEventListener('click', function() {
  document.querySelector('.nav-menu').classList.toggle('active');
  
  const icon = this.querySelector('i');
  if (icon.classList.contains('fa-bars')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Form validation
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Reset error messages
  document.querySelectorAll('.error-message').forEach(item => {
    item.textContent = '';
  });
  
  let isValid = true;
  
  // Validate name
  const name = document.getElementById('name');
  if (name.value.trim() === '') {
    document.getElementById('nameError').textContent = 'Please enter your name';
    isValid = false;
  }
  
  // Validate email
  const email = document.getElementById('email');
  if (email.value.trim() === '') {
    document.getElementById('emailError').textContent = 'Please enter your email';
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address';
    isValid = false;
  }
  
  // Validate subject
  const subject = document.getElementById('subject');
  if (subject.value === '') {
    document.getElementById('subjectError').textContent = 'Please select a subject';
    isValid = false;
  }
  
  // Validate message
  const message = document.getElementById('message');
  if (message.value.trim() === '') {
    document.getElementById('messageError').textContent = 'Please enter your message';
    isValid = false;
  }
  
  if (isValid) {
    // Form submission success animation
    contactForm.classList.add('submitted');
    formSuccess.style.display = 'flex';
    
    // Reset form after delay
    setTimeout(function() {
      contactForm.reset();
      // Here you would typically send the form data to your server
    }, 1000);
  }
});

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// FAQ accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question.querySelector('i');
    
    // Initially hide all answers
    answer.style.display = 'none';
    
    question.addEventListener('click', function() {
      // Toggle current answer
      if (answer.style.display === 'none') {
        answer.style.display = 'block';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        item.classList.add('active');
      } else {
        answer.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        item.classList.remove('active');
      }
    });
  });
});
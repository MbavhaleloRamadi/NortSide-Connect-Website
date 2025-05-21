/**
 * Services Page JavaScript
 * Handles tab navigation, case study slider, animations and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page loader
    initLoader();
    
    // Initialize service tabs
    initServiceTabs();
    
    // Initialize case study slider
    initCaseStudySlider();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize mobile navigation
    initMobileNav();
});

/**
 * Initialize page loader
 */
function initLoader() {
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.loader-progress span');
    
    // Simulate loading progress
    let width = 0;
    const progressInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 300);
        } else {
            width += Math.floor(Math.random() * 10) + 5;
            if (width > 100) width = 100;
            progress.style.width = width + '%';
        }
    }, 150);
}

/**
 * Initialize service tabs navigation
 */
function initServiceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const targetId = button.dataset.target;
            document.getElementById(targetId).classList.add('active');
        });
    });
}

/**
 * Initialize case study slider
 */
function initCaseStudySlider() {
    const slider = document.querySelector('.case-studies-slider');
    const slides = document.querySelectorAll('.case-study');
    const dotsContainer = document.querySelector('.slider-dots');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Hide all slides initially except the first one
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
    
    // Function to show specific slide
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the target slide with animation
        slides[n].style.display = 'flex';
        setTimeout(() => {
            slides[n].classList.add('active');
        }, 10);
        
        // Add active class to corresponding dot
        dots[n].classList.add('active');
        
        // Update current slide index
        currentSlide = n;
    }
    
    // Event listeners for next and previous buttons
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    });
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }, 5000);
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const processSteps = document.querySelectorAll('.process-step');
    const impactCards = document.querySelectorAll('.impact-card');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        // Animate sections on scroll
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
        
        // Animate process steps with delay
        processSteps.forEach((step, index) => {
            const stepTop = step.getBoundingClientRect().top;
            if (stepTop < windowHeight - revealPoint) {
                setTimeout(() => {
                    step.classList.add('active');
                }, index * 200);
            }
        });
        
        // Animate impact cards with delay
        impactCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - revealPoint) {
                setTimeout(() => {
                    card.classList.add('active');
                }, index * 150);
            }
        });
    }
    
    // Initial check on page load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.nav-menu') && !event.target.closest('.mobile-toggle')) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Reset icon
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

/**
 * Sticky header on scroll
 */
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
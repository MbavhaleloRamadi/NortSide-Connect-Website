// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page loading animation
    window.addEventListener('load', function() {
        // Hide loader with a fade effect
        const loader = document.getElementById('loader');
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Add animation to service sections
    const services = document.querySelectorAll('.service');
    services.forEach((service, index) => {
        service.setAttribute('data-aos', 'fade-up');
        service.setAttribute('data-aos-delay', (index * 100).toString());
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add scroll event listener for header styling
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Add responsive navigation toggle for mobile
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            // Create mobile menu button if it doesn't exist
            if (!document.querySelector('.mobile-toggle')) {
                const navMenu = document.querySelector('.nav-menu');
                const mobileToggle = document.createElement('div');
                mobileToggle.className = 'mobile-toggle';
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                header.insertBefore(mobileToggle, navMenu);
                
                // Toggle navigation menu on mobile
                mobileToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                    this.innerHTML = navMenu.classList.contains('active') ? 
                        '<i class="fas fa-times"></i>' : 
                        '<i class="fas fa-bars"></i>';
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-toggle')) {
                        navMenu.classList.remove('active');
                        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
            }
        } else {
            // Remove mobile menu elements if window is resized
            const mobileToggle = document.querySelector('.mobile-toggle');
            if (mobileToggle) {
                mobileToggle.remove();
            }
            document.querySelector('.nav-menu').classList.remove('active');
        }
    };

    // Call on load and resize
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add "Who We Are" section counter animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCounter = () => {
                current += step;
                
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };
    
    // Check if elements are in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };
    
    // Trigger counter animation when scrolled into view
    let animated = false;
    window.addEventListener('scroll', () => {
        if (!animated && document.querySelector('.counter') && isInViewport(document.querySelector('.counter'))) {
            animateCounters();
            animated = true;
        }
    });
});
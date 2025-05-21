// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page loading animation
    window.addEventListener('load', function() {
        // Hide loader with a fade effect
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(function() {
                loader.style.opacity = '0';
                setTimeout(function() {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        }
    });

    // Initialize AOS (Animate On Scroll) library with fallbacks for older browsers
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            disable: 'mobile' // Disable on mobile if performance issues
        });

        // Add animation to service sections if not already done in HTML
        const services = document.querySelectorAll('.service:not([data-aos])');
        services.forEach((service, index) => {
            service.setAttribute('data-aos', 'fade-up');
            service.setAttribute('data-aos-delay', (index * 100).toString());
        });
    }

    // Smooth scrolling for navigation links with polyfill for older browsers
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Check if smooth scrolling is supported natively
                    if ('scrollBehavior' in document.documentElement.style) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    } else {
                        // Fallback for browsers that don't support smooth scrolling
                        const startPosition = window.pageYOffset;
                        const targetPosition = targetElement.offsetTop - 80;
                        const distance = targetPosition - startPosition;
                        const duration = 500;
                        let start = null;
                        
                        function step(timestamp) {
                            if (!start) start = timestamp;
                            const progress = timestamp - start;
                            const percentage = Math.min(progress / duration, 1);
                            window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
                            if (progress < duration) {
                                window.requestAnimationFrame(step);
                            }
                        }
                        
                        function easeInOutCubic(t) {
                            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                        }
                        
                        window.requestAnimationFrame(step);
                    }
                }
            }
        });
    });

    // Add scroll event listener for header styling with throttling for performance
    const header = document.querySelector('.main-header');
    if (header) {
        let lastScrollTime = 0;
        const throttleInterval = 100; // ms

        const handleScroll = () => {
            const now = Date.now();
            if (now - lastScrollTime >= throttleInterval) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                lastScrollTime = now;
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call to set correct state on page load
        handleScroll();
    }

    // Add responsive navigation toggle for mobile
    const createMobileMenu = () => {
        if (window.innerWidth <= 768) {
            const header = document.querySelector('.main-header');
            const navMenu = document.querySelector('.nav-menu');
            
            if (!header || !navMenu) return;
            
            // Create mobile menu button if it doesn't exist
            if (!document.querySelector('.mobile-toggle')) {
                const mobileToggle = document.createElement('div');
                mobileToggle.className = 'mobile-toggle';
                mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
                mobileToggle.setAttribute('role', 'button');
                mobileToggle.setAttribute('tabindex', '0');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                header.insertBefore(mobileToggle, navMenu);
                
                // Toggle navigation menu on mobile - with keyboard support
                const toggleNav = function() {
                    navMenu.classList.toggle('active');
                    this.innerHTML = navMenu.classList.contains('active') ? 
                        '<i class="fas fa-times"></i>' : 
                        '<i class="fas fa-bars"></i>';
                    
                    // Add or remove ARIA expanded state
                    mobileToggle.setAttribute('aria-expanded', 
                        navMenu.classList.contains('active') ? 'true' : 'false');
                };
                
                mobileToggle.addEventListener('click', toggleNav);
                
                // Add keyboard support
                mobileToggle.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleNav.call(this);
                    }
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (!e.target.closest('.nav-menu') && !e.target.closest('.mobile-toggle')) {
                        navMenu.classList.remove('active');
                        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        mobileToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        } else {
            // Remove mobile menu elements if window is resized
            const mobileToggle = document.querySelector('.mobile-toggle');
            if (mobileToggle) {
                mobileToggle.remove();
            }
            
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    };

    // Call on load and resize with debouncing for performance
    createMobileMenu();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createMobileMenu, 250);
    });

    // Add "Stats Section" counter animation
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target')) || 0;
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
    
    // Check if elements are in viewport with IntersectionObserver API
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.classList.contains('stats-container')) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            counterObserver.observe(statsContainer);
        }
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };
        
        let animated = false;
        const checkScroll = () => {
            const statsContainer = document.querySelector('.stats-container');
            if (!animated && statsContainer && isInViewport(statsContainer)) {
                animateCounters();
                animated = true;
                window.removeEventListener('scroll', checkScroll);
            }
        };
        
        window.addEventListener('scroll', checkScroll);
        // Check on load as well
        checkScroll();
    }
});
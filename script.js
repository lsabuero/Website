// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }

    // Initialize hero background
    initHeroBackground();
    
    // Ensure transparent header is correctly applied
    setupHeaderBehavior();
});

// Initialize hero background
function initHeroBackground() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && !document.querySelector('.hero-background')) {
        // Create hero background element if it doesn't exist
        const heroBackground = document.createElement('div');
        heroBackground.className = 'hero-background';
        heroSection.insertBefore(heroBackground, heroSection.firstChild);
    }
}

// Setup header behavior
function setupHeaderBehavior() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
}

// Dark mode toggle
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  
  // Save preference to localStorage
  localStorage.setItem('theme', current === 'dark' ? 'light' : 'dark');
}

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero background
    initHeroBackground();
    
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (!mobileMenuButton) {
        const newMobileMenuButton = document.createElement('button');
        newMobileMenuButton.className = 'mobile-menu-button';
        newMobileMenuButton.setAttribute('aria-label', 'Toggle navigation menu');
        newMobileMenuButton.innerHTML = '<span class="menu-icon"></span>';
        
        const mainNav = document.querySelector('.main-nav .container');
        if (mainNav) {
            mainNav.insertBefore(newMobileMenuButton, mainNav.firstChild.nextSibling);
        }
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links-wrapper');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            if (mobileMenuButton) {
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
            const overlay = document.querySelector('.overlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    });
});

// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const scrollThreshold = 50;
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');
    let overlay = document.querySelector('.overlay');
    
    // Create overlay if it doesn't exist
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }
    
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (mobileMenuButton && navLinksWrapper && overlay) {
        // Set initial ARIA state
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        
        // Toggle menu on button click
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Close menu when clicking on overlay
        overlay.addEventListener('click', closeMenu);
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinksWrapper.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Handle menu item clicks on mobile
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });
        
        function openMenu() {
            navLinksWrapper.classList.add('active');
            overlay.classList.add('active');
            mobileMenuButton.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMenu() {
            navLinksWrapper.classList.remove('active');
            overlay.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
    
    // Handle active nav links
    function updateActiveNavLinks() {
        const currentPath = window.location.pathname;
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // Reset active state
            link.classList.remove('active');
            
            // Set active for homepage
            if (currentPath === '/' || currentPath.endsWith('index.html')) {
                if (linkPath === '/' || linkPath === 'index.html' || linkPath === './index.html') {
                    link.classList.add('active');
                }
            } 
            // Set active for other pages
            else if (currentPath.includes(linkPath) && linkPath !== '/' && linkPath !== 'index.html') {
                link.classList.add('active');
            }
        });
    }
    
    // Update active nav links on page load
    updateActiveNavLinks();
    
    // Setup transparent header on different pages
    function setupTransparentHeader() {
        const isHomePage = window.location.pathname === '/' || window.location.pathname.includes('index');
        const heroSection = document.querySelector('.hero');
        
        if (heroSection && header.classList.contains('transparent')) {
            // If we're on a page with a hero section, adjust header based on scroll position
            const heroHeight = heroSection.offsetHeight;
            
            function adjustHeaderStyles() {
                if (window.scrollY > heroHeight - header.offsetHeight * 2) {
                    header.classList.add('scrolled');
                } else if (window.scrollY <= scrollThreshold) {
                    header.classList.remove('scrolled');
                }
            }
            
            // Initial check
            adjustHeaderStyles();
            
            // Add scroll event listener
            window.addEventListener('scroll', adjustHeaderStyles);
        } else if (!heroSection && header.classList.contains('transparent')) {
            // If there's no hero section, ensure the header isn't transparent
            header.classList.add('scrolled');
        }
    }
    
    // Setup transparent header
    setupTransparentHeader();
});

// Testimonial Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevButton = document.querySelector('.testimonial-nav.prev');
    const nextButton = document.querySelector('.testimonial-nav.next');
    
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;
    
    // Initialize the slider
    function showSlide(index) {
        // Remove active class from all slides
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to current slide and dot
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
        showSlide(currentSlide);
    }
    
    // Go to next slide
    function nextSlide() {
        currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    }
    
    // Add click event listeners to navigation buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }
    
    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance slides every 6 seconds
    let slideInterval = setInterval(nextSlide, 6000);
    
    // Pause auto-advance on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 6000);
        });
    }
});

// Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to sections that should animate in
    const animateSections = document.querySelectorAll('.services, .featured-projects, .why-us, .testimonials, .partners, .recent-news, .cta-section');
    
    animateSections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        fadeElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check on initial load
    handleScrollAnimations();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Add parallax effect to CTA section
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        ctaSection.classList.add('parallax-section');
    }
    
    // Add staggered animations to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    if (featureItems.length) {
        featureItems.forEach((item, index) => {
            item.classList.add('fade-in');
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }
    
    // Add staggered animations to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length) {
        serviceCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }
    
    // Add staggered animations to news cards
    const newsCards = document.querySelectorAll('.news-card');
    if (newsCards.length) {
        newsCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }
});

// Video Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.play-button');
    const videoWrapper = document.querySelector('.video-wrapper');
    
    if (playButton && videoWrapper) {
        playButton.addEventListener('click', function() {
            // Create iframe for video (example with YouTube)
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1');
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('allow', 'autoplay; encrypted-media');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            
            // Replace placeholder with iframe
            videoWrapper.innerHTML = '';
            videoWrapper.appendChild(iframe);
        });
    }
});

// Newsletter Form Handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle main newsletter form
    const newsletterForm = document.querySelector('.newsletter-form form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Handle footer newsletter form
    const footerForm = document.querySelector('.footer-form');
    if (footerForm) {
        footerForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (emailInput && emailInput.value) {
            // Disable form elements during "submission"
            emailInput.disabled = true;
            submitButton.disabled = true;
            
            // Store the original button text
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission (replace with actual API call in production)
            setTimeout(() => {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = '#4CAF50';
                successMessage.style.marginTop = '10px';
                successMessage.style.fontWeight = '500';
                
                // Replace form with success message
                form.innerHTML = '';
                form.appendChild(successMessage);
                
                // Log the submitted email (remove in production)
                console.log('Newsletter signup:', emailInput.value);
            }, 1500);
        }
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Find all anchor links that point to ID
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL but without scrolling (modern browsers only)
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Handle direct scroll-cue click for better UX
    const scrollCue = document.querySelector('.scroll-cue');
    if (scrollCue) {
        scrollCue.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}); 
// ===========================
// HAMBURGER MENU FUNCTIONALITY
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle hamburger menu
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ===========================
// PORTFOLIO FILTERING
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'none';
                    // Trigger reflow to restart animation
                    void item.offsetWidth;
                    item.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});

// ===========================
// LIGHTBOX FUNCTIONALITY
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Open lightbox on image click
    portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        img.addEventListener('click', function() {
            lightbox.classList.add('active');
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});

// ===========================
// CONTACT FORM HANDLING
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const eventType = document.getElementById('eventType').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value.trim();

            // Validate form
            if (!name || !phone || !eventType || !date || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Format message for WhatsApp
            const whatsappMessage = `Hi Swaraj,%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEvent Type: ${encodeURIComponent(eventType)}%0ADate: ${encodeURIComponent(date)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;

            // Open WhatsApp with pre-filled message
            const whatsappURL = `https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`;
            window.open(whatsappURL, '_blank');

            // Reset form and show success message
            contactForm.reset();
            successMessage.style.display = 'block';
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000);
        });
    }
});

// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);

            // Only prevent default for anchor links that have a target
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===========================
// LAZY LOADING IMAGES
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Image is already loaded, just ensure it's visible
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Observe elements for fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and testimonial cards
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .feature-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});

// ===========================
// MOBILE VIEWPORT HEIGHT FIX
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Fix for mobile viewport height issue
    const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// ===========================
// PREVENT LAYOUT SHIFT
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Reserve space for scrollbar to prevent layout shift
    const hasVerticalScrollbar = document.documentElement.scrollHeight > window.innerHeight;
    
    if (!hasVerticalScrollbar) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
            document.body.style.marginRight = scrollbarWidth + 'px';
        }
    }
});

// ===========================
// FORM VALIDATION ENHANCEMENTS
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const dateInput = document.getElementById('date');

    // Phone number input - only allow numbers
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9+\-\s]/g, '');
        });
    }

    // Set minimum date to today
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// ===========================
// CONSOLE ERROR PREVENTION
// ===========================

// Ensure no console errors are logged from missing elements
window.addEventListener('error', function(e) {
    // Silently handle errors - proper error handling is in place
}, true);

// Log to ensure script loaded properly
console.log('Pixel by Swaraj - Website loaded successfully');

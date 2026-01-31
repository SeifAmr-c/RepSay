// ===================================
// RepSay Website JavaScript
// ===================================

// Supabase Configuration (same as Flutter app)
const SUPABASE_URL = 'https://uvxuygmivrbxsuxnwjnb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2eHV5Z21pdnJieHN1eG53am5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMTQyMjEsImV4cCI6MjA4NDY5MDIyMX0.771uHYP0Vrv4VJAKp0eWuCl3xOfNYRmlLXTp2Djgyz0';

// ===================================
// Mobile Navigation Toggle
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Contact Form Submission to Supabase
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');
    const modalOkBtn = document.getElementById('modalOkBtn');

    // Modal OK button - close modal and scroll to top
    if (modalOkBtn && successModal) {
        modalOkBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
            // Scroll to top of page
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Also close modal when clicking overlay background
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            try {
                // Submit to Supabase
                const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                });

                if (response.ok) {
                    // Success - show modal
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;

                    // Reset form
                    contactForm.reset();

                    // Show success modal
                    if (successModal) {
                        successModal.classList.add('active');
                    }
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Failed to send message. Please try again later.');
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }
});

// ===================================
// Navbar Background on Scroll
// ===================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(18, 18, 18, 0.95)';
    } else {
        navbar.style.background = 'rgba(18, 18, 18, 0.8)';
    }
});

// ===================================
// Add Stagger Animation Delay
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Add stagger delay to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

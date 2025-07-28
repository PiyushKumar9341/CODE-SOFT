document.addEventListener('DOMContentLoaded', function() {

    // --- Utility Function: Debounce ---
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // --- 1. Dynamic Year in Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                window.scrollTo({ top: targetSection.offsetTop - navHeight, behavior: 'smooth' });

                const mainNav = document.getElementById('main-nav');
                const hamburgerIcon = document.querySelector('.hamburger i');
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (hamburgerIcon) {
                        hamburgerIcon.classList.remove('fa-xmark');
                        hamburgerIcon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    // --- 3. Responsive Navigation Toggle (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.getElementById('main-nav');
    const hamburgerIcon = document.querySelector('.hamburger i');

    if (hamburger && mainNav && hamburgerIcon) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active');

            if (mainNav.classList.contains('active')) {
                hamburgerIcon.classList.remove('fa-bars');
                hamburgerIcon.classList.add('fa-xmark');
            } else {
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars');
            }
        });

        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !hamburger.contains(event.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburgerIcon.classList.remove('fa-xmark');
                hamburgerIcon.classList.add('fa-bars');
            }
        });
    }

    // --- 4. Basic Contact Form Handling (Client-Side Only) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formMessage.style.color = 'var(--accent-color)';
                formMessage.textContent = 'Please fill in all fields.';
                setTimeout(() => { formMessage.textContent = ''; }, 5000);
                return;
            }

            console.log('Form Submitted!');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            formMessage.style.color = 'var(--primary-color)';
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            setTimeout(() => { formMessage.textContent = ''; }, 5000);
            contactForm.reset();
        });
    }

    // --- 5. Scroll to Top Button Functionality ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        const toggleScrollBtnVisibility = debounce(() => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.visibility = 'visible';
                scrollToTopBtn.style.opacity = '1';
            } else {
                scrollToTopBtn.style.visibility = 'hidden';
                scrollToTopBtn.style.opacity = '0';
            }
        }, 100);

        window.addEventListener('scroll', toggleScrollBtnVisibility);
        toggleScrollBtnVisibility();

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 6. Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#main-nav a');

    const highlightNavLink = debounce(() => {
        const navHeight = document.querySelector('nav').offsetHeight;
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 1;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        const homeSection = document.getElementById('home');
        if (homeSection) {
            const homeSectionBottom = homeSection.offsetHeight - navHeight;
            if (window.scrollY < homeSectionBottom) {
                currentSectionId = 'home';
            }
        }
        if (window.scrollY === 0) {
            currentSectionId = 'home';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, 100);

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    // --- 7. Animate Elements On Scroll (revealing sections with .animate-on-scroll) ---
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    function checkScrollAnimations() {
        elementsToAnimate.forEach(el => {
            const rect = el.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            const isVisible = (rect.top <= viewportHeight * 0.8) && (rect.bottom >= viewportHeight * 0.2);

            if (isVisible) {
                el.classList.add('revealed');
            } else {
                // Optional: remove 'revealed' class if scrolled out of view, for repeated animations.
                // el.classList.remove('revealed');
            }
        });
    }

    // Call on load and on scroll (debounced for performance)
    window.addEventListener('scroll', debounce(checkScrollAnimations, 50));
    checkScrollAnimations(); // Initial check on page load for elements already in view.

});
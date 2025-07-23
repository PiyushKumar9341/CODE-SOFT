document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Dynamic Year in Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.getAttribute('href').substring(1); // Get target section ID )
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Get the height of the fixed navigation bar
                const navHeight = document.querySelector('nav').offsetHeight;

                window.scrollTo({
                    top: targetSection.offsetTop - navHeight, // Adjust scroll position for sticky nav
                    behavior: 'smooth' // Smooth scroll effect
                });

                // Close mobile nav after clicking a link (if open)
                const mainNav = document.getElementById('main-nav');
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            }
        });
    });

    // --- 3. Responsive Navigation Toggle (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.getElementById('main-nav');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // Toggle 'active' class to show/hide nav
        });
    }

    // --- 4. Basic Contact Form Handling (Client-Side Only) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formMessage.style.color = 'var(--accent-color)'; // Use accent color for error
                formMessage.textContent = 'Please fill in all fields.';
                return;
            }

            // Simulate form submission (in a real app, you'd send this data to a server)
            console.log('Form Submitted!');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);

            formMessage.style.color = 'var(--primary-color)'; // Use primary color for success
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';

            contactForm.reset(); // Clear the form fields
        });
    }

    // --- 5. Scroll to Top Button Functionality ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when button is clicked
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 6. Active Navigation Link Highlighting ---
    const sections = document.querySelectorAll('section'); // Get all sections
    const navLinks = document.querySelectorAll('#main-nav a'); // Get all nav links

    function highlightNavLink() {
        let current = '';

        sections.forEach(section => {
            // Get section's top and height, adjust for sticky nav
            const navHeight = document.querySelector('nav').offsetHeight;
            const sectionTop = section.offsetTop - navHeight;
            const sectionHeight = section.clientHeight;

            // Check if current scroll position is within the section
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight - navHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove active from all
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active'); // Add active to current section's link
            }
        });

        // Special handling for the 'home' link when at the very top
        if (window.pageYOffset === 0) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('nav a[href="#home"]').classList.add('active');
        }
    }

    // Listen for scroll events to update active link
    window.addEventListener('scroll', highlightNavLink);
    // Call on load to set initial active link
    highlightNavLink();

    
});

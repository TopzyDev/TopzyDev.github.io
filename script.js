document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Ensure links navigate correctly
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                // Prevent default only if it's a hash link on the same page
                if (link.getAttribute('href').startsWith('#') && link.hostname === window.location.hostname) {
                    e.preventDefault();
                    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }

    if (testimonials.length > 1 && window.innerWidth <= 480) {
        showTestimonial(currentIndex);
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000); // Change every 5 seconds
    } else {
        testimonials.forEach(card => card.style.display = 'block');
    }
});

document.querySelector('.hero-video').addEventListener('mouseover', () => video.pause());
document.querySelector('.hero-video').addEventListener('mouseout', () => video.play());

document.addEventListener('DOMContentLoaded', () => {
    // Language switcher logic
    const langSelect = document.getElementById('lang-select');
    let currentLang = localStorage.getItem('language') || 'en';

    // Fetch translations
    fetch('languages.json')
        .then(response => response.json())
        .then(data => {
            const translations = data;

            // Set initial language
            updateContent(currentLang);

            // Language change handler
            langSelect.addEventListener('change', (e) => {
                currentLang = e.target.value;
                localStorage.setItem('language', currentLang);
                updateContent(currentLang);
            });

            function updateContent(lang) {
                document.querySelectorAll('[data-key]').forEach(element => {
                    const key = element.getAttribute('data-key');
                    element.textContent = translations[lang][key];
                });

                document.querySelectorAll('[data-placeholder]').forEach(element => {
                    const key = element.getAttribute('data-placeholder');
                    element.placeholder = translations[lang][key];
                });

                // Update document language for accessibility
                document.documentElement.lang = lang;
            }
        })
        .catch(error => console.error('Error loading languages:', error));

    // Existing menu toggle logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                if (link.getAttribute('href').startsWith('#') && link.hostname === window.location.hostname) {
                    e.preventDefault();
                    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

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

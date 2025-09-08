document.addEventListener('DOMContentLoaded', () => {
    // Language switcher logic
    const langSelect = document.getElementById('lang-select');
    let currentLang = localStorage.getItem('language') || 'en';

    // Fetch translations with error handling
    fetch('languages.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(HTTP error! Status: ${response.status});
            }
            return response.json();
        })
        .then(data => {
            const translations = data;
            console.log('Translations loaded:', translations); // Debug log

            // Set initial language
            updateContent(currentLang);

            // Language change handler
            if (langSelect) {
                langSelect.value = currentLang;
                langSelect.addEventListener('change', (e) => {
                    currentLang = e.target.value;
                    localStorage.setItem('language', currentLang);
                    updateContent(currentLang);
                    console.log('Switched to:', currentLang); // Debug log
                });
            } else {
                console.error('Language select element not found!');
            }

            function updateContent(lang) {
                document.querySelectorAll('[data-key]').forEach(element => {
                    const key = element.getAttribute('data-key');
                    element.textContent = translations[lang][key] || Missing: ${key}; // Fallback with debug info
                });

                document.querySelectorAll('[data-placeholder]').forEach(element => {
                    const key = element.getAttribute('data-placeholder');
                    element.placeholder = translations[lang][key] || Missing: ${key}; // Fallback with debug info
                });

                document.documentElement.lang = lang;
            }
        })
        .catch(error => {
            console.error('Error loading languages.json:', error);
            // Fallback to English if JSON fails
            updateContent('en');
        });

    // Hamburger menu toggle logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        console.log('Menu toggle and navMenu found'); // Debug log
        menuToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active', isActive);
            console.log('Menu toggled, active:', isActive); // Debug log
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
                if (link.getAttribute('href').startsWith('#') && link.hostname === window.location.hostname) {
                    e.preventDefault();
                    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                console.log('Menu closed by outside click'); // Debug log
            }
        });
    } else {
        console.error('Menu toggle or navMenu not found:', { menuToggle, navMenu });
    }

    // Testimonial carousel logic
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
        }, 5000);
    } else {
        testimonials.forEach(card => card.style.display = 'block');
    }

    // Video interaction logic
    const video = document.querySelector('.hero-video');
    if (video) {
        video.addEventListener('mouseover', () => video.pause());
        video.addEventListener('mouseout', () => video.play());
    } else {
        console.warn('Hero video element not found');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const name = form.querySelector('input[name="name"]').value.trim();
            const email = form.querySelector('input[name="email"]').value.trim();
            const message = form.querySelector('textarea[name="message"]').value.trim();

            if (!name  !email  !message) {
                e.preventDefault();
                alert('Please fill in all fields.');
            } else if (!/^\S+@\S+\.\S+$/.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when user scrolls down
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down - hide navbar
            navbar.classList.add('hidden');
        } else {
            // Scrolling up - show navbar
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;

        // Show navbar after user stops scrolling
        scrollTimeout = setTimeout(() => {
            navbar.classList.remove('hidden');
        }, 1000);
    });
});
// Initialize AOS (Animate On Scroll) and Feather Icons
AOS.init();
feather.replace();

// Mobile menu toggle functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuButton.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        feather.replace();
    } else {
        icon.setAttribute('data-feather', 'x');
        feather.replace();
    }
});

// Countdown timer (7 days from now)
function updateCountdown() {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const diff = nextWeek - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
    document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
}

// Initialize countdown and update every minute
updateCountdown();
setInterval(updateCountdown, 60000);

// Vanta.js background animation
VANTA.GLOBE({
    el: "#hero-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xb54bff,
    backgroundColor: 0x111111,
    size: 0.8
});
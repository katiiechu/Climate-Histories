/**
 * Global Navigation Function
 * Handles switching between sections and updating nav link styles
 */
function navigateTo(pageId) {
    // 1. Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    // 2. Show the targeted page
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
    }

    // 3. Update Nav Button states
    const navButtons = document.querySelectorAll('.nav-item');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.getElementById(`btn-${pageId}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // 4. Reset scroll position to top
    window.scrollTo(0, 0);
}

// Ensure the function is available to the HTML buttons
window.navigateTo = navigateTo;

window.addEventListener('DOMContentLoaded', () => {
    
    // Initialize with the Home page visible
    navigateTo('home');

    // =========================
    // PARTICLE CANVAS LOGIC
    // =========================
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const PARTICLE_COUNT = 120;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = 'rgba(82, 255, 155, 0.3)'; // Updated to match your primary color
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Hover effect on game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        navbar.style.transform = scrollTop > lastScrollTop ? 'translateY(-100%)' : 'translateY(0)';
        navbar.style.backgroundColor = `rgba(0, 0, 0, ${Math.min(scrollTop / 200, 0.95) + 0.8})`;
        lastScrollTop = scrollTop;
    });

    // Animate category cards on scroll
    const categoryCards = document.querySelectorAll('.category-card');
    const animateCards = () => {
        categoryCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight * 0.8) {
                card.classList.add('slide-up');
            }
        });
    };
    window.addEventListener('scroll', animateCards);
    animateCards();

    // Tooltip + fake loading on game cards
    gameCards.forEach(card => {
        const gameTitle = card.querySelector('h3').textContent;
        card.setAttribute('title', `Click to play ${gameTitle}`);
        card.addEventListener('click', function () {
            card.classList.add('loading');
            setTimeout(() => {
                card.classList.remove('loading');
            }, 2000);
        });
    });

    // Particle animation
    const heroSection = document.querySelector('.hero-section');
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heroSection.appendChild(particle);
        setTimeout(() => particle.remove(), 5000);
    }
    setInterval(createParticle, 300);

    // Navbar toggle (mobile)
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    const navLinks = document.querySelector('.nav-links');
    document.querySelector('.navbar').appendChild(menuToggle);
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuToggle.classList.toggle('active');
    });

    // Category to games mapping
    const categories = {
        puzzle: ["memory", "math","tower of hanoi","sudoku"],
        action: ["pacman", "snake", "balloon", "catch", "color catch"],
        strategy: ["tic-tac-toe","tower of hanoi","sudoku","candy-game"],
        racing: ["rock","hill-climbing","racing-game"]
    };

    // Get reference to the main game grid
    const mainGrid = document.querySelector('.game-grid');

    // On category click: replace game cards in same grid
    categoryCards.forEach(card => {
        card.addEventListener('click', function () {
            const category = this.querySelector('h3').textContent.toLowerCase();

            // Clear existing game cards
            mainGrid.innerHTML = '';

            // Add relevant cards back into the main grid
            categories[category].forEach(gameName => {
                const gameCard = Array.from(gameCards).find(card => card.dataset.game === gameName);
                if (gameCard) {
                    mainGrid.appendChild(gameCard.cloneNode(true));
                }
            });

            mainGrid.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

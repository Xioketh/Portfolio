const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'

        });
    });
});

// Projects Carousel with Navigation
const carousel = document.getElementById('projects-carousel');
const carouselDots = document.getElementById('carousel-dots');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');
const projects = document.querySelectorAll('.project-card');

let currentIndex = 0;
const projectWidth = projects[0].offsetWidth + 32; // width + gap

// Create navigation dots
projects.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToProject(index);
    });
    carouselDots.appendChild(dot);
});

// Update dots and scroll position
function updateCarousel() {
    carousel.scrollTo({
        left: currentIndex * projectWidth,
        behavior: 'smooth'
    });

    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Navigation functions
function goToProject(index) {
    currentIndex = index;
    updateCarousel();
}

function goToPrev() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = projects.length - 1;
    }
    updateCarousel();
}

function goToNext() {
    if (currentIndex < projects.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
}

// Event listeners
prevBtn.addEventListener('click', goToPrev);
nextBtn.addEventListener('click', goToNext);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        goToPrev();
    } else if (e.key === 'ArrowRight') {
        goToNext();
    }
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .contact-card');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.project-card, .skill-category, .contact-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

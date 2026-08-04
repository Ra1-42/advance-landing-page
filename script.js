const revealElements = document.querySelectorAll('.reveal');
const heroHeading = document.querySelector('.hero-copy h1');
const phrases = ['audiences to action', 'experiences that convert', 'modern digital stories'];
let phraseIndex = 0;
let charIndex = 0;

function revealOnScroll() {
    const options = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    revealElements.forEach((element) => observer.observe(element));
}

function typeHeroText() {
    if (!heroHeading) return;
    const baseText = 'Beautifully crafted motion UI for ';
    const currentPhrase = phrases[phraseIndex];
    heroHeading.textContent = baseText + currentPhrase.slice(0, charIndex);

    if (charIndex < currentPhrase.length) {
        charIndex += 1;
        setTimeout(typeHeroText, 80);
    } else {
        setTimeout(() => {
            charIndex = 0;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeHeroText, 1000);
        }, 1800);
    }
}

function initForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = form.querySelector('input[name="email"]').value;
        alert(`Thanks! We'll send the design guide to ${email}`);
        form.reset();
    });
}

function initTopbarCta() {
    const button = document.getElementById('topbarCta');
    if (!button) return;
    button.addEventListener('click', () => {
        window.location.hash = '#connect';
    });
}

window.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    typeHeroText();
    initForm();
    initTopbarCta();
});

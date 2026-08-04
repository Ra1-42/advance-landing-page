const revealElements = document.querySelectorAll('.reveal');
const heroHeading = document.querySelector('.hero-copy h1') || document.querySelector('.page-hero h2');
const typingPhrases = ['motion-rich pages', 'vibrant launch experiences', 'design systems with depth'];
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
    if (!heroHeading || !heroHeading.closest('.hero')) return;

    const baseText = 'Launch vibrant, motion-rich pages that feel ';
    const currentPhrase = typingPhrases[phraseIndex];
    heroHeading.textContent = baseText + currentPhrase.slice(0, charIndex);

    if (charIndex < currentPhrase.length) {
        charIndex += 1;
        setTimeout(typeHeroText, 80);
    } else {
        setTimeout(() => {
            charIndex = 0;
            phraseIndex = (phraseIndex + 1) % typingPhrases.length;
            setTimeout(typeHeroText, 1000);
        }, 1800);
    }
}

function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const nameInput = form.querySelector('input[name="name"]');
            const emailValue = emailInput ? emailInput.value : '';
            const nameValue = nameInput ? nameInput.value : '';
            const message = nameValue ? `${nameValue}, thanks!` : 'Thanks!';
            alert(`${message} We'll follow up at ${emailValue || 'your email'}.`);
            form.reset();
        });
    });
}

function initTopbarCta() {
    const button = document.getElementById('topbarCta');
    if (!button) return;
    button.addEventListener('click', () => {
        window.location.href = 'contact.html';
    });
}

window.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();
    typeHeroText();
    initForms();
    initTopbarCta();
});

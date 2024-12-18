const slideshow = document.getElementById('slideshow');
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;
let autoSlideInterval;

slideshow.addEventListener('mousedown', startDrag);
slideshow.addEventListener('mouseup', endDrag);
slideshow.addEventListener('mousemove', drag);
slideshow.addEventListener('mouseleave', endDrag);

slideshow.addEventListener('touchstart', startDrag);
slideshow.addEventListener('touchend', endDrag);
slideshow.addEventListener('touchmove', drag);

function startDrag(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    clearInterval(autoSlideInterval); // Stop auto-slide when dragging starts
}

function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < totalSlides - 1) currentIndex += 1;
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();
    startAutoSlide(); // Restart auto-slide after drag ends
}

function drag(event) {
    if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
    slides.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -slideshow.offsetWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    setPositionByIndex();
    }, 4234); // Change slide every 3 seconds
}

// Start auto-slide on page load
startAutoSlide();

const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

// Fonction pour gérer l'affichage du menu
// Fonction pour gérer l'affichage du menu
function toggleMenu() {
    if (dropdownMenu.classList.contains('open')) {
        dropdownMenu.classList.remove('open');
    } else {
        dropdownMenu.classList.add('open');
    }
}

// Ajoute les gestionnaires pour les événements de clic et de touch
menuToggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation(); // Empêche la propagation de l'événement pour éviter la fermeture immédiate
    toggleMenu();
});

menuToggle.addEventListener('touchstart', (event) => {
    event.preventDefault();
    event.stopPropagation(); // Empêche la propagation de l'événement pour éviter la fermeture immédiate
    toggleMenu();
});

// Empêche la fermeture lorsque vous cliquez à l'intérieur du menu
dropdownMenu.addEventListener('click', (event) => {
    event.stopPropagation(); // Empêche la fermeture si un lien est cliqué dans le menu
});

// Fermer le menu si on clique en dehors
document.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target) && dropdownMenu.classList.contains('open')) {
        dropdownMenu.classList.remove('open');
    }
});

// Fermer le menu si on touche en dehors (pour les mobiles)
document.addEventListener('touchstart', (event) => {
    if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target) && dropdownMenu.classList.contains('open')) {
        dropdownMenu.classList.remove('open');
    }
});

function decomsg(){
    alert("Vous etes bien decontecté");
}






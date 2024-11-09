const diaporama = document.querySelector('.diaporama');
const diaporamaContainer = document.querySelector('.diaporama-container');
const images = diaporama.querySelectorAll('img');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
let currentIndex = 0;

arrowLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        setPositionByIndex();
    }
});

arrowRight.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        setPositionByIndex();
    }
});

function setPositionByIndex() {
    const slideWidth = diaporamaContainer.clientWidth;
    diaporama.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    diaporama.style.transition = 'transform 0.3s ease';
}

window.addEventListener('resize', () => {
    setPositionByIndex();
});
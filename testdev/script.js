const diaporama = document.querySelector('.diaporama');
const diaporamaContainer = document.querySelector('.diaporama-container');
const images = diaporama.querySelectorAll('img');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 0;

diaporama.addEventListener('mousedown', startDrag);
diaporama.addEventListener('touchstart', startDrag, { passive: true });
diaporama.addEventListener('mouseup', endDrag);
diaporama.addEventListener('touchend', endDrag);
diaporama.addEventListener('mousemove', drag);
diaporama.addEventListener('touchmove', drag, { passive: false });
diaporama.addEventListener('mouseleave', endDrag);

function startDrag(event) {
    isDragging = true;
    startPos = getPositionX(event);
    diaporama.style.transition = 'none';
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -50 && currentIndex < images.length - 1) currentIndex++;
    if (movedBy > 50 && currentIndex > 0) currentIndex--;

    setPositionByIndex();
}

function drag(event) {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
    setSliderPosition();
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function setSliderPosition() {
    diaporama.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -diaporamaContainer.clientWidth;
    prevTranslate = currentTranslate;
    diaporama.style.transition = 'transform 0.3s ease';
    setSliderPosition();
}

window.addEventListener('resize', () => {
    currentTranslate = currentIndex * -diaporamaContainer.clientWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
});
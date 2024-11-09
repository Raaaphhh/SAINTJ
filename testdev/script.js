const diaporama = document.querySelector('.diaporama');

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 0;
let animationID;

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
    animationID = requestAnimationFrame(animation);
    diaporama.style.cursor = 'grabbing';
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < diaporama.children.length - 1) currentIndex++;
    if (movedBy > 100 && currentIndex > 0) currentIndex--;

    setPositionByIndex();
    diaporama.style.cursor = 'grab';
}

function drag(event) {
    if (!isDragging) return;
    event.preventDefault();
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
    setSliderPosition();
}

function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function setSliderPosition() {
    diaporama.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -diaporama.clientWidth / diaporama.children.length;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

window.addEventListener('resize', () => {
    currentTranslate = currentIndex * -diaporama.clientWidth / diaporama.children.length;
    prevTranslate = currentTranslate;
    setSliderPosition();
});
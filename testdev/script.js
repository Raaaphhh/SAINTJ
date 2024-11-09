const diaporama = document.querySelector('.diaporama');

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

diaporama.addEventListener('mousedown', startDrag);
diaporama.addEventListener('touchstart', startDrag);
diaporama.addEventListener('mouseup', endDrag);
diaporama.addEventListener('touchend', endDrag);
diaporama.addEventListener('mousemove', drag);
diaporama.addEventListener('touchmove', drag);

function startDrag(event) {
    isDragging = true;
    startPos = getPositionX(event);
    diaporama.style.cursor = 'grabbing';
}

function endDrag() {
    isDragging = false;
    prevTranslate = currentTranslate;
    diaporama.style.cursor = 'grab';
}

function drag(event) {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startPos;
    currentTranslate = prevTranslate + diff;
    diaporama.style.transform = `translateX(${currentTranslate}px)`;
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

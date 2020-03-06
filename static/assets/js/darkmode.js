const body = document.querySelector('body');
const modeToggle = document.querySelector('#modeSelector');

modeToggle.querySelector('.toggleSelector').addEventListener('click', (e) => {
    e.target.classList.toggle('active');
    bodyModeToggle();
}, true);

function bodyModeToggle() {
    body.classList.toggle('darkMode');
    body.classList.toggle('lightMode');
}
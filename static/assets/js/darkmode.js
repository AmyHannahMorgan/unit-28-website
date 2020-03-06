const modeToggle = document.querySelector('#modeSelector');

modeToggle.querySelector('.toggleSelector').addEventListener('click', (e) => {
    e.target.classList.toggle('active');
    bodyModeToggle();
}, true);

if(!checkCookie('darkmode') && body.getAttribute('data-cookies') === 'true') setCookie('darkmode', 'false', 365);
else if(getCookie('darkmode') === 'true') {
        modeToggle.querySelector('.toggleSelector').classList.add('active');
        body.classList.toggle('darkMode');
        body.classList.toggle('lightMode');
}

function bodyModeToggle() {
    if(body.getAttribute('data-cookies') === 'true') {
        if(body.classList.contains('lightMode')) setCookie('darkmode', 'true', 365);
        else if(body.classList.contains('darkMode')) setCookie('darkmode', 'false', 365);
    }
    body.classList.toggle('darkMode');
    body.classList.toggle('lightMode');
}
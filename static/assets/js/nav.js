const nav = document.querySelector('nav');
const navItems = document.querySelectorAll('.navItem.dropdown');
const navOpen = document.querySelector('#mobileNavButton');
const navClose = nav.querySelector('.navClose');

for(let i = 0; i < navItems.length; i++) {
    navItems[i].querySelector('.navHeader').addEventListener('click', e => {
        let parent = e.target.parentNode;

        while(!parent.classList.contains('navItem')) {
            parent = parent.parentNode;
        }
        
        parent.classList.toggle('active');
        if(parent.querySelector('.navBody').style.height == '') {
            parent.querySelector('.navBody').style.height = `${parent.querySelector('.navBody').scrollHeight}px`;
        }
        else if(parent.querySelector('.navBody').style.height != '') {
            parent.querySelector('.navBody').style.height = '';
        }
    }, true);
}

navOpen.addEventListener('click', toggleNav);
navClose.addEventListener('click', toggleNav);

function toggleNav() {
    nav.classList.toggle('active');
}
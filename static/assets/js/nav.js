const apiAddress = `${window.location.origin}/api`;
const nav = document.querySelector('nav');
const navItems = document.querySelectorAll('.navItem.dropdown');
const navOpen = document.querySelector('#mobileNavButton');
const navClose = nav.querySelector('.navClose');

const projectsElem = document.querySelector('#projects');

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

let projectsReq = new XMLHttpRequest();

projectsReq.open('GET', `${apiAddress}/projects/display`);
projectsReq.addEventListener('load', (e) => {
    let obj = JSON.parse(e.target.response);
    for(let i = 0; i < obj.projectNames.length; i++) {
        let li = document.createElement('li');
        let h1 = document.createElement('h1');
        let a = document.createElement('a');

        a.innerText = obj.projectNames[i];
        a.href = `/projects?project=${obj.projectNames[i]}`;

        h1.appendChild(a);
        li.appendChild(h1);
        projectsElem.appendChild(li);
    }
});
projectsReq.send();

function toggleNav() {
    nav.classList.toggle('active');
}
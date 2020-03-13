const main = document.querySelector('main');
const projectTemplate = document.querySelector('.projectHolder.template');

const projectsCall = new XMLHttpRequest();

projectsCall.open('GET', `${apiAddress}/projects`);
projectsCall.addEventListener('load', e => {
    let projects = JSON.parse(e.target.response);

    for(let i = 0; i < projects.length; i++) {
        console.log(projects[i].name);
        console.log(atob(projects[i].description));
        
        let newProjectElem = projectTemplate.cloneNode(true);
        let projectHeader = newProjectElem.querySelector('.projectHeader');
        let projectTitle = newProjectElem.querySelector('.projectTitle');
        let projectBody = newProjectElem.querySelector('.projectBody');

        newProjectElem.classList.remove('template');
        newProjectElem.setAttribute('project-name', projects[i].name);
        projectTitle.innerText = projects[i].name;
        projectBody.innerHTML = atob(projects[i].description);
        main.appendChild(newProjectElem);

        projectHeader.addEventListener('click', (e) =>  {
            let holder = e.target;

            while(!holder.classList.contains('projectHolder')) {
                holder = holder.parentNode;
            }

            holder.classList.toggle('active');

            let body = holder.querySelector('.projectBody');

            if(body.style.height === '') {
                body.style.height = `${body.scrollHeight}px`;
            }
            else body.style.height = ''
        });
    }
    moveToProject();
});
projectsCall.send();

function moveToProject() {
    console.log('i ran');
    let params = new URLSearchParams(window.location.search);
    console.log(params);

    if(params.has('project')) {
        let projects = document.querySelectorAll('.projectHolder');

        for(let i = 0; i < projects.length; i++) {
            if(projects[i].getAttribute('project-name') === params.get('project')) {
                projects[i].classList.add('active');
                projects[i].querySelector('.projectBody').style.height = `${projects[i].querySelector('.projectBody').scrollHeight}px`;
                projects[i].scrollIntoView(true);
                console.log(projects[i]);
                break;
            }
        }
    }
}
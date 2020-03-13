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
        })
    }
});
projectsCall.send();
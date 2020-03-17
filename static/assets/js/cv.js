const cvElem = document.querySelector('#cv');
const headerElem = document.querySelector('#header');
const experienceElem = document.querySelector('#experience');
const qualificationsElem = document.querySelector('#qualifications');
const skillsElem = document.querySelector('#skills');
const achievementsElem = document.querySelector('#achievements');
let request = new XMLHttpRequest();

if(cvElem !== null) {
    request.open('GET', `${apiAddress}/cv`);
    request.addEventListener('load', e => {
        let response = JSON.parse(e.target.response);
        buildHeader(response.details);
        buildExperience(response.experience);
        buildQualifications(response.qualifications);
    });
    request.send();
}
else if(qualificationsElem !== null) {
    request.open('GET', `${apiAddress}/cv/qualifications`);
    request.addEventListener('load', e => {
        let quals = JSON.parse(e.target.response);
        buildQualifications(quals);
    });
    request.send();
}
else if(achievementsElem !== null) {

}

function buildQualifications(qualArray) {
    for(let i = 0; i < qualArray.length; i++) {
        let qualHolder = document.createElement('div');
        qualHolder.classList.add('qualification');

        let qualTitle = document.createElement('h2');
        qualTitle.classList.add('titleAndGrade');
        qualTitle.innerText = `${qualArray[i].qualification} - ${qualArray[i].grade}`;

        let qualLocation = document.createElement('p');
        qualLocation.classList.add('location');
        qualLocation.innerText = `${qualArray[i].location}`;

        let qualDates = document.createElement('p');
        qualDates.classList.add('dates');

        let startDate = new Date(qualArray[i].startDate.year, qualArray[i].startDate.month, qualArray[i].startDate.day);
        let startDateString = startDate.toDateString().split(' ');
        startDateString = [startDateString[1], startDateString[3]].join(' ');

        let endDate = qualArray[i].endDate === null ? 'present' : new Date(qualArray[i].endDate.year, qualArray[i].endDate.month, qualArray[i].endDate.day);
        let endDateString;
        if(endDate !== 'present') {
            endDateString = endDate.toDateString().split(' ');
            endDateString = [endDateString[1], endDateString[3]].join(' ');
        }
        else endDateString = endDate

        qualDates.innerText = `${startDateString} - ${endDateString}`;

        qualHolder.appendChild(qualTitle);
        qualHolder.appendChild(qualLocation);
        qualHolder.appendChild(qualDates);
        qualificationsElem.appendChild(qualHolder);
    }
}

function buildExperience(expArray) {
    for(let i = 0; i < expArray.length; i++) {
        let expHolder = document.createElement('div');
        expHolder.classList.add('experience');

        let expTitle = document.createElement('h2');
        expTitle.classList.add('titleAndLocation');
        expTitle.innerText = `${expArray[i].jobTitle} - ${expArray[i].location}`;

        let expDates = document.createElement('p');
        expDates.classList.add('dates');

        let startDate = new Date(expArray[i].startDate.year, expArray[i].startDate.month, expArray[i].startDate.day);
        let startDateString = startDate.toDateString().split(' ');
        startDateString = [startDateString[1], startDateString[3]].join(' ');

        let endDate = expArray[i].endDate === null ? 'present' : new Date(expArray[i].endDate.year, expArray[i].endDate.month, expArray[i].endDate.day);
        let endDateString;
        if(endDate !== 'present') {
            endDateString = endDate.toDateString().split(' ');
            endDateString = [endDateString[1], endDateString[3]].join(' ');
        }
        else endDateString = endDate

        expDates.innerText = `${startDateString} - ${endDateString}`;

        expHolder.appendChild(expTitle);
        expHolder.appendChild(expDates);
        experienceElem.appendChild(expHolder);
    }
}

function buildHeader(details) {
    let headerTitle = headerElem.querySelector('.title');
    headerTitle.innerText = details.name;

    let contacts = headerElem.querySelector('.contacts');
    let keys = Object.keys(details);

    for(let i = 1; i < keys.length; i++) {
        let contactHolder = document.createElement('div');
        contactHolder.classList.add('contact');

        // put img holder and images here
        let img = document.createElement('img');
        img.src = `${window.origin}/assets/icons/cv/${keys[i]}.svg`;
        console.log(img.src);

        let contactText = document.createElement('p');
        contactText.innerText = details[keys[i]];

        contactHolder.appendChild(img);
        contactHolder.appendChild(contactText);
        contacts.appendChild(contactHolder);
    }
}
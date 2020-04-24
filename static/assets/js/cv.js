const cvElem = document.querySelector('#cv');
const headerElem = document.querySelector('#header');
const experienceElem = document.querySelector('#experience');
const qualificationsElem = document.querySelector('#qualifications');
const skillsElem = document.querySelector('#skills');
const achievementsElem = document.querySelector('#achievements');
const params = new URLSearchParams(window.location.search);
let request = new XMLHttpRequest();

if(cvElem !== null) {
    request.open('GET', `${apiAddress}/cv`);
    request.addEventListener('load', e => {
        let response = JSON.parse(e.target.response);
        buildHeader(response.details);
        buildExperience(response.experience);
        if(params.get('cvType') !== null && params.get('cvType') === 'technical') {
            buildQualifications(response.qualifications, true);
            buildSkills(response.skills.technical);
        }
        else {
            buildQualifications(response.qualifications, false);
            buildSkills(response.skills.nontechnical);
        }
        buildAchievements(response.achievements);
    });
    request.send();
}
else if(qualificationsElem !== null) {
    request.open('GET', `${apiAddress}/cv/qualifications`);
    request.addEventListener('load', e => {
        let quals = JSON.parse(e.target.response);
        buildQualifications(quals, false);
    });
    request.send();
}

function buildQualifications(qualArray, technical) {
    for(let i = 0; i < qualArray.length; i++) {
        if(technical && !qualArray[i].technical) {
            continue;
        }
        let qualHolder = document.createElement('div');
        qualHolder.classList.add('qualification');

        let qualTitle = document.createElement(technical ? 'h2' : 'p');
        qualTitle.classList.add('titleAndGrade');
        qualTitle.innerText = `${qualArray[i].qualification} - ${qualArray[i].grade}`;
    
        let infoHolder = document.createElement('div');
        let qualLocation = document.createElement('p');
        let divider = document.createElement('p');
        let qualDates = document.createElement('p');

        if(technical) {
            infoHolder.classList.add('infoHolder');

            qualLocation.classList.add('location');
            qualLocation.innerText = `${qualArray[i].location}`;

            divider.innerText = ' | '

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
        }
        
        qualHolder.appendChild(qualTitle);
        if(technical) {
            infoHolder.appendChild(qualLocation);
            infoHolder.appendChild(divider);
            infoHolder.appendChild(qualDates);
            qualHolder.appendChild(infoHolder);
        }
        else qualificationsElem.classList.add('nontechnical');
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

        let expDescription = document.createElement('p');
        expDescription.innerText = expArray[i].jobDescription;

        expHolder.appendChild(expTitle);
        expHolder.appendChild(expDates);
        expHolder.appendChild(expDescription);
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

function buildSkills(skillsArray) {
    skillsArray.forEach(skill => {
        let skillHolder = document.createElement('div');
        skillHolder.classList.add('skillHolder');

        let skillName = document.createElement('p');
        skillName.innerText = skill.skill;

        let levelHolder = document.createElement('div');
        levelHolder.classList.add('levelHolder');

        if(skill.level !== null) {    
            for(let i = 0; i < 5; i++) {
                let type = i < skill.level ? 'full' : 'clear';

                let icon = document.createElement('img');
                icon.src = `${window.origin}/assets/icons/cv/skills/${type}.svg`;

                levelHolder.appendChild(icon);
            }
        }

        skillHolder.appendChild(skillName);
        skillHolder.appendChild(levelHolder);
        skillsElem.appendChild(skillHolder);
    });
}

function buildAchievements(achievementsArray) {
    let achievementsHolder = document.createElement('div');
    achievementsHolder.classList.add('achievementsHolder');

    achievementsArray.forEach(achievement => {
        let achievementElem = document.createElement('p');
        achievementElem.innerText = achievement;

        achievementsHolder.appendChild(achievementElem);
    });

    achievementsElem.appendChild(achievementsHolder);
}
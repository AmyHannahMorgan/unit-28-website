const cvElem = document.querySelector('#cv');
const qualificationsElem = document.querySelector('#qualifications');
const achievementsElem = document.querySelector('#achievements');
let request = new XMLHttpRequest();

if(cvElem !== null) {

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
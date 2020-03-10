const express = require('express');
const axios = require('axios');
const githubApiAddress = 'https://api.github.com';
const fs = require('fs');
const dataString = './data.json';
let data = require(dataString);
const app = express();
const port = process.env.PORT || 3000;

if(Date.now() >= data.githubProjects.lastUpdated + data.githubProjects.refreshInterval) {
    updateProjects(data.githubProjects.projects, data.githubProjects.refreshInterval, data);
}

app.use(express.static(`${__dirname}/static`));

app.listen(port);

async function updateProjects(projectsArray, refreshInterval, dataObject) {
    let array = []
    let projects = await axios.get(`${githubApiAddress}/users/${dataObject.githubProjects.username}/repos`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        },
        params: {
            sort: 'created'
        }
    });
    projects.forEach(project => {
        let obj = {
            name: '',
            description: ''
        }
        let descriptionPath = project.contents_url.replace('{+path}', 'description.html');
        let test = await axios.get(descriptionPath);
        if(test.status === 200) {
            obj.name = project.name;
            obj.description = descriptionPath;
            array.push(obj);
       } 
    });
    projectsArray = array;
    dataObject.githubProjects.lastUpdated = Date.now();
    updateData(dataObject);
    setTimeout(() => {
        updateProjects(projectsArray, refreshInterval, dataObject);
    }, refreshInterval);
}

function updateData(newDataObject) {
    fs.writeFile(dataString, JSON.stringify(newDataObject), (err, result) => {
        if(err) {
            console.log(err);
        }
    });
}
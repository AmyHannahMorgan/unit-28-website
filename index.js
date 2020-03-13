require('dotenv').config();
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

app.get('/api/projects', (req, res) => {
    res.send(data.githubProjects.projects);
});

app.get('/api/projects/display', (req, res) => {
    let resObj = {
        projectNames: []
    }
    let end = data.githubProjects.projects.length > 4 ? 5 : data.githubProjects.projects.length;
    for(let i = 0; i < end; i++) {
        resObj.projectNames.push(data.githubProjects.projects[i].name);
    }
    res.send(resObj);
});

app.get('/api/cv', (req, res) => {
    res.send(data.cv);
});

app.get('/api/cv/qualifications', (req, res) => {
    res.send(data.cv.qualifications);
});

app.use(express.static(`${__dirname}/static`));

app.listen(port);

async function updateProjects(projectsArray, refreshInterval, dataObject) {
    let array = [];
    let projects = await axios.get(`${githubApiAddress}/users/${dataObject.githubProjects.username}/repos`, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        },
        params: {
            sort: 'created'
        },
        auth: {
            username: process.env.GH_CLIENT_ID,
            password: process.env.GH_CLIENT_SECRET
        }
    });
    for(let i = 0; i < projects.data.length; i++) {
        let obj = {
            name: '',
            description: ''
        }
        let descriptionPath = projects.data[i].contents_url.replace('{+path}', 'description.html');
        let test;

        try {
            test = await axios.get(descriptionPath, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                },
                auth: {
                    username: process.env.GH_CLIENT_ID,
                    password: process.env.GH_CLIENT_SECRET
                }
            });
            console.log(test);
            if(test.status === 200) {
                obj.name = projects.data[i].name;
                obj.description = test.data.content;
                console.log(obj);
                array.push(obj);
            } 
        } catch (error) {
            // console.log(error);
        }
    };
    console.log({array});
    dataObject.githubProjects.projects = [...array];
    dataObject.githubProjects.lastUpdated = Date.now();

    console.log(dataObject);
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
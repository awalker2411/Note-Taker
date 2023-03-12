const app = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/utils');
const fs = require('fs');
const uniq = require('uniqid')

app.get(`/notes`, (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.post('/notes', (req, res) => {
    console.info(`${req.method} request received.`)
    const { title, text } = req.body;
    if (req.body) {
        const addNote = {
            title,
            text,
            id: uniq(),
        };

    readAndAppend(addNote, './db/db.json');
    res.json(`Note added.`);
    } else {
    res.error(`Error: note not added.`);
    }
});

app.delete('/notes/:id', (req, res) => {
    console.info(`${req.method} request received.`)
    fs.readFile(`./db/db.json`, `utf8`, (err, data) => {
        const array = JSON.parse(data);
        const id = req.params.id;
        const delNote = array.filter(data => data.id !== id)
        writeToFile(`./db/db.json`, delNote)
        res.json(`Note removed.`)
    });
});

module.exports = app;

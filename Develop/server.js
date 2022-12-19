// requiring packages 
const fs = require('fs');
const path = require('path');
const express = require('express');

// setting db path to variable
const dbData = ('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001; 

// accessing public folder
app.use(express.static('public'));

// middleware using urlencoded and express.json to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.get requests for note and index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'))
});

// returning notes from db file as json
app.get('/api/notes', (req, res) => res.json(dbData));








app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
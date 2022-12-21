// requiring packages and setting variables
const fs = require('fs');
const path = require('path');
const express = require('express');


const db = ('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001; 

// const for unique id for POST to db
const uuid = require('uuid');
const { response } = require('express');
const dbId = uuid.v4;

// accessing public folder
app.use(express.static('/public'));

// middleware using urlencoded and express.json to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get requests for note and index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


app.route('/api/notes')
// returning notes from db file as json
    .get((req, res, next) => {
        let data = fs.readFileSync(db);
        let dbJSON = JSON.parse(data);
        res.json(dbJSON);
})
    .post((req, res, next) => {
        const { title, text } = req.body;
        // if note has title and text then posting to db
        let data = fs.readFileSync(db);
        console.log(data);
        let notes = JSON.parse(data);    
    //   if statement ot add object to db
        if(title && text) {
            const noteText = {
                title,
                text,
                id: dbId,
            };
            // pushing notes into database
             notes.push(db);
            //  writing db file with new notes that are added
                fs.writeFile("db.json", JSON.stringify(notes), (err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Note Saved!");
                }   
            });
            // response that note is save with note text for obj body
            const resp = {
                status: "Note Saved!",
                body: noteText,
            };
            // good response code
            res.status(200).json(resp);
        } else {
            // response code for error
            res.status(500).json("Not not saved!");    
        };
        res.json(noteText);  
    });


// setting to listen to server
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
  });
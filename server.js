// Require modules
const express = require("express");
const fs = require("fs");
const routes = require("./utils/routes.js");

// Define the PORT this server will be using
const PORT = process.env.PORT || 4000;

// Set up express to handle data parsing
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes will take in app as an arguement to run .get() on app
routes(app);

// Post requests will go here
app.post("/api/notes", function(req, res) {
    fs.readFile("./db/db.json", "utf8", function(error, data) {
        if(error) throw error;
        // Parse data to manipulate the array
        const noteList = JSON.parse(data);
        noteList.push(req.body);
        // Loop over updated array, and create a new key value pair with a property 'id', and a value of the index of each individual note object
        noteList.map(note => {
            note.id = noteList.indexOf(note);
        });
        const newNoteList = JSON.stringify(noteList);
        // Write the new data to db.json
        fs.writeFile("./db/db.json", newNoteList, function(error) {
            if(error) throw error;
            res.json(noteList);
        })
    })
});

// Get requests will go here
app.get("/api/notes", function(req, res){
    fs.readFile("./db/db.json", "utf8", function(error, data){
        if (error) throw error;
        res.json(JSON.parse(data));
    });
});

// Delete requests will go here
app.delete("/api/notes/:id", function(req, res){
    fs.readFile("./db/db.json", "utf8", function(error, data){
        if(error) throw error;
        const allNotes = JSON.parse(data);
        // Loop over parsed data, and remove object that has been selected by user from array
        allNotes.forEach(note => {
            if (note.id == req.params.id) {
                allNotes.splice(note.id, 1);
                fs.writeFile("./db/db.json", JSON.stringify(allNotes), function(error){
                    if(error) throw error;
                    // Return new array of data
                    res.json(allNotes);
                });
            };
        });
    });
});

// Set listen function on the PORT
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});
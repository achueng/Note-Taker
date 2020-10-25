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
        // console.log(data);
        // Parse data to manipulate the array
        const noteList = JSON.parse(data);
        noteList.push(req.body);
        // console.log(noteList);
        // Write the new data to db.json
        fs.writeFile("./db/db.json", JSON.stringify(noteList), function(error) {
            if(error) throw error;
            // console.log("Success!");
        })
    })
});

// Get requests will go here
app.get("/api/notes", function(req, res){
    // console.log("Yes!");
    fs.readFile("./db/db.json", "utf8", function(error, data){
        console.log(data);
    })
})

// Set listen function on the PORT
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});
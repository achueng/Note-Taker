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

// Get requests will go here

// Set listen function on the PORT
app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});